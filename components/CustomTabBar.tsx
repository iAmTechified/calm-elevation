import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
import { Plus, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import Colors from '../constants/Colors';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

function TabButton({
    descriptor,
    isFocused,
    onPress,
    onLongPress
}: {
    descriptor: any,
    isFocused: boolean,
    onPress: () => void,
    onLongPress: () => void
}) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePress = () => {
        scale.value = withSequence(
            withSpring(0.9),
            withSpring(1)
        );
        onPress();
    };

    const { options } = descriptor;
    const label =
        options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
                ? options.title
                : descriptor.route.name;

    const Icon = options.tabBarIcon;

    return (
        <AnimatedTouchableOpacity
            onPress={handlePress}
            onLongPress={onLongPress}
            style={[styles.tabButton, animatedStyle]}
            activeOpacity={0.8}
        >
            <View className="items-center justify-center gap-1">
                {Icon && <Icon
                    color={isFocused ? (descriptor.options.tabBarActiveTintColor || Colors.light.text) : (descriptor.options.tabBarInactiveTintColor || Colors.light.textSecondary)}
                    size={28}
                    fill={isFocused ? (descriptor.options.tabBarActiveTintColor || Colors.light.text) : (descriptor.options.tabBarInactiveTintColor || Colors.light.textSecondary)}
                    strokeWidth={isFocused ? 5 : 4}
                />}
                <Text
                    className={`text-sm font-semibold`}
                    style={{
                        color: isFocused ? (descriptor.options.tabBarActiveTintColor || Colors.light.text) : (descriptor.options.tabBarInactiveTintColor || Colors.light.textSecondary)
                    }}
                >
                    {label}
                </Text>
            </View>
        </AnimatedTouchableOpacity>
    );
}

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

    // We assume 2 tabs: Index 0 (Journey) and Index 1 (Stats).
    // Center button sits in between.

    return (
        <>
            <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: colors.background, borderTopColor: colors.border }]}>
                {/* Left Tab (Journey) */}
                {state.routes[0] && (
                    <TabButton
                        descriptor={{
                            ...descriptors[state.routes[0].key],
                            options: {
                                ...descriptors[state.routes[0].key].options,
                                tabBarActiveTintColor: colors.text,
                                tabBarInactiveTintColor: colors.textSecondary,
                            }
                        }}
                        isFocused={state.index === 0}
                        onPress={() => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: state.routes[0].key,
                                canPreventDefault: true,
                            });
                            if (state.index !== 0 && !event.defaultPrevented) {
                                navigation.navigate(state.routes[0].name);
                            }
                        }}
                        onLongPress={() => { }}
                    />
                )}

                {/* Center 3D Button */}
                <View style={styles.centerParams}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => router.push('/chat')}
                        style={styles.centerButtonContainer}
                    >
                        {/* 3D Effect Layers */}
                        <View style={styles.buttonShadow} />
                        <View style={[styles.buttonBody, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Sparkles size={32} color="white" />
                        </View>
                        <View style={styles.buttonShine} />
                    </TouchableOpacity>
                </View>

                {/* Right Tab (Stats) */}
                {state.routes[1] && (
                    <TabButton
                        descriptor={{
                            ...descriptors[state.routes[1].key],
                            options: {
                                ...descriptors[state.routes[1].key].options,
                                tabBarActiveTintColor: colors.text,
                                tabBarInactiveTintColor: colors.textSecondary,
                            }
                        }}
                        isFocused={state.index === 1}
                        onPress={() => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: state.routes[1].key,
                                canPreventDefault: true,
                            });
                            if (state.index !== 1 && !event.defaultPrevented) {
                                navigation.navigate(state.routes[1].name);
                            }
                        }}
                        onLongPress={() => { }}
                    />
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9', // slate-100
        height: 100, // Fixed height to accommodate button
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: 20,
        paddingBottom: 20,
    },
    centerParams: {
        width: 80,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align to top
        marginTop: -35, // Pop out
        zIndex: 50,
    },
    centerButtonContainer: {
        width: 70,
        height: 70,
        position: 'relative',
    },
    buttonShadow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        backgroundColor: '#374151', // slate-700
        borderRadius: 35,
        transform: [{ scaleX: 1 }],
    },
    buttonBody: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60, // Taller body
        backgroundColor: '#3A8E91', // primary
        borderRadius: 35,
        borderBottomWidth: 12,
        borderBottomColor: '#254F51', // primaryLight (darker shade)
        zIndex: 2,
    },
    buttonShine: {
        position: 'absolute',
        top: 5,
        left: 15,
        width: 40,
        height: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        zIndex: 3,
        transform: [{ rotate: '-10deg' }]
    }
});
