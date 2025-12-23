import { View, Image } from 'react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InitialLoadScreen() {
    useEffect(() => {
        const checkOnboarding = async () => {
            try {
                // Add a small delay for the mascot screen to be visible briefly or for layout/fonts to settle
                // But the user said "loading/waiting screen... then move". If it's too fast it might flicker.
                // However, usually we want it fast. I'll add a minimal check.
                const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');

                if (hasOnboarded === 'true') {
                    router.replace('/(tabs)');
                } else {
                    router.replace('/(onboarding)');
                }
            } catch (error) {
                console.error('Error checking onboarding status:', error);
                router.replace('/(onboarding)');
            }
        };

        checkOnboarding();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-900 justify-center items-center">
            <Image
                source={require('../assets/cal-cloud.png')}
                className="h-[200px] w-[200px]"
                resizeMode="contain"
            />
        </SafeAreaView>
    );
}
