import { useState, useEffect, useCallback } from 'react';
import { storage } from '../lib/storage';

const SELF_HEALING_KEY = 'calm_elevation_self_healing';

export interface SelfHealingState {
    completedDays: number[]; // Array of completed day numbers (e.g. [1, 2, 3])
    currentDay: number; // The day the user is currently on (e.g. 4)
    lastCompletedDate: string | null; // ISO Date to prevent doing multiple days at once if desired
}

const DEFAULT_STATE: SelfHealingState = {
    completedDays: [],
    currentDay: 1,
    lastCompletedDate: null,
};

export function useSelfHealing() {
    const [state, setState] = useState<SelfHealingState>(DEFAULT_STATE);
    const [loading, setLoading] = useState(true);

    const loadState = useCallback(async () => {
        try {
            const stored = await storage.getItem<SelfHealingState>(SELF_HEALING_KEY);
            if (stored) {
                setState(stored);
            }
        } catch (error) {
            console.error('Failed to load self healing state:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadState();
    }, [loadState]);

    const markDayComplete = async (dayNumber: number) => {
        try {
            if (state.completedDays.includes(dayNumber)) return;

            const newState = {
                ...state,
                completedDays: [...state.completedDays, dayNumber],
                currentDay: dayNumber + 1, // Unlock next day
                lastCompletedDate: new Date().toISOString(),
            };
            setState(newState);
            await storage.setItem(SELF_HEALING_KEY, newState);
        } catch (error) {
            console.error('Failed to mark day complete:', error);
        }
    };

    const isDayUnlocked = (dayNumber: number) => {
        if (!state) {
            console.warn('SelfHealingState is undefined in isDayUnlocked');
            return false;
        }
        // Day 1 is always unlocked.
        // Day N is unlocked if Day N-1 is completed.
        // OR simply: is unlocked if dayNumber <= currentDay
        return dayNumber <= (state.currentDay || 1);
    };

    return {
        state,
        loading,
        markDayComplete,
        isDayUnlocked,
        refresh: loadState
    };
}
