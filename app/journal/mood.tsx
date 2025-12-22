import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, X, Star } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

// Mood data with emojis
const moods = [
    { id: 'sad', label: 'sad', emoji: '😞', color: '#B2EBF2' },
    { id: 'determined', label: 'determined', emoji: '😤', color: '#B2EBF2' },
    { id: 'angry', label: 'angry', emoji: '😠', color: '#B2EBF2' },
    { id: 'relaxed', label: 'relaxed', emoji: '😌', color: '#B2EBF2' },
    { id: 'worried', label: 'worried', emoji: '😟', color: '#B2EBF2' },
    { id: 'frightened', label: 'frightened', emoji: '😨', color: '#B2EBF2' },
    { id: 'unmotivated', label: 'unmotivated', emoji: '😶', color: '#B2EBF2' },
    { id: 'hungry', label: 'hungry', emoji: '😋', color: '#B2EBF2' }, // Or appropriate icon
    { id: 'strong', label: 'strong', emoji: '💪', color: '#B2EBF2' },
    { id: 'indifferent', label: 'indifferent', emoji: '😐', color: '#B2EBF2' },
    { id: 'sleepy', label: 'sleepy', emoji: '😴', color: '#B2EBF2' },
    { id: 'calm', label: 'calm', emoji: '😇', color: '#B2EBF2' },
    { id: 'crying', label: 'crying', emoji: '😢', color: '#B2EBF2' },
    { id: 'depressed', label: 'depressed', emoji: '😣', color: '#B2EBF2' },
    { id: 'dizzy', label: 'dizzy', emoji: '😵', color: '#B2EBF2' },
    { id: 'happy', label: 'happy', emoji: '🙂', color: '#B2EBF2' },
    { id: 'overwhelmed', label: 'overwhelmed', emoji: '😩', color: '#B2EBF2' },
    { id: 'stressed', label: 'stressed', emoji: '😫', color: '#B2EBF2' },
];

export default function MoodSelectionScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    const handleContinue = () => {
        if (selectedMood) {
            router.push({
                pathname: '/journal/entry',
                params: { ...params, mood: selectedMood }
            });
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-slate-50">
                    <X color="#334155" size={24} />
                </TouchableOpacity>
                <View className="flex-1 items-center">
                    {/* Progress bar placeholder or similar if needed */}
                    <View className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <View className="w-1/4 h-full bg-teal-300" />
                    </View>
                </View>
                <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-yellow-100">
                    <Star color="#F59E0B" size={24} fill="#F59E0B" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 100 }}>
                <Text className="text-3xl font-bold text-slate-700 text-center mb-8 mt-4">
                    How are you feeling?
                </Text>

                <View className="flex-row flex-wrap justify-between">
                    {moods.map((mood) => {
                        const isSelected = selectedMood === mood.id;
                        return (
                            <TouchableOpacity
                                key={mood.id}
                                onPress={() => setSelectedMood(mood.id)}
                                className={`w-[30%] aspect-square items-center justify-center mb-6 rounded-full ${isSelected ? 'bg-teal-200' : 'bg-transparent'}`}
                            >
                                <View className={`w-16 h-16 rounded-full items-center justify-center ${isSelected ? 'bg-teal-400' : 'bg-slate-100 border border-slate-200'}`}>
                                    <Text className="text-3xl">{mood.emoji}</Text>
                                </View>
                                <Text className="text-slate-600 text-center mt-2 font-medium bg-transparent">
                                    {mood.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View className="absolute bottom-0 w-full p-6 bg-white/90 blur-sm border-t border-slate-100">
                <TouchableOpacity
                    onPress={handleContinue}
                    disabled={!selectedMood}
                    className={`nav-button h-14 rounded-full items-center justify-center flex-row shadow-sm ${selectedMood ? 'bg-teal-500' : 'bg-slate-300'}`}
                >
                    <Text className="text-white text-xl font-bold mr-2">Continue</Text>
                    {/* Arrow icon can go here */}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
