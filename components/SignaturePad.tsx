import React, { useState, useMemo, useRef } from 'react';
import { View, PanResponder, TouchableOpacity, Text, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SignaturePadProps {
    onChange?: (hasSignature: boolean) => void;
    color?: string;
    strokeWidth?: number;
    style?: ViewStyle;
    containerStyle?: string;
}

export default function SignaturePad({ onChange, color = '#254F51', strokeWidth = 3, style, containerStyle }: SignaturePadProps) {
    const [paths, setPaths] = useState<string[]>([]);
    const [currentPath, setCurrentPath] = useState<string | null>(null);
    const currentPathRef = useRef<string | null>(null);

    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
            const { locationX, locationY } = evt.nativeEvent;
            const newPath = `M${locationX.toFixed(1)},${locationY.toFixed(1)}`;
            currentPathRef.current = newPath;
            setCurrentPath(newPath);
        },
        onPanResponderMove: (evt) => {
            const { locationX, locationY } = evt.nativeEvent;
            if (currentPathRef.current) {
                const newPoint = ` L${locationX.toFixed(1)},${locationY.toFixed(1)}`;
                currentPathRef.current += newPoint;
                setCurrentPath(currentPathRef.current);
            }
        },
        onPanResponderRelease: () => {
            if (currentPathRef.current) {
                const finalPath = currentPathRef.current;
                setPaths(prevPaths => [...prevPaths, finalPath]);
                onChange?.(true);
            }
            currentPathRef.current = null;
            setCurrentPath(null);
        },
    }), [onChange]);

    const handleClear = () => {
        setPaths([]);
        setCurrentPath(null);
        currentPathRef.current = null;
        onChange?.(false);
    }

    return (
        <View className={`w-full ${containerStyle}`}>
            <View
                {...panResponder.panHandlers}
                style={[
                    {
                        height: 180,
                        width: '100%',
                        backgroundColor: '#f8fafc',
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: '#e2e8f0',
                        overflow: 'hidden'
                    },
                    style
                ]}
            >
                <Svg height="100%" width="100%">
                    {paths.map((d, index) => (
                        <Path key={index} d={d} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    ))}
                    {currentPath && (
                        <Path d={currentPath} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                </Svg>
            </View>
            <TouchableOpacity onPress={handleClear} className="mt-3 self-end px-2 py-1">
                <Text className="text-slate-400 font-sans text-xs uppercase tracking-wider">Clear Signature</Text>
            </TouchableOpacity>
        </View>
    );
}
