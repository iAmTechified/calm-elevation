import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Flame, ChevronRight, Award, CheckCircle2 } from 'lucide-react-native';
import { useSelfHealing } from '../../hooks/useSelfHealing';
import { BOOKS, Book } from '../../data/self-healing';
import Back from '../../components/Back';
import PhysicalBookBanner from '../../components/PhysicalBookBanner';

export default function SelfHealingScreen() {
    const router = useRouter();
    const { getBookCompletedDays, getTotalCompletedLessonsCount } = useSelfHealing();

    const totalCompleted = getTotalCompletedLessonsCount();

    return (
        <View className="flex-1 h-full bg-slate-50 dark:bg-slate-950">
            <StatusBar style="auto" />
            
            {/* Ambient Linear Background Gradient */}
            <LinearGradient
                colors={['#E0E7FF', '#F1F5F9', 'transparent']}
                className="absolute top-0 left-0 right-0 h-full opacity-60 dark:opacity-20"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            <SafeAreaView className="flex-1 h-full" edges={['top']}>
                {/* Screen Navigation Header */}
                <View className="px-5 py-4 flex-row items-center justify-between">
                    <Back onPress={() => router.back()} style="bg-white dark:bg-slate-800 shadow-sm" iconColor="black" />
                    <View className="items-center">
                        <Text className="text-xl font-bold text-slate-900 dark:text-white">
                            Self Healing & Confidence
                        </Text>
                        <Text className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            Guided Workbooks by Joseph I.
                        </Text>
                    </View>
                    <View className="w-10" />
                </View>

                <ScrollView
                    className="flex-1 px-5 pt-2"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    {/* Top Progress Tracker */}
                    <View className="mb-6 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <View className="flex-row items-center justify-between mb-3">
                            <View className="flex-row items-center">
                                <View className="p-2.5 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl mr-3">
                                    <Award size={22} color="#6366F1" />
                                </View>
                                <View>
                                    <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        Overall Progress
                                    </Text>
                                    <Text className="text-xl font-bold text-slate-900 dark:text-white">
                                        {totalCompleted} Lessons Completed
                                    </Text>
                                </View>
                            </View>

                            <View className="flex-row items-center bg-amber-100 dark:bg-amber-900/40 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800/40">
                                <Flame size={16} color="#F59E0B" className="mr-1" />
                                <Text className="text-amber-700 dark:text-amber-300 font-bold text-xs">
                                    Active Streak
                                </Text>
                            </View>
                        </View>

                        <Text className="text-xs text-slate-500 dark:text-slate-400 leading-4">
                            Select a workbook below to start or continue your daily 30-day journey.
                        </Text>
                    </View>

                    {/* Section Header */}
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-lg font-bold text-slate-900 dark:text-white">
                            Available Workbooks (4 Editions)
                        </Text>
                        <Text className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                            EN & NL
                        </Text>
                    </View>

                    {/* 4 Book Tiles */}
                    <View className="gap-y-4">
                        {BOOKS.map((book: Book) => {
                            const completedCount = getBookCompletedDays(book.id).length;
                            const progressPercent = Math.round((completedCount / book.totalDays) * 100);

                            return (
                                <TouchableOpacity
                                    key={book.id}
                                    onPress={() => router.push(`/self-healing/book/${book.id}` as any)}
                                    activeOpacity={0.85}
                                    className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm flex-row items-center justify-between"
                                >
                                    <View className="flex-1 mr-3">
                                        <View className="flex-row items-center mb-2">
                                            <View className={`px-2.5 py-0.5 rounded-full ${book.coverColor} mr-2`}>
                                                <Text className="text-white font-bold text-[10px]">
                                                    {book.language === 'EN' ? '🇬🇧 English' : '🇳🇱 Nederlands'}
                                                </Text>
                                            </View>

                                            <Text className="text-xs font-semibold text-slate-400">
                                                30 Days • Joseph I.
                                            </Text>
                                        </View>

                                        <Text className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                            {book.title}
                                        </Text>

                                        <Text className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-4" numberOfLines={2}>
                                            {book.subtitle}
                                        </Text>

                                        {/* Book Progress Bar */}
                                        <View className="flex-row items-center">
                                            <View className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mr-3">
                                                <View
                                                    className={`h-full ${book.coverColor}`}
                                                    style={{ width: `${progressPercent}%` }}
                                                />
                                            </View>
                                            <Text className="text-xs font-bold text-slate-600 dark:text-slate-300">
                                                {completedCount}/{book.totalDays} Days
                                            </Text>
                                        </View>
                                    </View>

                                    <View className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 items-center justify-center">
                                        <ChevronRight size={20} color="#94A3B8" />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Physical Copy Request Banner (calmelevation.com/shop) */}
                    <PhysicalBookBanner />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
