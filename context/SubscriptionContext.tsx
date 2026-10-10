import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import { AppState, Alert, Platform } from 'react-native';
import Purchases, { PurchasesPackage, PurchasesOffering, CustomerInfo, PurchasesEntitlementInfo } from 'react-native-purchases';
import { secureStorage } from '../lib/secureStorage';
import i18n from '../i18n';

const SUBSCRIPTION_KEY = 'calm_elevation_sub_secure_v1';
const INSTALL_DATE_KEY = 'calm_elevation_install_date';

const PRODUCT_IDS = {
    monthly: Platform.OS === 'ios' ? 'calm_elevation_monthly_premium' : 'calm_elevation_subscription:calm-elevation-monthly-premium',
    yearly: Platform.OS === 'ios' ? 'calm_elevation_yearly_premium' : 'calm_elevation_subscription_yearly:calm-elevation-yearly-premium'
};

// RevenueCat API Keys - PLACEHOLDERS
// TODO: Replace with your actual RevenueCat API Keys
const API_KEYS = {
    apple: 'appl_vAoJvvQnSnKPidTqGZCufqWIiPm',
    google: process.env.EXPO_PUBLIC_PAYMENT_API_KEY || ''
};

export interface SubscriptionState {
    isSubscribed: boolean;
    isFreeTrial: boolean; // if true, user is in the 3-day local trial
    expiryDate: string | null;
    planId: string | null;
    originalPurchaseDate: string | null;
}

const DEFAULT_SUBSCRIPTION: SubscriptionState = {
    isSubscribed: false,
    isFreeTrial: false,
    expiryDate: null,
    planId: null,
    originalPurchaseDate: null,
};

