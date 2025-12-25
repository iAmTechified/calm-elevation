
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Redirect } from 'expo-router';
import { ChevronLeft, Star, ArrowRight, CheckCircle } from 'lucide-react-native';
import { useState } from 'react';
import { useColorScheme } from 'nativewind';
import ProgressHeader from '../../../components/ProgressHeader';
import LessonNavigationControls from '../../../components/LessonNavigationControls';
import { useSelfHealing } from '../../../hooks/useSelfHealing';
import { useStats } from '../../../hooks/useStats';
import { CheckInModal } from '../../../components/CheckInModal';
import { healingLessons, LessonContent } from '../_data';

const { width } = Dimensions.get('window');

export default function LessonScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { markDayComplete } = useSelfHealing();
    const { markHealingDayCompleted, recordMood } = useStats();
    const { colorScheme } = useColorScheme();
    const [currentPage, setCurrentPage] = useState(0);
    const [isCheckInVisible, setIsCheckInVisible] = useState(false);
    const insets = useSafeAreaInsets();

    const lesson = healingLessons.find(l => l.id === id);

    if (!lesson) return <Redirect href="/self-healing" />;

    const pages = lesson.content;
    const progress = ((currentPage + 1) / pages.length) * 100;
    const isDark = colorScheme === 'dark';

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            // Complete current lesson
            if (typeof id === 'string') {
                const dayNum = parseInt(lesson.day.toString());
                markDayComplete(dayNum);
                markHealingDayCompleted(dayNum);
            }
            setIsCheckInVisible(true);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCheckIn = async (moodScore: number) => {
        await recordMood(moodScore);
        setIsCheckInVisible(false);
        router.back();
    };

    return (
        <>
        <SafeAreaView className="h-full bg-slate-50 dark:bg-slate-900" edges={['top', 'left', 'right', 'bottom']}>
            <StatusBar style="auto" />

            {/* Header */}
            <ProgressHeader
                progress={progress}
                containerStyle="flex-row items-center justify-between px-6 py-4"
                trackStyle="h-2 bg-slate-200 dark:bg-slate-700 rounded-full mx-6"
                progressStyle="bg-indigo-500"
                leftElement={
                    <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                        <ChevronLeft size={28} color={isDark ? '#f1f5f9' : '#1E293B'} strokeWidth={2.5} />
                    </TouchableOpacity>
                }
                rightElement={
                    <View className="flex-row items-center bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 rounded-full">
                        <Text className="text-indigo-600 dark:text-indigo-300 font-bold mr-1">Day {lesson.day}</Text>
                    </View>
                }
            />

            {/* Content Card */}
            <View className="flex-1 px-6 pb-4 pt-2">
                <View className="flex-1 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 justify-center">
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        {renderContent(pages[currentPage], isDark)}
                    </ScrollView>
                </View>
            </View>

            {/* Footer Controls */}
            <View className="px-6 py-4" style={{ marginBottom: insets.bottom }}>
                <LessonNavigationControls
                    currentPage={currentPage}
                    totalPages={pages.length}
                    onPrev={prevPage}
                    onNext={nextPage}
                />
            </View>

        </SafeAreaView>
            <CheckInModal
                visible={isCheckInVisible}
                onClose={() => {
                    setIsCheckInVisible(false);
                    router.back();
                }}
                onMoodSelect={handleCheckIn}
            />
            </>
    );
}

function renderContent(page: LessonContent, isDark: boolean) {
    const textColor = isDark ? 'text-slate-300' : 'text-slate-600';
    const titleColor = isDark ? 'text-white' : 'text-slate-800';

    if (page.type === 'intro') {
        return (
            <View className="items-center">
                {page.image && (
                    <View className={`w-24 h-24 ${page.imageColor || 'bg-blue-100'} rounded-full items-center justify-center mb-6`}>
                        <Text className="text-5xl">{page.image}</Text>
                    </View>
                )}

                {page.title && (
                    <Text className={`text-3xl font-bold ${titleColor} text-center mb-6`}>
                        {page.title}
                    </Text>
                )}

                {page.text.map((paragraph: string, index: number) => (
                    <Text key={index} className={`text-lg ${textColor} leading-8 mb-6 text-center`}>
                        {paragraph}
                    </Text>
                ))}
            </View>
        );
    }

    if (page.type === 'practice') {
        return (
            <View>
                <Text className={`text-2xl font-bold ${titleColor} mb-6`}>Today's Practice</Text>

                {page.text.map((paragraph: string, index: number) => (
                    <Text key={index} className={`text-lg ${textColor} leading-8 mb-8`}>
                        {paragraph}
                    </Text>
                ))}

                {page.questions && page.questions.map((q, idx) => (
                    <View key={idx} className="mb-6 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                        <Text className={`font-semibold ${titleColor} mb-3 text-lg`}>{q}</Text>
                        <TextInput
                            placeholder="Write your thoughts..."
                            placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
                            multiline
                            className={`min-h-[100px] text-base ${titleColor} align-top`}
                        />
                    </View>
                ))}
            </View>
        )
    }

    // Default / Continuation / Conclusion
    return (
        <View className="justify-center flex-1">
            {page.title && (
                <Text className={`text-2xl font-bold ${titleColor} mb-6`}>
                    {page.title}
                </Text>
            )}
            {page.text.map((paragraph: string, index: number) => (
                <Text key={index} className={`text-lg ${textColor} leading-8 mb-6 font-medium`}>
                    {paragraph.includes('fight or flight') ? (
                        <Text>
                            {paragraph.split('fight or flight')[0]}
                            <Text className={`font-bold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>fight or flight</Text>
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
