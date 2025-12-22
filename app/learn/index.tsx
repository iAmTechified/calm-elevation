
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ArrowLeft, BookOpen, ChevronLeft, GraduationCap, Video } from 'lucide-react-native';
import LessonCard from '../../components/LessonCard';
import Back from '../../components/Back';

export default function LearnScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View className="px-6 py-6 flex-row items-center gap-4">
                <Back onPress={() => router.back()} style='bg-white border border-slate-100' iconColor='black' />
                <Text className="pl-6 text-2xl font-medium text-center text-[#260511]">Learn</Text>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                <View className="px-3 py-4">
                    <LessonCard
                        onPress={() => router.push('./learn/course/understanding-lessons')}
                        title="Understanding Lessons"
                        completedLessons={1}
                        totalLessons={6}
                        imageSource={require('../../assets/images/learn/banner_understanding.png')}
                    />

                    <LessonCard
                        onPress={() => router.push('./learn/course/short-term')}
                        title="Short Term Lessons"
                        completedLessons={1}
                        totalLessons={7}
                        imageSource={require('../../assets/images/learn/banner_short_term.png')}
                    />

                    <LessonCard
                        onPress={() => router.push('./learn/course/long-term')}
                        title="Long Term Lessons"
                        completedLessons={1}
                        totalLessons={8}
                        imageSource={require('../../assets/images/learn/banner_long_term.png')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
