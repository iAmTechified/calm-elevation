import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, PanResponder, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { ArrowLeft, RefreshCw, Eraser, Shovel } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

type Tool = 'rake' | 'stone' | 'smooth';

interface Point {
    x: number;
    y: number;
}

interface DrawingPath {
    d: string;
    color: string;
    width: number;
}

interface Stone {
    x: number;
    y: number;
    size: number;
    color: string;
}

export default function ZenGardenScreen() {
    const router = useRouter();
    const [paths, setPaths] = useState<DrawingPath[]>([]);
    const [currentPath, setCurrentPath] = useState<string>('');
    const [stones, setStones] = useState<Stone[]>([]);
    const [activeTool, setActiveTool] = useState<Tool>('rake');

    // Random stone variations
    const stoneColors = ['#94A3B8', '#64748B', '#475569', '#CBD5E1'];

    // Rake tool logic
    const handlePanResponderMove = (event: any, gestureState: any) => {
        const { locationX, locationY } = event.nativeEvent;

        if (activeTool === 'rake') {
            const point = `${locationX},${locationY}`;
            setCurrentPath((prev) => prev ? `${prev} L ${point}` : `M ${point}`);
        }
    };

    const handlePanResponderGrant = (event: any) => {
        const { locationX, locationY } = event.nativeEvent;

        if (activeTool === 'stone') {
            const newStone: Stone = {
                x: locationX,
                y: locationY,
                size: Math.random() * 20 + 20, // 20-40 size
                color: stoneColors[Math.floor(Math.random() * stoneColors.length)],
            };
            setStones([...stones, newStone]);
        } else if (activeTool === 'rake') {
            const point = `${locationX},${locationY}`;
            setCurrentPath(`M ${point}`);
        }
    };

    const handlePanResponderRelease = () => {
        if (activeTool === 'rake' && currentPath) {
            setPaths([...paths, {
                d: currentPath,
                color: '#D6CDB8', // Darker sand 
                width: 25
            }]);
            setCurrentPath(''); // Reset current path
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: handlePanResponderGrant,
            onPanResponderMove: handlePanResponderMove,
            onPanResponderRelease: handlePanResponderRelease,
        })
    ).current;

    const clearGarden = () => {
        setPaths([]);
        setStones([]);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#FDF6E3]" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between z-10 bg-[#FDF6E3]">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-sm"
                >
                    <ArrowLeft color="#1E293B" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-slate-800">Zen Garden</Text>
                <TouchableOpacity
                    onPress={clearGarden}
                    className="w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-sm"
                >
                    <RefreshCw color="#1E293B" size={20} />
                </TouchableOpacity>
            </View>

            {/* Canvas */}
            <View className="flex-1 w-full relative" {...panResponder.panHandlers}>

                {/* Background Texture Hint (Optional) */}
                <View className="absolute inset-0 bg-[#F5E6CC] opacity-50" />

                <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                    {/* Drawn Paths (Rake marks) */}
                    {paths.map((p, index) => (
                        <Path
                            key={index}
                            d={p.d}
                            stroke={p.color}
                            strokeWidth={p.width}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    ))}
                    {/* Current Path being drawn */}
                    {currentPath ? (
                        <Path
                            d={currentPath}
                            stroke="#D6CDB8"
                            strokeWidth={25}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    ) : null}

                    {/* Stones */}
                    {stones.map((stone, index) => (
                        <Circle
                            key={`stone-${index}`}
                            cx={stone.x}
                            cy={stone.y}
                            r={stone.size}
                            fill={stone.color}
                            stroke="#00000010"
                            strokeWidth={2}
                        />
                    ))}
                </Svg>

                <View pointerEvents="none" className="absolute bottom-4 left-0 right-0 items-center">
                    <Text className="text-slate-500/50 text-sm font-medium">
                        {activeTool === 'rake' ? 'Drag to rake sand' : 'Tap to place stones'}
                    </Text>
                </View>
            </View>

            {/* Toolbar */}
            <View className="px-6 py-6 bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)] flex-row justify-around items-center">
                <TouchableOpacity
                    onPress={() => setActiveTool('rake')}
                    className={`items-center justify-center p-3 rounded-2xl ${activeTool === 'rake' ? 'bg-orange-100' : 'bg-transparent'}`}
                >
                    <Text className="text-2xl mb-1">🧹</Text>
                    <Text className={`text-xs font-bold ${activeTool === 'rake' ? 'text-orange-600' : 'text-slate-400'}`}>Rake</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setActiveTool('stone')}
                    className={`items-center justify-center p-3 rounded-2xl ${activeTool === 'stone' ? 'bg-slate-200' : 'bg-transparent'}`}
                >
                    <Text className="text-2xl mb-1">🪨</Text>
                    <Text className={`text-xs font-bold ${activeTool === 'stone' ? 'text-slate-700' : 'text-slate-400'}`}>Stone</Text>
                </TouchableOpacity>

                {/* Smooth/Eraser just mimics raking with background color or just "smooth" tool */}
                {/* Actually let's just keep it simple with Rake and Stone for now, ensuring relaxation */}
            </View>

        </SafeAreaView>
    );
}
