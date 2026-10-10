import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Lock, CheckCircle2, BookOpen, Sparkles } from 'lucide-react-native';
import { BOOKS, Book, Lesson } from '../../../data/self-healing';
import { useSelfHealing } from '../../../hooks/useSelfHealing';
import { useAccess } from '../../../hooks/useAccess';
import Back from '../../../components/Back';
import { useTranslation } from 'react-i18next';

export default function BookOverviewScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const { id } = useLocalSearchParams();
    const { getBookCompletedDays, isDayUnlocked } = useSelfHealing();
    const { isLocked } = useAccess();

    const book = BOOKS.find(b => b.id === id);

    if (!book) {
        return <Redirect href="/self-healing" />;
    }

    const completedDays = getBookCompletedDays(book.id);
    const progressPercent = Math.round((completedDays.length / book.totalDays) * 100);

    // Group lessons by week / phase
    const phases = Array.from(new Set(book.lessons.map(l => l.phase)));
    const lessonsByPhase = phases.map(phaseTitle => ({
        title: phaseTitle,
        lessons: book.lessons.filter(l => l.phase === phaseTitle)
    }));

    return (
        <View className="flex-1 h-full bg-slate-50 dark:bg-slate-950">
            <StatusBar style="auto" />
            
            <SafeAreaView className="flex-1 h-full" edges={['top']}>
                {/* Header */}
                <View className="px-5 py-4 flex-row items-center justify-between">
                    <Back onPress={() => router.back()} style="bg-white dark:bg-slate-800 shadow-sm" iconColor="black" />
                    <View className="items-center flex-1 mx-3">
                        <View className="flex-row items-center mb-0.5">
                            <Text className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mr-1.5 uppercase tracking-wider">
                                {book.language === 'EN' ? '🇬🇧 English' : '🇳🇱 Nederlands'}
                            </Text>
                            <Text className="text-xs text-slate-400 font-medium">• {book.totalDays} {t('common.days')}</Text>
                        </View>
                        <Text className="text-lg font-bold text-slate-900 dark:text-white text-center" numberOfLines={1}>
                            {book.title}
                        </Text>
                    </View>
                    <View className="w-10" />
                </View>

                <ScrollView
                    className="flex-1 px-5 pt-2"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    {/* Book Hero Card */}
                    <View className={`rounded-3xl p-6 ${book.coverColor} shadow-lg shadow-indigo-500/20 mb-6 text-white relative overflow-hidden`}>
                        <View className="flex-row items-center mb-2">
                            <BookOpen size={20} color="#FFFFFF" className="mr-2" />
                            <Text className="text-white/80 font-bold text-xs uppercase tracking-wider">
                                {t('selfHealing.author', { author: book.author })}
                            </Text>
                        </View>

                        <Text className="text-2xl font-extrabold text-white mb-2 leading-8">
                            {book.title}
                        </Text>

                        <Text className="text-sm text-white/90 mb-4 leading-5">
                            {book.subtitle}
                        </Text>

                        {/* Progress Bar inside Card */}
                        <View className="bg-black/20 p-3 rounded-2xl">
                            <View className="flex-row items-center justify-between mb-1.5">
                                <Text className="text-xs font-semibold text-white/80">{t('selfHealing.readingProgress')}</Text>
                                <Text className="text-xs font-bold text-white">{completedDays.length} / {book.totalDays} {t('common.days')} ({progressPercent}%)</Text>
                            </View>
                            <View className="h-2 bg-white/30 rounded-full overflow-hidden">
                                <View className="h-full bg-white rounded-full" style={{ width: `${progressPercent}%` }} />
                            </View>
                        </View>
                    </View>

                    {/* Days List by Phase */}
                    {lessonsByPhase.map((phaseGroup, phaseIndex) => (
                        <View key={phaseGroup.title} className="mb-6">
                            <View className="flex-row items-center mb-3">
                                <View className="h-7 w-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 items-center justify-center mr-2.5">
                                    <Text className="text-indigo-600 dark:text-indigo-300 font-bold text-xs">{phaseIndex + 1}</Text>
                                </View>
                                <Text className="text-base font-bold text-slate-800 dark:text-slate-100 flex-1">
                                    {phaseGroup.title}
                                </Text>
                            </View>

                            <View className="gap-y-2.5">
                                {phaseGroup.lessons.map((lesson: Lesson) => {
                                    const paywalled = isLocked('healing-day', { day: lesson.day });
                                    const unlocked = isDayUnlocked(book.id, lesson.day);
                                    const completed = completedDays.includes(lesson.day);

                                    return (
                                        <TouchableOpacity
                                            key={lesson.id}
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                if (paywalled) {
                                                    router.push('/paywall');
                                                } else if (unlocked) {
                                                    router.push(`/self-healing/lesson/${lesson.id}`);
                                                }
                                            }}
                                            className={`p-4 rounded-2xl border flex-row items-center justify-between ${
                                                completed
                                                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                                                    : unlocked
                                                    ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm'
                                                    : 'bg-slate-100/70 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/30 opacity-75'
                                            }`}
                                        >
                                            <View className="flex-row items-center flex-1 mr-3">
                                                <View className={`w-9 h-9 rounded-xl items-center justify-center mr-3 ${
                                                    completed
                                                        ? 'bg-emerald-500'
                                                        : unlocked
                                                        ? 'bg-indigo-100 dark:bg-indigo-900/50'
                                                        : 'bg-slate-200 dark:bg-slate-800'
                                                }`}>
                                                    {completed ? (
                                                        <CheckCircle2 size={18} color="#FFFFFF" />
                                                    ) : (
                                                        <Text className={`font-bold text-sm ${unlocked ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-400'}`}>
                                                            {lesson.day}
                                                        </Text>
                                                    )}
                                                </View>

                                                <View className="flex-1">
                                                    <Text className="text-xs font-semibold text-slate-400 mb-0.5">
                                                        {t('selfHealing.dayNumber', { day: lesson.day })}
                                                    </Text>
                                                    <Text className="text-base font-bold text-slate-900 dark:text-white" numberOfLines={1}>
                                                        {lesson.title}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View>
                                                {paywalled ? (
                                                    <View className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-xl">
                                                        <Lock size={16} color="#D97706" />
                                                    </View>
                                                ) : unlocked ? (
                                                    <View className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 rounded-full border border-indigo-100 dark:border-indigo-900/40">
                                                        <Text className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                                            {completed ? t('selfHealing.review') : t('selfHealing.start')}
                                                        </Text>
                                                    </View>
                                                ) : (
                                                    <Lock size={16} color="#94A3B8" />
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
