import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Pause, Play } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, { ZoomIn, ZoomOut, withSpring, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface Bubble {
    id: number;
    x: number;
    y: number;
    radius: number;
    speed: number;
    color: string;
    wobbleOffset: number;
}

const BUBBLE_COLORS = ['rgba(186, 230, 253, 0.6)', 'rgba(56, 189, 248, 0.5)', 'rgba(125, 211, 252, 0.5)', 'rgba(224, 242, 254, 0.7)'];
const SPAWN_RATE = 800; // ms

// Animated Bubble Component to handle entry/exit
const AnimatedBubble = ({ bubble, onPress }: { bubble: Bubble, onPress: () => void }) => {
    return (
        <Animated.View
            entering={ZoomIn.duration(400)}
            exiting={ZoomOut.duration(200)}
            style={{
                position: 'absolute',
                left: bubble.x - bubble.radius,
                top: bubble.y - bubble.radius,
                width: bubble.radius * 2,
                height: bubble.radius * 2,
            }}
        >
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={onPress}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: bubble.radius,
                    backgroundColor: bubble.color,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.8)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: "#fff",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                }}
            >
                {/* Shine effect */}
                <View className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-white rounded-full opacity-60" />
            </TouchableOpacity>
        </Animated.View>
    );
};

export default function BubblePopScreen() {
    const router = useRouter();
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [score, setScore] = useState(0);
    const requestRef = useRef<number | null>(null);
    const lastSpawnRef = useRef<number>(0);

    const spawnBubble = useCallback(() => {
        const id = Date.now() + Math.random();
        const radius = Math.random() * 30 + 30; // 30-60
        const x = Math.random() * (width - radius * 2) + radius;
        const speed = Math.random() * 1.5 + 0.5; // speed up a bit
        const color = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];

        return {
            id,
            x,
            y: height + radius, // Start below screen
            radius,
            speed,
            color,
            wobbleOffset: Math.random() * Math.PI * 2,
        };
    }, []);

    const updateBubbles = useCallback((time: number) => {
        if (!isPlaying) return;

        // Spawn
        if (time - lastSpawnRef.current > SPAWN_RATE) {
            setBubbles(prev => [...prev, spawnBubble()]);
            lastSpawnRef.current = time;
        }

        setBubbles(prev =>
            prev
                .map(b => ({
                    ...b,
                    y: b.y - b.speed, // Move up
                    x: b.x + Math.sin(time * 0.002 + b.wobbleOffset) * 0.5, // Gentle wobble
                }))
                .filter(b => b.y + b.radius > -100) // Remove if off screen top
        );

        requestRef.current = requestAnimationFrame(updateBubbles);
    }, [isPlaying, spawnBubble]);

    useEffect(() => {
        if (isPlaying) {
            requestRef.current = requestAnimationFrame(updateBubbles);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isPlaying, updateBubbles]);

    const popBubble = (id: number) => {
        if (!isPlaying) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setBubbles(prev => prev.filter(b => b.id !== id));
        setScore(current => current + 1);
    };

    return (
        <SafeAreaView className="flex-1 bg-sky-50" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between z-10">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-sm"
                >
                    <ArrowLeft color="#1E293B" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-slate-800 tracking-wider">Popped: {score}</Text>
                <TouchableOpacity
                    onPress={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-sm"
                >
                    {isPlaying ? <Pause color="#1E293B" size={20} /> : <Play color="#1E293B" size={20} />}
                </TouchableOpacity>
            </View>

            {/* Game Area */}
            <View className="flex-1 relative overflow-hidden">
                {bubbles.map(bubble => (
                    <AnimatedBubble
                        key={bubble.id}
                        bubble={bubble}
                        onPress={() => popBubble(bubble.id)}
                    />
                ))}

                {!isPlaying && (
                    <View className="absolute inset-0 items-center justify-center bg-white/20 backdrop-blur-sm z-20">
                        <Text className="text-2xl font-bold text-slate-700">Paused</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}
