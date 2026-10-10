
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronRight, X } from 'lucide-react-native';
import Back from '../../../components/Back';
import HeroHeader from '../../../components/HeroHeader';

import { COURSES, getLocalizedLessons } from '../../../data/learn';
import { useTranslation } from 'react-i18next';

const COURSE_KEYS: Record<string, string> = {
    'understanding-anxiety': 'understandingAnxiety',
    'short-term-relief': 'shortTermRelief',
    'long-term-resilience': 'longTermResilience',
};

export default function CourseScreen() {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const { id } = useLocalSearchParams();

    const courseId = typeof id === 'string' ? id : 'understanding-anxiety';
    const course = COURSES[courseId] || COURSES['understanding-anxiety'];
    const courseKey = COURSE_KEYS[course.id];
    const courseTitle = courseKey ? t(`learn.courses.${courseKey}.title`, course.title) : course.title;
    const courseDesc = courseKey ? t(`learn.courses.${courseKey}.description`, course.description) : course.description;

    // Get lessons for this course in the current language
    const lessons = getLocalizedLessons(i18n.language);
    const courseLessons = lessons.filter(l => l.courseId === course.id);

    return (
        <View className={`flex-1 font-sans ${course.color} dark:bg-slate-900`}>
            <StatusBar style="auto" />

            <HeroHeader image={course.image} onBack={() => router.back()} />
            {/* Top Illustration Area */}
            <SafeAreaView edges={['top']} className={`flex-0 h-full z-10`}>
                <ScrollView className='pb-20 z-[150]'>
                    {/* Bottom Sheet Content */}
                    <View className="z-[150] flex-1 bg-white dark:bg-slate-900 rounded-t-[40px] h-full px-8 pt-10 mt-[200px] z-[999] shadow-sm">
                        <Text className="text-3xl font-semibold font-sans text-primaryLight dark:text-white text-center mb-4">
                            {courseTitle}
                        </Text>

                        <Text className="text-lg font-sans text-primaryLight dark:text-slate-400 text-center text-lg leading-6 mb-8 px-2">
                            {courseDesc}
                        </Text>

                        <View className="gap-4 mb-20">
                            {courseLessons.map((lesson) => (
                                <TouchableOpacity
                                    key={lesson.id}
                                    onPress={() => router.push(`../lesson/${lesson.id}`)}
                                    className="flex-row items-center p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl shadow-sm active:bg-slate-50 dark:active:bg-slate-700"
                                >
                                    <View className={`w-16 h-16 ${lesson.color} rounded-2xl items-center justify-center mr-4 overflow-hidden`}>
                                        {lesson.iconSource ? (
                                            <Image source={lesson.iconSource} className="w-10 h-10" resizeMode="contain" />
                                        ) : (
                                            <Text className="text-3xl">{lesson.icon}</Text>
                                        )}
                                    </View>

                                    <View className="flex-1">
                                        <Text className="text-md font-sans font-semibold text-slate-700 dark:text-gray-200">{lesson.title}</Text>
                                    </View>

                                    <ChevronRight size={24} color="#CBD5E1" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
