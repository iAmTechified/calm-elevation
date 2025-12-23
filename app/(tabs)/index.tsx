import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; // Use singleton
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import PressableCard from '../../components/PressableCard';
import { Stateometer } from '../../components/Stateometer';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useCallback, useEffect } from 'react';
import { CheckInModal } from '../../components/CheckInModal';
import { Sparkles, Crown, ChevronRight } from 'lucide-react-native';
import { useSubscriptionContext } from '../../context/SubscriptionContext';
import { useFocusEffect } from 'expo-router';
import { useStats } from '../../hooks/useStats';

const DATA = [
    { id: '1', title: 'Self-healing', route: '/self-healing', imagePlaceholderColor: 'bg-lime-200', imagePlaceholder: require('../../assets/visualize.jpeg') },
    { id: '2', title: 'Learn', route: '/learn', imagePlaceholderColor: 'bg-blue-200', imagePlaceholder: require('../../assets/learn.jpeg') },
    { id: '3', title: 'Breathe', route: '/breathe', imagePlaceholderColor: 'bg-emerald-200', imagePlaceholder: require('../../assets/breathe.jpeg') },
    { id: '4', title: 'Play', route: '/play', imagePlaceholderColor: 'bg-pink-200', imagePlaceholder: require('../../assets/play.jpeg') },
    { id: '5', title: 'Journal', route: '/journal', imagePlaceholderColor: 'bg-orange-200', imagePlaceholder: require('../../assets/journal.jpeg') },
    { id: '6', title: 'Sleep', route: '/sleep', imagePlaceholderColor: 'bg-indigo-300', imagePlaceholder: require('../../assets/night.jpeg') },
] as const;

export default function HomeScreen() {
    const { stats, recordMood, refresh: refreshStats } = useStats();
    const [isCheckInVisible, setIsCheckInVisible] = useState(false);
    const { subscription, checkExpiry } = useSubscriptionContext();

    useFocusEffect(
        useCallback(() => {
            checkExpiry();
            refreshStats();
        }, [refreshStats, checkExpiry])
    );

    // Show check-in if not done today
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        if (stats && stats.moodHistory && !stats.moodHistory[today]) {
            setIsCheckInVisible(true);
        }
    }, [stats.moodHistory]);

    const handleMoodSelect = async (moodScore: number) => {
        await recordMood(moodScore);
        setIsCheckInVisible(false);
    };

    return (
        <>
            <StatusBar style="auto" />
            <SafeAreaView className="flex-1 bg-white dark:bg-slate-900" edges={['top']}>
                <LinearGradient
                    colors={['#6fc6c945', '#f0f636a9', '#6fc6c945']}
                    locations={[0.2, 0.4, 0.6]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="absolute top-0 left-0 right-0 bottom-0 h-[150%] w-[150%] opacity-20"
                    dither
                >
                </LinearGradient>
                <View className='bg-primary/2 flex-1'>
                    <View className="p-1">
                        {/* Subscription Banner */}
                        {(!subscription.isSubscribed || subscription.isFreeTrial) && (
                            <TouchableOpacity
                                onPress={() => router.push('/paywall')}
                                className="mx-4 mt-6 mb-2 p-3 bg-emerald-200/50 dark:bg-slate-900/50 rounded-2xl flex-row items-center border border-slate-100 dark:border-slate-800/50"
                            >
                                <View className="w-8 h-8 rounded-full bg-yellow-100/50 dark:bg-yellow-900/10 items-center justify-center mr-3">
                                    <Crown size={14} color="#EAB308" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-slate-700 dark:text-slate-200 font-semibold text-xs">
                                        {subscription.isFreeTrial ? "Free Trial Active" : "Upgrade to Premium"}
                                    </Text>
                                    <Text className="text-slate-400 text-[10px]">
                                        {subscription.isFreeTrial ? "Upgrade to keep full access" : "Unlock full access to all features"}
                                    </Text>
                                </View>
                                <ChevronRight size={14} color="#94a3b8" />
                            </TouchableOpacity>
                        )}

                        <Text className='text-4xl font-medium text-center mt-6 mb-2 text-primaryLight dark:text-white'>My Journey</Text>

                        {/* Gauge Section */}
                        <View className="mt-2">
                            <Stateometer score={stats.stateometerScore} />
                        </View>
                    </View>
                    <View className="flex-1 p-1 rounded-[50px]">
                        <FlatList
                            data={DATA}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 15 }}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            renderItem={({ item }) => (
                                <PressableCard
                                    onPress={() => router.push(item.route)}
                                    title={item.title}
                                    imagePlaceholderColor={item.imagePlaceholderColor}
                                    imageSource={item.imagePlaceholder}
                                    style="w-[47%] bg-white grow-0 mb-2"
                                />
                            )}
                        />
                    </View>
                </View>
            </SafeAreaView>
            <CheckInModal
                visible={isCheckInVisible}
                onClose={() => { setIsCheckInVisible(false); handleMoodSelect(0) }}
                onMoodSelect={handleMoodSelect}
            />
        </>
    );
}

