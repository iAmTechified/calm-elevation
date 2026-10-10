import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import nl from './locales/nl.json';

export const LANGUAGE_STORAGE_KEY = 'user_selected_language';
export const SUPPORTED_LANGUAGES = ['en', 'nl'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

let isInitialized = false;

/**
 * Completely offline i18n initialization.
 * Reads saved language from AsyncStorage, or falls back to device locale.
 */
export const initI18n = async (): Promise<void> => {
    if (isInitialized) {
        return;
    }

    try {
        // 1. Check if user already picked a language previously
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

        let initialLanguage: SupportedLanguage = 'en';

        if (savedLanguage === 'en' || savedLanguage === 'nl') {
            initialLanguage = savedLanguage;
        } else {
            // 2. Read native device locale completely offline
            const deviceLocales = Localization.getLocales();
            const primaryLangCode = deviceLocales?.[0]?.languageCode?.toLowerCase();

            if (primaryLangCode === 'nl') {
                initialLanguage = 'nl';
            } else {
                initialLanguage = 'en';
            }
        }

        await i18n.use(initReactI18next).init({
            compatibilityJSON: 'v4',
            resources: {
                en: { translation: en },
                nl: { translation: nl },
            },
            lng: initialLanguage,
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false, // React handles escaping
            },
            react: {
                useSuspense: false, // Prevents loading suspense errors in React Native
            },
        });

        isInitialized = true;
    } catch (error) {
        console.warn('Failed to initialize offline i18n:', error);
    }
};

/**
 * Changes active language, saves it to local device storage,
 * and causes reactive re-renders across all screens.
 */
export const changeAppLanguage = async (language: SupportedLanguage): Promise<void> => {
    try {
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        await i18n.changeLanguage(language);
    } catch (error) {
        console.error('Failed to change app language:', error);
    }
};

/**
 * Returns current language code ('en' | 'nl')
 */
export const getCurrentLanguage = (): SupportedLanguage => {
    return (i18n.language === 'nl' ? 'nl' : 'en') as SupportedLanguage;
};

export default i18n;