interface SubscriptionContextType {
    subscription: SubscriptionState;
    loading: boolean;
    purchase: (sku: 'monthly' | 'yearly') => Promise<boolean>;
    restore: () => Promise<boolean>;
    checkExpiry: () => Promise<void>;
    startFreeTrial: () => Promise<void>;
    initialize: () => Promise<void>;
    offerings: PurchasesOffering | null;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
    const [subscription, setSubscription] = useState<SubscriptionState>(DEFAULT_SUBSCRIPTION);
    const [loading, setLoading] = useState(true);
    const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);
    const [isConfigured, setIsConfigured] = useState(false);
    const isConfiguredRef = useRef(false);

    // Sync RevenueCat status to our local state
    const updateSubscriptionStatus = useCallback(async (customerInfo?: CustomerInfo) => {
        try {
            if (!isConfiguredRef.current) {
                console.log('[SubscriptionContext] Not configured yet, checking local trial eligibility only.');
                await checkLocalTrialEligibility();
                return;
            }

            const info = customerInfo || await Purchases.getCustomerInfo();

            // Check for ANY active entitlement. This handles ID mismatches or changes.
            const activeEntitlements = Object.values(info.entitlements.active);
            const entitlement: PurchasesEntitlementInfo | undefined = activeEntitlements[0];

            if (entitlement) {
                console.log('[SubscriptionContext] Found active entitlement:', entitlement.identifier);
                // User has ACTIVE paid subscription
                const newState: SubscriptionState = {
                    isSubscribed: true,
                    isFreeTrial: entitlement.periodType === 'TRIAL',
                    expiryDate: entitlement.expirationDate || null,
                    planId: entitlement.productIdentifier,
                    originalPurchaseDate: entitlement.originalPurchaseDate
                };
                setSubscription(newState);
                await secureStorage.setJson(SUBSCRIPTION_KEY, newState);
            } else {
                console.log('[SubscriptionContext] No active entitlement found in RevenueCat.');
                // No active entitlement found in RevenueCat.
                // Fallback to our local "3-Day Trial" check.
                await checkLocalTrialEligibility();
            }
        } catch (e: any) {
            console.error("Error updating subscription status:", e);
            // If fetching fails (e.g. no network or not configured), fall back to local check
            await checkLocalTrialEligibility();
        }
    }, []);

    const checkLocalTrialEligibility = async () => {
        // Local 3-Day Trial Logic based on Install Date
        const installDateStr = await secureStorage.getItem(INSTALL_DATE_KEY);

        if (!installDateStr) {
            setSubscription(DEFAULT_SUBSCRIPTION);
            return;
        }

        const installDate = new Date(installDateStr);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - installDate.getTime());
        const daysSinceInstall = diffTime / (1000 * 60 * 60 * 24);

        if (daysSinceInstall < 3) {
            // Still in local trial
            const docExpiry = new Date(installDate);
            docExpiry.setDate(docExpiry.getDate() + 3);

            const trialState: SubscriptionState = {
                isSubscribed: true,
                isFreeTrial: true,
                expiryDate: docExpiry.toISOString(),
                planId: 'trial',
                originalPurchaseDate: installDate.toISOString(),
            };
            setSubscription(trialState);
            await secureStorage.setJson(SUBSCRIPTION_KEY, trialState);
        } else {
            // Expired local trial
            const expiredState = { ...DEFAULT_SUBSCRIPTION, isSubscribed: false };
            setSubscription(expiredState);
            await secureStorage.setJson(SUBSCRIPTION_KEY, expiredState);
        }
    };

    const initialize = useCallback(async () => {
        try {
            // 0. Set Install Date if new
            let installDateStr = await secureStorage.getItem(INSTALL_DATE_KEY);
            if (!installDateStr) {
                const now = new Date();
                installDateStr = now.toISOString();
                await secureStorage.setItem(INSTALL_DATE_KEY, installDateStr);
            }

            // 0b. Load Persistent Subscription State immediately for UI responsiveness
            const persistedState = await secureStorage.getJson<SubscriptionState>(SUBSCRIPTION_KEY);
            if (persistedState) {
                console.log('[SubscriptionContext] Restored persisted state:', persistedState);
                if (persistedState.isSubscribed) {
                    setSubscription(persistedState);
                }
            }

            // 1. Initialize RevenueCat
            if (Platform.OS === 'ios' || Platform.OS === 'android') {
                try {
                    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
                    const apiKey = Platform.OS === 'ios' ? API_KEYS.apple : API_KEYS.google;

                    if (!apiKey) {
                        Alert.alert("Something went wrong with request", "Please contact support");
                        console.log(`[SubscriptionContext] No API key found for ${Platform.OS}. Skipping RevenueCat configuration.`);
                        setIsConfigured(false);
                    } else {
                        console.log(`[SubscriptionContext] Configuring RevenueCat for platform: ${Platform.OS}`);
                        Purchases.configure({ apiKey });
                        setIsConfigured(true);
                        isConfiguredRef.current = true;

                        try {
                            const offers = await Purchases.getOfferings();
                            console.log('[SubscriptionContext] Raw Offerings fetched:', offers);

                            let activeOffering = offers.current;
                            if (!activeOffering || !activeOffering.availablePackages || activeOffering.availablePackages.length === 0) {
                                const allOfferings = Object.values(offers.all || {});
                                activeOffering = allOfferings.find(o => o.availablePackages && o.availablePackages.length > 0) || activeOffering;
                            }

                            if (activeOffering && activeOffering.availablePackages && activeOffering.availablePackages.length > 0) {
                                console.log('[SubscriptionContext] Setting active offering packages:', activeOffering.availablePackages.map(p => p.product.identifier));
                                setOfferings(activeOffering);
                            } else {
                                console.warn('[SubscriptionContext] No packages found in RevenueCat offerings!');
                            }
                        } catch (offerErr) {
                            console.log("[SubscriptionContext] Offerings fetch failed (normal on Simulator without host daemon or in sandbox init):", offerErr);
                        }
                    }

                } catch (rcError) {
                    console.log("RevenueCat configuration failed:", rcError);
                    setIsConfigured(false);
                    isConfiguredRef.current = false;
                }
            }

            // 4. Update status
            await updateSubscriptionStatus();

        } catch (error) {
            console.error('Failed to init subscription context:', error);
            await checkLocalTrialEligibility();
        } finally {
            setLoading(false);
        }
    }, [updateSubscriptionStatus]);

    useEffect(() => {
        initialize();
    }, [initialize]);

    // Listen for RC updates
    useEffect(() => {
        if (!isConfigured) return;

        const listener = (info: CustomerInfo) => {
            updateSubscriptionStatus(info);
        };
        try {
            Purchases.addCustomerInfoUpdateListener(listener);
        } catch (e) {
            console.log("Failed to add RevenueCat listener", e);
        }
        return () => {
            // Safe to call remove even if it wasn't added? Usually yes.
            try {
                Purchases.removeCustomerInfoUpdateListener(listener);
            } catch (e) { /* ignore */ }
        };
    }, [updateSubscriptionStatus, isConfigured]);

    const checkExpiry = useCallback(async () => {
        await updateSubscriptionStatus();
    }, [updateSubscriptionStatus]);

    useEffect(() => {
        const sub = AppState.addEventListener('change', nextAppState => {
            if (nextAppState === 'active') {
                checkExpiry();
            }
        });
        return () => sub.remove();
    }, [checkExpiry]);

    // Memoized core functions
    const startFreeTrial = useCallback(async () => {
        // Determine eligibility logic if needed
        await updateSubscriptionStatus();
    }, [updateSubscriptionStatus]);

    const purchase = useCallback(async (sku: 'monthly' | 'yearly', times: number = 0): Promise<boolean> => {
        setLoading(true);
        try {
            console.log('Purchase called for', sku);
            // Use ref for current configured state to avoid dependency issues if needed, 
            // but relying on Closure state of isConfigured is fine if we add it to deps.
            if (!isConfigured) {
                if (times === 0) {
                    await initialize();
                    // We can't easily recurse with the memoized function itself unless we use a ref or similar.
                    // But typically logic shouldn't rely on recursion here. 
                    // Let's just alert for now or assume initialize fixes it.
                    // To handle recursion properly with useCallback, we'd need a mutable ref to the function.
                    // Simplified: Just Check again.
                    Alert.alert("Initializing...", "Please try again in a moment.");
                } else {
                    Alert.alert("Something went wrong", `Please contact support. ${API_KEYS.google ? "to continue" : "Thank you"}`);
                }
                return false;
            }

            let customerInfoResult: CustomerInfo | null = null;
            const targetProductId = PRODUCT_IDS[sku];

            let packageToBuy: PurchasesPackage | undefined;
            if (offerings && offerings.availablePackages) {
                if (sku === 'monthly') {
                    packageToBuy = offerings.availablePackages.find((p: PurchasesPackage) => p.product.identifier === targetProductId || p.product.identifier.includes('monthly'))
                        || offerings.monthly
                        || offerings.availablePackages.find((p: PurchasesPackage) => p.packageType === 'MONTHLY');
                } else {
                    packageToBuy = offerings.availablePackages.find((p: PurchasesPackage) => p.product.identifier === targetProductId || p.product.identifier.includes('yearly'))
                        || offerings.annual
                        || offerings.availablePackages.find((p: PurchasesPackage) => p.packageType === 'ANNUAL');
                }
            }

            if (packageToBuy) {
                console.log('[SubscriptionContext] Purchasing package:', packageToBuy.product.identifier);
                const res = await Purchases.purchasePackage(packageToBuy);
                customerInfoResult = res.customerInfo;
            } else {
                console.log('[SubscriptionContext] Offering package not found, attempting direct product purchase for:', targetProductId);
                const res = await Purchases.purchaseProduct(targetProductId);
                customerInfoResult = res.customerInfo;
            }

            // Check if ANY entitlement is active
            const hasActiveEntitlement = customerInfoResult && Object.keys(customerInfoResult.entitlements.active).length > 0;

            if (hasActiveEntitlement) {
                Alert.alert(i18n.t('common.success'), i18n.t('paywall.subscribedSuccess'));
                await updateSubscriptionStatus(customerInfoResult);
                return true;
            } else {
                Alert.alert(i18n.t('common.success'), i18n.t('paywall.purchaseCompleted'));
                await updateSubscriptionStatus(customerInfoResult);
                return true;
            }
        } catch (error: any) {
            if (!error.userCancelled) {
                console.error('Purchase failed', error);
                Alert.alert(i18n.t('common.error'), error.message || i18n.t('paywall.purchaseFailed'));
            }
            return false;
        } finally {
            setLoading(false);
        }
    }, [isConfigured, offerings, initialize, updateSubscriptionStatus]);

    const restore = useCallback(async () => {
        setLoading(true);
        try {
            if (!isConfigured) {
                Alert.alert(i18n.t('common.error'), "Please contact support.");
                return false;
            }

            const customerInfo = await Purchases.restorePurchases();
            if (customerInfo.entitlements.active['Calmelevation Pro']) {
                Alert.alert(i18n.t('common.success'), i18n.t('paywall.restoreSuccess'));
                await updateSubscriptionStatus(customerInfo);
                return true;
            } else {
                Alert.alert(i18n.t('paywall.restore'), i18n.t('paywall.noActiveSubscription'));
                return false;
            }
        } catch (error: any) {
            Alert.alert(i18n.t('common.error'), error.message || i18n.t('paywall.restoreFailed'));
            return false;
        } finally {
            setLoading(false);
        }
    }, [isConfigured, updateSubscriptionStatus]);

    const contextValue = React.useMemo(() => ({
        subscription,
        loading,
        purchase,
        restore,
        checkExpiry,
        startFreeTrial,
        initialize,
        offerings
    }), [subscription, loading, purchase, restore, checkExpiry, startFreeTrial, initialize, offerings]);

    return (
        <SubscriptionContext.Provider value={contextValue}>
            {children}
        </SubscriptionContext.Provider>
    );
}

export function useSubscriptionContext() {
    const context = useContext(SubscriptionContext);
    if (context === undefined) {
        throw new Error('useSubscriptionContext must be used within a SubscriptionProvider');
    }
    return context;
}
