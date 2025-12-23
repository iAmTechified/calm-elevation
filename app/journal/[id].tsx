
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Trash2, Edit3, Calendar } from 'lucide-react-native';
import Back from '../../components/Back';
import { useJournal } from '../../hooks/useJournal';
import { useColorScheme } from 'nativewind';

const moodImages: Record<string, any> = {
    sad: require('../../assets/moods/sad.jpeg'),
    determined: require('../../assets/moods/determined.jpeg'),
    angry: require('../../assets/moods/angry.jpeg'),
    relaxed: require('../../assets/moods/relaxed.jpeg'),
    worried: require('../../assets/moods/worried.jpeg'),
    frightened: require('../../assets/moods/frightened.jpeg'),
    unmotivated: require('../../assets/moods/unmotivated.jpeg'),
    hungry: require('../../assets/moods/hungry.jpeg'),
    strong: require('../../assets/moods/strong.jpeg'),
    indifferent: require('../../assets/moods/indifferent.jpeg'),
    sleepy: require('../../assets/moods/sleepy.jpeg'),
    calm: require('../../assets/moods/calm.jpeg'),
    crying: require('../../assets/moods/crying.jpeg'),
    depressed: require('../../assets/moods/depressed.jpeg'),
    dizzy: require('../../assets/moods/dizzy.jpeg'),
    happy: require('../../assets/moods/happy.jpeg'),
    overwhelmed: require('../../assets/moods/overwhelmed.jpeg'),
    stressed: require('../../assets/moods/stressed.jpeg'),
};

const questions = [
    { id: 'accomplished', title: '3 things you accomplished today:' },
    { id: 'weighing', title: 'Something weighing you down:' },
    { id: 'grateful', title: 'Feeling grateful for:' },
    { id: 'notes', title: 'Additional Notes:' },
];

export default function EntryViewScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { getEntryById, deleteEntry } = useJournal();
    const { colorScheme } = useColorScheme();

    const entry = getEntryById(id as string);

    if (!entry) {
        return (
            <SafeAreaView className="flex-1 bg-sky-50 items-center justify-center">
                <Text className="text-xl text-primaryLight">Entry not found</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4 p-4 bg-teal-400 rounded-full">
                    <Text className="text-white font-bold">Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const handleDelete = () => {
        Alert.alert(
            "Delete Entry",
            "Are you sure you want to delete this journal entry?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await deleteEntry(entry.id);
                        router.back();
                    }
                }
            ]
        );
    };

    const handleEdit = () => {
        router.push({
            pathname: '/journal/mood',
            params: { id: entry.id, date: entry.date }
        });
    };

    const formatDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <SafeAreaView className="flex-1 bg-sky-50 dark:bg-slate-900">
            <StatusBar style="auto" />

            <View className="px-6 py-4 flex-row items-center justify-between">
                <Back onPress={() => router.back()} style="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700" iconColor={undefined} />
                <View className="flex-row">
                    <TouchableOpacity onPress={handleEdit} className="p-2 mr-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full shadow-sm">
                        <Edit3 size={20} color="#70C6C9" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete} className="p-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full shadow-sm">
                        <Trash2 size={20} color="#E37E6F" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Date Header */}
                <View className="flex-row items-center mb-6">
                    <View className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-full items-center justify-center mr-3">
                        <Calendar size={20} color={colorScheme === 'dark' ? '#2dd4bf' : '#0d9488'} />
                    </View>
                    <Text className="text-lg font-bold text-primaryLight dark:text-white">{formatDate(entry.date)}</Text>
                </View>

                {/* Mood Section */}
                <View className="bg-white dark:bg-slate-800 rounded-3xl p-6 items-center mb-6 shadow-sm border border-transparent dark:border-slate-700">
                    <Text className="text-slate-500 dark:text-slate-400 mb-4 font-medium">I was feeling</Text>
                    <View className="w-24 h-24 overflow-hidden bg-teal-50 dark:bg-teal-900/20 rounded-full items-center justify-center mb-3">
                        <Image source={moodImages[entry.mood]} className="w-full h-full" resizeMode='cover' />
                    </View>
                    <Text className="text-2xl font-bold text-primaryLight dark:text-white capitalize">{entry.mood}</Text>
                </View>

                {/* Answers Section */}
                {questions.map((q) => {
                    const answer = entry.answers[q.id];
                    if (!answer) return null;
                    return (
                        <View key={q.id} className="mb-6">
                            <Text className="text-base font-bold text-slate-500 dark:text-slate-400 mb-2">{q.title}</Text>
                            <View className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-transparent dark:border-slate-700">
                                <Text className="text-lg text-primaryLight dark:text-gray-100 leading-relaxed">{answer}</Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}
