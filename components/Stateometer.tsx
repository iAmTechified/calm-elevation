import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Svg, { Path, G, Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';

// Helper to calculate arc path
const createArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    // startAngle/endAngle in degrees, 0 is at 3 o'clock (Right)
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
        "M", start.x, start.y,
        "A", r, r, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
};

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};

const AnimatedG = Animated.createAnimatedComponent(G);

interface StateometerProps {
    score?: number; // 0 to 100
}

export const Stateometer: React.FC<StateometerProps> = ({ score = 85 }) => {
    // Fixed sizes for better control as requested
    const gaugeSize = 120;
    const cx = gaugeSize / 2;
    const cy = gaugeSize / 2;

    // Radii configuration for the "Image-like" look
    // Outer thin line
    const outerRadius = (gaugeSize / 2) - 5;
    // Inner thick segments (gap of ~4px from outer line)
    const segmentStrokeWidth = 14;
    const segmentRadius = outerRadius - 4 - (segmentStrokeWidth / 2);

    // Animation
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(score, {
            duration: 1500,
            easing: Easing.out(Easing.back(1.5)),
        });
    }, [score]);

    // Needle Rotation
    const animatedProps = useAnimatedProps(() => {
        const rotation = ((100 - progress.value) / 100) * 180;
        return {
            transform: [{ rotate: `${rotation}deg` }, { translateX: 0 }, { translateY: 0 }],
        };
    });

    // Segments configuration
    const segments = [
        { color: '#34d399', start: 0, end: 36 },      // Emerald
        { color: '#a3e635', start: 36, end: 72 },     // Lime
        { color: '#facc15', start: 72, end: 108 },    // Yellow
        { color: '#fbbf24', start: 108, end: 144 },   // Orange
        { color: '#fb7185', start: 144, end: 180 },   // Red
    ];

    return (
        <View className="flex-row items-center justify-center p-4 pt-2">
            {/* Mascot Image - Bigger */}
            <View className="w-[100px] h-[100px] items-center justify-center -mr-6 z-10">
                <Image
                    source={require('../assets/cal-at-stateometer.png')}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                />
            </View>

            {/* Gauge - Smaller & style match */}
            <View style={{ width: gaugeSize - 10 , height: gaugeSize - 10 }} className="items-center justify-center rotate-90">
                <Svg width={gaugeSize} height={gaugeSize - 50}>
                    <G x={cx} y={cy}>
                        {/* Outer Thin Line Track */}
                        <Path
                            d={createArc(0, 0, outerRadius, 0, 180)}
                            fill="none"
                            stroke="#cbd5e1" // slate-300
                            strokeWidth={3}
                            strokeLinecap="round"
                        />

                        {/* Inner Segments */}
                        {segments.map((seg, index) => (
                            <Path
                                key={index}
                                d={createArc(0, 0, segmentRadius, seg.start + 3, seg.end - 3)}
                                fill="none"
                                stroke={seg.color}
                                strokeWidth={segmentStrokeWidth}
                                strokeLinecap="butt" // Blocky look
                            />
                        ))}

                        {/* Needle Group */}
                        <AnimatedG animatedProps={animatedProps}>
                            {/* Pivot Circle */}
                            <Circle r="5" fill="#1e293b" />
                            {/* Needle Line */}
                            <Path
                                d={`M0,-2 L-${segmentRadius - 2},0 L0,2 Z`}
                                fill="#1e293b"
                            />
                        </AnimatedG>
                    </G>
                </Svg>
            </View>
        </View>
    );
};
