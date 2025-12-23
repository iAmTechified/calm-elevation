import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Pause, Play, Volume2, VolumeX, X, RotateCcw } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    runOnJS,
    Easing,
    cancelAnimation,
    interpolate,
    Extrapolation
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useStats } from '../../hooks/useStats';
import { useColorScheme } from 'nativewind';

const { width, height } = Dimensions.get('window');

// --- Configuration ---
const SPAWN_INTERVAL = 500; // Reduced spawn rate
const BASE_DURATION = 4000; // Slightly slower
const MAX_BUBBLES = 20;

const COLORS = [
    '#60A5FA', // Blue 400
    '#818CF8', // Indigo 400
    '#A78BFA', // Purple 400
    '#2DD4BF', // Teal 400
    '#38BDF8', // Sky 400
];

interface BubbleData {
    id: number;
    x: number;
    size: number;
    color: string;
    duration: number;
    isMascot: boolean;
}

// --- Components ---

// Individual Bubble Component (Self-managing animation)
const BubbleItem = React.memo(({
    data,
    onPop,
    onMiss,
    soundEnabled,
    isPlaying
}: {
    data: BubbleData,
    onPop: (id: number, isMascot: boolean, x: number, y: number) => void,
    onMiss: (id: number) => void,
    soundEnabled: boolean,
    isPlaying: boolean
}) => {
    // Initial positions
    const translateY = useSharedValue(height + data.size);
    const scale = useSharedValue(0.2); // Start small
    const opacity = useSharedValue(1);
    const wobble = useSharedValue(0);

    const isPopped = useRef(false);

    // Initial Entry
    useEffect(() => {
        scale.value = withSpring(1, { damping: 12 });
    }, []);

    // Handle Play/Pause & Movement
    useEffect(() => {
        if (isPlaying && !isPopped.current) {
            const currentPos = translateY.value;
            const targetPos = -data.size * 2;

            // Calculate remaining time to maintain constant speed
            const totalDistance = height + data.size - targetPos;
            const remainingDistance = Math.abs(currentPos - targetPos);
            // Safety check for 0
            if (totalDistance <= 0) return;

            const remainingTime = (remainingDistance / totalDistance) * data.duration;

            // Resume/Start vertical movement
            translateY.value = withTiming(targetPos, {
                duration: remainingTime,
                easing: Easing.linear,
            }, (finished) => {
                if (finished && !isPopped.current) {
                    runOnJS(onMiss)(data.id);
                }
            });

            // Resume/Start wobble
            // We map wobble 0->1 over the full duration. 
            // Current wobble matches current progress (approx). 
            // Better visual: just run wobble for remaining time.
            wobble.value = withTiming(1, {
                duration: remainingTime,
                easing: Easing.linear
            });

        } else if (!isPlaying) {
            cancelAnimation(translateY);
            cancelAnimation(wobble);
        }
    }, [isPlaying]);

    const handlePress = () => {
        if (isPopped.current || !isPlaying) return; // Prevent popping while paused
        isPopped.current = true;

        // Stop movement
        cancelAnimation(translateY);
        cancelAnimation(wobble);

        // Visual Pop Feedback
        scale.value = withSpring(1.4);
        opacity.value = withTiming(0, { duration: 150 }, () => {
            runOnJS(onPop)(data.id, data.isMascot, data.x, translateY.value);
        });

        // Haptics
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(
                data.isMascot
                    ? Haptics.ImpactFeedbackStyle.Heavy
                    : Haptics.ImpactFeedbackStyle.Light
            );
        }
    };

    const animatedStyle = useAnimatedStyle(() => {
        // Simple sine wave for horizontal wobble based on vertical progress
        const xOffset = Math.sin(wobble.value * Math.PI * 4) * 15;

        return {
            transform: [
                { translateY: translateY.value },
                { translateX: xOffset },
                { scale: scale.value }
            ],
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    left: data.x,
                    width: data.size,
                    height: data.size,
                },
                animatedStyle
            ]}
        >
            <Pressable
                onPressIn={handlePress}
                style={{ flex: 1 }}
            >
                <View
                    style={{
                        flex: 1,
                        borderRadius: data.size / 2,
                        backgroundColor: data.isMascot ? 'rgba(255,255,255,0.9)' : data.color,
                        borderWidth: 2,
                        borderColor: 'rgba(255,255,255,0.6)',
                        overflow: 'hidden',
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 4,
                    }}
                >
                    {/* Glossy Reflection */}
                    <View className="absolute top-[15%] right-[20%] w-[25%] h-[15%] rounded-[50%] bg-white opacity-60 transform -rotate-45" />

                    {data.isMascot && (
                        <Image
                            source={require('../../assets/cal.png')}
                            style={{ width: '70%', height: '70%', resizeMode: 'contain' }}
                        />
                    )}
                </View>
            </Pressable>
        </Animated.View>
    );
});

