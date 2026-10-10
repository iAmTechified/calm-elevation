import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings as SettingsIcon, Trophy, Calendar as CalendarIcon, Star } from 'lucide-react-native';
import { useStats } from '../../../hooks/useStats';
import { useJournal } from '../../../hooks/useJournal';
import { useSubscription } from '../../../hooks/useSubscription';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const MOODS = [
    require('../../../assets/moods/determined.jpeg'),
    require('../../../assets/moods/happy.jpeg'),
    require('../../../assets/moods/relaxed.jpeg'),
    require('../../../assets/moods/sad.jpeg'),
    require('../../../assets/moods/frightened.jpeg')
];

// Map mood strings to Y-axis index (0-4) matching MOODS array
const getMoodIndex = (mood: string): number => {
    const map: Record<string, number> = {
        'determined': 0, 'strong': 0, 'motivated': 0,
        'happy': 1, 'excited': 1, 'grateful': 1,
        'relaxed': 2, 'calm': 2, 'peaceful': 2, 'sleepy': 2,
        'sad': 3, 'depressed': 3, 'crying': 3, 'unmotivated': 3,
        'frightened': 4, 'worried': 4, 'anxious': 4, 'angry': 4, 'stressed': 4, 'overwhelmed': 4
    };
    return map[mood] ?? -1;
};

const getLast7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
            dateObj: d,
            label: `${d.getDate()}/${d.getMonth() + 1}`,
            dateString: d.toISOString().split('T')[0] // YYYY-MM-DD
        };
    });
};

const StatsCard = ({ title, value, icon, color = "text-[#3A8E91]" }: { title: string, value: string | number, icon: any, color?: string }) => (
    <View className="bg-white dark:bg-slate-800 rounded-3xl p-4 mb-4 flex-row items-center justify-between shadow-sm border border-slate-50 dark:border-slate-700 h-24">
        <View className="flex-row items-center">
            <View className="w-16 h-16 items-center justify-center mr-4">
                {icon}
            </View>
        </View>
        <View className="items-end flex-1">
            <Text className="text-slate-500 dark:text-slate-400 font-medium text-right text-sm mb-1">{title}</Text>
            <Text className={`text-3xl font-bold ${color}`}>{value}</Text>
        </View>
    </View>
);

const SectionTitle = ({ title }: { title: string }) => (
    <Text className="text-xl font-bold text-slate-700 dark:text-white mb-4 px-2">{title}</Text>
);

const CircularProgress = ({ current, total, label, image }: { current: number, total: number, label: string, image: any }) => {
    return (
        <View className="items-center w-[30%]">
            <View className="w-20 h-20 rounded-full border-4 border-[#E2F1F1] items-center justify-center relative mb-2">
                {/* Simplified progress representation */}
                <View className="absolute w-full h-full rounded-full border-4 border-[#3A8E91] opacity-20" />
                <View className="w-16 h-16 rounded-full overflow-hidden items-center justify-center bg-[#E0F2F1]">
                    <Image source={image} className="w-12 h-12" resizeMode="contain" />
                </View>
                <View className="absolute -bottom-2 bg-white dark:bg-slate-700 px-2 py-0.5 rounded-full shadow-sm border border-slate-100 dark:border-slate-600">
                    <Text className="text-[#3A8E91] font-bold text-xs">{current} / {total}</Text>
                </View>
            </View>
            <Text className="text-center text-slate-600 dark:text-slate-300 font-medium text-sm leading-tight min-h-[40px]">{label}</Text>
        </View>
    );
}

