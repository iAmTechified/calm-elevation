import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Trash2 } from 'lucide-react-native';
import Svg, { Path, G } from 'react-native-svg';

const { width } = Dimensions.get('window');
const GRID_SIZE = 5;
const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 40; // visual height of top face
const LAYER_HEIGHT = 15; // pixels to shift up per layer

// Isometric projection helper
// x, y are grid coords (0..4)
// z is height (0..)
// Screen X = (x - y) * BLOCK_WIDTH / 2
// Screen Y = (x + y) * BLOCK_HEIGHT / 2 - (z * LAYER_HEIGHT)

export default function BlocksScreen() {
    const router = useRouter();
    // Grid of heights
    const [grid, setGrid] = useState<number[][]>(
        Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0))
    );

    const handleTap = (row: number, col: number) => {
        setGrid(prev => {
            const newGrid = [...prev].map(r => [...r]);
            if (newGrid[row][col] < 8) { // Max height 8
                newGrid[row][col] = newGrid[row][col] + 1;
            } else {
                newGrid[row][col] = 0; // Reset
            }
            return newGrid;
        });
    };

    const clearBlocks = () => {
        setGrid(Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0)));
    };

    // Calculate center offset to center the grid on screen
    const centerX = width / 2;
    const centerY = 200;

    const renderBlock = (r: number, c: number, h: number) => {
        const x = (c - r) * (BLOCK_WIDTH / 2);
        const y = (c + r) * (BLOCK_HEIGHT / 2) - (h * LAYER_HEIGHT);

        const fillColors = ["#F43F5E", "#FB7185", "#FDA4AF"]; // Top, Right, Left faces
        // Vary color by height slightly?

        // Base paths for a cube of size BLOCK_WIDTH x BLOCK_HEIGHT (isometric)
        const w = BLOCK_WIDTH / 2; // half width
        const hh = BLOCK_HEIGHT / 2; // half height of diamond

        // Top Face (Diamond)
        const topParams = `M 0 -${hh} L ${w} 0 L 0 ${hh} L -${w} 0 Z`;

        // Right Face
        const rightParams = `M ${w} 0 L ${w} ${hh * 2} L 0 ${hh * 3} L 0 ${hh} Z`;

        // Left Face
        const leftParams = `M 0 ${hh} L 0 ${hh * 3} L -${w} ${hh * 2} L -${w} 0 Z`;

        return (
            <G x={centerX + x} y={centerY + y} key={`${r}-${c}-${h}`} onPress={() => handleTap(r, c)}>
                {/* Shadow if h=0 */}
                {h === 0 && (
                    <Path d={topParams} fill="#E2E8F0" opacity={0.5} stroke="none" />
                )}
                {h > 0 && (
                    <>
                        <Path d={leftParams} fill="#F43F5E" />
                        <Path d={rightParams} fill="#FB7185" />
                        <Path d={topParams} fill="#FDA4AF" />
                        {/* Highlight/Stroke */}
                        <Path d={topParams} stroke="rgba(255,255,255,0.4)" strokeWidth={1} fill="none" />
                    </>
                )}
            </G>
        );
    };

    // Render cells in specific order (back to front) to handle occlusion
    // Order: rows 0..N, cols 0..N?
    // Actually standard painter algo for isometric: x+y ascending.
    const cellsToRender = [];
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            // For z from 0 to grid[r][c]
            // Actually we interact with column, so maybe we just render the top block?
            // But to look 3D we need the stack?
            // Or just one long extrusion? Extrusion is cleaner.
            // Let's render "stacks"
            // But simpler: just render the cell. If height > 0, we render offset.
            // and we must render cells sorted by r+c.
            cellsToRender.push({ r, c });
        }
    }

    cellsToRender.sort((a, b) => (a.r + a.c) - (b.r + b.c));

    return (
        <SafeAreaView className="flex-1 bg-rose-50" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between z-10">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-sm"
                >
                    <ArrowLeft color="#1E293B" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-slate-800">Builder</Text>
                <TouchableOpacity
                    onPress={clearBlocks}
                    className="w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-sm"
                >
                    <Trash2 color="#1E293B" size={20} />
                </TouchableOpacity>
            </View>

            <View className="flex-1" style={{ marginTop: 50 }}>
                <Svg height="100%" width="100%">
                    {cellsToRender.map((cell) => {
                        const h = grid[cell.r][cell.c];
                        const elements = [];

                        // Base/Ground tile (clickable area)
                        // We render an invisible clickable target at height 0?
                        // Or we just render the block at height h.

                        // Interactive hack: Render transparent target at top?

                        // Let's render the stack:
                        // Actually just rendering the top block looks floating.
                        // Let's render "segments" if we want towers.
                        // But for simplicity, let's just render the block at height H, 
                        // and maybe a "column" below it?

                        // Let's try drawing full column
                        for (let i = 0; i <= h; i++) {
                            if (i === 0 && h > 0) continue; // Skip ground if there's a block? No, keep ground shadow.
                            if (i > 0) {
                                // Render block
                                elements.push(renderBlock(cell.r, cell.c, i));
                            } else {
                                // Render base
                                const x = (cell.c - cell.r) * (BLOCK_WIDTH / 2);
                                const y = (cell.c + cell.r) * (BLOCK_HEIGHT / 2);
                                const hh = BLOCK_HEIGHT / 2;
                                const w = BLOCK_WIDTH / 2;
                                const topParams = `M 0 -${hh} L ${w} 0 L 0 ${hh} L -${w} 0 Z`;
                                elements.push(
                                    <G x={centerX + x} y={centerY + y} key={`base-${cell.r}-${cell.c}`} onPress={() => handleTap(cell.r, cell.c)}>
                                        <Path d={topParams} fill="#E2E8F0" stroke="#CBD5E1" strokeWidth={1} />
                                    </G>
                                );
                            }
                        }
                        return elements;
                    })}
                </Svg>

                <View className="absolute bottom-12 w-full items-center">
                    <Text className="text-slate-500 font-medium">Tap empty spots to build. Tap blocks to grow.</Text>
                </View>
            </View>

        </SafeAreaView>
    );
}
