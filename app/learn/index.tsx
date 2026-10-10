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
import { useTranslation } from 'react-i18next';

const COURSE_TRANSLATION_KEYS: Record<string, string> = {
    'understanding-anxiety': 'understandingAnxiety',
    'short-term-relief': 'shortTermRelief',
    'long-term-resilience': 'longTermResilience'
};

export default function LearnScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const { getCourseProgress } = useStats();
    const { isLocked } = useAccess();

    return (
        <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-900" edges={['top']}>
            <StatusBar style="auto" />

            {/* Header */}
            <View className="px-6 py-6 flex-row items-center gap-4">
                <Back onPress={() => router.back()} style='bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700' iconColor={undefined} />
                <Text className="pl-6 text-2xl font-bold text-[#0F172A] dark:text-white">{t('learn.title')}</Text>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View className="px-4 py-2">
                    <Text className="text-slate-500 dark:text-slate-400 mb-6 text-lg">{t('learn.subtitle')}</Text>

                    {Object.values(COURSES).map((course) => {
                        const progress = getCourseProgress(course.id);
                        const locked = isLocked('course', { courseId: course.id });
                        const courseKey = COURSE_TRANSLATION_KEYS[course.id];
                        const localizedTitle = courseKey ? t(`learn.courses.${courseKey}.title`, { defaultValue: course.title }) : course.title;

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
                                    title={localizedTitle}
                                    completedLessons={progress.completed}
                                    totalLessons={progress.total}
                                    imageSource={course.image}
                                />
                                {locked && (
                                    <View className="absolute top-4 right-4 bg-amber-500 px-3 py-1 rounded-full flex-row items-center shadow-sm">
                                        <Lock size={12} color="white" />
                                        <Text className="text-white text-[10px] font-extrabold ml-1">{t('common.premium')}</Text>
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

