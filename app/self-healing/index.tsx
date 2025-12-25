import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelfHealing } from '../../hooks/useSelfHealing';
import { useAccess } from '../../hooks/useAccess';
import { healingLessons } from '../../data/self-healing';
import Back from '../../components/Back';
import SelfLessonCard from '../../components/SelfLessonCard';

const PHASES = [
    "Gentle Awareness",
    "Strengthening Foundations",
    "Transforming Patterns",
    "Thriving & Freedom"
];

export default function SelfHealingScreen() {
    const router = useRouter();
    const { state, isDayUnlocked } = useSelfHealing();
    const { isLocked } = useAccess();

    const formattedHealingLessons = healingLessons.map(lesson => {
        const locked = isLocked('healing-day', { day: lesson.day });
        const unlocked = isDayUnlocked(lesson.day);
        return {
            ...lesson,
            locked,
            unlocked
        }
    })


    // Group lessons by phase
    const lessonsByPhase = PHASES.map(phaseTitle => ({
        title: phaseTitle,
        lessons: formattedHealingLessons.filter(l => l.phase === phaseTitle)
    }));

    return (
        <View className="flex-1 h-full py-6 bg-slate-50 dark:bg-slate-950">
            <StatusBar style="auto" />
            <LinearGradient
                colors={['#DBEAFE', '#EFF6FF', 'transparent']}
                className="absolute top-0 left-0 right-0 h-full opacity-50 dark:opacity-20"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            <SafeAreaView className="flex-1 h-full" edges={['top']}>
                <View className="px-5 py-4 flex-row items-center justify-between">
                    <Back onPress={() => router.back()} style='bg-white' iconColor='black' />
                    <View className="items-center">
                        <Text className="text-2xl font-bold text-slate-900 dark:text-white">60 Days of Healing</Text>
                        <Text className="text-sm text-slate-500 dark:text-slate-400">Step by step recovery</Text>
                    </View>
                    <View className="w-10" />
                </View>

                <ScrollView
                    className="flex-1 px-5 py-6"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >

                    {lessonsByPhase.map((phase, index) => (
                        <View key={phase.title} className="mb-8">
                            <View className="flex-row items-center mb-4">
                                <View className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 items-center justify-center mr-3">
                                    <Text className="text-indigo-600 dark:text-indigo-300 font-bold">{index + 1}</Text>
                                </View>
                                <Text className="text-xl font-bold text-slate-800 dark:text-slate-100">{phase.title}</Text>
                            </View>

                            <View className="flex-row flex-wrap justify-between gap-y-3">
                                {phase.lessons.map((lesson) => {
                                    return (
                                        <SelfLessonCard
                                            key={lesson.day}
                                            lesson={lesson}
                                            isCompleted={state.completedDays.includes(lesson.day)}
                                            isUnlocked={lesson.unlocked}
                                            isPaywalled={lesson.locked}
                                            onPress={() => {
                                                if (lesson.locked) {
                                                    router.push('/paywall');
                                                } else if (lesson.unlocked) {
                                                    router.push(`/self-healing/lesson/${lesson.id}`);
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
