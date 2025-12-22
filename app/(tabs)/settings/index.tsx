import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    User,
    Bell,
    Moon,
    Shield,
    CircleHelp as HelpCircle,
    LogOut,
    ChevronRight,
    Settings as SettingsIcon
} from 'lucide-react-native';

const SectionHeader = ({ title }: { title: string }) => (
    <Text className="text-slate-500 font-semibold text-xs uppercase tracking-wider mb-3 ml-4 mt-6">
        {title}
    </Text>
);

const SettingItem = ({
    icon: Icon,
    label,
    value,
    onPress,
    isDestructive = false,
    hasSwitch = false,
    switchValue = false,
    onSwitchChange
}: {
    icon: any,
    label: string,
    value?: string,
    onPress?: () => void,
    isDestructive?: boolean,
    hasSwitch?: boolean,
    switchValue?: boolean,
    onSwitchChange?: (val: boolean) => void
}) => (
    <TouchableOpacity
        onPress={onPress}
        disabled={hasSwitch}
        activeOpacity={0.7}
        className="flex-row items-center bg-white p-4 mx-4 mb-3 rounded-2xl shadow-sm border border-slate-100"
    >
        <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${isDestructive ? 'bg-red-50' : 'bg-slate-50'}`}>
            <Icon size={20} color={isDestructive ? '#ef4444' : '#64748b'} />
        </View>

        <View className="flex-1">
            <Text className={`font-semibold text-base ${isDestructive ? 'text-red-500' : 'text-slate-800'}`}>
                {label}
            </Text>
        </View>

        {value && (
            <Text className="text-slate-400 font-medium mr-2">{value}</Text>
        )}

        {hasSwitch ? (
            <Switch
                trackColor={{ false: "#e2e8f0", true: "#3A8E91" }}
                thumbColor={"#fff"}
                ios_backgroundColor="#e2e8f0"
                onValueChange={onSwitchChange}
                value={switchValue}
            />
        ) : (
            <ChevronRight size={20} color="#cbd5e1" />
        )}
    </TouchableOpacity>
);

export default function SettingsScreen() {
    const [notifications, setNotifications] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <View className="flex-1 bg-slate-50">
                {/* Header */}
                <View className="px-6 py-4 bg-white border-b border-slate-100">
                    <Text className="text-2xl font-bold text-slate-800">Settings</Text>
                </View>

                <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                    {/* Profile Card */}
                    <View className="m-4 p-5 bg-[#3A8E91] rounded-3xl flex-row items-center shadow-lg shadow-[#3A8E91]/20">
                        <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center border-2 border-white/30 mr-4">
                            <User size={32} color="#fff" />
                        </View>
                        <View>
                            <Text className="text-white text-lg font-bold">Donald Brown</Text>
                            <Text className="text-white/80 font-medium">donald@example.com</Text>
                        </View>
                        <TouchableOpacity className="ml-auto bg-white/20 p-2 rounded-full">
                            <SettingsIcon size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <SectionHeader title="Preferences" />
                    <SettingItem
                        icon={Bell}
                        label="Notifications"
                        hasSwitch
                        switchValue={notifications}
                        onSwitchChange={setNotifications}
                    />
                    <SettingItem
                        icon={Moon}
                        label="Dark Mode"
                        hasSwitch
                        switchValue={darkMode}
                        onSwitchChange={setDarkMode}
                    />

                    <SectionHeader title="Account" />
                    <SettingItem
                        icon={User}
                        label="Edit Profile"
                        onPress={() => { }}
                    />
                    <SettingItem
                        icon={Shield}
                        label="Privacy & Security"
                        onPress={() => { }}
                    />

                    <SectionHeader title="Support" />
                    <SettingItem
                        icon={HelpCircle}
                        label="Help & Support"
                        onPress={() => { }}
                    />

                    <View className="h-6" />

                    <TouchableOpacity
                        className="mx-4 p-4 bg-red-50 rounded-2xl flex-row items-center justify-center border border-red-100 active:bg-red-100"
                        activeOpacity={0.7}
                    >
                        <LogOut size={20} color="#ef4444" style={{ marginRight: 8 }} />
                        <Text className="text-red-500 font-bold text-base">Log Out</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
