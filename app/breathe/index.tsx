import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ArrowLeft, Minus, Plus, X, Smartphone, ArrowRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    Easing,
    interpolate,
    runOnJS,
    cancelAnimation,
    FadeIn,
    withDelay
} from 'react-native-reanimated';

// Assets
const IMG_YOGA = require('../../assets/cal_yoga.png');
const IMG_MEDITATE = require('../../assets/cal_meditate.png');
const IMG_SUCCESS = require('../../assets/cal_success.png');
const IMG_INHALE = require('../../assets/cal_inhale.png');
const IMG_EXHALE = require('../../assets/cal_exhale.png');

const { width, height } = Dimensions.get('window');

const INHALE_DURATION = 4000;
const EXHALE_DURATION = 6000;

export default function BreatheScreen() {
    const router = useRouter();

    // State
    const [phase, setPhase] = useState<'setup' | 'active' | 'completed'>('setup');
    const [durationSeconds, setDurationSeconds] = useState(60);
    const [timeLeft, setTimeLeft] = useState(60);
    const [breathState, setBreathState] = useState<'inhale' | 'exhale' | 'hold'>('inhale');
    const [isHapticsEnabled, setIsHapticsEnabled] = useState(true);

    // Anim Values
    const scale = useSharedValue(1);
    const ripple1Scale = useSharedValue(1);
    const ripple2Scale = useSharedValue(1);
    const rippleOpacity = useSharedValue(0.5);

    // Refs
    const timerRef = useRef<any>(null);
    const breathCycleRef = useRef<any>(null);

    const formatTime = (totalSeconds: number) => {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const adjustTime = (delta: number) => {
        setDurationSeconds(prev => {
            const newVal = Math.max(30, Math.min(600, prev + delta));
            return newVal;
        });
    };

    const triggerHaptic = (type: 'tick' | 'phase') => {
        if (!isHapticsEnabled) return;
        if (type === 'tick') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
    }

    const startSession = () => {
        setTimeLeft(durationSeconds);
        setPhase('active');
        setBreathState('inhale');
        startBreathingCycle();
    };

    const startBreathingCycle = () => {
        // Reset animated values
        scale.value = 1;
        ripple1Scale.value = 1;
        ripple2Scale.value = 1;
        rippleOpacity.value = 0.5;

        const runCycle = () => {
            setBreathState('inhale');
            runOnJS(triggerHaptic)('phase');

            // Inhale Animation
            scale.value = withTiming(1.3, { duration: INHALE_DURATION, easing: Easing.bezier(0.25, 1, 0.5, 1) });
            ripple1Scale.value = withTiming(1.5, { duration: INHALE_DURATION, easing: Easing.out(Easing.quad) });
            ripple2Scale.value = withDelay(400, withTiming(1.5, { duration: INHALE_DURATION, easing: Easing.out(Easing.quad) }));
            rippleOpacity.value = withTiming(0, { duration: INHALE_DURATION });

            breathCycleRef.current = setTimeout(() => {
                setBreathState('exhale');
                runOnJS(triggerHaptic)('phase');

                // Exhale Animation
                scale.value = withTiming(1, { duration: EXHALE_DURATION, easing: Easing.bezier(0.25, 1, 0.5, 1) });
                ripple1Scale.value = withTiming(1, { duration: EXHALE_DURATION });
                ripple2Scale.value = withTiming(1, { duration: EXHALE_DURATION });
                rippleOpacity.value = withTiming(0.5, { duration: EXHALE_DURATION });

                breathCycleRef.current = setTimeout(runCycle, EXHALE_DURATION);
            }, INHALE_DURATION);
        };

        runCycle();

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endSession();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const endSession = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (breathCycleRef.current) clearTimeout(breathCycleRef.current);
        cancelAnimation(scale);
        cancelAnimation(ripple1Scale);
        cancelAnimation(ripple2Scale);
        cancelAnimation(rippleOpacity);
        setPhase('completed');
        if (isHapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    const stopSession = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (breathCycleRef.current) clearTimeout(breathCycleRef.current);
        cancelAnimation(scale);
        cancelAnimation(ripple1Scale);
        cancelAnimation(ripple2Scale);
        cancelAnimation(rippleOpacity);
        setPhase('setup');
    };

    const closeCompleted = () => {
        router.push('/');
    };

    // Styles
    const mascotAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    const ripple1Style = useAnimatedStyle(() => ({
        transform: [{ scale: ripple1Scale.value }],
        opacity: rippleOpacity.value
    }));

    const ripple2Style = useAnimatedStyle(() => ({
        transform: [{ scale: ripple2Scale.value }],
        opacity: rippleOpacity.value * 0.7
    }));

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (breathCycleRef.current) clearTimeout(breathCycleRef.current);
        }
    }, []);

    // --------------------------------------------------------------------------------
    // RENDER: SETUP
    // --------------------------------------------------------------------------------
    if (phase === 'setup') {
        return (
            <View className="flex-1">
                <StatusBar style="dark" />
                <LinearGradient
                    colors={['#e0f2fe', '#fff', '#f0f9ff']}
                    style={StyleSheet.absoluteFillObject}
                />

                <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
                    {/* Top Bar */}
                    <View className="px-6 py-2 flex-row items-center justify-between z-10">
                        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white/60 rounded-full items-center justify-center border border-white">
                            <ArrowLeft size={24} color="#0f766e" />
                        </TouchableOpacity>
                        <Text className="text-lg font-semibold text-teal-900 tracking-wide">BREATHR</Text>
                        <View className="w-10" />
                    </View>

                    {/* Main Visual - Mascot as Focal Point */}
                    <View className="flex-1 items-center justify-center -mt-20">
                        {/* Decorative Background Circle */}
                        <View className="absolute w-[120%] h-[60%] bg-teal-100/30 rounded-full blur-3xl opacity-50" />

                        <Image
                            source={IMG_YOGA}
                            style={{ width: width * 0.85, height: width * 0.85 }}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Setup Controls - Floating Bottom Card */}
                    <View className="mx-6 mb-6 bg-white/90 backdrop-blur-md rounded-[32px] p-6 shadow-xl shadow-teal-900/10 border border-white/50">
                        {/* Time Control */}
                        <View className="flex-row items-center justify-between mb-8">
                            <TouchableOpacity
                                onPress={() => adjustTime(-15)}
                                className="w-14 h-14 bg-slate-100 rounded-full items-center justify-center active:bg-slate-200">
                                <Minus size={24} color="#334155" />
                            </TouchableOpacity>

                            <View className="items-center">
                                <Text className="text-4xl font-light text-slate-800 tabular-nums">
                                    {formatTime(durationSeconds)}
                                </Text>
                                <Text className="text-xs font-bold text-teal-600 tracking-[0.2em] mt-1">DURATION</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => adjustTime(15)}
                                className="w-14 h-14 bg-slate-100 rounded-full items-center justify-center active:bg-slate-200">
                                <Plus size={24} color="#334155" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={startSession}
                            className="w-full bg-teal-600 h-16 rounded-full flex-row items-center justify-center shadow-lg shadow-teal-600/30 active:scale-[0.98] transition-all">
                            <Text className="text-white font-bold text-xl mr-2">Begin Session</Text>
                            <ArrowRight size={20} color="white" strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    // --------------------------------------------------------------------------------
    // RENDER: ACTIVE
    // --------------------------------------------------------------------------------
    if (phase === 'active') {
        return (
            <View className="flex-1">
                <StatusBar style="light" />
                <LinearGradient
                    colors={['#0f172a', '#115e59', '#0f172a']} // Dark Zen Gradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                />

                {/* Huge Background Timer */}
                <View className="absolute inset-0 items-center justify-center z-0 pointer-events-none">
                    <Text className="text-[180px] font-bold text-white/5 tabular-nums">
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </Text>
                </View>

                <SafeAreaView className="flex-1 justify-between" edges={['top', 'bottom']}>
                    {/* Header */}
                    <View className="px-6 py-2 flex-row justify-between items-center z-20">
                        <TouchableOpacity
                            onPress={stopSession}
                            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center backdrop-blur-sm">
                            <X size={20} color="white" />
                        </TouchableOpacity>
                        <View className="bg-white/10 px-4 py-1 rounded-full">
                            <Text className="text-white/80 font-medium text-xs tracking-widest uppercase">{breathState}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsHapticsEnabled(!isHapticsEnabled)}
                            className={`w-10 h-10 rounded-full items-center justify-center backdrop-blur-sm ${isHapticsEnabled ? 'bg-teal-500/20' : 'bg-white/10'}`}>
                            {isHapticsEnabled ? <Smartphone size={18} color="#2dd4bf" /> : <Smartphone size={18} color="#94a3b8" />}
                        </TouchableOpacity>
                    </View>

                    {/* Central Focal Point */}
                    <View className="flex-1 items-center justify-center relative">
                        {/* Ripples */}
                        <Animated.View style={[ripple1Style]} className="absolute w-[400px] h-[400px] rounded-full bg-teal-500/10 border border-teal-500/20" />
                        <Animated.View style={[ripple2Style]} className="absolute w-[350px] h-[350px] rounded-full bg-teal-400/10" />

                        {/* Mascot */}
                        <Animated.View style={mascotAnimatedStyle}>
                            <Image
                                source={IMG_MEDITATE}
                                style={{ width: width * 0.7, height: width * 0.7 }}
                                resizeMode="contain"
                            />
                        </Animated.View>
                    </View>

                    {/* Footer / Instructions */}
                    <View className="items-center pb-12">
                        <Text className="text-teal-200 text-lg font-light tracking-widest opacity-80">
                            {breathState === 'inhale' ? 'INHALE DEEPLY' : 'EXHALE SLOWLY'}
                        </Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    // --------------------------------------------------------------------------------
    // RENDER: COMPLETED
    // --------------------------------------------------------------------------------
    if (phase === 'completed') {
        return (
            <View className="flex-1 bg-white">
                <StatusBar style="dark" />
                <LinearGradient
                    colors={['#f0fdfa', '#fff']}
                    style={StyleSheet.absoluteFillObject}
                />

                <Animated.View entering={FadeIn.delay(200)} className="flex-1 items-center justify-center px-8">
                    <View className="relative items-center mb-10">
                        <View className="absolute w-64 h-64 bg-yellow-200/40 rounded-full blur-2xl -top-10" />
                        <Image
                            source={IMG_SUCCESS}
                            style={{ width: 300, height: 300 }}
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="text-3xl font-bold text-slate-800 mb-3 text-center">Session Complete</Text>
                    <Text className="text-slate-500 text-lg text-center mb-12 leading-relaxed max-w-[80%]">
                        You've taken a moment for yourself. Carry this calmness with you.
                    </Text>

                    <TouchableOpacity
                        onPress={closeCompleted}
                        className="bg-slate-900 w-full py-5 rounded-full shadow-xl shadow-slate-900/20 active:scale-[0.98]">
                        <Text className="text-white text-center font-bold text-lg tracking-wide">Return Home</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }

    return null;
}
