import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Modal, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
    X,
    Bell,
    Share2,
    Star,
    Instagram,
    ChevronDown,
    ChevronRight,
    CircleHelp,
    AlertTriangle,
    LogOut,
    ExternalLink,
    Crown,
    Globe
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from '../../i18n';

import { useNotifications } from '../../hooks/useNotifications';

// Reusable Row Component
const SettingRow = ({
    label,
    value,
    type = 'switch',
    onPress,
    icon: Icon,
    color,
    switchValue,
    onSwitchChange
}: {
    label: string,
    value?: string,
    type?: 'switch' | 'link' | 'dropdown' | 'action',
    onPress?: () => void,
    icon?: any,
    color?: string,
    switchValue?: boolean,
    onSwitchChange?: (val: boolean) => void
}) => (
    <TouchableOpacity
        onPress={onPress}
        disabled={type === 'switch'}
        activeOpacity={0.7}
        className="flex-row items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800 px-4"
    >
        <View className="flex-row items-center">
            {Icon && (
                <View className="mr-3 p-2 bg-slate-50 dark:bg-slate-800 rounded-full">
                    <Icon size={20} color={color || "#64748b"} />
                </View>
            )}
            <Text className="text-slate-700 dark:text-slate-200 font-medium text-base">{label}</Text>
        </View>

        {type === 'switch' && (
            <Switch
                trackColor={{ false: "#e2e8f0", true: "#3A8E91" }}
                thumbColor={"#fff"}
                ios_backgroundColor="#e2e8f0"
                onValueChange={onSwitchChange}
                value={switchValue}
            />
        )}

        {type === 'dropdown' && (
            <View className="flex-row items-center">
                <Text className="text-[#3A8E91] font-medium mr-1">{value}</Text>
                <ChevronDown size={20} color="#3A8E91" />
            </View>
        )}

        {type === 'link' && <ChevronRight size={20} color="#cbd5e1" />}

        {type === 'action' && value && (
            <Text className="text-slate-400 font-medium mr-2">{value}</Text>
        )}
    </TouchableOpacity>
);

export default function AppSettings() {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const { colorScheme, setColorScheme } = useColorScheme();
    const [haptic, setHaptic] = React.useState(true);
    const [quotes, setQuotes] = React.useState(true);
    const { areNotificationsEnabled, toggleNotifications } = useNotifications();

    const toggleTheme = () => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    };

    const toggleLanguage = () => {
        const nextLang = i18n.language === 'nl' ? 'en' : 'nl';
        changeAppLanguage(nextLang);
    };

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
                    <Text className="text-xl font-bold text-slate-800 dark:text-white">{t('settings.title')}</Text>
                </View>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Top Section */}
                <View className="mt-2 bg-white dark:bg-slate-900">
                    <SettingRow
                        label={t('settings.unlockPremium')}
                        type="link"
                        icon={Crown}
                        color="#F59E0B"
                        onPress={() => router.push('/paywall?from=settings')}
                    />
                    <SettingRow
                        label={t('settings.language')}
                        type="dropdown"
                        icon={Globe}
                        color="#3A8E91"
                        value={i18n.language === 'nl' ? 'Nederlands' : 'English'}
                        onPress={toggleLanguage}
                    />
                    <SettingRow
                        label={t('settings.notifications')}
                        type="switch"
                        switchValue={areNotificationsEnabled}
                        onSwitchChange={toggleNotifications}
                        icon={Bell}
                        color="#3A8E91"
                    />
                    <SettingRow
                        label={t('settings.theme')}
                        type="dropdown"
                        value={colorScheme === 'dark' ? t('settings.dark') : t('settings.light')}
                        onPress={toggleTheme}
                    />
                </View>

                {/* Reminder Card - Dynamic Prompt */}
                {!areNotificationsEnabled && (
                    <View className="mx-4 mt-8 bg-orange-100 dark:bg-slate-800 rounded-3xl p-6 flex-row items-center shadow-sm">
                        <View className="flex-1 mr-4">
                            <Text className="text-slate-800 dark:text-white font-medium text-lg mb-4 leading-6">
                                {t('settings.reminderTitle')}
                            </Text>
                            <TouchableOpacity
                                onPress={() => toggleNotifications(true)}
                                className="bg-[#3A8E91] py-3 px-6 rounded-full self-start shadow-sm shadow-[#3A8E91]/20"
                            >
                                <Text className="text-white font-bold text-center">{t('settings.setReminders')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="justify-center items-center">
                            <Bell size={48} color="#F59E0B" fill="#F59E0B" />
                        </View>
                    </View>
                )}


                {/* Bottom Links */}
                <View className="mt-8 mx-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 overflow-hidden">
                    <TouchableOpacity
                        onPress={() => router.push('/app-settings/disclaimer')}
                        className="p-4 border-b border-slate-100 dark:border-slate-700 active:bg-slate-50 dark:active:bg-slate-700"
                    >
                        <Text className="text-slate-700 dark:text-slate-200 font-medium text-base">{t('settings.disclaimer')}</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View className="mt-8 mb-4 items-center px-4">
                    <View className="flex-row gap-4 mb-4">
                        <TouchableOpacity onPress={() => Linking.openURL('https://calmelevation.com/terms/')}>
                            <Text className="text-slate-400 dark:text-slate-500 text-xs underline">{t('settings.terms')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://calmelevation.com/privacy-policy/')}>
                            <Text className="text-slate-400 dark:text-slate-500 text-xs underline">{t('settings.privacy')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
