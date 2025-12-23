import "../global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import {
    useFonts,
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { SubscriptionProvider } from '../context/SubscriptionContext';
import { StatsProvider } from '../context/StatsContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
try {
    SplashScreen.preventAutoHideAsync().then(() => console.log('SplashScreen.preventAutoHideAsync() success')).catch(console.warn);
} catch (e) {
    console.warn('SplashScreen error:', e);
}

export default function RootLayout() {
    const { colorScheme, setColorScheme } = useColorScheme();
    const [loaded, error] = useFonts({
        Poppins_100Thin,
        Poppins_100Thin_Italic,
        Poppins_200ExtraLight,
        Poppins_200ExtraLight_Italic,
        Poppins_300Light,
        Poppins_300Light_Italic,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_500Medium_Italic,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
        Poppins_700Bold_Italic,
        Poppins_800ExtraBold,
        Poppins_800ExtraBold_Italic,
        Poppins_900Black,
        Poppins_900Black_Italic,
    });

    const { isInitialized } = useNotifications();

    const [themeInitialized, setThemeInitialized] = useState(false);

    useEffect(() => {
        const initializeTheme = async () => {
            try {
                const hasInitialized = await AsyncStorage.getItem('THEME_INITIALIZED');
                if (!hasInitialized) {
                    setColorScheme('light');
                    await AsyncStorage.setItem('THEME_INITIALIZED', 'true');
                }
                setThemeInitialized(true);
            } catch (error) {
                console.warn('Failed to initialize theme:', error);
            }
        };

        initializeTheme();
    }, []);

    useEffect(() => {
        if (error) {
            console.warn('Font loading error (ignoring to allow app to run):', error.message);
            // Hide splash screen even on error to let the app show
            SplashScreen.hideAsync();
        }
        if (loaded && isInitialized) {
            console.log('Fonts and notifications loaded, hiding splash screen');
            SplashScreen.hideAsync().then(() => console.log('SplashScreen.hideAsync() called')).catch(console.warn);
        } else {
            console.log('Fonts or notifications not loaded yet');
        }
    }, [loaded, error, isInitialized]);

    // Only wait if there is no error and not loaded. If there is an error, we proceed (with default fonts).
    if ((!loaded && !error) || !themeInitialized) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <SubscriptionProvider>
                <StatsProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="index" />
                        <Stack.Screen name="self-healing/index" />
                        <Stack.Screen name="self-healing/lesson/[id]" />
                    </Stack>
                    <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                </StatsProvider>
            </SubscriptionProvider>
        </ThemeProvider>
    );
}

