import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, X, Star, Volume2 } from 'lucide-react-native';
import { useState } from 'react';
import ProgressHeader from '../../../components/ProgressHeader';
import LessonNavigationControls from '../../../components/LessonNavigationControls';
import { useStats } from '../../../hooks/useStats';
import { CheckInModal } from '../../../components/CheckInModal';
import { useColorScheme } from 'nativewind';

const { width } = Dimensions.get('window');

import { LESSONS } from '../../../data/learn';

export default function LessonScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [isCheckInVisible, setIsCheckInVisible] = useState(false);
    const { markLessonCompleted, recordMood } = useStats();

    // Restore missing state and variables
    const { colorScheme } = useColorScheme();
    const [currentPage, setCurrentPage] = useState(0);

    const lesson = LESSONS.find(l => l.id === id);
    // Safety check if lesson not found
    if (!lesson) {
        return (
            <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900 items-center justify-center">
                <Text className="text-slate-800 dark:text-white">Lesson not found</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4 p-4 bg-sky-500 rounded-xl">
                    <Text className="text-white font-bold">Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const pages = lesson.content;
    const progress = ((currentPage + 1) / pages.length) * 100;

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            // Finished
            if (typeof id === 'string') {
                markLessonCompleted(id);
            }
            setIsCheckInVisible(true);
        }
    };

    const handleCheckIn = async (moodScore: number) => {
        await recordMood(moodScore);
        setIsCheckInVisible(false);
        router.back();
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900" edges={['top', 'bottom']}>
            <StatusBar style="auto" />

            {/* Header */}
            <ProgressHeader
                progress={progress}
                containerStyle="flex-row items-center justify-between px-6 py-4"
                trackStyle="h-2 bg-slate-200 dark:bg-slate-700 rounded-full mx-6"
                progressStyle="bg-emerald-400"
                leftElement={
                    <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                        <ChevronLeft size={28} color={colorScheme === 'dark' ? '#f1f5f9' : '#1E293B'} strokeWidth={2.5} />
                    </TouchableOpacity>
                }
                rightElement={
                    <TouchableOpacity className="p-2 -mr-2">
                        <Star size={24} color="#FBBF24" fill="#FBBF24" />
                    </TouchableOpacity>
                }
            />

            {/* Content Card */}
            <View className="flex-1 px-6 pb-4">
                <View className="flex-1 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 justify-center">
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        {currentContent(pages[currentPage], colorScheme === 'dark')}
                    </ScrollView>
                </View>
            </View>

            {/* Footer Controls */}
            <View className="px-6 py-4 flex-row items-center justify-between gap-4">
                <LessonNavigationControls
                    currentPage={currentPage}
                    totalPages={pages.length}
                    onPrev={prevPage}
                    onNext={nextPage}
                />
            </View>


            <CheckInModal
                visible={isCheckInVisible}
                onClose={() => {
                    setIsCheckInVisible(false);
                    router.back();
                }}
                onMoodSelect={handleCheckIn}
            />
        </SafeAreaView >
    );
}

function currentContent(page: any, isDark: boolean) {
    if (page.type === 'intro' || page.type === 'conclusion') {
        return (
            <>
                <Text className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-6">
                    {page.title}
                </Text>

                {page.text.map((paragraph: string, index: number) => (
                    <Text key={index} className="text-xl text-slate-600 dark:text-slate-400 leading-8 mb-8 font-medium text-justify">
                        {paragraph}
                    </Text>
                ))}
            </>
        );
    }

    if (page.type === 'exercise') {
        return (
            <View className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                <Text className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 text-center mb-6">
                    {page.title || 'Exercise'}
                </Text>

                {page.text.map((paragraph: string, index: number) => (
                    <Text key={index} className="text-lg text-emerald-900 dark:text-emerald-100 leading-8 mb-4 font-medium">
                        • {paragraph}
                    </Text>
                ))}
            </View>
        );
    }

    // Default / Continuation
    return (
        <View className="justify-center flex-1">
            {page.text.map((paragraph: string, index: number) => (
                <Text key={index} className="text-xl text-slate-600 dark:text-slate-400 leading-8 mb-8 font-medium text-justify">
                    {paragraph}
                </Text>
            ))}
        </View>
    );
}
