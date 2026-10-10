import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Redirect } from 'expo-router';
import { ChevronLeft, Quote, Sparkles, CheckCircle, ArrowRight } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import ProgressHeader from '../../../components/ProgressHeader';
import LessonNavigationControls from '../../../components/LessonNavigationControls';
import { useSelfHealing } from '../../../hooks/useSelfHealing';
import { useStats } from '../../../hooks/useStats';
import { CheckInModal } from '../../../components/CheckInModal';
import { BOOKS, Lesson, LessonContent } from '../../../data/self-healing';
import { useTranslation } from 'react-i18next';

export default function LessonScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const { id } = useLocalSearchParams();
    const { markDayComplete, saveReflection, saveRating, state } = useSelfHealing();
    const { markHealingDayCompleted, recordMood } = useStats();
    const { colorScheme } = useColorScheme();
    const [currentPage, setCurrentPage] = useState(0);
    const [isCheckInVisible, setIsCheckInVisible] = useState(false);
    const insets = useSafeAreaInsets();

    // Search across all books for matching lesson ID
    let matchingLesson: Lesson | undefined;
    let matchingBookId: string | undefined;

    for (const book of BOOKS) {
        const found = book.lessons.find(l => l.id === id);
        if (found) {
            matchingLesson = found;
            matchingBookId = book.id;
            break;
        }
    }

    if (!matchingLesson || !matchingBookId) {
        return <Redirect href="/self-healing" />;
    }

    const lesson = matchingLesson;
    const bookId = matchingBookId;
    const pages = lesson.content;
    const progress = ((currentPage + 1) / pages.length) * 100;
    const isDark = colorScheme === 'dark';

    const reflectionKey = `${bookId}-${lesson.day}`;
    const initialReflection = state.reflectionsByBookDay[reflectionKey] || '';
    const initialRating = state.ratingsByBookDay[reflectionKey] || {};

    const [reflectionText, setReflectionText] = useState(initialReflection);
    const [beforeScore, setBeforeScore] = useState<number | undefined>(initialRating.before);
    const [afterScore, setAfterScore] = useState<number | undefined>(initialRating.after);

    const handleSaveReflection = (text: string) => {
        setReflectionText(text);
        saveReflection(bookId, lesson.day, text);
    };

    const handleSaveRating = (before?: number, after?: number) => {
        if (before !== undefined) setBeforeScore(before);
        if (after !== undefined) setAfterScore(after);
        saveRating(bookId, lesson.day, {
            before: before !== undefined ? before : beforeScore,
            after: after !== undefined ? after : afterScore,
        });
    };

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            // Complete current lesson
            markDayComplete(bookId, lesson.day);
            markHealingDayCompleted(lesson.day);
            setIsCheckInVisible(true);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCheckIn = async (moodScore: number) => {
        await recordMood(moodScore);
        setIsCheckInVisible(false);
        router.back();
    };

    return (
        <>
            <SafeAreaView className="h-full bg-slate-50 dark:bg-slate-950" edges={['top', 'left', 'right', 'bottom']}>
                <StatusBar style="auto" />

                {/* Progress Header */}
                <ProgressHeader
                    progress={progress}
                    containerStyle="flex-row items-center justify-between px-6 py-4"
                    trackStyle="h-2 bg-slate-200 dark:bg-slate-800 rounded-full mx-6"
                    progressStyle="bg-indigo-500"
                    leftElement={
                        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                            <ChevronLeft size={28} color={isDark ? '#f1f5f9' : '#1E293B'} strokeWidth={2.5} />
                        </TouchableOpacity>
                    }
                    rightElement={
                        <View className="flex-row items-center bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 rounded-full">
                            <Text className="text-indigo-600 dark:text-indigo-300 font-bold text-xs">
                                {t('selfHealing.dayNumber', { day: lesson.day })}
                            </Text>
                        </View>
                    }
                />

                {/* Content Card */}
                <View className="flex-1 px-6 pb-4 pt-2">
                    <View className="flex-1 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                            {renderPageContent({
                                page: pages[currentPage],
                                isDark,
                                t,
                                reflectionText,
                                setReflectionText: handleSaveReflection,
                                beforeScore,
                                afterScore,
                                setRating: handleSaveRating,
                            })}
                        </ScrollView>
                    </View>
                </View>

                {/* Navigation Footer */}
                <View className="px-6 py-4">
                    <LessonNavigationControls
                        currentPage={currentPage}
                        totalPages={pages.length}
                        onPrev={prevPage}
                        onNext={nextPage}
                    />
                </View>
            </SafeAreaView>

            <CheckInModal
                visible={isCheckInVisible}
                onClose={() => {
                    setIsCheckInVisible(false);
                    router.back();
                }}
                onMoodSelect={handleCheckIn}
            />
        </>
    );
}

