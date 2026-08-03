import { useState, useEffect, useCallback } from 'react';
import { storage } from '../lib/storage';

const SELF_HEALING_KEY = 'calm_elevation_self_healing_v2';

export interface RatingData {
    before?: number;
    after?: number;
}

export interface SelfHealingState {
    completedDaysByBook: Record<string, number[]>; // bookId -> array of completed days [1, 2, 3]
    reflectionsByBookDay: Record<string, string>; // `${bookId}-${day}` -> user text answer
    ratingsByBookDay: Record<string, RatingData>; // `${bookId}-${day}` -> { before: 5, after: 2 }
    lastCompletedDate: string | null;
}

const DEFAULT_STATE: SelfHealingState = {
    completedDaysByBook: {},
    reflectionsByBookDay: {},
    ratingsByBookDay: {},
    lastCompletedDate: null,
};

export function useSelfHealing() {
    const [state, setState] = useState<SelfHealingState>(DEFAULT_STATE);
    const [loading, setLoading] = useState(true);

    const loadState = useCallback(async () => {
        try {
            const stored = await storage.getItem<SelfHealingState>(SELF_HEALING_KEY);
            if (stored) {
                setState({
                    completedDaysByBook: stored.completedDaysByBook || {},
                    reflectionsByBookDay: stored.reflectionsByBookDay || {},
                    ratingsByBookDay: stored.ratingsByBookDay || {},
                    lastCompletedDate: stored.lastCompletedDate || null,
                });
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

    const markDayComplete = async (bookId: string, dayNumber: number) => {
        try {
            const bookCompletedDays = state.completedDaysByBook[bookId] || [];
            if (bookCompletedDays.includes(dayNumber)) return;

            const updatedCompletedDays = [...bookCompletedDays, dayNumber];
            const newState = {
                ...state,
                completedDaysByBook: {
                    ...state.completedDaysByBook,
                    [bookId]: updatedCompletedDays,
                },
                lastCompletedDate: new Date().toISOString(),
            };
            setState(newState);
            await storage.setItem(SELF_HEALING_KEY, newState);
        } catch (error) {
            console.error('Failed to mark day complete:', error);
        }
    };

    const saveReflection = async (bookId: string, dayNumber: number, text: string) => {
        try {
            const key = `${bookId}-${dayNumber}`;
            const newState = {
                ...state,
                reflectionsByBookDay: {
                    ...state.reflectionsByBookDay,
                    [key]: text,
                },
            };
            setState(newState);
            await storage.setItem(SELF_HEALING_KEY, newState);
        } catch (error) {
            console.error('Failed to save reflection:', error);
        }
    };

    const saveRating = async (bookId: string, dayNumber: number, rating: RatingData) => {
        try {
            const key = `${bookId}-${dayNumber}`;
            const existing = state.ratingsByBookDay[key] || {};
            const newState = {
                ...state,
                ratingsByBookDay: {
                    ...state.ratingsByBookDay,
                    [key]: { ...existing, ...rating },
                },
            };
            setState(newState);
            await storage.setItem(SELF_HEALING_KEY, newState);
        } catch (error) {
            console.error('Failed to save rating:', error);
        }
    };

    const isDayUnlocked = (bookId: string, dayNumber: number) => {
        if (dayNumber === 1) return true;
        const bookCompletedDays = state.completedDaysByBook[bookId] || [];
        // Day N is unlocked if Day N-1 is completed, or if dayNumber <= max completed day + 1
        const maxCompleted = bookCompletedDays.length > 0 ? Math.max(...bookCompletedDays) : 0;
        return dayNumber <= maxCompleted + 1;
    };

    const getBookCompletedDays = (bookId: string): number[] => {
        return state.completedDaysByBook[bookId] || [];
    };

    const getTotalCompletedLessonsCount = (): number => {
        return Object.values(state.completedDaysByBook).reduce((acc, days) => acc + days.length, 0);
    };

    return {
        state,
        loading,
        markDayComplete,
        saveReflection,
        saveRating,
        isDayUnlocked,
        getBookCompletedDays,
        getTotalCompletedLessonsCount,
        refresh: loadState,
    };
}
