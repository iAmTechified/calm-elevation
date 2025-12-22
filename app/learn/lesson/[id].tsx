
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, X, Star, Volume2, Check } from 'lucide-react-native';
import { useState, useRef } from 'react';

const { width } = Dimensions.get('window');

const LESSON_CONTENT = [
    {
        id: '1',
        title: 'What is anxiety?',
        content: [
            {
                type: 'intro',
                title: 'What is anxiety?',
                text: [
                    'Anxiety is the state of apprehension and fear experienced when anticipating a real or imagined threat, event or situation.',
                    'Though it’s sometimes hard to believe, anxiety is a completely natural and built-in human mechanism that protects us. Think back to our ancestors who had daily threats to their survival:'
                ],
                image: '🏃', // Placeholder for caveman running
                imageColor: 'bg-orange-100'
            },
            {
                type: 'continuation',
                text: [
                    'They needed something to get them moving quick - to fight or flight - and a rush of anxiety did just that.',
                    'Anxiety has a place in today’s society, as well. Ever felt a rush of ice flow through your veins because of a reckless driver?',
                    'This type of anxiety can be helpful.'
                ],
                image: null
            },
            {
                type: 'conclusion',
                text: [
                    'The first step to healing is to develop an understanding, which you’re already working on now.',
                    'Take a look at the physical and mental effects of panic attacks next.'
                ],
                image: null
            }
        ]
    },
    {
        id: '2',
        title: 'Physical & Mental Effects',
        content: [
            {
                type: 'intro',
                title: 'Physical & Mental Effects',
                text: [
                    'Panic attacks can feel incredibly physical. Your heart races, your palms sweat...',
                    'Understanding these physical symptoms is key to managing them.'
                ],
                image: '🧠',
                imageColor: 'bg-orange-100'
            }
        ]
    },
    {
        id: '3',
        title: 'Causes & Theories',
        content: [
            {
                type: 'intro',
                title: 'Causes & Theories',
                text: [
                    'Why do we get anxious? There are many theories...',
                    'Let\'s explore the evolutionary and psychological roots.'
                ],
                image: '🤓',
                imageColor: 'bg-blue-100'
            }
        ]
    }
];

export default function LessonScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [currentPage, setCurrentPage] = useState(0);
    const lesson = LESSON_CONTENT.find(l => l.id === id) || LESSON_CONTENT[0];

    const pages = lesson.content;
    const progress = ((currentPage + 1) / pages.length) * 100;

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            router.back(); // Done
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'bottom']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <ChevronLeft size={28} color="#1E293B" strokeWidth={2.5} />
                </TouchableOpacity>

                {/* Progress Bar */}
                <View className="flex-1 mx-6 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <View className="h-full bg-emerald-400 rounded-full" style={{ width: `${progress}%` }} />
                </View>

                <TouchableOpacity className="p-2 -mr-2">
                    <Star size={24} color="#FBBF24" fill="#FBBF24" />
                </TouchableOpacity>
            </View>

            {/* Content Card */}
            <View className="flex-1 px-6 pb-4">
                <View className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 justify-center">
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        {currentContent(pages[currentPage])}
                    </ScrollView>
                </View>
            </View>

            {/* Footer Controls */}
            <View className="px-6 py-4 flex-row items-center justify-between gap-4">
                <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center border border-slate-200 shadow-sm">
                    <Volume2 size={24} color="#64748B" />
                </TouchableOpacity>

                <View className="flex-1 flex-row gap-3">
                    {currentPage > 0 && (
                        <TouchableOpacity
                            onPress={prevPage}
                            className="flex-1 h-14 bg-teal-500/80 rounded-full items-center justify-center shadow-md active:opacity-90"
                        >
                            <ChevronLeft size={24} color="white" strokeWidth={3} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={nextPage}
                        className="flex-1 h-14 bg-teal-500 rounded-full items-center justify-center shadow-md active:opacity-90"
                    >
                        {currentPage === pages.length - 1 ? (
                            <Check size={24} color="white" strokeWidth={3} />
                        ) : (
                            <ChevronRight size={24} color="white" strokeWidth={3} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

function currentContent(page: any) {
    if (page.type === 'intro') {
        return (
            <>
                <Text className="text-3xl font-bold text-slate-800 text-center mb-6">
                    {page.title.replace('is', '')} <Text className="italic">is</Text> {page.title.split('is')[1]}
                </Text>

                {page.text.map((paragraph: string, index: number) => (
                    <Text key={index} className="text-lg text-slate-600 leading-7 mb-6 text-center">
                        {paragraph}
                    </Text>
                ))}

                <View className="items-center mt-4">
                    <View className={`w-36 h-36 ${page.imageColor} rounded-full items-center justify-center`}>
                        <Text className="text-6xl">{page.image}</Text>
                    </View>
                </View>
            </>
        );
    }

    // Default / Continuation
    return (
        <View className="justify-center flex-1">
            {page.text.map((paragraph: string, index: number) => (
                <Text key={index} className="text-xl text-slate-600 leading-8 mb-8 font-medium">
                    {paragraph.includes('fight or flight') ? (
                        <Text>
                            {paragraph.split('fight or flight')[0]}
                            <Text className="font-bold text-slate-800">fight or flight</Text>
                            {paragraph.split('fight or flight')[1]}
                        </Text>
                    ) : (
                        paragraph
                    )}
                </Text>
            ))}
        </View>
    );
}