export default function BubblePopScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [bubbles, setBubbles] = useState<BubbleData[]>([]);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const { updateEmotionalState } = useStats();

    // Spawning Logic
    const spawnBubble = useCallback(() => {
        if (!isPlaying) return;

        setBubbles(current => {
            if (current.length >= MAX_BUBBLES) return current;

            const size = Math.random() * 40 + 50; // 50-90px
            const x = Math.random() * (width - size);
            const isMascot = Math.random() < 0.05; // 5% chance

            // Speed variance: Mascot bubbles are slightly faster
            const duration = isMascot
                ? BASE_DURATION * 0.8
                : BASE_DURATION * (0.8 + Math.random() * 0.6);

            return [...current, {
                id: Date.now() + Math.random(),
                x,
                size,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                duration,
                isMascot,
            }];
        });
    }, [isPlaying]);

    // Loop manager
    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(spawnBubble, SPAWN_INTERVAL);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPlaying, spawnBubble]);

    const handlePop = useCallback((id: number, isMascot: boolean, x: number, y: number) => {
        setBubbles(prev => prev.filter(b => b.id !== id));
        setScore(s => s + (isMascot ? 5 : 1));

        // Update State: Small increments for gameplay
        if (isMascot) {
            updateEmotionalState(0.05); // +0.05 per mascot
        } else {
            updateEmotionalState(0.01); // +0.01 per bubble
        }
    }, [updateEmotionalState]);

    const handleMiss = useCallback((id: number) => {
        setBubbles(prev => prev.filter(b => b.id !== id));
    }, []);

    const resetGame = () => {
        setBubbles([]);
        setScore(0);
        setIsPlaying(true);
    };

    return (
        <View className="flex-1 bg-white dark:bg-slate-900">
            {/* Background */}
            <LinearGradient
                colors={isDark ? ['#0F172A', '#1E293B', '#0F172A'] : ['#E0F2FE', '#F0F9FF', '#FDF2F8']}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            {/* Ambient Background Blobs */}
            <View className="absolute top-20 -left-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl" />
            <View className="absolute bottom-40 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />

            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
                {/* Header */}
                <View className="px-6 py-4 flex-row items-center justify-between z-40">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-full items-center justify-center border border-white/20 dark:border-slate-700/20 shadow-sm"
                    >
                        <X color={isDark ? '#e2e8f0' : '#334155'} size={20} />
                    </TouchableOpacity>

                    <View className="items-center">
                        <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Score</Text>
                        <Text className="text-3xl font-bold text-slate-800 dark:text-white">{score}</Text>
                    </View>

                    <View></View>
                </View>

                {/* Game Layer */}
                <View className="flex-1 relative z-10">
                    {bubbles.map(bubble => (
                        <BubbleItem
                            key={bubble.id}
                            data={bubble}
                            onPop={handlePop}
                            onMiss={handleMiss}
                            soundEnabled={soundEnabled}
                            isPlaying={isPlaying}
                        />
                    ))}
                </View>

                {/* Controls */}
                <View className="pb-8 px-8 items-center justify-center z-50">
                    <View className="flex-row items-center gap-6">
                        <TouchableOpacity
                            onPress={resetGame}
                            className="w-14 h-14 bg-white/80 dark:bg-slate-800/80 rounded-full items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700"
                        >
                            <RotateCcw color={isDark ? '#cbd5e1' : '#475569'} size={24} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIsPlaying(!isPlaying)}
                            className="w-20 h-20 bg-slate-800 rounded-full items-center justify-center shadow-xl shadow-slate-300"
                        >
                            {isPlaying ? (
                                <Pause color="white" size={32} fill="white" />
                            ) : (
                                <Play color="white" size={32} fill="white" className="ml-1" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Pause Overlay */}
                {!isPlaying && (
                    <BlurView intensity={20} className="absolute inset-0 z-30 justify-center items-center">
                        <View className="bg-white/90 dark:bg-slate-800/90 p-8 rounded-3xl items-center shadow-2xl">
                            <Text className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Paused</Text>
                            <Text className="text-slate-500 dark:text-slate-400 mb-6 font-medium">Take a breath...</Text>
                            <TouchableOpacity
                                onPress={() => setIsPlaying(true)}
                                className="bg-sky-500 px-8 py-3 rounded-xl shadow-lg shadow-sky-200"
                            >
                                <Text className="text-white font-bold text-lg">Resume</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                )}
            </SafeAreaView>
        </View>
    );
}
