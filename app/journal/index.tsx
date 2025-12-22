
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ArrowLeft, HelpCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Helper to get days in a month
const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

// Helper to get day of week for the first day of the month
const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
};

export default function JournalScreen() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    // December 2025
    const currentYear = 2025;
    const currentMonth = 11; // 0-indexed, so 11 is December

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfWeek = getFirstDayOfMonth(currentMonth, currentYear);
    const today = 21; // As per context

    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const renderCalendarDays = () => {
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(<View key={`empty-${i}`} className="w-[14.28%] aspect-square" />);
        }

        // Days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today;
            const isSelected = day === selectedDate;

            days.push(
                <TouchableOpacity
                    key={day}
                    onPress={() => {
                        setSelectedDate(day);
                        router.push({
                            pathname: '/journal/mood',
                            params: { date: `${currentYear}-${currentMonth + 1}-${day}` }
                        });
                    }}
                    className="w-[14.28%] aspect-square items-center justify-center relative"
                >
                    <View className={`w-10 h-10 items-center justify-center rounded-full ${isToday ? 'bg-[#E37E6F]' : isSelected ? 'bg-sky-200' : ''}`}>
                        <Text className={`text-lg font-bold ${isToday ? 'text-white' : 'text-slate-500'}`}>
                            {day}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }

        return days;
    };

    return (
        <SafeAreaView className="flex-1 bg-sky-50" edges={['top']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
                >
                    <ArrowLeft color="#1e293b" size={24} />
                </TouchableOpacity>
                <Text className="text-2xl font-serif text-[#1e293b]">My Journal</Text>
                <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
                    <HelpCircle color="#1e293b" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Month/Mascot Area */}
                <View className="px-6 pt-4 pb-8 flex-row justify-between items-start relative overflow-hidden">
                    <View className="z-10 mt-4">
                        <Text className="text-4xl font-bold text-[#1e3a8a] tracking-tight">December</Text>
                        <Text className="text-2xl font-bold text-[#1e3a8a] opacity-80">2025</Text>
                    </View>

                    {/* Cloud/Mascot decoration */}
                    <View className="absolute -right-10 -top-4 opacity-90">
                        {/* Placeholder for the mascot - assuming 'cal-cloud.png' or similar fits, 
                            but using a View circle if image not perfect. 
                            Using the image if available would be best. */}
                        {/* We will try to use the cal-cloud.png if it looks right, otherwise a graphic representation */}
                        <Image
                            source={require('../../assets/cal-cloud.png')}
                            style={{ width: 180, height: 180, resizeMode: 'contain' }}
                        />
                    </View>
                </View>

                {/* Calendar Grid */}
                <View className="px-4">
                    {/* Weekday Headers */}
                    <View className="flex-row mb-2">
                        {weekDays.map((day, index) => (
                            <View key={index} className="w-[14.28%] items-center justify-center">
                                <Text className="text-[#1e3a8a] font-bold text-sm">{day}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Days Grid */}
                    <View className="flex-row flex-wrap">
                        {renderCalendarDays()}
                    </View>
                </View>

                {/* Bottom Graphic / CTA */}
                <View className="mt-8 items-center justify-center relative h-48 w-full overflow-hidden">
                    {/* Abstract mountain/hill shape */}
                    <View className="absolute bottom-0 w-full h-32 bg-sky-200 rounded-t-[100px] opacity-50 scale-150" />
                    <View className="absolute bottom-0 w-full h-24 bg-sky-300 rounded-t-[100px] opacity-40 scale-125 translate-x-10" />

                    <Text className="text-center text-[#1e3a8a] text-lg font-bold px-10 z-10 leading-6">
                        Select a date to begin your{'\n'}journal entry
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