export default function StatsScreen() {
    const router = useRouter();
    const { t } = useTranslation();

    const { stats, refresh: refreshStats, getCourseProgress } = useStats();
    const { entries, journalStreak, totalEntries, totalWords, refresh: refreshJournal } = useJournal();
    const { subscription, checkExpiry } = useSubscription();
    const [last7Days, setLast7Days] = useState(getLast7Days());

    useFocusEffect(
        useCallback(() => {
            refreshStats();
            refreshJournal();
            checkExpiry();
            setLast7Days(getLast7Days());
        }, [refreshStats, refreshJournal])
    );

    // Calculate Journal Streak (consecutive days with at least one entry)
    // Journal streak is now provided directly by useJournal hook

    const chartData = useMemo(() => {
        return last7Days.map(day => {
            const scores = stats.moodHistory[day.dateString];
            let score: number | undefined;

            if (Array.isArray(scores) && scores.length > 0) {
                const total = scores.reduce((sum, s) => sum + s, 0);
                score = total / scores.length;
            } else if (typeof scores === 'number') {
                score = scores;
            }


            // Map score to index (0-4)
            // 100 -> 0, 80 -> 1, 60 -> 2, 40 -> 3, 20 -> 4
            let moodIndex = -1;
            if (score !== undefined) {
                moodIndex = Math.max(0, Math.min(4, Math.floor((100 - score) / 20)));
            }

            return {
                ...day,
                hasData: score !== undefined,
                moodIndex
            };
        });
    }, [stats.moodHistory, last7Days]);

    const hasData = useMemo(() => chartData.some(d => d.hasData), [chartData]);

    const understandingProgress = stats ? stats.completedLessons.filter(id => ['1', '2', '3', '4', '5', '6'].includes(id)).length : 0; // fallback if hook not ready
    // Actually best to use getCourseProgress helper if exposed, but I didn't export it from useStats in the end. 
    // Wait, I DID export getCourseProgress in useStats.ts. Let me use it.
    // I need to update useStats hook definition in this file to include proper return type or just use it. 

    // Helper to access course progress safely
    // Since useStats returns the helper function, we can use it.
    // But we need to make sure the hook version I wrote actually exported it. I wrote:
    // return { stats, ..., getCourseProgress, ... }
    // So yes.

    // Wait, getCourseProgress is a function. I shouldn't call it in render if it's heavy, but it's cheap.
    // However, I need to know the course IDs.
    // Course IDs: understanding-anxiety, short-term-relief, long-term-resilience

    // I will extract them in render for clarity

    return (
        <SafeAreaView className="flex-1 bg-[#fff] dark:bg-slate-900" edges={['top']}>
            <View className="flex-1">
                {/* Header */}
                <View className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-50 dark:border-slate-800 flex-row justify-between items-center shadow-sm z-10">
                    <View className="w-8" />
                    <Text className="text-2xl font-bold text-[#1e293b] dark:text-white text-center">{t('stats.title')}</Text>
                    <TouchableOpacity onPress={() => router.push('../app-settings')} className="bg-[#E0F2F1] dark:bg-[#1e293b] p-2 rounded-full">
                        <SettingsIcon size={24} color="#3A8E91" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                    {/* Subscription Status Card */}
                    {/* Subscription Card */}
                    <View className="bg-white dark:bg-slate-800 rounded-3xl p-6 mb-6 shadow-sm border border-slate-100 dark:border-slate-700">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-xl font-bold text-slate-700 dark:text-white">{t('stats.subscription')}</Text>
                            <View className={`px-3 py-1 rounded-full ${subscription.isSubscribed ? subscription.isFreeTrial ? 'bg-amber-100' : 'bg-green-100' : 'bg-red-50'}`}>
                                <Text className={`text-xs font-bold ${subscription.isSubscribed ? subscription.isFreeTrial ? 'text-amber-700' : 'text-green-700' : 'text-red-600'}`}>
                                    {subscription.isSubscribed
                                        ? subscription.isFreeTrial ? t('stats.freeTrialBadge') : t('stats.premiumBadge')
                                        : t('stats.expiredBadge')}
                                </Text>
                            </View>
                        </View>

                        <View className="mb-4">
                            {subscription.isSubscribed ? (
                                <View>
                                    {subscription.isFreeTrial ? (
                                        <>
                                            <Text className="text-slate-500 dark:text-slate-400 text-sm mb-1">{t('stats.limitedAccessTrial')}</Text>
                                            <Text className="text-slate-800 dark:text-slate-200 text-lg font-semibold">{t('stats.threeDayFreeTrial')}</Text>
                                            <Text className="text-slate-400 text-xs mt-1">
                                                {subscription.expiryDate ?
                                                    t('stats.expiresOn', {
                                                        date: new Date(subscription.expiryDate).toLocaleDateString(),
                                                        time: new Date(subscription.expiryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                    })
                                                    : ''}
                                            </Text>
                                            <Text className="text-slate-500 text-xs mt-2 italic">{t('stats.upgradeToUnlock')}</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text className="text-slate-500 text-sm mb-1">{t('stats.currentPlan')}</Text>
                                            <Text className="text-slate-800 dark:text-slate-200 text-lg font-semibold capitalize">
                                                {subscription.planId === 'yearly' ? t('stats.yearlyPremium') : t('stats.monthlyPremium')}
                                            </Text>
                                            {subscription.expiryDate && (
                                                <Text className="text-slate-400 text-xs mt-1">
                                                    {t('stats.expiresOnDate', { date: new Date(subscription.expiryDate).toLocaleDateString() })}
                                                </Text>
                                            )}
                                        </>
                                    )}
                                </View>
                            ) : (
                                <Text className="text-slate-500 text-sm">
                                    {t('stats.trialExpiredNotice')}
                                </Text>
                            )}
                        </View>

                        {/* Logic: If on Free Trial OR Expired -> Show Upgrade button. If Premium -> Show Manage. */}
                        {!subscription.isSubscribed || subscription.isFreeTrial ? (
                            <TouchableOpacity
                                onPress={() => router.push('/paywall')}
                                className={`py-3 rounded-xl items-center ${(!subscription.isSubscribed || subscription.isFreeTrial) ? 'bg-[#3A8E91]' : 'bg-[#E0F2F1]'}`}
                            >
                                <Text className={`font-bold ${(!subscription.isSubscribed || subscription.isFreeTrial) ? 'text-white' : 'text-[#3A8E91]'}`}>
                                    {(!subscription.isSubscribed || subscription.isFreeTrial) ? t('stats.unlockFullAccess') : t('stats.manageSubscription')}
                                </Text>
                            </TouchableOpacity>
                        ) : ""}
                    </View>


                    {/* No Recent Data Card - Show only if no data */}
                    {/* {!hasData && (
                        <View className="bg-white dark:bg-slate-800 rounded-3xl p-8 mb-6 items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 min-h-[200px]">
                            <Text className="text-slate-500 dark:text-slate-400 text-lg mb-8">No recent data</Text>
                            <TouchableOpacity onPress={() => router.push('/(tabs)')} className="bg-[#3A8E91] py-4 px-8 rounded-full w-full shadow-lg shadow-[#3A8E91]/20">
                                <Text className="text-white text-center font-bold text-lg">Check In Now</Text>
                            </TouchableOpacity>
                        </View>
                    )} */}

                    {/* Mood Chart */}
                    <View className="bg-white dark:bg-slate-800 rounded-3xl p-4 mb-6 shadow-sm border border-slate-100 dark:border-slate-700">
                        <Text className="text-xl font-bold text-slate-700 dark:text-white text-center mb-6">{t('stats.myDailyMood')}</Text>
                        <View className="flex-row">
                            {/* Y Axis Icons */}
                            <View className="justify-between mr-2 py-2 h-[200px]">
                                {MOODS.map((icon, i) => (
                                    <View key={i} className="w-8 h-8 rounded-full overflow-hidden bg-[#E0F2F1] dark:bg-slate-700 items-center justify-center">
                                        <Image source={icon} className="w-full h-full" resizeMode="cover" />
                                    </View>
                                ))}
                            </View>

                            {/* Grid */}
                            <View className="flex-1">
                                <View className="flex-row justify-between h-[200px] border-l border-b border-slate-100 dark:border-slate-700 relative">
                                    {/* Horizontal Grid lines */}
                                    {[0, 1, 2, 3, 4].map((_, i) => (
                                        <View key={i} className="absolute w-full h-[1px] bg-slate-50 dark:bg-slate-700" style={{ top: `${i * 25}%` }} />
                                    ))}

                                    {/* Vertical Grid lines & Data Points */}
                                    {chartData.map((data, i) => (
                                        <View key={i} className="flex-1 border-r border-slate-50 dark:border-slate-700 relative items-center">
                                            {data.hasData && (
                                                <View
                                                    className="absolute w-4 h-4 rounded-full bg-[#3A8E91] shadow-sm ring-2 ring-white"
                                                    style={{
                                                        top: (data.moodIndex * 50) - 8 + 12
                                                    }}
                                                >
                                                    <View className="absolute w-full h-full rounded-full bg-[#3A8E91]" style={{ top: -2 }} />
                                                </View>
                                            )}
                                        </View>
                                    ))}
                                </View>

                                <View className="absolute top-0 left-0 w-full h-[200px] flex-row justify-between pl-[1px]">
                                    {chartData.map((data, i) => (
                                        <View key={i} className="flex-1 items-center relative h-full">
                                            {data.hasData && (
                                                <View
                                                    className="absolute w-4 h-4 rounded-full bg-[#3A8E91] shadow-sm ring-2 ring-white border-2 border-white"
                                                    style={{
                                                        top: `${data.moodIndex * 25}%`,
                                                        transform: [{ translateY: -8 }]
                                                    }}
                                                />
                                            )}
                                        </View>
                                    ))}
                                </View>

                                {/* X Axis Labels */}
                                <View className="flex-row justify-between mt-2">
                                    {chartData.map((data, i) => (
                                        <View key={i} className="flex-1 items-center">
                                            <Text className="text-[10px] text-slate-400 font-medium text-center">{data.label}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Stats List */}
                    <StatsCard
                        title={t('stats.dailyStreak')}
                        value={`${stats.currentStreak} ${stats.currentStreak === 1 ? t('common.day') : t('common.days')}`}
                        color="text-[#3A8E91]"
                        icon={<Image source={require('../../../assets/cal.png')} className="w-16 h-16" resizeMode="contain" />}
                    />

                    <StatsCard
                        title={t('stats.braveryPoints')}
                        value={`${stats.braveryPoints}`}
                        color="text-[#3A8E91]"
                        icon={<Image source={require('../../../assets/cal_success.png')} className="w-20 h-20" resizeMode="contain" />}
                    />

                    <StatsCard
                        title={t('stats.healingJourney')}
                        value={`${stats.completedHealingDays?.length || 0}/60 ${t('common.days')}`}
                        color="text-[#3A8E91]"
                        icon={
                            <View className="relative w-16 h-16 items-center justify-center">
                                <Star size={44} color="#3A8E91" fill="#3A8E91" />
                            </View>
                        }
                    />



                    {/* Lessons Progress */}
                    <View className="bg-white dark:bg-slate-800 rounded-3xl p-6 mb-6 shadow-sm border border-slate-100 dark:border-slate-700 pt-8">
                        <View className="flex-row justify-between">
                            <CircularProgress
                                current={getCourseProgress('understanding-anxiety').completed}
                                total={getCourseProgress('understanding-anxiety').total}
                                label={t('stats.understandingLessons')}
                                image={require('../../../assets/cal.png')}
                            />
                            <CircularProgress
                                current={getCourseProgress('short-term-relief').completed}
                                total={getCourseProgress('short-term-relief').total}
                                label={t('stats.shortTermLessons')}
                                image={require('../../../assets/cal.png')}
                            />
                            <CircularProgress
                                current={getCourseProgress('long-term-resilience').completed}
                                total={getCourseProgress('long-term-resilience').total}
                                label={t('stats.longTermLessons')}
                                image={require('../../../assets/cal.png')}
                            />
                        </View>
                    </View>

                    {/* Time Cards */}
                    <View className="bg-white dark:bg-slate-800 rounded-3xl p-4 mb-4 flex-row items-center justify-between shadow-sm border border-slate-100 dark:border-slate-700 min-h-[100px]">
                        <View className="w-20 items-center justify-center">
                            <Image source={require('../../../assets/cal_meditate.jpeg')} className="w-16 h-16" resizeMode="contain" />
                        </View>
                        <View className="flex-1 items-end">
                            <Text className="text-slate-500 dark:text-slate-400 font-medium text-right text-base mb-1">{t('stats.timeInBreathr')}</Text>
                            <Text className="text-3xl font-bold text-[#3A8E91]">{stats.timeBreathr} {stats.timeBreathr === 1 ? t('common.min') : t('common.mins')}</Text>
                        </View>
                    </View>

                    {/* Journal Streak */}
                    <View className="bg-white dark:bg-slate-800 rounded-3xl p-6 mb-4 flex-row items-center justify-between shadow-sm border border-slate-100 dark:border-slate-700">
                        <View className="w-16 h-16 bg-[#E0F2F1] rounded-xl items-center justify-center mr-4 relative">
                            {/* Custom Calendar-like visual */}
                            <View className="w-12 h-10 bg-[#3A8E91] rounded-b-md rounded-t-sm relative mt-2 items-center justify-center">
                                <Text className="text-white font-bold text-lg">{journalStreak}</Text>
                                <View className="absolute -top-1 left-2 w-1 h-2 bg-slate-700 rounded-full" />
                                <View className="absolute -top-1 right-2 w-1 h-2 bg-slate-700 rounded-full" />
                            </View>
                        </View>
                        <View className="items-end flex-1">
                            <Text className="text-slate-500 dark:text-slate-400 font-medium text-right text-base mb-1">{t('stats.dailyJournalStreak')}</Text>
                            <Text className="text-3xl font-bold text-[#3A8E91]">{journalStreak} {journalStreak === 1 ? t('common.day') : t('common.days')}</Text>
                        </View>
                    </View>

                    {/* Journal Stats Summary */}
                    <View className="flex-row justify-between mb-6">
                        <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-50 dark:border-slate-700 flex-1 mr-2">
                            <Text className="text-slate-400 dark:text-slate-500 text-xs font-medium mb-1 capitalize">{t('stats.totalEntries')}</Text>
                            <Text className="text-xl font-bold text-slate-700 dark:text-white uppercase">{totalEntries}</Text>
                        </View>
                        <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-50 dark:border-slate-700 flex-1 ml-2">
                            <Text className="text-slate-400 dark:text-slate-500 text-xs font-medium mb-1 capitalize">{t('stats.wordsWritten')}</Text>
                            <Text className="text-xl font-bold text-slate-700 dark:text-white uppercase">{totalWords}</Text>
                        </View>
                    </View>

                    <View className="h-20" />

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
