import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, X, Star } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import ProgressHeader from '../../components/ProgressHeader';
import Back from '../../components/Back';
import { useJournal } from '../../hooks/useJournal';

const { width } = Dimensions.get('window');

// Mood images mapping to ensure static analysis works
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

// Mood data with emojis
const moods = [
    { id: 'sad', label: 'sad', color: '#B2EBF2' },
    { id: 'determined', label: 'determined', color: '#B2EBF2' },
    { id: 'angry', label: 'angry', color: '#B2EBF2' },
    { id: 'relaxed', label: 'relaxed', color: '#B2EBF2' },
    { id: 'worried', label: 'worried', color: '#B2EBF2' },
    { id: 'frightened', label: 'frightened', color: '#B2EBF2' },
    { id: 'unmotivated', label: 'unmotivated', color: '#B2EBF2' },
    { id: 'hungry', label: 'hungry', color: '#B2EBF2' },
    { id: 'strong', label: 'strong', color: '#B2EBF2' },
    { id: 'indifferent', label: 'indifferent', color: '#B2EBF2' },
    { id: 'sleepy', label: 'sleepy', color: '#B2EBF2' },
    { id: 'calm', label: 'calm', color: '#B2EBF2' },
    { id: 'crying', label: 'crying', color: '#B2EBF2' },
    { id: 'depressed', label: 'depressed', color: '#B2EBF2' },
    { id: 'dizzy', label: 'dizzy', color: '#B2EBF2' },
    { id: 'happy', label: 'happy', color: '#B2EBF2' },
    { id: 'overwhelmed', label: 'overwhelmed', color: '#B2EBF2' },
    { id: 'stressed', label: 'stressed', color: '#B2EBF2' },
];

export default function MoodSelectionScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { getEntryById } = useJournal();
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    useEffect(() => {
        if (params.id) {
            const entry = getEntryById(params.id as string);
            if (entry) {
                setSelectedMood(entry.mood);
            }
        }
    }, [params.id, getEntryById]);

    const handleContinue = () => {
        if (selectedMood) {
            router.push({
                pathname: '/journal/entry',
                params: { ...params, mood: selectedMood }
            });
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
            <StatusBar style="auto" />

            {/* Header */}
            <ProgressHeader
                progress={((0 + 1) / 4) * 100}
                leftElement={<Back onPress={() => router.back()} style="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700" iconColor={undefined} />}
                rightElement={
                    <TouchableOpacity onPress={() => router.replace('/(tabs)')} className="p-2 bg-[#70C6C9] rounded-full">
                        <Star size={23} stroke="none" fill="#FFFD54" />
                    </TouchableOpacity>
                }
            />

            <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 100 }}>
                <Text className="text-3xl font-bold text-slate-700 dark:text-white text-center mb-8 mt-4">
                    How are you feeling?
                </Text>

                <View className="flex-row flex-wrap justify-between">
                    {moods.map((mood) => {
                        const isSelected = selectedMood === mood.id;
                        return (
                            <Pressable
                                key={mood.id}
                                onPress={() => setSelectedMood(mood.id)}
                                className={`w-[30%] aspect-square items-center justify-center mb-6 rounded-3xl pt-2 ${isSelected ? 'bg-teal-100 dark:bg-teal-900/30' : 'bg-transparent'}`}
                            >
                                <View className={`w-16 h-16 rounded-full items-center justify-center p-2 ${isSelected ? 'bg-black/20 border border-teal-400' : 'border border-slate-200 dark:border-slate-700'} overflow-hidden`}>
                                    <Image
                                        source={moodImages[mood.id]}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>
                                <Text className="text-slate-600 dark:text-slate-400 text-center mt-2 font-medium bg-transparent">
                                    {mood.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View className="absolute bottom-0 w-full p-6 bg-white/90 dark:bg-slate-900/90 blur-sm border-t border-slate-100 dark:border-slate-800">
                <TouchableOpacity
                    onPress={handleContinue}
                    disabled={!selectedMood}
                    className={`nav-button h-14 rounded-full items-center justify-center flex-row shadow-sm ${selectedMood ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                    <Text className="text-white text-xl font-sans font-semibold mr-2">{params.id ? 'Continue' : 'Continue'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
