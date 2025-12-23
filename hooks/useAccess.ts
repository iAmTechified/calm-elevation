import { useSubscription } from './useSubscription';

export type FeatureType = 'healing-day' | 'course' | 'sleep-track' | 'game';

export function useAccess() {
    const { subscription } = useSubscription();
    const isSubscribed = subscription.isSubscribed;

    const hasAccess = (feature: FeatureType, context?: any): boolean => {
        // 1. Full Subscription (Paid)
        if (subscription.isSubscribed && !subscription.isFreeTrial) {
            return true;
        }

        // 2. Free Trial (3 Days)
        if (subscription.isFreeTrial) {
            switch (feature) {
                case 'healing-day':
                    // "Self healing is only available to subscribed users."
                    return false;
                case 'course':
                    // "Access to only one item in Learn"
                    return context?.courseId === 'understanding-anxiety';
                case 'sleep-track':
                    // "Access to only one item in Sleep"
                    // Checking data.ts, 'night' is likely the first ID.
                    return context?.trackId === 'night';
                case 'game':
                    // "Access to only one item in Play"
                    return context?.gameId === 'zen-garden';
                default:
                    return false;
            }
        }

        // 3. No Subscription / Expired
        switch (feature) {
            case 'healing-day':
                return false;
            case 'course':
                return context?.courseId === 'understanding-anxiety';
            case 'sleep-track':
                return context?.trackId === 'night';
            case 'game':
                return context?.gameId === 'zen-garden';
            default:
                return false;
        }
    };


    const isLocked = (feature: FeatureType, context?: any) => !hasAccess(feature, context);

    return { hasAccess, isLocked, isSubscribed };
}
