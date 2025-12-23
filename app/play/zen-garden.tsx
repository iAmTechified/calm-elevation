import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, PanResponder, Dimensions, StyleSheet, Platform, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { ArrowLeft, RefreshCw } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useStats } from '../../hooks/useStats';
import { useColorScheme } from 'nativewind';

const { width, height } = Dimensions.get('window');

// --- Configuration ---
const PALETTE = {
    sandBase: '#E6DEC7',
    sandShadow: '#C7BCA5', // The color of the groove
    sandLight: '#FFFBF0',
    stoneColors: ['#57534E', '#78716C', '#A8A29E', '#D6D3D1'],
    uiText: '#57534E',
    darkSandBase: '#1c1917',
    darkSandShadow: '#292524',
    darkUiText: '#f5f5f4'
};

const THRESHOLDS = {
    calmSpeed: 150, // px/ms roughly? No, px/s.
    // PanResponder velocity is in px/ms typically? actually gestureState.vx is px/ms
    // Let's test standard values. Usually vx=1 is approx 1000px/s.
    // So 0.5 is moderate. 2.0 is fast.
    skipSpeed: 1.5, // If speed > 1.5, skip drawing
    hapticInterval: 50, // ms between haptics
};

// --- Types ---
type Tool = 'rake' | 'stone';

interface Point {
    x: number;
    y: number;
}

interface DrawingPath {
    id: string;
    d: string; // The SVG path string
    width: number;
    opacity: number;
}

interface Stone {
    id: string;
    x: number;
    y: number;
    size: number;
    color: string;
}

// --- Helpers ---

// Simple quadratic bezier curve smoothing
const getSmoothedPath = (points: Point[]) => {
    if (points.length < 2) return '';

    // Start with move to first point
    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
        // Simple line for now to ensure performance, or quadratic
        // For true smoothing we need midpoints
        const p0 = points[i - 1];
        const p1 = points[i];

        // Midpoint
        const midX = (p0.x + p1.x) / 2;
        const midY = (p0.y + p1.y) / 2;

        // Quadratic curve from p0 to mid
        // ACTUALLY: Standard approach is to use p0 as start, p1 as control?
        // Let's just use simple Catmull-Rom-ish by using midpoints as anchors
        // d += ` Q ${p0.x} ${p0.y} ${midX} ${midY}`; 
        // This is better for live drawing:
        d += ` L ${p1.x} ${p1.y}`;
    }
    return d;
};

// Better smoothing for finalized paths
const getSplinePath = (points: Point[]) => {
    if (points.length < 2) return '';
    if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;

    let d = `M ${points[0].x} ${points[0].y}`;

    // Use midpoints for quadratic bezier
    for (let i = 1; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const midX = (p0.x + p1.x) / 2;
        const midY = (p0.y + p1.y) / 2;
        d += ` Q ${p0.x} ${p0.y}, ${midX} ${midY}`;
    }

    // Last point
    const last = points[points.length - 1];
    d += ` L ${last.x} ${last.y}`;

    return d;
};


