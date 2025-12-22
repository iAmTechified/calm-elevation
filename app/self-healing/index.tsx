
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ArrowLeft, HelpCircle } from 'lucide-react-native';

export default function SelfHealingScreen() {
    const router = useRouter();

    const practices = [
        { id: 1, title: '2 Min Body Scan', duration: '2 mins', color: 'bg-orange-100', icon: 'bg-teal-400' },
        { id: 2, title: '5 Min Body Scan', duration: '5 mins', color: 'bg-orange-100', icon: 'bg-teal-400' },
        { id: 3, title: '5 Senses', duration: '6 mins', color: 'bg-rose-100', icon: 'bg-blue-400' },
        { id: 4, title: 'A Beautiful Body Scan', duration: '12 mins', color: 'bg-orange-50', icon: 'bg-teal-300' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-[#FFDAB9]" edges={['top']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between relative">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-white rounded-full items-center justify-center z-10 shadow-sm"
                >
                    <ArrowLeft color="#1E293B" size={24} />
                </TouchableOpacity>
                <Text className="text-3xl font-bold text-slate-800 absolute w-full text-center text-[#1E3A8A]">Visualize</Text>
                <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
                    <HelpCircle color="#1E3A8A" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 bg-white mt-4 rounded-t-[40px]" contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Hero Section - Overlapping into the background */}
                <View className="items-center justify-center -mt-16 mb-6">
                    {/* Placeholder for Meditating Monster */}
                    <View className="w-48 h-48 bg-teal-400 rounded-full items-center justify-center border-4 border-white shadow-sm relative">
                        <View className="w-32 h-20 bg-white/30 rounded-full absolute bottom-4" />
                        <Text className="text-white font-bold">Meditate</Text>
                    </View>
                </View>

                {/* Description */}
                <View className="px-8 mb-8">
                    <Text className="text-slate-600 text-center leading-relaxed text-xl font-medium">
                        Listen to the body scans or visualizations below to get rooted when you are feeling anxious.
                    </Text>
                </View>

                {/* Practices Grid */}
                <View className="px-6 flex-row flex-wrap justify-between gap-y-4">
                    {practices.map((practice) => (
                        <TouchableOpacity
                            key={practice.id}
                            className="w-[48%] bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 pb-3"
                        >
                            <View className={`h-32 w-full ${practice.color} mb-3 items-center justify-center relative p-4`}>
                                <View className={`w-20 h-20 ${practice.icon} rounded-full items-center justify-center opacity-90 border-2 border-white/50`}>
                                    {/* Inner graphic placeholder */}
                                    {practice.id > 2 && <View className="w-full h-full bg-indigo-500/20 rounded-full" />}
                                </View>
                            </View>
                            <View className="px-3">
                                <Text className="text-slate-800 font-bold text-base leading-tight">
                                    {practice.title}
                                </Text>
                                <Text className="text-slate-400 text-sm mt-1">
                                    {practice.duration}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
