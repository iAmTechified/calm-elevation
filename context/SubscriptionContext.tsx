import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import { AppState, Alert, Platform } from 'react-native';
import Purchases, { PurchasesPackage, PurchasesOffering, CustomerInfo, PurchasesEntitlementInfo } from 'react-native-purchases';
import { secureStorage } from '../lib/secureStorage';

const SUBSCRIPTION_KEY = 'calm_elevation_sub_secure_v1';
const INSTALL_DATE_KEY = 'calm_elevation_install_date';

// Product IDs provided by the user
const PRODUCT_IDS = {
    monthly: 'calm_elevation_subscription:calm-elevation-monthly-premium',
    yearly: 'calm_elevation_subscription_yearly:calm-elevation-yearly-premium'
};

// RevenueCat API Keys - PLACEHOLDERS
// TODO: Replace with your actual RevenueCat API Keys
const API_KEYS = {
    apple: 'test_DHXyHqKbjlkIFjisNvgRxaTcvny',
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
                    Purchases.setLogLevel(Purchases.LOG_LEVEL.ERROR);
                    const apiKey = Platform.OS === 'ios' ? API_KEYS.apple : API_KEYS.google;

                    if (!apiKey) {
                        Alert.alert("Something went wrong with request", "Please contact support");
                        console.log(`[SubscriptionContext] No API key found for ${Platform.OS}. Skipping RevenueCat configuration.`);
                        setIsConfigured(false);
                    } else {
                        Purchases.configure({ apiKey });

                        // Verify configuration by trying to get offerings (ignoring result)
                        // If configure failed silently or threw catchable error, this helps confirm.
                        // But actually, configure stays synchronous mostly, but let's assume if we reached here we are good.
                        // However, we should be careful. 'configure' is void.

                        // We immediately try to get offerings to confirm connectivity/config
                        const offers = await Purchases.getOfferings();
                        if (offers.current) {
                            setOfferings(offers.current);
                        }else if(offers.all.current){
                            setOfferings(offers.all.current);
                        }
                        setIsConfigured(true); // Mark as successful
                        isConfiguredRef.current = true;
                    }

                } catch (rcError) {
                    console.log("RevenueCat configuration or offerings fetch failed (expected in Expo Go):", rcError);
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

    const purchase = async (sku: 'monthly' | 'yearly', times: number = 0) => {
        setLoading(true);
        try {
            if (!isConfigured) {
                if(times == 0){
                    await initialize();
                    console.log(isConfigured);
                    purchase(sku, times + 1);
                }else{
                    Alert.alert(`Something went wrong", "Please contact support. ${API_KEYS.google ? "to continue" : "Thank you"}`);
                }
                return false;
            }

            if (!offerings) {
                // If no offerings (perhaps API key is invalid)
                console.log(offerings);
                Alert.alert("Error", "Please contact support");
                return false;
            }

            let packageToBuy: PurchasesPackage | undefined;
            // offerings is PurchasesOffering. It has .monthly, .annual, etc.
            if (sku === 'monthly') {
                packageToBuy = offerings.availablePackages.find((p: PurchasesPackage) => p.product.identifier === PRODUCT_IDS.monthly)
                    || offerings.monthly
                    || offerings.availablePackages.find((p: PurchasesPackage) => p.packageType === 'MONTHLY');
            } else {
                packageToBuy = offerings.availablePackages.find((p: PurchasesPackage) => p.product.identifier === PRODUCT_IDS.yearly)
                    || offerings.annual
                    || offerings.availablePackages.find((p: PurchasesPackage) => p.packageType === 'ANNUAL');
            }

            if (!packageToBuy) {
                Alert.alert("Error", "Selected plan not found in offerings.");
                return false;
            }

            const { customerInfo } = await Purchases.purchasePackage(packageToBuy);

            // Check entitlement
            if (customerInfo.entitlements.active['Calmelevation Pro']) {
                Alert.alert("Success", "You are now fully subscribed!");
                await updateSubscriptionStatus(customerInfo);
                return true;
            } else {
                Alert.alert("Notice", "Purchase completed but subscription is not yet active. Please try restoring purchases.");
                return false;
            }
        } catch (error: any) {
            if (!error.userCancelled) {
                console.error('Purchase failed', error);
                Alert.alert("Error", error.message || "Purchase failed. Please try again.");
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const restore = async () => {
        setLoading(true);
        try {
            if (!isConfigured) {
                Alert.alert("Error", "Please contact support.");
                return false;
            }

            const customerInfo = await Purchases.restorePurchases();
            if (customerInfo.entitlements.active['Calmelevation Pro']) {
                Alert.alert("Success", "Purchases restored!");
                await updateSubscriptionStatus(customerInfo);
                return true;
            } else {
                Alert.alert("Restore", "No active subscription found to restore.");
                return false;
            }
        } catch (error: any) {
            Alert.alert("Error", error.message || "Restore failed.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const startFreeTrial = async () => {
        // Determine eligibility
        await updateSubscriptionStatus();
    };

    return (
        <SubscriptionContext.Provider value={{
            subscription,
            loading,
            purchase,
            restore,
            checkExpiry,
            startFreeTrial,
            initialize
        }}>
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