export default function ZenGardenScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { updateEmotionalState } = useStats();

    // --- State ---
    const [activeTool, setActiveTool] = useState<Tool>('rake');
    const [paths, setPaths] = useState<DrawingPath[]>([]);
    const [stones, setStones] = useState<Stone[]>([]);

    // Live Drawing State (Refs for performance)
    const currentPoints = useRef<Point[]>([]);
    const [currentPathD, setCurrentPathD] = useState<string>('');
    const lastPointTime = useRef<number>(0);
    const lastHapticTime = useRef<number>(0);

    // UI State
    const [isSkipping, setIsSkipping] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current; // For skipping feedback

    // --- Logic ---

    const clearGarden = () => {
        setPaths([]);
        setStones([]);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,

            onPanResponderGrant: (evt) => {
                const { locationX, locationY } = evt.nativeEvent;

                if (activeTool === 'stone') {
                    // Place stone
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    const newStone: Stone = {
                        id: Date.now().toString(),
                        x: locationX,
                        y: locationY,
                        size: 15 + Math.random() * 25,
                        color: PALETTE.stoneColors[Math.floor(Math.random() * PALETTE.stoneColors.length)],
                    };
                    setStones(prev => [...prev, newStone]);
                    updateEmotionalState(0.05);
                } else {
                    // Start Raking
                    currentPoints.current = [{ x: locationX, y: locationY }];
                    setCurrentPathD(`M ${locationX} ${locationY}`);
                    lastPointTime.current = Date.now();
                }
            },

            onPanResponderMove: (evt, gestureState) => {
                const { locationX, locationY } = evt.nativeEvent;
                const now = Date.now();

                // Active Tool check
                if (activeTool !== 'rake') return;

                // Calculate Velocity
                const velocity = Math.sqrt(gestureState.vx * gestureState.vx + gestureState.vy * gestureState.vy);

                // 1. Enter Skipping Mode (High Speed)
                if (velocity > THRESHOLDS.skipSpeed) {
                    if (!isSkipping) {
                        setIsSkipping(true);
                        // Commit what we have so far so it doesn't disappear
                        if (currentPoints.current.length > 2) {
                            const smoothD = getSplinePath(currentPoints.current);
                            setPaths(prev => [...prev, {
                                id: Date.now().toString(),
                                d: smoothD,
                                width: 28,
                                opacity: 1
                            }]);
                        }
                        // Reset current styling
                        currentPoints.current = [];
                        setCurrentPathD('');

                        // Haptic "Error" or "Lift" sensation
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                    return;
                }

                // 2. Exit Skipping Mode (Return to Calm)
                if (isSkipping) {
                    if (velocity < THRESHOLDS.skipSpeed * 0.8) { // Hysteresis to prevent flickering
                        setIsSkipping(false);
                        // Start new path here
                        currentPoints.current = [{ x: locationX, y: locationY }];
                        setCurrentPathD(`M ${locationX} ${locationY}`);
                        lastPointTime.current = now;
                    } else {
                        return; // Still too fast
                    }
                }

                // 3. Normal Drawing

                // Min distance check
                const lastPoint = currentPoints.current.length > 0
                    ? currentPoints.current[currentPoints.current.length - 1]
                    : { x: locationX, y: locationY };

                const dx = locationX - lastPoint.x;
                const dy = locationY - lastPoint.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > 5 || currentPoints.current.length === 0) {
                    currentPoints.current.push({ x: locationX, y: locationY });

                    // Live Update
                    if (currentPoints.current.length === 1) {
                        setCurrentPathD(`M ${locationX} ${locationY}`);
                    } else {
                        setCurrentPathD(prev => `${prev} L ${locationX} ${locationY}`);
                    }

                    // Therapeutic Haptics
                    if (now - lastHapticTime.current > THRESHOLDS.hapticInterval) {
                        if (velocity < 0.5) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        lastHapticTime.current = now;
                    }
                }
            },

            onPanResponderRelease: () => {
                if (activeTool === 'rake' && currentPoints.current.length > 2) {
                    const smoothD = getSplinePath(currentPoints.current);
                    setPaths(prev => [...prev, {
                        id: Date.now().toString(),
                        d: smoothD,
                        width: 28,
                        opacity: 1
                    }]);
                    updateEmotionalState(0.05);
                }

                setCurrentPathD('');
                currentPoints.current = [];
                setIsSkipping(false);
            }
        })
    ).current;

    return (
        <View style={{ flex: 1, backgroundColor: isDark ? PALETTE.darkSandBase : PALETTE.sandBase }}>
            {/* Background Texture/Gradient */}

            {/* Header */}
            <SafeAreaView edges={['top']} style={{ zIndex: 10 }}>
                <View className="px-6 py-4 flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 bg-white/50 dark:bg-slate-800/50 rounded-full items-center justify-center"
                    >
                        <ArrowLeft color={isDark ? PALETTE.darkUiText : PALETTE.uiText} size={24} />
                    </TouchableOpacity>

                    <Text className="text-xl font-medium" style={{ color: isDark ? PALETTE.darkUiText : PALETTE.uiText }}>Zen Garden</Text>

                    <TouchableOpacity
                        onPress={clearGarden}
                        className="w-10 h-10 bg-white/50 dark:bg-slate-800/50 rounded-full items-center justify-center"
                    >
                        <RefreshCw color={isDark ? PALETTE.darkUiText : PALETTE.uiText} size={20} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Canvas */}
            <View className="flex-1" {...panResponder.panHandlers}>
                <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                    <Defs>
                        <LinearGradient id="stoneGrad" x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0" stopColor="white" stopOpacity="0.8" />
                            <Stop offset="1" stopColor="black" stopOpacity="0.2" />
                        </LinearGradient>
                    </Defs>

                    {/* 1. The Shadows (Grooves) */}
                    {paths.map((p) => (
                        <Path
                            key={p.id}
                            d={p.d}
                            stroke={isDark ? PALETTE.darkSandShadow : PALETTE.sandShadow}
                            strokeWidth={p.width}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    ))}

                    {/* 2. Current Drawing */}
                    {currentPathD ? (
                        <Path
                            d={currentPathD}
                            stroke={isSkipping ? (isDark ? PALETTE.darkSandBase : PALETTE.sandBase) : (isDark ? PALETTE.darkSandShadow : PALETTE.sandShadow)} // Fade out if skipping
                            strokeWidth={isSkipping ? 5 : 28}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            // strokeOpacity={isSkipping ? 0.2 : 1}
                            fill="none"
                        />
                    ) : null}

                    {/* 3. Stones (Above groves) */}
                    {stones.map((stone) => (
                        <G key={stone.id} x={stone.x} y={stone.y}>
                            {/* Shadow */}
                            <Circle
                                cx={2} cy={2}
                                r={stone.size}
                                fill="black"
                                opacity={0.2}
                            />
                            {/* Stone Body */}
                            <Circle
                                cx={0} cy={0}
                                r={stone.size}
                                fill={stone.color}
                            />
                            {/* Highlight */}
                            <Circle
                                cx={-stone.size * 0.3}
                                cy={-stone.size * 0.3}
                                r={stone.size * 0.4}
                                fill="white"
                                opacity={0.1}
                            />
                        </G>
                    ))}
                </Svg>

                {/* Skipping Feedback */}
                {isSkipping && (
                    <View className="absolute top-10 w-full items-center">
                        <Text className="text-slate-400 dark:text-slate-300 font-medium tracking-widest bg-white/80 dark:bg-slate-800/80 px-4 py-1 rounded-full overflow-hidden">
                            SLOW DOWN
                        </Text>
                    </View>
                )}

                {/* Initial Instruction */}
                {paths.length === 0 && stones.length === 0 && !currentPathD && (
                    <View pointerEvents="none" className="absolute inset-0 items-center justify-center">
                        <Text className="text-slate-400/60 dark:text-slate-500/60 text-lg font-medium text-center px-10">
                            Move slowly to shape the sand.{"\n"}
                            Breathe.
                        </Text>
                    </View>
                )}
            </View>

            {/* Toolbar */}
            <SafeAreaView edges={['bottom']} className="bg-white/90 dark:bg-slate-800/90">
                <View className="px-6 pb-2 pt-4 flex-row justify-center gap-8">
                    <TouchableOpacity
                        onPress={() => setActiveTool('rake')}
                        className={`items-center justify-center p-4 rounded-3xl ${activeTool === 'rake' ? (isDark ? 'bg-slate-700' : 'bg-[#E6DEC7]') : 'bg-transparent'}`}
                    >
                        <Text className="text-2xl mb-1 opacity-80">🧹</Text>
                        <Text className="text-xs font-bold text-[#57534E] dark:text-slate-300">Rake</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setActiveTool('stone')}
                        className={`items-center justify-center p-4 rounded-3xl ${activeTool === 'stone' ? (isDark ? 'bg-slate-700' : 'bg-[#E6DEC7]') : 'bg-transparent'}`}
                    >
                        <Text className="text-2xl mb-1 opacity-80">🪨</Text>
                        <Text className="text-xs font-bold text-[#57534E] dark:text-slate-300">Stone</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
