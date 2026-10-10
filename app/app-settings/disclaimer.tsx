import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';

import { useTranslation } from 'react-i18next';

export default function Disclaimer() {
    const router = useRouter();
    const { t } = useTranslation();
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
                    <Text className="text-xl font-bold text-slate-800 dark:text-white">{t('disclaimer.title')}</Text>
                </View>
            </View>

            <ScrollView className="flex-1 p-6" contentContainerStyle={{ paddingBottom: 40 }}>
                <Text className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {t('disclaimer.appName')}
                </Text>

                <Text className="text-slate-600 dark:text-slate-300 text-base mb-8 leading-6">
                    {t('disclaimer.intro')}
                </Text>

                <View className="mb-8">
                    <Text className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {t('disclaimer.notMedicalTitle')}
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-300 text-base leading-6">
                        {t('disclaimer.notMedicalP1')}
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-300 text-base leading-6 mt-4">
                        {t('disclaimer.notMedicalP2')}
                    </Text>
                </View>

                <View className="mb-8">
                    <Text className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {t('disclaimer.emergencyTitle')}
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-300 text-base leading-6">
                        {t('disclaimer.emergencyP1')}
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-300 text-base leading-6 mt-4">
                        {t('disclaimer.emergencyP2')}
                    </Text>
                </View>

                <View className="mb-8">
                    <Text className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {t('disclaimer.noGuaranteesTitle')}
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-300 text-base leading-6">
                        {t('disclaimer.noGuaranteesText')}
                    </Text>
                </View>

                <View className="mb-8">
                    <Text className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {t('disclaimer.discretionTitle')}
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-300 text-base leading-6">
                        {t('disclaimer.discretionText')}
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
