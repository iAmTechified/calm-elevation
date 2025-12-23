import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Svg, { Path, G, Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

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
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Gauge Dimensions
    const gaugeSize = 100;
    const cx = gaugeSize / 2;
    const cy = gaugeSize / 2;
    const outerRadius = (gaugeSize / 2) - 5;
    const segmentStrokeWidth = 12;
    const segmentRadius = outerRadius - (segmentStrokeWidth / 2);

    // Animation Shared Value
    const progress = useSharedValue(0);

    // Mascot Logic
    const [mascotParams, setMascotParams] = React.useState({
        image: require('../assets/cal.png'),
    });

    useEffect(() => {
        if(progress.value !== score){
        progress.value = withTiming(score, {
            duration: 1200,
            easing: Easing.out(Easing.quad),
        });

        let newImage;
        if (score < 30) {
            newImage = require('../assets/unmotivated.png');
        } else if (score < 55) {
            newImage = require('../assets/dizzy.png');
        } else if (score < 75) {
            newImage = require('../assets/worried.png');
        } else if (score < 90) {
            newImage = require('../assets/determined.png');
        } else {
            newImage = require('../assets/happy.png');
        }
        if (mascotParams.image !== newImage) {
            setMascotParams({ image: newImage });
        }
    }
    }, [score]);

    // Needle Animation
    // Vertical Arc: 270 deg (Bottom) -> 90 deg (Top) traversing Left side.
    // The needle starts pointing right (0 deg).
    // To align with the arc, 0 score should be at 270 degrees (bottom).
    // 100 score should be at 90 degrees (top).
    const animatedProps = useAnimatedProps(() => {
        // Map 0-100 to 0-180 degrees (increasing angle for increasing score)
        // The range is 180 degrees.
        // Start at 180 (bottom), end at 0 (top).
        // For score 0, rotation is 90. For score 100, rotation is -90.
        const rotationDeg = 90 - (progress.value / 100) * 180;
        console.log(rotationDeg, score)
        return {
            transform: [
                { rotate: `${rotationDeg}deg` } // Rotate around (0,0) which is center due to <G x={cx} y={cy}>
            ]
        };
    });

    // Segments: 5 steps, 180 degrees total (36 deg each)
    // Starting at 270 (Bottom), going to 90 (Top)
    // Order: Red (Low/Bottom) -> Green (High/Top)
    const segments = [
        { color: '#ff3e3eff', start: 234, end: 270 },     // Red (Warning)
        { color: '#fb7a24ff', start: 198, end: 234 },    // Orange
        { color: '#facc15', start: 162, end: 198 },    // Yellow
        { color: '#a3e635', start: 127, end: 162 },    // Lime
        { color: '#34d399', start: 90, end: 125 },    // Green (Success)
    ];

    const needleColor = isDark ? '#f8fafc' : '#1e293b';
    const dividerColor = isDark ? '#1e293b' : '#f8fafc';
    const trackColor = isDark ? '#4b5563' : '#cbd5e1';

    return (
        <View className="flex-row items-center justify-center p-4 pt-2">
            {/* Mascot Image */}
            <View className="w-[100px] h-[100px] items-center justify-center -mr-0 z-10 relative">
                <Animated.Image
                    key={mascotParams.image}
                    source={mascotParams.image}
                    style={{ width: "100%", height: "100%", position: 'absolute', marginTop: 10, zIndex: 1 }}
                    resizeMode="cover"
                    entering={FadeIn.duration(500)}
                    exiting={FadeOut.duration(500)}
                />
                {/* Mascot shadow */}
                <View className='absolute bottom-0 bg-black/5 dark:bg-black/10 rounded-full w-full h-[10px] z-0'></View>
            </View>

            {/* Vertical Curved Gauge */}
            <View style={{ width: gaugeSize / 5, height: gaugeSize }} className="items-center justify-center">
                <Svg width={gaugeSize} height={gaugeSize}>
                    <G x={cx} y={cy}>
                        {/* Track Background (Vertical Left Arc) */}
                        <Path
                            d={createArc(0, 0, outerRadius, 90, 270)} // Start 270 (bottom), End 90 (top)
                            fill="none"
                            stroke={trackColor}
                            strokeWidth={3}
                            strokeLinecap="round"
                        />

                        {/* Colored Segments */}
                        {segments.map((seg, index) => (
                            <Path
                                key={index}
                                d={createArc(0, 0, segmentRadius + 1, seg.start, seg.end)} // Adjusted for decreasing angles
                                fill="none"
                                stroke={seg.color}
                                strokeWidth={segmentStrokeWidth}
                                strokeLinecap="round"
                            />
                        ))}

                        {/* Needle */}
                        <AnimatedG animatedProps={animatedProps}>
                            {/* Pivot */}
                            <Circle r="5" fill={needleColor} />
                            {/* Pointer Line - Drawn pointing RIGHT at 0 deg, so we rotate it to match range */}
                            <Path
                                d={`M0,-2 L${segmentRadius + 5},0 L0,2 Z`} // Modified to point RIGHT (Positive X)
                                fill={needleColor}
                            />
                        </AnimatedG>
                    </G>
                </Svg>
            </View>
        </View>
    );
};
