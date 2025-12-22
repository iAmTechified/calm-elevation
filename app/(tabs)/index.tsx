import { View, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import PressableCard from '../../components/PressableCard';
import { Stateometer } from '../../components/Stateometer';
import { LinearGradient } from 'expo-linear-gradient';

const DATA = [
    { id: '1', title: 'Learn', route: '/learn', imagePlaceholderColor: 'bg-blue-200', imagePlaceholder: require('../../assets/learn.jpeg') },
    { id: '2', title: 'Breathe', route: '/breathe', imagePlaceholderColor: 'bg-emerald-200', imagePlaceholder: require('../../assets/breathe.jpeg') },
    { id: '3', title: 'Play', route: '/play', imagePlaceholderColor: 'bg-pink-200', imagePlaceholder: require('../../assets/play.jpeg') },
    { id: '4', title: 'Journal', route: '/journal', imagePlaceholderColor: 'bg-orange-200', imagePlaceholder: require('../../assets/journal.jpeg') },
    { id: '5', title: 'Sleep', route: '/sleep', imagePlaceholderColor: 'bg-indigo-300', imagePlaceholder: require('../../assets/night.jpeg') },
    { id: '6', title: 'Self-healing', route: '/self-healing', imagePlaceholderColor: 'bg-lime-200', imagePlaceholder: require('../../assets/visualize.jpeg') },
] as const;

export default function HomeScreen() {
    const router = useRouter();

    return (
        <>
            <StatusBar style="dark" />
            <SafeAreaView className="flex-1 bg-white" edges={['top']}>            
            <LinearGradient
                            colors={['#6fc6c945', '#f0f636a9', '#6fc6c945']}
                            locations={[0.2, 0.4, 0.6]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="absolute top-0 left-0 right-0 bottom-0 h-[150%] w-[150%] opacity-20"
                            dither
                        >
                        </LinearGradient>
                <View className='bg-primary/2 flex-1'>
                    <Text className='text-4xl font-medium text-center mt-6 mb-2 text-primaryLight'>My Journey</Text>
                    <FlatList
                        data={DATA}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 15 }}
                        contentContainerStyle={{ paddingBottom: 120 }}
                        ListHeaderComponent={() => (
                            <View className="flex-1 p-1 pb-2">
                                {/* Gauge Section */}
                                <View className="mt-2">
                                    <Stateometer score={78} />
                                </View>
                            </View>
                        )}
                        renderItem={({ item }) => (
                            <PressableCard
                                onPress={() => router.push(item.route)}
                                title={item.title}
                                imagePlaceholderColor={item.imagePlaceholderColor}
                                imageSource={item.imagePlaceholder}
                                style="w-[47%] bg-white grow-0 mb-2"
                            />
                        )}
                    />
                </View>
            </SafeAreaView>
        </>
    );
}
