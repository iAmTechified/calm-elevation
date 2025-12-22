import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, PanResponder, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, RefreshCw } from 'lucide-react-native';
import { Rect } from 'react-native-svg';
import Svg from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const CELL_SIZE = 30;
const COLS = Math.floor((width - 40) / CELL_SIZE); // Padding
const ROWS = Math.floor((height * 0.6) / CELL_SIZE);

type Cell = {
    x: number;
    y: number;
    walls: { top: boolean; right: boolean; bottom: boolean; left: boolean };
    visited: boolean;
};

export default function MindfulMazeScreen() {
    const router = useRouter();
    const [grid, setGrid] = useState<Cell[]>([]);
    const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
    const [goalPos, setGoalPos] = useState({ x: COLS - 1, y: ROWS - 1 });

    // Animation bits
    const playerX = useSharedValue(0);
    const playerY = useSharedValue(0);

    const playerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: playerX.value },
                { translateY: playerY.value },
            ],
        };
    });

    const generateMaze = () => {
        let newGrid: Cell[] = [];
        for (let j = 0; j < ROWS; j++) {
            for (let i = 0; i < COLS; i++) {
                newGrid.push({
                    x: i,
                    y: j,
                    walls: { top: true, right: true, bottom: true, left: true },
                    visited: false,
                });
            }
        }

        const stack: Cell[] = [];
        let current = newGrid[0];
        current.visited = true;

        const getIndex = (i: number, j: number) => {
            if (i < 0 || j < 0 || i > COLS - 1 || j > ROWS - 1) return -1;
            return i + j * COLS;
        };

        const checkNeighbors = (cell: Cell) => {
            const neighbors = [];

            const top = newGrid[getIndex(cell.x, cell.y - 1)];
            const right = newGrid[getIndex(cell.x + 1, cell.y)];
            const bottom = newGrid[getIndex(cell.x, cell.y + 1)];
            const left = newGrid[getIndex(cell.x - 1, cell.y)];

            if (top && !top.visited) neighbors.push(top);
            if (right && !right.visited) neighbors.push(right);
            if (bottom && !bottom.visited) neighbors.push(bottom);
            if (left && !left.visited) neighbors.push(left);

            if (neighbors.length > 0) {
                const r = Math.floor(Math.random() * neighbors.length);
                return neighbors[r];
            } else {
                return undefined;
            }
        };

        stack.push(current);

        while (stack.length > 0) {
            current = stack.pop()!;
            const next = checkNeighbors(current);
            if (next) {
                stack.push(current);

                if (current.x - next.x === 1) { // Next is Left
                    current.walls.left = false;
                    next.walls.right = false;
                } else if (current.x - next.x === -1) { // Next is Right
                    current.walls.right = false;
                    next.walls.left = false;
                }

                if (current.y - next.y === 1) { // Next is Top
                    current.walls.top = false;
                    next.walls.bottom = false;
                } else if (current.y - next.y === -1) { // Next is Bottom
                    current.walls.bottom = false;
                    next.walls.top = false;
                }

                next.visited = true;
                stack.push(next);
            }
        }

        setGrid(newGrid);
        setPlayerPos({ x: 0, y: 0 });
        // Reset animation instantly (or close to it)
        playerX.value = 5;
        playerY.value = 5;
    };

    useEffect(() => {
        generateMaze();
    }, []);

    // Sync player pos with animation
    useEffect(() => {
        playerX.value = withSpring(playerPos.x * CELL_SIZE + 5, { damping: 15, stiffness: 120 });
        playerY.value = withSpring(playerPos.y * CELL_SIZE + 5, { damping: 15, stiffness: 120 });
    }, [playerPos]);

    const movePlayer = (dx: number, dy: number) => {
        if (grid.length === 0) return;

        const currentIndex = playerPos.x + playerPos.y * COLS;
        const currentCell = grid[currentIndex];

        // Check walls before moving
        let blocked = false;
        if (dx === 1 && currentCell.walls.right) blocked = true;
        if (dx === -1 && currentCell.walls.left) blocked = true;
        if (dy === 1 && currentCell.walls.bottom) blocked = true;
        if (dy === -1 && currentCell.walls.top) blocked = true;

        if (blocked) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            // Optional: subtle shake animation?
            return;
        }

        const newX = playerPos.x + dx;
        const newY = playerPos.y + dy;

        if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS) {
            setPlayerPos({ x: newX, y: newY });
            Haptics.selectionAsync();

            if (newX === goalPos.x && newY === goalPos.y) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                Alert.alert("You made it!", "Take a deep breath.", [
                    { text: "Play Again", onPress: generateMaze }
                ]);
            }
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderRelease: (e, gestureState) => {
                const { dx, dy } = gestureState;
                if (Math.abs(dx) > Math.abs(dy)) {
                    if (Math.abs(dx) > 20) {
                        movePlayer(dx > 0 ? 1 : -1, 0);
                    }
                } else {
                    if (Math.abs(dy) > 20) {
                        movePlayer(0, dy > 0 ? 1 : -1);
                    }
                }
            },
        })
    ).current;


    return (
        <SafeAreaView className="flex-1 bg-lime-50" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between z-10">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-sm"
                >
                    <ArrowLeft color="#1E293B" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-slate-800">Mindful Maze</Text>
                <TouchableOpacity
                    onPress={generateMaze}
                    className="w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-sm"
                >
                    <RefreshCw color="#1E293B" size={20} />
                </TouchableOpacity>
            </View>

            <View
                className="flex-1 items-center justify-center"
                {...panResponder.panHandlers}
            >
                <View style={{ width: COLS * CELL_SIZE, height: ROWS * CELL_SIZE, position: 'relative' }}>
                    <Svg height="100%" width="100%">
                        {/* Draw Walls */}
                        {grid.map((cell, index) => {
                            const x = cell.x * CELL_SIZE;
                            const y = cell.y * CELL_SIZE;
                            const lines = [];
                            const strokeColor = "#65A30D";
                            const strokeWidth = 3;
                            // Rounded lines
                            if (cell.walls.top) lines.push(<Rect key={`${index}-t`} x={x} y={y} width={CELL_SIZE} height={strokeWidth} rx={1.5} fill={strokeColor} />);
                            if (cell.walls.left) lines.push(<Rect key={`${index}-l`} x={x} y={y} width={strokeWidth} height={CELL_SIZE} rx={1.5} fill={strokeColor} />);
                            // Right/Bottom handled by neighbors mostly, but need border
                            if (cell.walls.right) lines.push(<Rect key={`${index}-r`} x={x + CELL_SIZE - strokeWidth} y={y} width={strokeWidth} height={CELL_SIZE} rx={1.5} fill={strokeColor} />);
                            if (cell.walls.bottom) lines.push(<Rect key={`${index}-b`} x={x} y={y + CELL_SIZE - strokeWidth} width={CELL_SIZE} height={strokeWidth} rx={1.5} fill={strokeColor} />);
                            return lines;
                        })}
                    </Svg>

                    {/* Goal */}
                    <View
                        style={{
                            position: 'absolute',
                            left: goalPos.x * CELL_SIZE + 5,
                            top: goalPos.y * CELL_SIZE + 5,
                            width: CELL_SIZE - 10,
                            height: CELL_SIZE - 10,
                        }}
                        className="items-center justify-center"
                    >
                        <View className="w-full h-full bg-purple-500 rounded-full animate-pulse opacity-80" />
                        <View className="absolute w-4 h-4 bg-purple-300 rounded-full" />
                    </View>

                    {/* Animated Player with absolute 0,0 and Reanimated transform */}
                    <Animated.View
                        style={[{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: CELL_SIZE - 10,
                            height: CELL_SIZE - 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, playerStyle]}
                    >
                        <Image
                            source={require('../../assets/cal.png')}
                            style={{ width: '130%', height: '130%' }}
                            resizeMode="contain"
                        />
                    </Animated.View>
                </View>

                <View className="mt-8 px-8">
                    <Text className="text-slate-500 font-medium text-center">Swipe to guide the little blob.</Text>
                </View>

            </View>
        </SafeAreaView>
    );
}
