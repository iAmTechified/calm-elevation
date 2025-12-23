import { useState, useEffect } from 'react';
import { checkNotificationPermissions, requestNotificationPermissions, scheduleDailyNotifications, cancelAllNotifications } from '../lib/notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATIONS_ENABLED_KEY = 'notifications_enabled';

export function useNotifications() {
    const [areNotificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            try {
                // Check OS permission
                const hasPermission = await checkNotificationPermissions();

                // Check user preference from storage
                const storageValue = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY);

                // Logic: Enabled if OS grants permission AND user hasn't explicitly disabled it
                // If storage is null (first run), we rely on whether permission is granted (which implies they accepted the prompt)
                const shouldBeEnabled = hasPermission && (storageValue !== 'false');

                setNotificationsEnabled(shouldBeEnabled);

                // If supposed to be enabled, ensure schedule is active
                if (shouldBeEnabled) {
                    await scheduleDailyNotifications();
                }
            } catch (e) {
                console.warn("Error initializing notifications:", e);
            } finally {
                setIsInitialized(true);
            }
        };

        initialize();
    }, []);

    const toggleNotifications = async (value: boolean) => {
        if (value) {
            // User wants to enable
            const granted = await requestNotificationPermissions();
            if (granted) {
                await scheduleDailyNotifications();
                await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, 'true');
                setNotificationsEnabled(true);
                return true;
            } else {
                return false;
            }
        } else {
            // User wants to disable
            await cancelAllNotifications();
            await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, 'false');
            setNotificationsEnabled(false);
            return true;
        }
    };

    return {
        areNotificationsEnabled, // Use this for the switch state
        isInitialized,
        toggleNotifications,     // Use this for the switch onValueChange
        enableNotifications: () => toggleNotifications(true), // Backwards compatibility for onboarding
        checkStatus: async () => {
            const hasPermission = await checkNotificationPermissions();
            const storageValue = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY);
            const isEnabled = hasPermission && storageValue !== 'false';
            setNotificationsEnabled(isEnabled);
            return isEnabled;
        }
    };
}