interface RenderProps {
    page: LessonContent;
    isDark: boolean;
    t: (key: string, options?: any) => string;
    reflectionText: string;
    setReflectionText: (text: string) => void;
    beforeScore?: number;
    afterScore?: number;
    setRating: (before?: number, after?: number) => void;
}

function renderPageContent({
    page,
    isDark,
    t,
    reflectionText,
    setReflectionText,
    beforeScore,
    afterScore,
    setRating,
}: RenderProps) {
    const textColor = isDark ? 'text-slate-300' : 'text-slate-600';
    const titleColor = isDark ? 'text-white' : 'text-slate-900';

    if (page.type === 'intro') {
        return (
            <View className="items-center py-2">
                {page.image && (
                    <View className={`w-20 h-20 ${page.imageColor || 'bg-blue-100'} rounded-full items-center justify-center mb-5 shadow-sm`}>
                        <Text className="text-4xl">{page.image}</Text>
                    </View>
                )}

                {page.title && (
                    <Text className={`text-2xl font-bold ${titleColor} text-center mb-4`}>
                        {page.title}
                    </Text>
                )}

                {page.quote && (
                    <View className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 mb-6 w-full relative">
                        <Quote size={20} color="#818CF8" className="mb-2" />
                        <Text className={`text-base font-semibold italic ${titleColor} mb-2`}>
                            {page.quote}
                        </Text>
                        {page.author && (
                            <Text className="text-xs font-bold text-indigo-600 dark:text-indigo-400 text-right">
                                — {page.author}
                            </Text>
                        )}
                    </View>
                )}

                {page.text.map((paragraph: string, index: number) => (
                    <Text key={index} className={`text-base ${textColor} leading-7 mb-4 text-center`}>
                        {paragraph}
                    </Text>
                ))}
            </View>
        );
    }

    if (page.type === 'practice') {
        return (
            <View className="py-2">
                {page.title && (
                    <Text className={`text-2xl font-bold ${titleColor} mb-4`}>
                        {page.title}
                    </Text>
                )}

                {page.text.map((paragraph: string, index: number) => (
                    <Text key={index} className={`text-base ${textColor} leading-7 mb-6`}>
                        {paragraph}
                    </Text>
                ))}

                {page.questions && page.questions.map((q, idx) => (
                    <View key={idx} className="mb-5 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <Text className={`font-semibold ${titleColor} mb-3 text-base`}>
                            {q}
                        </Text>
                        <TextInput
                            value={reflectionText}
                            onChangeText={setReflectionText}
                            placeholder={t('selfHealing.reflectionPlaceholder')}
                            placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
                            multiline
                            numberOfLines={4}
                            className={`min-h-[100px] text-base ${titleColor} align-top bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700`}
                        />
                    </View>
                ))}
            </View>
        );
    }

    if (page.type === 'rating') {
        const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return (
            <View className="py-2">
                <Text className={`text-2xl font-bold ${titleColor} mb-3`}>
                    {page.title || t('selfHealing.ratingTitle')}
                </Text>

                <Text className={`text-base ${textColor} mb-6 leading-6`}>
                    {t('selfHealing.ratingSubtext')}
                </Text>

                {/* BEFORE Score */}
                <View className="mb-6 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <Text className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
                        {t('selfHealing.ratingBefore')}
                    </Text>
                    <View className="flex-row items-center justify-between gap-1">
                        {scores.map(s => (
                            <TouchableOpacity
                                key={`before-${s}`}
                                onPress={() => setRating(s, undefined)}
                                className={`flex-1 aspect-square max-w-[32px] rounded-xl items-center justify-center ${
                                    beforeScore === s
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700'
                                }`}
                            >
                                <Text className={`font-bold text-xs ${beforeScore === s ? 'text-white' : titleColor}`}>
                                    {s}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* AFTER Score */}
                <View className="mb-4 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <Text className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
                        {t('selfHealing.ratingAfter')}
                    </Text>
                    <View className="flex-row items-center justify-between gap-1">
                        {scores.map(s => (
                            <TouchableOpacity
                                key={`after-${s}`}
                                onPress={() => setRating(undefined, s)}
                                className={`flex-1 aspect-square max-w-[32px] rounded-xl items-center justify-center ${
                                    afterScore === s
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700'
                                }`}
                            >
                                <Text className={`font-bold text-xs ${afterScore === s ? 'text-white' : titleColor}`}>
                                    {s}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        );
    }

    // Default Page
    return (
        <View className="justify-center flex-1 py-2">
            {page.title && (
                <Text className={`text-2xl font-bold ${titleColor} mb-4`}>
                    {page.title}
                </Text>
            )}
            {page.text.map((paragraph: string, index: number) => (
                <Text key={index} className={`text-base ${textColor} leading-7 mb-4`}>
                    {paragraph}
                </Text>
            ))}
        </View>
    );
}
