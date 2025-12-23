import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnJS,
    useAnimatedReaction,
    Easing,
    interpolate,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
// const CENTER_X = width / 2;
// const CENTER_Y = height / 2;
const ORB_RADIUS = 50;
const DRIFT_FORCE_SCALE = 1.2; // Multiplier for drift distance
const SAFE_ZONE_RADIUS = 20;

// Game States
type GameState = 'idle' | 'active' | 'stabilizing' | 'centered';

export default function InnerBalanceGame() {
    const router = useRouter();
    const [gameState, setGameState] = useState<GameState>('idle');
    const [sessionTime, setSessionTime] = useState(0);

    // --- Animation Values ---

    // The Orb's actual position (Driven by Drift + User Offset)
    const orbX = useSharedValue(0);
    const orbY = useSharedValue(0);

    // The "Natural" Drift position (Where the orb WANTS to go)
    const driftX = useSharedValue(0);
    const driftY = useSharedValue(0);

    // User's temporary offset (Drag)
    const userOffsetX = useSharedValue(0);
    const userOffsetY = useSharedValue(0);

    // Visual cues
    const orbScale = useSharedValue(1);
    const orbOpacity = useSharedValue(0.6);
    const backgroundIntensity = useSharedValue(0);
    const guideTextOpacity = useSharedValue(1);
    // const guideText = useSharedValue("Touch the light to begin");

    // Physics params
    // const stabilityScore = useSharedValue(0); // 0 to 100
    const timeInZone = useSharedValue(0);

    // --- Helpers ---

    const triggerHaptics = (style: 'light' | 'medium' | 'heavy' | 'selection') => {
        switch (style) {
            case 'light': Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); break;
            case 'medium': Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); break;
            case 'heavy': Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); break;
            case 'selection': Haptics.selectionAsync(); break;
        }
    };

    // --- Game Loop (Drift Logic) ---

    // We simulate "Noise" by summing sine waves
    useEffect(() => {
        if (gameState !== 'active' && gameState !== 'stabilizing') return;

        const startTime = Date.now();
        const interval = setInterval(() => {
            const t = (Date.now() - startTime) / 1000;

            // Complex drift function: multiple frequencies
            // X drift: primarily slower, wider side-to-side
            const dX = (Math.sin(t * 0.5) * 60) + (Math.cos(t * 1.3) * 30);

            // Y drift: tendency to float up/down gently
            const dY = (Math.sin(t * 0.4) * 60) + (Math.cos(t * 1.7) * 30);

            driftX.value = withTiming(dX * DRIFT_FORCE_SCALE, { duration: 100, easing: Easing.linear });
            driftY.value = withTiming(dY * DRIFT_FORCE_SCALE, { duration: 100, easing: Easing.linear });

        }, 100); // 10fps physics update for drift target is sufficient, animation interpolation handles smoothness

        const sessionTimer = setInterval(() => {
            setSessionTime(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(sessionTimer);
        };
    }, [gameState]);


    // --- Combined Position Reaction ---
    // Every frame, calculate where the orb should be: Drift + User Input
    useAnimatedReaction(
        () => {
            // Calculate resultant position
            // The user offset counters the drift.
            // Ideally Position = Drift + UserInput. 
            // To "Balance", UserInput must be approx -Drift.
            return {
                x: driftX.value + userOffsetX.value,
                y: driftY.value + userOffsetY.value
            };
        },
        (pos) => {
            orbX.value = withSpring(pos.x, { damping: 20, stiffness: 90 });
            orbY.value = withSpring(pos.y, { damping: 20, stiffness: 90 });

            // Check distance from center
            const dist = Math.sqrt(pos.x * pos.x + pos.y * pos.y);

            if (dist < SAFE_ZONE_RADIUS) {
                // In zone
                if (timeInZone.value < 100) {
                    timeInZone.value = withTiming(timeInZone.value + 1, { duration: 16 });
                }
            } else {
                // Out of zone, decay stability
                if (timeInZone.value > 0) {
                    timeInZone.value = withTiming(timeInZone.value - 2, { duration: 16 });
                }
            }
        }
    );

    // Monitor Stability for State Changes
    useAnimatedReaction(
        () => timeInZone.value,
        (currentStability, prevStability) => {
            if (currentStability > 90 && (!prevStability || prevStability <= 90)) {
                runOnJS(triggerHaptics)('heavy');
            }
            if (currentStability < 20) {
                backgroundIntensity.value = withTiming(0);
            } else {
                backgroundIntensity.value = withTiming(currentStability / 100);
            }
        }
    );

    const startGame = () => {
        triggerHaptics('heavy');
        setGameState('active');

        orbScale.value = withSpring(1.2);
        orbOpacity.value = withTiming(1, { duration: 1000 });
        guideTextOpacity.value = withTiming(0, { duration: 500 });

        // Initial centering
        orbX.value = 0;
        orbY.value = 0;
    };

    // const endGame = () => {
    //     setGameState('centered');
    //     triggerHaptics('medium');
    //     setTimeout(() => {
    //         router.back();
    //     }, 3000); // Wait 3s then leave
    // };

    // --- Gestures ---

    const panGesture = Gesture.Pan()
        .onStart(() => {
            if (gameState === 'idle') {
                runOnJS(startGame)();
            }
        })
        .onUpdate((e) => {
            if (gameState !== 'active' && gameState !== 'stabilizing') return;

            // Dampening Logic:
            // High velocity inputs are ignored or greatly reduced to efficiently "punish" fast moves
            // We want the user to move SLOWLY.

            const velocityMagnitude = Math.sqrt(e.velocityX * e.velocityX + e.velocityY * e.velocityY);
            let dampeningFactor = 1;

            // If moving fast (> 1000 px/s), efficiency drops
            if (velocityMagnitude > 1500) {
                dampeningFactor = 0.1; // Slip!
            } else if (velocityMagnitude > 500) {
                dampeningFactor = 0.5; // Dragy
            }

            // Apply input to shared value
            // We add the change, but weighted by "calmness"
            // @ts-ignore
            userOffsetX.value += e.changeX * dampeningFactor;
            // @ts-ignore
            userOffsetY.value += e.changeY * dampeningFactor;
        })
        .onEnd(() => {
            // Drifting resumes freely if they let go
            // userOffsetX/Y stay where they are, essentially acting as a "trim"
            // But without active input, the drift (which is time-based) continues to pull it away.
            runOnJS(triggerHaptics)('light');
        });

    // --- Styles ---

    const orbStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: orbX.value },
                { translateY: orbY.value },
                { scale: orbScale.value } // Pulse slightly with stability?
            ],
            opacity: orbOpacity.value,
            shadowOpacity: interpolate(timeInZone.value, [0, 100], [0.2, 0.8]),
            shadowRadius: interpolate(timeInZone.value, [0, 100], [10, 40]),
        };
    });

    const centerGuideStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(timeInZone.value, [0, 100], [0.1, 0.0]), // Hide when centered to reduce visual noise
            transform: [{ scale: interpolate(timeInZone.value, [0, 100], [1, 1.5]) }]
        };
    });

    const backgroundStyle = useAnimatedStyle(() => {
        return {
            opacity: backgroundIntensity.value * 0.3 // Max 30% overlay opacity
        };
    });

    const textStyle = useAnimatedStyle(() => ({
        opacity: guideTextOpacity.value
    }));

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <View style={styles.container}>
                {/* Background Layers */}
                <LinearGradient
                    colors={['#0F172A', '#1E293B', '#0F172A']}
                    style={StyleSheet.absoluteFill}
                />

                {/* Dynamic Stability Glow - Fills screen when doing well */}
                <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: '#4F46E5' }, backgroundStyle]} />

                {/* Back Button */}
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="close" size={24} color="rgba(255,255,255,0.5)" />
                </Pressable>

                {/* Game Layer */}
                <GestureDetector gesture={panGesture}>
                    <View style={styles.gameArea}>

                        {/* The Target Center (Faint Ring) */}
                        <Animated.View style={[styles.targetRing, centerGuideStyle]} />

                        {/* The Orb (Player/Spirit) */}
                        <Animated.View style={[styles.orb, orbStyle]}>
                            <LinearGradient
                                colors={['#FFFFFF', '#E0E7FF', '#818CF8']}
                                locations={[0, 0.4, 1]}
                                style={styles.orbGradient}
                            />
                        </Animated.View>

                        {/* Guide Text */}
                        <Animated.Text style={[styles.guideText, textStyle]}>
                            Touch the light to begin
                        </Animated.Text>
                    </View>
                </GestureDetector>

                {/* Debug/Info (Optional) */}
                {/* <Text style={{position: 'absolute', bottom: 40, color: 'white'}}>{gameState}</Text> */}
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 100,
        padding: 10,
    },
    gameArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    targetRing: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        borderStyle: 'dashed',
    },
    orb: {
        width: ORB_RADIUS * 2,
        height: ORB_RADIUS * 2,
        borderRadius: ORB_RADIUS,
        shadowColor: '#818CF8',
        shadowOffset: { width: 0, height: 0 },
        elevation: 10,
    },
    orbGradient: {
        flex: 1,
        borderRadius: ORB_RADIUS,
    },
    guideText: {
        position: 'absolute',
        bottom: '15%',
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
        letterSpacing: 2,
        fontFamily: 'System', // Use default for now, can be custom font
        textTransform: 'uppercase',
    },
});
