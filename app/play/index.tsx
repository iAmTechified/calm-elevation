import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ArrowLeft, Wind, Sparkles, Zap, Layers, Play } from 'lucide-react-native';
import HeroHeader from '../../components/HeroHeader';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const games = [
    {
        id: 'mindful-maze',
        title: 'Mindful Maze',
        subtitle: 'Find your focus path',
        description: 'Guide Cal through the maze to find inner peace.',
        route: '/play/mindful-maze',
        image: require('../../assets/play-mindful-maze.png'),
        gradient: ['#F0FDF4', '#DCFCE7'] as const,
        accent: '#15803d',
        textAccent: 'text-green-700',
        icon: <Wind size={24} color="#15803d" />,
        tag: 'Focus',
        featured: true,
    },
    {
        id: 'zen-garden',
        title: 'Zen Garden',
        subtitle: 'Rake & Relax',
        route: '/play/zen-garden',
        image: require('../../assets/play-zen-garden.png'),
        gradient: ['#FFF7ED', '#FFEDD5'] as const,
        accent: '#c2410c',
        textAccent: 'text-orange-700',
        icon: <Sparkles size={20} color="#c2410c" />,
        tag: 'Calm',
    },
    {
        id: 'bubble-pop',
        title: 'Bubble Pop',
        subtitle: 'Stress Relief',
        route: '/play/bubble-pop',
        image: require('../../assets/play-bubble-pop.png'),
        gradient: ['#F0F9FF', '#BAE6FD'] as const,
        accent: '#0369a1',
        textAccent: 'text-sky-700',
        icon: <Zap size={20} color="#0369a1" />,
        tag: 'Fun',
    },
    {
        id: 'blocks',
        title: 'Blocks',
        subtitle: 'Creative Builder',
        route: '/play/blocks',
        image: require('../../assets/play-blocks.png'),
        gradient: ['#FFF1F2', '#FECDD3'] as const,
        accent: '#be123c',
        textAccent: 'text-rose-700',
        icon: <Layers size={20} color="#be123c" />,
        tag: 'Create',
    },
];

export default function PlayScreen() {
    const router = useRouter();

    const featuredGame = games.find(g => g.featured);
    const otherGames = games.filter(g => !g.featured);

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />

            {/* Background Decor */}
            <View className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full -mr-32 -mt-32 opacity-50" />
            <View className="absolute top-40 left-0 w-40 h-40 bg-teal-50 rounded-full -ml-20 opacity-50" />

            <SafeAreaView className="flex-1" edges={['top']}>
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
                    showsVerticalScrollIndicator={false}
                >
                    <HeroHeader
                        image={require('../../assets/cal.png')}
                        onBack={() => router.back()}
                        imageResizeMode="contain"
                    />

                    <View className="px-6 mb-8">
                        <Text className="text-4xl font-bold text-slate-800 tracking-tight">
                            Playground
                        </Text>
                        <Text className="text-slate-500 text-lg font-medium mt-1">
                            Spark joy & clear your mind.
                        </Text>
                    </View>

                    {/* Featured Game */}
                    {featuredGame && (
                        <Animated.View
                            entering={FadeInDown.delay(100).springify()}
                            className="px-6 mb-8"
                        >
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => router.push(featuredGame.route as any)}
                                className="w-full bg-white rounded-[32px] shadow-lg shadow-green-100 border border-green-50 overflow-hidden"
                            >
                                <LinearGradient
                                    colors={featuredGame.gradient}
                                    className="p-6 pb-0 relative h-64 justify-between"
                                >
                                    {/* Tag */}
                                    <View className="bg-white/90 self-start px-3 py-1 rounded-full border border-white/50 backdrop-blur-sm">
                                        <Text className={`text-xs font-bold ${featuredGame.textAccent} uppercase tracking-wider`}>
                                            Featured
                                        </Text>
                                    </View>

                                    <View className="flex-row items-end justify-between -mb-4 z-10">
                                        <Image
                                            source={featuredGame.image}
                                            className="w-48 h-48"
                                            resizeMode="contain"
                                        />
                                        <View className="mb-8 bg-white h-14 w-14 rounded-full items-center justify-center shadow-md">
                                            <Play size={24} color={featuredGame.accent} fill={featuredGame.accent} />
                                        </View>
                                    </View>
                                </LinearGradient>

                                <View className="p-6 pt-8 bg-white">
                                    <Text className="text-2xl font-bold text-slate-800 mb-1">{featuredGame.title}</Text>
                                    <Text className="text-slate-500 font-medium leading-6">
                                        {featuredGame.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    )}

                    {/* Other Games Grid */}
                    <View className="px-6">
                        <Text className="text-lg font-bold text-slate-800 mb-4">More Activities</Text>
                        <View className="flex-row flex-wrap justify-between gap-y-4">
                            {otherGames.map((game, index) => (
                                <Animated.View
                                    key={game.id}
                                    entering={FadeInDown.delay(200 + index * 100).springify()}
                                    className="w-[48%]"
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => router.push(game.route as any)}
                                        className="w-full bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100"
                                    >
                                        <LinearGradient
                                            colors={game.gradient}
                                            className="h-40 w-full items-center justify-center p-4"
                                        >
                                            {/* Tag */}
                                            <View className="absolute top-3 left-3 bg-white/60 px-2 py-0.5 rounded-full">
                                                <Text className={`text-[10px] font-bold ${game.textAccent} uppercase`}>
                                                    {game.tag}
                                                </Text>
                                            </View>

                                            <Image
                                                source={game.image}
                                                className="w-full h-full"
                                                resizeMode="contain"
                                            />
                                        </LinearGradient>

                                        <View className="p-4 bg-white">
                                            <View className="flex-row items-center gap-2 mb-1">
                                                {game.icon}
                                                <Text className="text-slate-800 font-bold text-base flex-1" numberOfLines={1}>
                                                    {game.title}
                                                </Text>
                                            </View>
                                            <Text className="text-slate-400 text-xs font-medium">
                                                {game.subtitle}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>
                            ))}
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
