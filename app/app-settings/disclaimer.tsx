import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';

export default function Disclaimer() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-900" edges={['top']}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

            {/* Header */}
            <View className="px-4 py-4 flex-row items-center bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-full"
                >
                    <X size={24} color={colorScheme === 'dark' ? '#fff' : '#334155'} />
                </TouchableOpacity>
                <View className="flex-1 items-center mr-10">
                    <Text className="text-xl font-bold text-slate-800 dark:text-white">Disclaimer</Text>
                </View>
            </View>

            <ScrollView className="flex-1 p-6" contentContainerStyle={{ paddingBottom: 40 }}>
                <Text className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    Calm Elevation – Disclaimer
                </Text>

                <Text className="text-slate-600 dark:text-slate-300 text-base mb-8 leading-6">
                    Calm Elevation is a self-help and wellness application designed to support relaxation, stress reduction, panic relief, and emotional well-being. The content provided in this app—including exercises, audio, text, and guidance—is for educational and informational purposes only.
                </Text>

                <View className="mb-8">
                    <Text className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        Not Medical or Mental Health Advice
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-300 text-base leading-6">
                        Calm Elevation does not provide medical, psychological, or psychiatric advice, diagnosis, or treatment. The app is not a substitute for professional medical care, therapy, or mental health services.
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-300 text-base leading-6 mt-4">
                        Always seek the advice of a qualified healthcare provider or licensed mental health professional regarding any medical or mental health condition. Never disregard professional advice or delay seeking it because of something you have read or experienced in this app.
                    </Text>
                </View>

                <View className="mb-8">
                    <Text className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        Emergency Situations
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-300 text-base leading-6">
                        Calm Elevation is not intended for use in emergencies.
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-300 text-base leading-6 mt-4">
                        If you are experiencing a mental health crisis or feel that you or someone else may be in immediate danger, please contact your local emergency number or a trusted crisis support service right away.
                    </Text>
                </View>

                <View className="mb-8">
                    <Text className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        No Guarantees
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-300 text-base leading-6">
                        Individual results may vary. Calm Elevation does not guarantee specific outcomes or relief from anxiety, panic, or other emotional conditions.
                    </Text>
                </View>

                <View className="mb-8">
                    <Text className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        Use at Your Own Discretion
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-300 text-base leading-6">
                        By using Calm Elevation, you acknowledge that you are responsible for your own well-being and decisions. Use the app at your own discretion and stop using it if you feel uncomfortable or distressed.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
