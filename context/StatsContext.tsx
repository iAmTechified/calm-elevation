import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { storage } from '../lib/storage';
import { COURSES } from '../data/learn';

const STATS_STORAGE_KEY = 'calm_elevation_stats';

export interface StatsState {
    braveryPoints: number;
    panicAttacksConquered: number;
    timeBreathr: number; // in minutes
    timeVisualizr: number; // in minutes
    completedLessons: string[];
    completedHealingDays: number[];
    lastVisitDate: string | null;
    currentStreak: number;
    journalStreak: number;
    lastJournalDate: string | null;
    moodHistory: Record<string, number[]>; // Changed to array for multiple daily inputs
    stateometerScore: number;
    lastDecayDate: string | null;
}

const DEFAULT_STATS: StatsState = {
    braveryPoints: 0,
    panicAttacksConquered: 0,
    timeBreathr: 0,
    timeVisualizr: 0,
    completedLessons: [],
    completedHealingDays: [],
    lastVisitDate: null,
    currentStreak: 0,
    journalStreak: 0,
    lastJournalDate: null,
    moodHistory: {},
    stateometerScore: 0,
    lastDecayDate: null,
};

interface StatsContextType {
    stats: StatsState;
    loading: boolean;
    updateEmotionalState: (delta: number) => void;
    addBraveryPoints: (points: number) => void;
    incrementPanicAttacksConquered: () => void;
    addTimeInBreathr: (minutes: number) => void;
    addTimeInVisualizr: (minutes: number) => void;
    markLessonCompleted: (lessonId: string) => void;
    markHealingDayCompleted: (day: number) => void;
    getCourseProgress: (courseId: string) => { completed: number; total: number };
    recordJournalEntry: () => Promise<void>;
    recordMood: (score: number) => Promise<void>;
    refresh: () => Promise<void>;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: ReactNode }) {
    const [stats, setStats] = useState<StatsState>(DEFAULT_STATS);
    const [loading, setLoading] = useState(true);

    const loadStats = useCallback(async () => {
        try {
            const storedStats = await storage.getItem<any>(STATS_STORAGE_KEY);
            if (storedStats) {
                // Migration: Check if moodHistory values are numbers or arrays
                let migratedMoodHistory = { ...storedStats.moodHistory };
                if (migratedMoodHistory) {
                    Object.keys(migratedMoodHistory).forEach(date => {
                        const val = migratedMoodHistory[date];
                        if (typeof val === 'number') {
                            migratedMoodHistory[date] = [val];
                        }
                    });
                }

                const today = new Date().toISOString().split('T')[0];
                let newStats = { ...DEFAULT_STATS, ...storedStats, moodHistory: migratedMoodHistory || {} };

                // Streak Logic
                if (newStats.lastVisitDate !== today) {
                    const lastVisit = newStats.lastVisitDate ? new Date(newStats.lastVisitDate) : null;
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    // Reset time if needed for accurate date comparison
                    yesterday.setHours(0, 0, 0, 0);
                    if (lastVisit) lastVisit.setHours(0, 0, 0, 0);

                    const isYesterday = lastVisit && lastVisit.getTime() === yesterday.getTime();

                    if (isYesterday) {
                        newStats.currentStreak += 1;
                    } else if (!lastVisit || lastVisit.getTime() < yesterday.getTime()) {
                        newStats.currentStreak = 1;
                    }

                    newStats.lastVisitDate = today;

                    // Decay Logic
                    if (newStats.lastDecayDate !== today) {
                        const lastDecay = newStats.lastDecayDate ? new Date(newStats.lastDecayDate) : null;
                        if (lastDecay) lastDecay.setHours(0, 0, 0, 0);

                        const daysPassed = lastDecay ? Math.floor((new Date(today).setHours(0, 0, 0, 0) - lastDecay.getTime()) / (1000 * 60 * 60 * 24)) : 1;

                        if (daysPassed > 0) {
                            const decayAmount = Math.min(daysPassed * 5, 30); // Gentle decay
                            newStats.stateometerScore = Math.max(0, newStats.stateometerScore - decayAmount);
                            newStats.lastDecayDate = today;
                        }
                    }

                    await storage.setItem(STATS_STORAGE_KEY, newStats);
                }

                setStats(newStats);
            } else {
                // First visit
                const initialStats = {
                    ...DEFAULT_STATS,
                    lastVisitDate: new Date().toISOString().split('T')[0],
                    currentStreak: 1,
                    lastDecayDate: new Date().toISOString().split('T')[0]
                };
                await storage.setItem(STATS_STORAGE_KEY, initialStats);
                setStats(initialStats);
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const statsRef = React.useRef(DEFAULT_STATS);

    useEffect(() => {
        statsRef.current = stats;
    }, [stats]);

    const updateStats = useCallback(async (updates: Partial<StatsState>) => {
        try {
            // Functional update ensures we always have the latest state without 'stats' dependency in useCallback
            setStats(prevStats => {
                const newStats = { ...prevStats, ...updates };
                // Update ref immediately for any subsequent sync usage (though unlikely needed here)
                statsRef.current = newStats;
                // Side effect: Storage
                storage.setItem(STATS_STORAGE_KEY, newStats).catch(err => 
                     console.error('Failed to save stats:', err)
                );
                return newStats;
            });
        } catch (error) {
            console.error('Failed to update stats:', error);
        }
    }, []);

    // --- Core Actions ---

    const updateEmotionalState = useCallback((delta: number) => {
        const currentScore = statsRef.current.stateometerScore;
        const points = Math.round(delta * 100);
        const newScore = Math.min(100, Math.max(0, currentScore + points));
        updateStats({ stateometerScore: newScore });
    }, [updateStats]);

    const addBraveryPoints = useCallback((points: number) => {
        updateStats({ braveryPoints: statsRef.current.braveryPoints + points });
    }, [updateStats]);

    const incrementPanicAttacksConquered = useCallback(() => {
        updateStats({ panicAttacksConquered: statsRef.current.panicAttacksConquered + 1 });
        updateEmotionalState(0.25); 
    }, [updateStats, updateEmotionalState]);

    const addTimeInBreathr = useCallback((minutes: number) => {
        const currentStats = statsRef.current;
        const points = Math.ceil(minutes * 10);
        const newScore = Math.min(100, currentStats.stateometerScore + points);

        updateStats({
            timeBreathr: currentStats.timeBreathr + minutes,
            stateometerScore: newScore
        });
    }, [updateStats]);

    const addTimeInVisualizr = useCallback((minutes: number) => {
        const currentStats = statsRef.current;
        const points = Math.ceil(minutes * 2);
        const newScore = Math.min(100, currentStats.stateometerScore + points);

        updateStats({
            timeVisualizr: currentStats.timeVisualizr + minutes,
            stateometerScore: newScore
        });
    }, [updateStats]);

    const recordJournalEntry = useCallback(async () => {
        const today = new Date().toISOString().split('T')[0];
        const currentStats = statsRef.current;
        
        let newStreak = currentStats.journalStreak;
        const alreadyJournaledToday = currentStats.lastJournalDate === today;

        if (!alreadyJournaledToday) {
            const lastJournalStr = currentStats.lastJournalDate;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastJournalStr === yesterdayStr) {
                newStreak += 1;
            } else {
                newStreak = 1;
            }
        }

        await updateStats({
            journalStreak: newStreak,
            lastJournalDate: today,
            braveryPoints: currentStats.braveryPoints + 15,
            stateometerScore: Math.min(100, currentStats.stateometerScore + 10) 
        });
    }, [updateStats]);

    const markLessonCompleted = useCallback((lessonId: string) => {
        const currentStats = statsRef.current;
        if (!currentStats.completedLessons.includes(lessonId)) {
            updateStats({
                completedLessons: [...currentStats.completedLessons, lessonId],
                braveryPoints: currentStats.braveryPoints + 10,
                stateometerScore: Math.min(100, currentStats.stateometerScore + 15) 
            });
        }
    }, [updateStats]);

    const markHealingDayCompleted = useCallback((day: number) => {
        const currentStats = statsRef.current;
        if (!currentStats.completedHealingDays.includes(day)) {
            updateStats({
                completedHealingDays: [...currentStats.completedHealingDays, day],
                braveryPoints: currentStats.braveryPoints + 20,
                stateometerScore: Math.min(100, currentStats.stateometerScore + 20) 
            });
        }
    }, [updateStats]);

    // getCourseProgress reads directly from stats, so it's fine to rely on the passed stats object in render, 
    // but if we expose it as a helper, it should probably be memoized or just a dynamic selector. 
    // Since it takes an arg, it's a function.
    const getCourseProgress = useCallback((courseId: string) => {
        const course = COURSES[courseId];
        if (!course) return { completed: 0, total: 0 };
        const total = course.lessonIds.length;
        // Accessing ref ensures we always compute against latest without dep
        const completed = course.lessonIds.filter(id => statsRef.current.completedLessons.includes(id)).length;
        return { completed, total };
    }, []);

    const recordMood = useCallback(async (score: number) => {
        const today = new Date().toISOString().split('T')[0];
        const currentStats = statsRef.current;
        const currentDailyMoods = currentStats.moodHistory[today] || [];
        const safeMoods = Array.isArray(currentDailyMoods) ? currentDailyMoods : [currentDailyMoods as unknown as number];

        const newMoodHistory = {
            ...currentStats.moodHistory,
            [today]: [...safeMoods, score]
        };

        await updateStats({
            moodHistory: newMoodHistory,
            stateometerScore: Math.min(100, score) 
        });
    }, [updateStats]);

    // Memoize the context value
    const contextValue = React.useMemo(() => ({
        stats,
        loading,
        updateEmotionalState,
        addBraveryPoints,
        incrementPanicAttacksConquered,
        addTimeInBreathr,
        addTimeInVisualizr,
        markLessonCompleted,
        markHealingDayCompleted,
        getCourseProgress,
        recordJournalEntry,
        recordMood,
        refresh: loadStats
    }), [
        stats, 
        loading, 
        loadStats,
        updateEmotionalState,
        addBraveryPoints,
        incrementPanicAttacksConquered,
        addTimeInBreathr,
        addTimeInVisualizr,
        markLessonCompleted,
        markHealingDayCompleted,
        getCourseProgress,
        recordJournalEntry,
        recordMood
    ]);

    return (
        <StatsContext.Provider value={contextValue}>
            {children}
        </StatsContext.Provider>
    );
}

export function useStats() {
    const context = useContext(StatsContext);
    if (context === undefined) {
        throw new Error('useStats must be used within a StatsProvider');
    }
    return context;
}
