import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Lock } from 'lucide-react-native';
import LessonCard from '../../components/LessonCard';
import Back from '../../components/Back';
import { COURSES } from '../../data/learn';
import { useStats } from '../../hooks/useStats';
import { useAccess } from '../../hooks/useAccess';

export default function LearnScreen() {
    const router = useRouter();
    const { getCourseProgress } = useStats();
    const { isLocked } = useAccess();

    return (
        <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-900" edges={['top']}>
            <StatusBar style="auto" />

            {/* Header */}
            <View className="px-6 py-6 flex-row items-center gap-4">
                <Back onPress={() => router.back()} style='bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700' iconColor={undefined} />
                <Text className="pl-6 text-2xl font-bold text-[#0F172A] dark:text-white">Knowledge Hub</Text>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View className="px-4 py-2">
                    <Text className="text-slate-500 dark:text-slate-400 mb-6 text-lg">Master the tools to conquer anxiety and regain control.</Text>

                    {Object.values(COURSES).map((course) => {
                        const progress = getCourseProgress(course.id);
                        const locked = isLocked('course', { courseId: course.id });
                        return (
                            <View key={course.id} className="mb-4 relative">
                                <LessonCard
                                    onPress={() => {
                                        if (locked) {
                                            router.push('/paywall');
                                        } else {
                                            router.push(`./learn/course/${course.id}`);
                                        }
                                    }}
                                    title={course.title}
                                    completedLessons={progress.completed}
                                    totalLessons={progress.total}
                                    imageSource={course.image}
                                />
                                {locked && (
                                    <View className="absolute top-4 right-4 bg-amber-500 px-3 py-1 rounded-full flex-row items-center shadow-sm">
                                        <Lock size={12} color="white" />
                                        <Text className="text-white text-[10px] font-extrabold ml-1">PREMIUM</Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

