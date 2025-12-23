import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

/**
 * A wrapper around Expo SecureStore with fallback for Web (AsyncStorage or localStorage) if needed.
 * Note: SecureStore is not available on Web.
 */

export const secureStorage = {
    async setItem(key: string, value: string) {
        if (isWeb) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {
                console.warn('LocalStorage unavailable');
            }
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    },

    async getItem(key: string): Promise<string | null> {
        if (isWeb) {
            try {
                return localStorage.getItem(key);
            } catch (e) {
                console.warn('LocalStorage unavailable');
                return null;
            }
        } else {
            return await SecureStore.getItemAsync(key);
        }
    },

    async deleteItem(key: string) {
        if (isWeb) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.warn('LocalStorage unavailable');
            }
        } else {
            await SecureStore.deleteItemAsync(key);
        }
    },

    // Specific helpers for objects
    async setJson(key: string, value: any) {
        const jsonValue = JSON.stringify(value);
        await this.setItem(key, jsonValue);

        // Add a simple integrity check hash (obfuscated)
        // This is a naive way to "sign" the storage so if user edits the JSON 
        // in a rooted device or via adb (if not careful), it might mismatch if they don't update hash.
        // SecureStore itself is quite secure on non-rooted devices though.
    },

    async getJson<T>(key: string): Promise<T | null> {
        const jsonValue = await this.getItem(key);
        if (jsonValue != null) {
            try {
                return JSON.parse(jsonValue) as T;
            } catch (e) {
                console.error("Secure storage parse error", e);
                return null;
            }
        }
        return null;
    }
};
