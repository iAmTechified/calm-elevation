import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import HeroHeader from '../../components/HeroHeader';
import { Lock } from 'lucide-react-native';
import { useAccess } from '../../hooks/useAccess';

const games = [
    {
        id: 'zen-garden',
        title: 'Zen Garden',
        route: '/play/zen-garden',
        image: require('../../assets/play-zen-garden.png'),
    },
    {
        id: 'bubble-pop',
        title: 'Bubble Pop',
        route: '/play/bubble-pop',
        image: require('../../assets/play-bubble-pop.png'),
    },
    {
        id: 'mindful-maze',
        title: 'Mindful Maze',
        route: '/play/mindful-maze',
        image: require('../../assets/play-mindful-maze.png'),
    },
    {
        id: 'blocks',
        title: 'Blocks',
        route: '/play/blocks',
        image: require('../../assets/play-blocks.jpeg'),
    },
];

export default function PlayScreen() {
    const router = useRouter();
    const { isLocked } = useAccess();

    return (
        <View className="flex-1 bg-[#E0F2FE] dark:bg-slate-900">
            <StatusBar style="auto" />

            <HeroHeader
                image={require('../../assets/play.jpeg')}
                onBack={() => router.back()}
            />

            <SafeAreaView edges={['top']} className="flex-0 h-full z-10">
                <ScrollView className="pb-20" showsVerticalScrollIndicator={false}>
                    <View className="flex-1 bg-white dark:bg-slate-900 rounded-t-[40px] h-full px-6 pt-10 mt-[200px] z-[999] shadow-sm pb-20">
                        <Text className="text-3xl font-semibold font-sans text-[#1e3a8a] dark:text-sky-400 text-center mb-4">
                            Play
                        </Text>

                        <Text className="text-lg font-sans text-slate-500 dark:text-slate-400 text-center leading-7 font-medium px-2 mb-8">
                            Wind down or lift your mood with calming, mindful play that gently brings you back to the present.
                        </Text>

                        <View className="flex-row flex-wrap justify-between gap-y-6">
                            {games.map((game) => {
                                const locked = isLocked('game', { gameId: game.id });
                                return (
                                    <TouchableOpacity
                                        key={game.id}
                                        onPress={() => {
                                            if (locked) {
                                                router.push('/paywall');
                                            } else {
                                                router.push(game.route as any);
                                            }
                                        }}
                                        activeOpacity={0.9}
                                        className="w-[48%] bg-sky-50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-transparent dark:border-slate-700 relative"
                                    >
                                        <View className="h-32 w-full bg-slate-100 dark:bg-slate-700">
                                            <Image
                                                source={game.image}
                                                className={`w-full h-full ${locked ? 'opacity-50' : ''}`}
                                                resizeMode="cover"
                                            />
                                            {locked && (
                                                <View className="absolute inset-0 items-center justify-center bg-black/10">
                                                    <Lock color="#fff" size={24} />
                                                </View>
                                            )}
                                        </View>
                                        <View className="p-4 bg-sky-50 dark:bg-slate-800 items-center justify-center">
                                            <Text className="text-slate-700 dark:text-gray-100 font-bold text-base text-center">
                                                {game.title}
                                            </Text>
                                        </View>
                                        {locked && (
                                            <View className="absolute top-2 right-2 bg-amber-500 px-2 py-0.5 rounded-full z-10">
                                                <Text className="text-white text-[10px] font-bold">PREMIUM</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

