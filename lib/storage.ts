import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    async getItem<T>(key: string): Promise<T | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.error('Error reading value', e);
            return null;
        }
    },

    async setItem(key: string, value: any): Promise<void> {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error('Error saving value', e);
        }
    },

    async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing value', e);
        }
    },

    async mergeItem(key: string, value: any): Promise<void> {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.mergeItem(key, jsonValue);
        } catch (e) {
            console.error('Error merging value', e);
        }
    }
};
