import { View, ViewProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

interface ProgressHeaderProps {
    /** Progress value between 0 and 100 */
    progress: number;
    /** Component to render on the left (e.g., Back button) */
    leftElement?: React.ReactNode;
    /** Component to render on the right (e.g., Star button) */
    rightElement?: React.ReactNode;
    /** ClassName for the progress track container. Should include background color and height. Default matches onboarding style. */
    trackStyle?: string;
    /** ClassName for the progress fill bar. Should include background color. Default matches onboarding style. */
    progressStyle?: string;
    /** ClassName for the main container. Default matches onboarding style. */
    containerStyle?: string;
}

export default function ProgressHeader({
    progress,
    leftElement,
    rightElement,
    trackStyle = "h-[30px] p-2 bg-[#70C6C9] rounded-full",
    progressStyle = "bg-[#FFFD54]",
    containerStyle = "w-full flex-row justify-between items-center gap-3 px-6 pt-4 pb-2"
}: ProgressHeaderProps) {
    const progressValue = useSharedValue(progress);

    useEffect(() => {
        progressValue.value = withTiming(progress, { duration: 500 });
    }, [progress]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: `${progressValue.value}%`,
        };
    });

    return (
        <View className={containerStyle}>
            {leftElement && <View>{leftElement}</View>}

            <View className={`flex-1 justify-center items-start overflow-hidden ${trackStyle}`}>
                <Animated.View
                    className={`h-full rounded-full ${progressStyle}`}
                    style={[
                        { height: '100%' }, // Ensure it fills height if not set by class
                        animatedStyle
                    ]}
                />
            </View>

            {rightElement && <View>{rightElement}</View>}
        </View>
    );
}
