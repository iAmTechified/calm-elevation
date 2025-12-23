
import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useFocusEffect } from 'expo-router';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react-native';
import Back from '../../components/Back';
import { useJournal } from '../../hooks/useJournal';
import { useColorScheme } from 'nativewind';

const { width } = Dimensions.get('window');

// Helper to get days in a month
const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

// Helper to get day of week for the first day of the month
const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
};

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function JournalScreen() {
    const router = useRouter();
    const { entries, refresh } = useJournal();
    const { colorScheme } = useColorScheme();

    const now = useMemo(() => new Date(), []);
    const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));

    useFocusEffect(
        useCallback(() => {
            refresh();
        }, [refresh])
    );

    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfWeek = getFirstDayOfMonth(currentMonth, currentYear);

    // Today's info for highlighting and disabling
    const todayDate = now.getDate();
    const todayMonth = now.getMonth();
    const todayYear = now.getFullYear();

    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const handlePrevMonth = () => {
        setViewDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        // Prevent going to future months if desired, but usually seeing future empty calendar is fine.
        // However, the requirement is "can be swiped to view previous months".
        const nextMonth = new Date(currentYear, currentMonth + 1, 1);
        if (nextMonth <= new Date(todayYear, todayMonth, 1)) {
            setViewDate(nextMonth);
        }
    };

    const renderCalendarDays = () => {
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(<View key={`empty-${i}`} className="w-[14.28%] aspect-square" />);
        }

        // Days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === todayDate && currentMonth === todayMonth && currentYear === todayYear;
            const isFuture = new Date(currentYear, currentMonth, day) > now;

            // Format date for storage check
            const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const existingEntry = entries.find(e => e.date === dateString);

            days.push(
                <TouchableOpacity
                    key={day}
                    disabled={isFuture}
                    onPress={() => {
                        if (existingEntry) {
                            router.push(`./journal/${existingEntry.id}`);
                        } else {
                            router.push({
                                pathname: '/journal/mood',
                                params: { date: dateString }
                            });
                        }
                    }}
                    className={`w-[14.28%] aspect-square items-center justify-center relative ${isFuture ? 'opacity-30' : ''}`}
                >
                    <View className={`w-10 h-10 items-center justify-center rounded-full ${isToday ? 'bg-[#E37E6F]' : ''}`}>
                        <Text className={`text-lg font-bold ${isToday ? 'text-white' : 'text-slate-500'}`}>
                            {day}
                        </Text>
                        {existingEntry && (
                            <View className="absolute -bottom-1">
                                <Star size={10} fill={isToday ? "white" : "#F59E0B"} color={isToday ? "white" : "#F59E0B"} />
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            );
        }

        return days;
    };

    return (
        <SafeAreaView className="flex-1 bg-sky-50 dark:bg-slate-900" edges={['top']}>
            <StatusBar style="auto" />

            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-start">
                <Back onPress={() => router.back()} style='bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700' iconColor={undefined} />
                <Text className="pl-6 text-2xl font-sans font-semibold text-primaryLight dark:text-white">My Journal</Text>
            </View>

            <ScrollView className="flex-1 h-full" contentContainerStyle={{ paddingBottom: 0 }}>
                {/* Month/Mascot Area */}
                <View className="px-6 pt-12 pb-16 flex-row justify-between items-start relative overflow-hidden">
                    <View className="z-10 mt-4">
                        <View className="flex-row items-center">
                            <Text className="text-4xl font-bold text-primaryLight dark:text-sky-400 tracking-tight">{MONTHS[currentMonth]}</Text>
                            <View className="flex-row ml-4">
                                <TouchableOpacity onPress={handlePrevMonth} className="p-1">
                                    <ChevronLeft size={24} color={colorScheme === 'dark' ? '#94a3b8' : '#334155'} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleNextMonth}
                                    className="p-1"
                                    disabled={new Date(currentYear, currentMonth + 1, 1) > new Date(todayYear, todayMonth, 1)}
                                >
                                    <ChevronRight size={24} color={new Date(currentYear, currentMonth + 1, 1) > new Date(todayYear, todayMonth, 1) ? (colorScheme === 'dark' ? '#334155' : '#cbd5e1') : (colorScheme === 'dark' ? '#94a3b8' : '#334155')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text className="text-2xl font-bold text-primaryLight dark:text-sky-400 opacity-80">{currentYear}</Text>
                    </View>

                    {/* Mascot decoration */}
                    <View className="absolute -right-10 -top-120 opacity-90">
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
                                <Text className="text-primaryLight dark:text-sky-400 font-bold text-sm">{day}</Text>
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
                    <View className="absolute bottom-0 w-full h-32 bg-sky-200 dark:bg-slate-800 rounded-t-[100px] opacity-50 scale-150" />
                    <View className="absolute bottom-0 w-full h-24 bg-sky-300 dark:bg-slate-700 rounded-t-[100px] opacity-40 scale-125 translate-x-10" />

                    <Text className="text-center text-primaryLight dark:text-sky-400 text-lg font-bold px-10 z-10 leading-6">
                        {entries.length > 0 ? "Review your progress\nor add a new entry" : "Select a date to begin your\njournal entry"}
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

