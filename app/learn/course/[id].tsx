
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronRight, X } from 'lucide-react-native';
import Back from '../../../components/Back';

const COURSES: Record<string, any> = {
    'understanding-lessons': {
        title: 'Understanding Lessons',
        description: 'Find some peace of mind by learning about what anxiety comes from, how our body experiences a panic attack, and why it might be happening.',
        image: require('../../../assets/images/learn/banner_understanding.png'),
        color: 'bg-violet-100'
    },
    'short-term': {
        title: 'Short Term Lessons',
        description: 'Learn quick techniques to manage anxiety in the moment when you feel overwhelmed.',
        image: require('../../../assets/images/learn/banner_short_term.png'),
        color: 'bg-sky-100'
    },
    'long-term': {
        title: 'Long Term Lessons',
        description: 'Build long-term resilience and understanding of your mental health journey.',
        image: require('../../../assets/images/learn/banner_long_term.png'),
        color: 'bg-orange-100'
    }
};

const LESSONS = [
    {
        id: '1',
        title: 'What is Anxiety?',
        icon: null,
        iconSource: require('../../../assets/images/learn/icon_anxiety.png'),
        color: 'bg-teal-100',
    },
    {
        id: '2',
        title: 'Physical & Mental Effects',
        icon: '🧠',
        iconSource: null,
        color: 'bg-orange-100',
    },
    {
        id: '3',
        title: 'Causes & Theories',
        icon: null,
        iconSource: require('../../../assets/images/learn/icon_causes.png'),
        color: 'bg-blue-100',
    }
];

export default function CourseScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const courseId = typeof id === 'string' ? id : 'understanding-lessons';
    const course = COURSES[courseId] || COURSES['understanding-lessons'];

    return (
        <View className={`flex-1 ${course.color}`}>
            <StatusBar style="dark" />

            {/* Top Illustration Area */}
            <SafeAreaView edges={['top']} className={`flex-0 bg-white ${course.color}`}>
                <View className="px-6 pt-2 pb-8">
                    <View className="flex-row justify-between items-center mb-6">
                        <Back onPress={() => router.back()} style="bg-white" iconColor="#000" />
                    </View>

                    <View className="items-center justify-center py-2 h-48">
                        <Image
                            source={course.image}
                            className="w-full h-full"
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </SafeAreaView>

            {/* Bottom Sheet Content */}
            <View className="flex-1 bg-white rounded-t-[40px] px-8 pt-10 shadow-sm">
                <Text className="text-3xl font-bold text-slate-700 text-center mb-4">
                    {course.title}
                </Text>

                <Text className="text-slate-500 text-center text-lg leading-6 mb-8 px-2">
                    {course.description}
                </Text>

                <View className="gap-4">
                    {LESSONS.map((lesson) => (
                        <TouchableOpacity
                            key={lesson.id}
                            onPress={() => router.push(`../lesson/${lesson.id}`)}
                            className="flex-row items-center p-4 bg-white border border-slate-100 rounded-3xl shadow-sm active:bg-slate-50"
                        >
                            <View className={`w-16 h-16 ${lesson.color} rounded-2xl items-center justify-center mr-4 overflow-hidden`}>
                                {lesson.iconSource ? (
                                    <Image source={lesson.iconSource} className="w-10 h-10" resizeMode="contain" />
                                ) : (
                                    <Text className="text-3xl">{lesson.icon}</Text>
                                )}
                            </View>

                            <View className="flex-1">
                                <Text className="text-lg font-bold text-slate-700">{lesson.title}</Text>
                            </View>

                            <ChevronRight size={24} color="#CBD5E1" />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}
