import { useState, useEffect, useCallback, useMemo } from 'react';
import { storage } from '../lib/storage';

export interface JournalEntry {
    id: string;
    mood: string;
    date: string; // YYYY-MM-DD
    answers: Record<string, string>;
    createdAt: string;
}

const JOURNAL_STORAGE_KEY = 'calm_elevation_journals';

export function useJournal() {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const journalStreak = useMemo(() => {
        if (!entries || entries.length === 0) return 0;

        // Unique dates, sorted descending
        const uniqueDates = Array.from(new Set(entries.map(e => e.date))).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        // Check if the most recent entry is today or yesterday to start the streak
        if (uniqueDates.length > 0) {
            if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
                streak = 1;
                let currentDate = new Date(uniqueDates[0]);

                for (let i = 1; i < uniqueDates.length; i++) {
                    const nextDate = new Date(uniqueDates[i]);
                    const diffTime = Math.abs(currentDate.getTime() - nextDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays === 1) {
                        streak++;
                        currentDate = nextDate;
                    } else {
                        break;
                    }
                }
            }
        }
        return streak;
    }, [entries]);

    const totalEntries = entries.length;

    const totalWords = useMemo(() => {
        return entries.reduce((acc, entry) => {
            const wordCount = Object.values(entry.answers).reduce((sum, answer) => {
                return sum + (answer ? answer.trim().split(/\s+/).length : 0);
            }, 0);
            return acc + wordCount;
        }, 0);
    }, [entries]);

    const loadEntries = useCallback(async () => {
        try {
            const storedEntries = await storage.getItem<JournalEntry[]>(JOURNAL_STORAGE_KEY);
            if (storedEntries) {
                // Sort by date descending, then createdAt descending
                setEntries(storedEntries.sort((a, b) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    if (dateB !== dateA) return dateB - dateA;
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                }));
            }
        } catch (error) {
            console.error('Failed to load journal entries:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadEntries();
    }, [loadEntries]);

    const addEntry = async (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => {
        try {
            const newEntry: JournalEntry = {
                ...entry,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
            };

            const updatedEntries = [newEntry, ...entries];
            await storage.setItem(JOURNAL_STORAGE_KEY, updatedEntries);
            setEntries(updatedEntries);
            return newEntry;
        } catch (error) {
            console.error('Failed to add journal entry:', error);
            throw error;
        }
    };

    const updateEntry = async (id: string, updates: Partial<Omit<JournalEntry, 'id' | 'createdAt'>>) => {
        try {
            const updatedEntries = entries.map(e => e.id === id ? { ...e, ...updates } : e);
            await storage.setItem(JOURNAL_STORAGE_KEY, updatedEntries);
            setEntries(updatedEntries);
        } catch (error) {
            console.error('Failed to update journal entry:', error);
            throw error;
        }
    };

    const deleteEntry = async (id: string) => {
        try {
            const updatedEntries = entries.filter(e => e.id !== id);
            await storage.setItem(JOURNAL_STORAGE_KEY, updatedEntries);
            setEntries(updatedEntries);
        } catch (error) {
            console.error('Failed to delete journal entry:', error);
            throw error;
        }
    }

    const getEntryByDate = (date: string) => {
        return entries.find(e => e.date === date);
    };

    const getEntryById = (id: string) => {
        return entries.find(e => e.id === id);
    };

    return {
        entries,
        loading,
        addEntry,
        updateEntry,
        deleteEntry,
        getEntryByDate,
        getEntryById,
        journalStreak,
        totalEntries,
        totalWords,
        refresh: loadEntries
    };
}
