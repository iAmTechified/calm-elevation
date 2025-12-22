import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { X, Star, ChevronLeft, ChevronRight, Check, Mic } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

const questions = [
    {
        id: 'accomplished',
        title: '3 things you accomplished today, big or small:',
        placeholder: 'Hhh', // Following the user's screenshot text
    },
    {
        id: 'weighing',
        title: 'Is something weighing you down? Write it down and let it go.',
        placeholder: 'Hhh',
    },
    {
        id: 'grateful',
        title: 'What are you feeling grateful for?',
        placeholder: 'Jjh',
    },
    {
        id: 'notes',
        title: 'Additional Notes:',
        placeholder: 'Hhh',
    },
];

export default function JournalEntryScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const currentQuestion = questions[currentStep];
    const isLastStep = currentStep === questions.length - 1;

    const handleNext = () => {
        if (isLastStep) {
            // Save entry logic would go here
            console.log("Journal Entry Saved:", { mood: params.mood, date: params.date, ...answers });
            router.dismissAll(); // Or go back to journal home
            router.push('/journal');
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        } else {
            router.back();
        }
    };

    const updateAnswer = (text: string) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: text
        }));
    };

    return (
        <SafeAreaView className="flex-1 bg-sky-50">
            <StatusBar style="dark" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm">
                    <X color="#334155" size={24} />
                </TouchableOpacity>

                {/* Progress Bar */}
                <View className="flex-1 mx-4 h-3 bg-white rounded-full overflow-hidden shadow-sm">
                    <View
                        className="h-full bg-teal-300 rounded-full"
                        style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    />
                </View>

                <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm">
                    <Star color="#F59E0B" size={24} fill="#F59E0B" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="flex-1 px-6 pt-4">
                        <View className="flex-row items-start justify-between mb-2 relative">
                            <Text className="flex-1 text-2xl font-bold text-slate-700 leading-8 mr-16">
                                {currentQuestion.title}
                            </Text>

                            {/* Mascot */}
                            <View className="absolute -right-2 -top-2">
                                <Image
                                    source={require('../../assets/cal-at-stateometer.png')} // Using existing asset as placeholder
                                    style={{ width: 80, height: 80, resizeMode: 'contain' }}
                                />
                            </View>
                        </View>

                        <View className="bg-white rounded-3xl p-6 min-h-[400px] shadow-sm mt-4 flex-1">
                            <TextInput
                                className="text-lg text-slate-700 leading-6"
                                multiline
                                placeholder={currentQuestion.placeholder}
                                placeholderTextColor="#94a3b8"
                                value={answers[currentQuestion.id] || ''}
                                onChangeText={updateAnswer}
                                style={{ minHeight: 300, textAlignVertical: 'top' }}
                            />
                            <View className="items-end mt-auto">
                                <Text className="text-slate-400 text-sm">
                                    {(answers[currentQuestion.id] || '').length}/4000
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Navigation Buttons */}
                <View className={`flex-row justify-between px-6 py-6 pb-8 bg-sky-50 items-center`}>
                    {currentStep === 0 ? (
                        <TouchableOpacity
                            className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm"
                            onPress={() => console.log('Mic pressed')}
                        >
                            <Mic color="#94a3b8" size={24} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={handleBack}
                            className="w-32 h-12 bg-teal-400 rounded-full items-center justify-center shadow-sm"
                        >
                            <ChevronLeft color="white" size={32} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={handleNext}
                        className={`h-12 bg-teal-400 rounded-full items-center justify-center shadow-sm flex-row ${currentStep === 0 ? 'flex-1 ml-4' : 'w-32'}`}
                    >
                        {isLastStep ? (
                            <Check color="white" size={32} />
                        ) : (
                            <ChevronRight color="white" size={32} />
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
