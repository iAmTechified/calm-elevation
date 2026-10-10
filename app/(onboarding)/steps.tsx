import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect } from 'react';
import { router, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ChevronLeft, Star, StarIcon } from 'lucide-react-native';
import Button from '../../components/Button';
import Back from '../../components/Back';
import ProgressHeader from '../../components/ProgressHeader';

import { useNotifications } from '../../hooks/useNotifications';
import SignaturePad from '../../components/SignaturePad';
import { useTranslation } from 'react-i18next';

export default function OnboardingFlow() {
    const { t } = useTranslation();
    const { enableNotifications } = useNotifications();
    const [currentStep, setCurrentStep] = useState(0);
    const [hasSigned, setHasSigned] = useState(false);

    const steps = [
        {
            id: 1,
            image: require('../../assets/cal-cloud.png'),
            title: t('onboarding.steps.step1.title'),
            description: t('onboarding.steps.step1.description'),
            ctaText: t('onboarding.steps.step1.cta')
        },
        {
            id: 2,
            image: require('../../assets/cal-cloud.png'),
            title: t('onboarding.steps.step2.title'),
            description: t('onboarding.steps.step2.description'),
            ctaText: t('onboarding.steps.step2.cta')
        },
        {
            id: 'notifications',
            image: require('../../assets/cal.png'),
            title: t('onboarding.steps.notifications.title'),
            description: t('onboarding.steps.notifications.description'),
            ctaText: t('onboarding.steps.notifications.cta')
        },
        {
            id: 3,
            image: require('../../assets/cal-cloud.png'),
            title: t('onboarding.steps.step3.title'),
            description: t('onboarding.steps.step3.description'),
            ctaText: t('onboarding.steps.step3.cta')
        }
    ];

    const handleNext = async () => {
        const currentData = steps[currentStep];

        if (currentData.id === 'notifications') {
            await enableNotifications();
            setCurrentStep(currentStep + 1);
            return;
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Finish onboarding
            await AsyncStorage.setItem('hasOnboarded', 'true');
            router.replace('/paywall?from=onboarding');
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            router.back();
        }
    };

    const currentData = steps[currentStep];
    const isSignatureStep = currentData.id === 2;
    const isNextDisabled = isSignatureStep && !hasSigned;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />

            <LinearGradient
                colors={['#6fc6c945', '#f0f636a9', '#6fc6c945']}
                locations={[0.2, 0.4, 0.6]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute top-0 left-0 right-0 bottom-0 h-[150%] w-[150%] opacity-20"
                dither
            >
            </LinearGradient>

            <View className="flex-1">
                {/* Header / Progress */}
                <ProgressHeader
                    progress={((currentStep + 1) / steps.length) * 100}
                    leftElement={<Back onPress={handleBack} iconColor='white' />}
                    rightElement={
                        <TouchableOpacity onPress={() => router.replace('/(tabs)')} className="p-2 bg-[#70C6C9] rounded-full">
                            <Star size={23} stroke="none" fill="#FFFD54" />
                        </TouchableOpacity>
                    }
                />

                {/* Content */}
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <View className="flex-1 items-center justify-center px-8 py-4">
                        <View className="mb-4 justify-center items-center">
                            <Image
                                source={currentData.image}
                                className="h-[140px] w-[140px]"
                                resizeMode="contain"
                            />
                        </View>

                        <Text className="text-3xl font-bold font-sans text-primaryLight text-center mb-3 leading-tight">
                            {currentData.title}
                        </Text>

                        <Text className="text-center font-sans text-primaryLight text-base leading-6 min-h-[50px]">
                            {currentData.description}
                        </Text>

                        {isSignatureStep && (
                            <View className="w-full mt-3">
                                <SignaturePad
                                    onChange={setHasSigned}
                                    color="#254F51"
                                    style={{ height: 130 }}
                                />
                                <Text className="text-center text-xs text-slate-400 mt-2">
                                    {t('onboarding.signingDisclaimer')}
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* Footer */}
                <View className="px-8 pb-12 pt-4">
                    <Button
                        onPress={handleNext}
                        text={currentData.ctaText}
                        style="shadow-md text-white"
                        textStyle="text-white"
                        disabled={isNextDisabled}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
