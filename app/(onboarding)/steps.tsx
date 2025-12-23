import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
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

const { width } = Dimensions.get('window');

const steps = [
    {
        id: 1,
        image: require('../../assets/cal-cloud.png'),
        title: "Take care of Cal",
        description: "Take care of Cal and yourself by completing simple daily self care goals, collecting points as you go (and grow).",
        ctaText: "Continue"
    },
    {
        id: 2,
        image: require('../../assets/cal-cloud.png'),
        title: "Ready to commit?",
        description: "Gve yourself the chance of anxiety relief by committing to Calm Elevation. Sign below.",
        ctaText: "I commit myself!"
    },
    {
        id: 'notifications',
        image: require('../../assets/cal.png'),
        title: "Stay Connected",
        description: "Enable notifications to receive daily encouragement and reminders from Cal to keep your healing journey on track.",
        ctaText: "Enable Notifications"
    },
    {
        id: 3,
        image: require('../../assets/cal-cloud.png'),
        title: "Congratulations!",
        description: "Stick with Cal as you explore Calm Elevation, learn to manage anxiety and return calm to your life. Be patient and kind. You got this.",
        ctaText: "Get Started"
    }
];

export default function OnboardingFlow() {
    const { enableNotifications } = useNotifications();
    const [currentStep, setCurrentStep] = useState(0);
    const [hasSigned, setHasSigned] = useState(false);

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
                <View className="flex-1 items-center justify-center px-8">
                    <View className="mb-6 justify-center items-center">
                        <Image
                            source={currentData.image}
                            className="h-[160px] w-[160px]"
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="text-3xl font-bold font-sans text-primaryLight text-center mb-4 leading-tight">
                        {currentData.title}
                    </Text>

                    <Text className="text-center font-sans text-primaryLight text-lg leading-6 min-h-[60px]">
                        {currentData.description}
                    </Text>

                    {isSignatureStep && (
                        <View className="w-full mt-4 flex-1">
                            <SignaturePad
                                onChange={setHasSigned}
                                color="#254F51"
                                style={{ height: 140 }}
                            />
                            <Text className="text-center text-xs text-slate-400 mt-2">
                                By signing, you agree to commit to your healing journey
                            </Text>
                        </View>
                    )}
                </View>

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
