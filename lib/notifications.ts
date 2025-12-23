import { Platform } from 'react-native';

let Notifications: any = null;

function getNotifications() {
    if (Notifications) return Notifications;

    try {
        // Use require to lazy load and avoid top-level side effects (like auto-registration)
        // that might cause errors in Expo Go on Android.
        Notifications = require('expo-notifications');

        // Configure handler once loaded
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
                shouldShowBanner: true,
                shouldShowList: true,
            }),
        });

        return Notifications;
    } catch (error) {
        console.warn("Failed to load expo-notifications:", error);
        return null;
    }
}

const NOTIFICATION_MESSAGES = [
    {
        title: "Time for a breather? 🧘",
        body: "Take 2 minutes to center yourself with Cal. You deserve this moment of peace.",
    },
    {
        title: "Cal is waiting for you! ✨",
        body: "A little daily practice goes a long way. Let's grow together today.",
    },
    {
        title: "How are you feeling? 💭",
        body: "Check in with your journal. Sometimes putting it on paper (or screen) makes all the difference.",
    },
    {
        title: "Ready to elevate? 🚀",
        body: "Consistent steps lead to lasting change. Open the app to continue your journey.",
    },
    {
        title: "Deep breath in... 🌬️",
        body: "...and release. Remember to be kind to yourself today. Come see what's new!",
    },
    {
        title: "Your streak is calling! 🔥",
        body: "Don't let that streak cool down. Just one quick exercise to keep the momentum going!",
    },
    {
        title: "A moment of calm 🌊",
        body: "The world can be noisy. Step into your quiet space for a few minutes.",
    },
    {
        title: "You've got this! 💪",
        body: "Small daily wins add up to big mental shifts. Let's get one now!",
    },
    {
        title: "Cal is missing you... 🥺",
        body: "Even 1 minute of mindfulness can change your whole day. Let's do it together?",
    },
    {
        title: "Hey, you! 👋",
        body: "Don't forget to take a break. Your mental health is more important than your to-do list.",
    },
    {
        title: "Stress check! 🌡️",
        body: "Are your shoulders up to your ears? Drop them, take a breath, and open Calm Elevation.",
    },
    {
        title: "Psychology fact of the day 🧠",
        body: "Regular check-ins reduce overall anxiety by 40%. Want to try one now?",
    }
];

export async function requestNotificationPermissions() {
    const N = getNotifications();
    if (!N) return false;

    try {
        const { status: existingStatus } = await N.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await N.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus === 'granted') {
            await scheduleDailyNotifications();
        }

        return finalStatus === 'granted';
    } catch (e) {
        console.warn("Error requesting notification permissions:", e);
        return false;
    }
}

export async function checkNotificationPermissions() {
    const N = getNotifications();
    if (!N) return false;

    try {
        const { status } = await N.getPermissionsAsync();
        return status === 'granted';
    } catch (e) {
        console.warn("Error checking notification permissions:", e);
        return false;
    }
}

export async function scheduleDailyNotifications() {
    const N = getNotifications();
    if (!N) return;

    try {
        // Cancel existing ones first to avoid duplicates
        await N.cancelAllScheduledNotificationsAsync();

        // Schedule for the next 7 days at a consistent time (10 AM)
        for (let i = 0; i < 7; i++) {
            const randomMsg = NOTIFICATION_MESSAGES[Math.floor(Math.random() * NOTIFICATION_MESSAGES.length)];

            const trigger = new Date();
            trigger.setDate(trigger.getDate() + i + 1);
            trigger.setHours(10, 0, 0, 0); // 10:00 AM

            await N.scheduleNotificationAsync({
                content: {
                    title: randomMsg.title,
                    body: randomMsg.body,
                    sound: true,
                    priority: N.AndroidNotificationPriority.HIGH,
                },
                trigger: {
                    type: N.SchedulableTriggerInputTypes.DATE,
                    date: trigger,
                },
            });
        }
    } catch (e) {
        console.warn("Error scheduling notifications:", e);
    }
}

export async function cancelAllNotifications() {
    const N = getNotifications();
    if (N) {
        try {
            await N.cancelAllScheduledNotificationsAsync();
        } catch (e) {
            console.warn("Error cancelling notifications:", e);
        }
    }
}

export async function sendTestNotification() {
    const N = getNotifications();
    if (!N) return;

    try {
        await N.scheduleNotificationAsync({
            content: {
                title: "Test Notification 🔔",
                body: "This is a test notification from Calm Elevation to confirm everything is working!",
                sound: true,
                priority: N.AndroidNotificationPriority.HIGH,
            },
            trigger: null, // Send immediately
        });
    } catch (e) {
        console.warn("Error sending test notification:", e);
    }
}

