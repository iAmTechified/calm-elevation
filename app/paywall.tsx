import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Check, Star, Crown } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSubscriptionContext } from '../context/SubscriptionContext';

const { width, height } = Dimensions.get('window');

const FEATURES = [
    'Unlimited Access to All Healing Plans',
    'Advanced Sleep Tracking & Sounds',
    'Personalized Daily Check-ins',
    'Exclusive Meditation Library',
    'Priority Support'
];


export default function PaywallScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const fromOnboarding = params.from === 'onboarding';

    const { purchase, startFreeTrial, restore } = useSubscriptionContext();
    const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');
    const [processing, setProcessing] = useState(false);

    const handleClose = () => {
        if (fromOnboarding) {
            router.replace('/(tabs)');
        } else {
            router.back();
        }
    };

    const handlePurchase = async () => {
        if (processing) return;
        setProcessing(true);
        try {
            // Since users are already on a limited trial, paying for yearly or monthly means
            // upgrading to FULL ACCESS immediately. We no longer offer a "7-day full trial".
            // The "Free Trial" concept is now the initial 3-day restricted mode.
            if (selectedPlan === 'yearly') {
                await purchase('yearly');
            } else {
                await purchase('monthly');
            }
            handleClose();
        } catch (e) {
            console.error(e);
        } finally {
            setProcessing(false);
        }
    };


    const handleRestore = async () => {
        if (processing) return;
        setProcessing(true);
        await restore();
        setProcessing(false);
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Background Image with Overlay */}
            <Image
                source={require('../assets/cal-cloud.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            />

            <LinearGradient
                colors={['transparent', '#0F172A']}
                style={styles.topGradient}
            />

            <LinearGradient
                colors={['rgba(15,23,42,0)', '#0F172A', '#0F172A']}
                style={styles.bottomGradient}
            />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={handleClose}
                        style={styles.closeButton}
                    >
                        <X size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    {/* Header Content */}
                    <View style={styles.headerContent}>
                        <View style={styles.crownIconContainer}>
                            <Crown size={32} color="#38BDF8" fill="#38BDF8" />
                        </View>
                        <Text style={styles.title}>
                            Unlock Calm Premium
                        </Text>
                        <Text style={styles.subtitle}>
                            Join thousands who have found their inner peace and conquered anxiety.
                        </Text>
                    </View>

                    {/* Features */}
                    <View style={styles.featuresList}>
                        {FEATURES.map((feature, index) => (
                            <View key={index} style={styles.featureItem}>
                                <View style={styles.checkContainer}>
                                    <Check size={12} color="#fff" strokeWidth={4} />
                                </View>
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Plan Selection */}
                    <View style={styles.plansContainer}>
                        <TouchableOpacity
                            onPress={() => setSelectedPlan('yearly')}
                            activeOpacity={0.8}
                            style={[
                                styles.planCard,
                                selectedPlan === 'yearly' && styles.selectedPlanCard
                            ]}
                        >
                            <View style={styles.bestValueBadge}>
                                <Text style={styles.bestValueText}>BEST VALUE</Text>
                            </View>
                            <View>
                                <Text style={styles.planTitle}>Yearly Access</Text>
                                <Text style={styles.planPriceInfo}>$79.99 / year</Text>
                            </View>
                            <View style={styles.planMonthlyInfo}>
                                <Text style={styles.monthlyPriceText}>$6.66</Text>
                                <Text style={styles.perMonthText}>per month</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setSelectedPlan('monthly')}
                            activeOpacity={0.8}
                            style={[
                                styles.planCard,
                                selectedPlan === 'monthly' && styles.selectedPlanCard
                            ]}
                        >
                            <View>
                                <Text style={styles.planTitle}>Monthly Access</Text>
                                <Text style={styles.planPriceInfo}>$9.99 / month</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* CTA Button */}
                    <TouchableOpacity
                        style={[styles.ctaButton, { opacity: processing ? 0.8 : 1 }]}
                        onPress={handlePurchase}
                        disabled={processing}
                    >
                        <LinearGradient
                            colors={['#38BDF8', '#0284C7']}
                            style={styles.ctaGradient}
                        >
                            {processing ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.ctaText}>
                                    {selectedPlan === 'yearly' ? 'Unlock Full Access (Yearly)' : 'Subscribe Monthly'}
                                </Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={styles.chargeDisclaimer}>
                        {selectedPlan === 'yearly'
                            ? 'Billed $59.99 yearly. Cancel anytime.'
                            : 'Billed $9.99 monthly. Cancel anytime.'}
                    </Text>


                    {/* Footer Links */}
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={handleRestore}>
                            <Text style={styles.footerLink}>Restore Purchase</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Terms of Service</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    backgroundImage: {
        position: 'absolute',
        width: width,
        height: height * 0.6,
        top: 0,
        opacity: 0.5,
    },
    topGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.6,
    },
    bottomGradient: {
        position: 'absolute',
        top: height * 0.3,
        left: 0,
        right: 0,
        bottom: 0,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        alignItems: 'flex-end',
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    headerContent: {
        alignItems: 'center',
        marginBottom: 32,
    },
    crownIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(56, 189, 248, 0.5)',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#94A3B8',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    featuresList: {
        marginBottom: 40,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkContainer: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#38BDF8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    featureText: {
        fontSize: 16,
        color: '#E2E8F0',
        fontWeight: '500',
    },
    plansContainer: {
        gap: 12,
        marginBottom: 24,
    },
    planCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedPlanCard: {
        backgroundColor: 'rgba(56, 189, 248, 0.15)',
        borderColor: '#38BDF8',
    },
    bestValueBadge: {
        position: 'absolute',
        top: -10,
        left: 16,
        backgroundColor: '#38BDF8',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    bestValueText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    planTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    planPriceInfo: {
        fontSize: 14,
        color: '#94A3B8',
    },
    planMonthlyInfo: {
        alignItems: 'flex-end',
    },
    monthlyPriceText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    perMonthText: {
        fontSize: 12,
        color: '#94A3B8',
    },
    ctaButton: {
        borderRadius: 30,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 8,
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
    },
    ctaGradient: {
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    ctaText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    chargeDisclaimer: {
        fontSize: 12,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
    },
    footerLink: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },
});
