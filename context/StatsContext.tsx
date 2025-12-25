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

    useEffect(() => {
        loadStats();
    }, [loadStats]);

    const updateStats = async (updates: Partial<StatsState>) => {
        try {
            // Optimistic update
            const newStats = { ...stats, ...updates };
            setStats(newStats);

            // Persist
            // Fetch latest to avoid race conditions? In this simple app, relying on state is usually fine, 
            // but strictly we should merge. For now, simple set.
            await storage.setItem(STATS_STORAGE_KEY, newStats);
        } catch (error) {
            console.error('Failed to update stats:', error);
        }
    };

    // --- Core Actions ---

    const updateEmotionalState = (delta: number) => {
        // Delta is expected in range like 0.1, 0.2.
        // We map 0.1 -> 10 points.
        const points = Math.round(delta * 100);
        const newScore = Math.min(100, Math.max(0, stats.stateometerScore + points));
        updateStats({ stateometerScore: newScore });
    };

    const addBraveryPoints = (points: number) => {
        updateStats({ braveryPoints: stats.braveryPoints + points });
    };

    const incrementPanicAttacksConquered = () => {
        updateStats({ panicAttacksConquered: stats.panicAttacksConquered + 1 });
        updateEmotionalState(0.25); // +25 points
    };

    const addTimeInBreathr = (minutes: number) => {
        // Map 1 minute to roughly +10 points (0.1) as per requirements "Fast stabilization"
        const points = Math.ceil(minutes * 10);
        const newScore = Math.min(100, stats.stateometerScore + points);

        updateStats({
            timeBreathr: stats.timeBreathr + minutes,
            stateometerScore: newScore
        });
    };

    const addTimeInVisualizr = (minutes: number) => {
        const points = Math.ceil(minutes * 2);
        const newScore = Math.min(100, stats.stateometerScore + points);

        updateStats({
            timeVisualizr: stats.timeVisualizr + minutes,
            stateometerScore: newScore
        });
    };

    const recordJournalEntry = async () => {
        const today = new Date().toISOString().split('T')[0];

        // Logic: Allow multiple entries but only increment streak once per day
        let newStreak = stats.journalStreak;

        // Check if validated for streak today
        const alreadyJournaledToday = stats.lastJournalDate === today;

        if (!alreadyJournaledToday) {
            const lastJournal = stats.lastJournalDate ? new Date(stats.lastJournalDate) : null;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (stats.lastJournalDate === yesterdayStr) {
                newStreak += 1;
            } else {
                newStreak = 1;
            }
        }

        await updateStats({
            journalStreak: newStreak,
            lastJournalDate: today,
            braveryPoints: stats.braveryPoints + 15,
            stateometerScore: Math.min(100, stats.stateometerScore + 10) // +0.1
        });
    };

    const markLessonCompleted = (lessonId: string) => {
        if (!stats.completedLessons.includes(lessonId)) {
            updateStats({
                completedLessons: [...stats.completedLessons, lessonId],
                braveryPoints: stats.braveryPoints + 10,
                stateometerScore: Math.min(100, stats.stateometerScore + 15) // +0.15
            });
        }
    };

    const markHealingDayCompleted = (day: number) => {
        if (!stats.completedHealingDays.includes(day)) {
            updateStats({
                completedHealingDays: [...stats.completedHealingDays, day],
                braveryPoints: stats.braveryPoints + 20,
                stateometerScore: Math.min(100, stats.stateometerScore + 20) // +0.2
            });
        }
    };

    const getCourseProgress = (courseId: string) => {
        const course = COURSES[courseId];
        if (!course) return { completed: 0, total: 0 };

        const total = course.lessonIds.length;
        const completed = course.lessonIds.filter(id => stats.completedLessons.includes(id)).length;

        return { completed, total };
    };

    const recordMood = async (score: number) => {
        const today = new Date().toISOString().split('T')[0];
        const currentDailyMoods = stats.moodHistory[today] || [];
        const safeMoods = Array.isArray(currentDailyMoods) ? currentDailyMoods : [currentDailyMoods as unknown as number];

        const newMoodHistory = {
            ...stats.moodHistory,
            [today]: [...safeMoods, score]
        };

        await updateStats({
            moodHistory: newMoodHistory,
            stateometerScore: Math.min(100, score) // +0.05
        });
    };

    return (
        <StatsContext.Provider value={{
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
        }}>
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
