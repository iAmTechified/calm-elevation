import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ArrowLeft, Minus, Plus, X, Smartphone, ArrowRight, ChevronRight } from 'lucide-react-native';
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
import Back from '../../components/Back';
import { useStats } from '../../hooks/useStats';
import { useColorScheme } from 'nativewind';
import { CheckInModal } from '../../components/CheckInModal';

// Assets
const IMG_YOGA = require('../../assets/breathr.jpeg');
const IMG_MEDITATE = require('../../assets/cal-cloud.png');
const IMG_SUCCESS = require('../../assets/cal_success.png');

const { width, height } = Dimensions.get('window');

const INHALE_DURATION = 4000;
const EXHALE_DURATION = 6000;

export default function BreatheScreen() {
    const router = useRouter();

    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    // State
    const [phase, setPhase] = useState<'setup' | 'active' | 'completed'>('setup');
    const [durationSeconds, setDurationSeconds] = useState(60);
    const [timeLeft, setTimeLeft] = useState(60);
    const [breathState, setBreathState] = useState<'inhale' | 'exhale' | 'hold'>('inhale');
    const [isHapticsEnabled, setIsHapticsEnabled] = useState(true);
    const [isCheckInVisible, setIsCheckInVisible] = useState(false);
    const { addTimeInBreathr, recordMood } = useStats();

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

        // Record stats (minimum 1 minute if they completed it)
        const minutes = Math.ceil(durationSeconds / 60);
        addTimeInBreathr(minutes);

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
        // Show check-in modal instead of immediate exit
        setIsCheckInVisible(true);
    };

    const handleCheckIn = async (moodScore: number) => {
        await recordMood(moodScore);
        setIsCheckInVisible(false);
        router.replace('../../(tabs)');
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
            <View className="flex-1 bg-white dark:bg-slate-900">
                <StatusBar style="auto" />
                <LinearGradient
                    colors={isDark ? ['#0f172a', '#1e293b', '#0f172a'] : ['#e0f2fe', '#fff', '#f0f9ff']}
                    style={StyleSheet.absoluteFillObject}
                />

                {/* Main Visual - Mascot as Focal Point */}
                <View className="absolute inset-0 flex-1 w-full h-full items-center justify-center -mt-20">
                    {/* Decorative Background Circle */}
                    <View className="absolute w-[120%] h-[60%] bg-teal-100/30 rounded-full blur-3xl opacity-50" />

                    <Image
                        source={IMG_YOGA}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                    />
                </View>

                <SafeAreaView className="flex-1 justify-between" edges={['top', 'bottom']}>
                    {/* Top Bar */}
                    <View className="px-6 py-4 flex-row items-center justify-between z-10">
                        <Back onPress={() => router.back()} style={isDark ? 'bg-slate-800' : 'bg-white'} iconColor={isDark ? '#fff' : '#000'} />
                        <Text className="text-2xl font-sans font-semibold text-primaryLight dark:text-white tracking-wide">Breathe</Text>
                        <View className="w-10" />
                    </View>


                    {/* Setup Controls - Floating Bottom Card */}
                    <View className="bg-white dark:bg-slate-800 backdrop-blur-md rounded-[40px] p-6 shadow-xl shadow-teal-900/10 border border-white/50 dark:border-slate-700/50 z-10">
                        {/* Time Control */}
                        <View className="flex-row items-center justify-center gap-6 mb-8">
                            <TouchableOpacity
                                onPress={() => adjustTime(-15)}
                                className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-full items-center justify-center active:bg-slate-200 dark:active:bg-slate-600">
                                <Minus size={18} stroke={isDark ? "#94a3b8" : "#334155"} strokeWidth={3} color={isDark ? "#94a3b8" : "#334155"} />
                            </TouchableOpacity>

                            <View className="items-center">
                                <Text className="text-3xl font-semibold text-slate-800 dark:text-white tabular-nums">
                                    {formatTime(durationSeconds)}
                                </Text>
                                <Text className="text-xs font-semibold text-primaryLight dark:text-slate-400 tracking-[0.2em] mt-1">DURATION</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => adjustTime(15)}
                                className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-full items-center justify-center active:bg-slate-200 dark:active:bg-slate-600">
                                <Plus size={18} stroke={isDark ? "#94a3b8" : "#334155"} strokeWidth={3} color={isDark ? "#94a3b8" : "#334155"} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={startSession}
                            className="w-full bg-teal-600 h-16 rounded-full flex-row items-center justify-center shadow-lg shadow-teal-600/30 active:scale-[0.98] transition-all">
                            <Text className="text-white font-semibold text-xl mr-2">Begin Session</Text>
                            <ChevronRight size={20} color="white" stroke="#fff" strokeWidth={4} />
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
            <View className="flex-1 bg-white dark:bg-slate-900">
                <StatusBar style="auto" />
                <LinearGradient
                    colors={isDark ? ['#0f172a', '#1e293b', '#0f172a'] : ['#6fc6c945', '#f0f636a9', '#6fc6c945']}
                    locations={[0.2, 0.4, 0.6]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                    className='opacity-10'
                    dither
                />


                {/* Huge Background Timer */}
                <View className="absolute inset-0 items-center justify-center z-[99] pointer-events-none">
                    <Text className="text-[120px] font-bold text-primaryLight/15 tabular-nums">
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </Text>
                </View>

                <SafeAreaView className="flex-1 justify-between z-[999]" edges={['top', 'bottom']}>
                    {/* Header */}
                    <View className="px-6 py-2 flex-row justify-between items-center z-20">
                        <TouchableOpacity
                            onPress={stopSession}
                            className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full items-center justify-center backdrop-blur-sm">
                            <X size={20} color={isDark ? "#fff" : "black"} stroke={isDark ? "#fff" : "#000"} fill={isDark ? "#fff" : "#000"} strokeWidth={5} />
                        </TouchableOpacity>
                        <View className="bg-white/10 dark:bg-slate-800/20 px-4 py-1 rounded-full">
                            <Text className="text-black/60 dark:text-white/60 font-semibold text-lg tracking-widest uppercase">{breathState}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsHapticsEnabled(!isHapticsEnabled)}
                            className={`w-10 h-10 rounded-full items-center justify-center backdrop-blur-sm ${isHapticsEnabled ? (isDark ? 'bg-teal-500/40' : 'bg-teal-500/20') : (isDark ? 'bg-white/20' : 'bg-white/60')}`}>
                            {isHapticsEnabled ? <Smartphone size={18} color={isDark ? "#2dd4bf" : "#00a891ff"} strokeWidth={4} /> : <Smartphone size={18} strokeWidth={5} stroke="#94a3b8" color="#94a3b8" />}
                        </TouchableOpacity>
                    </View>

                    {/* Central Focal Point */}
                    <View className="flex-1 items-center justify-center relative">
                        {/* Ripples */}
                        <Animated.View style={[ripple1Style]} className="absolute w-[400px] h-[400px] rounded-full bg-teal-500/10 border border-teal-500/20" />
                        <Animated.View style={[ripple2Style]} className="absolute w-[250px] h-[250px] rounded-full bg-teal-400/20" />

                    </View>

                    {/* Footer / Instructions */}
                    <View className="items-center pb-12">
                        <Text className="text-primaryLight dark:text-white text-3xl font-semibold font-sans tracking-widest opacity-80">
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
    const { CheckInModal } = require('../../components/CheckInModal'); // Dynamic require to avoid cycle if any? Or just regular import.
    // Actually better to use top level import. Fixing in next step if needed.

    if (phase === 'completed') {
        return (
            <View className="flex-1 bg-white dark:bg-slate-900">
                <StatusBar style="auto" />
                <LinearGradient
                    colors={['#6fc6c945', '#f0f636a9', '#6fc6c945']}
                    locations={[0.2, 0.4, 0.6]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                    className='opacity-10'
                    dither
                />

                <Animated.View entering={FadeIn.delay(200)} className="flex-1 items-center justify-center px-8">
                    <View className="relative items-center mb-10">
                        <View className="absolute w-44 h-44 bg-yellow-200/40 rounded-full blur-2xl -top-10" />
                        <Image
                            source={IMG_SUCCESS}
                            style={{ width: 200, height: 200 }}
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="text-3xl font-semibold font-sans text-slate-800 dark:text-white mb-3 text-center">Session Complete</Text>
                    <Text className="text-slate-500 dark:text-slate-400 font-sans text-lg text-center mb-12 leading-relaxed max-w-[80%]">
                        You've taken a moment for yourself. Carry this calmness with you.
                    </Text>

                    <Pressable
                        onPress={closeCompleted}
                        className="bg-slate-900 dark:bg-white w-full py-5 rounded-full shadow-xl shadow-slate-900/20 active:scale-[0.98]">
                        <Text className="text-white dark:text-slate-900 text-center font-semibold font-sans text-lg tracking-wide">Return Home</Text>
                    </Pressable>
                </Animated.View>

                <CheckInModal
                    visible={isCheckInVisible}
                    onClose={() => {
                        setIsCheckInVisible(false);
                        router.replace('../../(tabs)');
                    }}
                    onMoodSelect={handleCheckIn}
                />
            </View>
        );
    }

    return null;
}
