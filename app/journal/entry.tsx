import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { X, Star, ChevronLeft, ChevronRight, Check, Mic } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import ProgressHeader from '../../components/ProgressHeader';
import Back from '../../components/Back';
import { useJournal } from '../../hooks/useJournal';
import { useStats } from '../../hooks/useStats';

const questions = [
    {
        id: 'accomplished',
        title: '3 things you accomplished today, big or small:',
        placeholder: '3 things you accomplished today, big or small:',
    },
    {
        id: 'weighing',
        title: 'Is something weighing you down? Write it down and let it go.',
        placeholder: 'Is something weighing you down? Write it down and let it go:',
    },
    {
        id: 'grateful',
        title: 'What are you feeling grateful for?',
        placeholder: 'What are you feeling grateful for?',
    },
    {
        id: 'notes',
        title: 'Additional Notes:',
        placeholder: 'Additional Notes:',
    },
];

export default function JournalEntryScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const currentQuestion = questions[currentStep];
    const isLastStep = currentStep === questions.length - 1;

    const { addEntry, updateEntry, getEntryById } = useJournal();
    const { recordJournalEntry, updateEmotionalState } = useStats();

    const initialized = useRef(false);

    useEffect(() => {
        if (params.id && !initialized.current) {
            const entry = getEntryById(params.id as string);
            if (entry) {
                setAnswers(entry.answers);
                initialized.current = true;
            }
        }
    }, [params.id, getEntryById]);

    const handleNext = async () => {
        if (isLastStep) {
            try {
                if (params.id) {
                    await updateEntry(params.id as string, {
                        mood: params.mood as string,
                        answers: answers
                    });
                } else {
                    await addEntry({
                        mood: params.mood as string,
                        date: params.date as string,
                        answers: answers
                    });
                    // Only record for stats on new entry (streak logic)
                    await recordJournalEntry();

                    // Also generic emotional state update: +0.2 for journaling
                    // updateEmotionalState(0.2); // Removed: recordJournalEntry already adds 10 points.
                }
                router.dismissAll();
                router.push('/journal');
            } catch (error) {
                console.error("Failed to save journal entry:", error);
            }
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
        <SafeAreaView className="flex-1 bg-sky-50 dark:bg-slate-900">
            <StatusBar style="auto" />

            <ProgressHeader
                progress={((currentStep + 2) / (questions.length + 1)) * 100}
                leftElement={<Back onPress={() => router.back()} style="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700" iconColor={undefined} />}
                rightElement={
                    <TouchableOpacity onPress={() => router.replace('/(tabs)')} className="p-2 bg-[#70C6C9] rounded-full">
                        <Star size={23} stroke="none" fill="#FFFD54" />
                    </TouchableOpacity>
                }
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 px-6 pt-4">
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View className="flex-row items-start justify-between mb-2 relative">
                            <Text className="flex-1 text-2xl font-bold text-primaryLight dark:text-white leading-8 mr-16">
                                {currentQuestion.title}
                            </Text>

                            {/* Mascot */}
                            <View className="absolute -right-2 -top-2">
                                <Image
                                    source={require('../../assets/cal-at-stateometer.png')}
                                    style={{ width: 80, height: 80, resizeMode: 'contain' }}
                                />
                            </View>
                        </View>

                        <View className="bg-white dark:bg-slate-800 rounded-3xl p-6 min-h-[400px] shadow-sm mt-4 flex-1 border border-transparent dark:border-slate-700">
                            <TextInput
                                className="text-lg text-primaryLight dark:text-gray-100 leading-6"
                                multiline
                                placeholder={currentQuestion.placeholder}
                                placeholderTextColor="#94a3b8"
                                value={answers[currentQuestion.id] || ''}
                                onChangeText={updateAnswer}
                                style={{ minHeight: 300, textAlignVertical: 'top' }}
                            />
                            <View className="items-end mt-auto">
                                <Text className="text-primaryLight dark:text-slate-400 text-sm">
                                    {(answers[currentQuestion.id] || '').length}/4000
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                {/* Navigation Buttons */}
                <View className={`flex-row justify-between px-6 py-6 pb-8 bg-sky-50 dark:bg-slate-900 items-center`}>
                    {currentStep !== 0 && (
                        <TouchableOpacity
                            onPress={handleBack}
                            className="w-32 h-12 bg-teal-400 dark:bg-teal-600 rounded-full items-center justify-center shadow-sm"
                        >
                            <ChevronLeft color="white" size={32} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={handleNext}
                        className={`h-12 bg-teal-400 dark:bg-teal-600 rounded-full items-center justify-center shadow-sm flex-row ${currentStep === 0 ? 'flex-1 ml-4' : 'w-32'}`}
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
