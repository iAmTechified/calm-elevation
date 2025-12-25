import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Heart, Lock } from 'lucide-react-native';
import HeroHeader from '../../components/HeroHeader';
import { useStats } from '../../hooks/useStats';
import { useAccess } from '../../hooks/useAccess';



import { sleepTracks } from '../../data/sleep';

export default function SleepScreen() {
    const router = useRouter();
    const { updateEmotionalState } = useStats();
    const { isLocked } = useAccess();


    const tracks = sleepTracks;

    return (
        <View className="flex-1 font-sans bg-[#1e1b4b]">
            <StatusBar style="light" />

            <HeroHeader
                image={require('../../assets/night.jpeg')}
                onBack={() => router.back()}
                imageResizeMode="cover"
            />

            <SafeAreaView edges={['top']} className="flex-0 h-full z-10">
                <ScrollView className="pb-20">
                    <View className="flex-1 bg-white dark:bg-slate-900 rounded-t-[40px] h-full px-8 pt-10 mt-[200px] z-[999] shadow-sm">
                        <Text className="text-3xl font-semibold font-sans text-slate-800 dark:text-white text-center mb-4">
                            Sleep Sounds
                        </Text>

                        <Text className="text-lg font-sans text-slate-600 dark:text-slate-300 text-center leading-6 mb-8 px-2">
                            Drift off with high-quality, loopable sounds. Accessible offline.
                        </Text>

                        <View className="flex-row flex-wrap justify-between gap-y-6 pb-20">
                            {tracks.map((track) => {
                                const locked = isLocked('sleep-track', { trackId: track.id });
                                return (
                                    <TouchableOpacity
                                        key={track.id}
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            if (locked) {
                                                router.push('/paywall');
                                            } else {
                                                updateEmotionalState(0.05);
                                                router.push({
                                                    pathname: '/sleep/[id]',
                                                    params: {
                                                        id: track.id
                                                    }
                                                });
                                            }
                                        }}
                                        className="w-[48%] bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 pb-3 overflow-hidden relative"
                                    >
                                        <View className="h-28 w-full bg-slate-100 dark:bg-slate-700 mb-3 relative">
                                            <Image
                                                source={track.image}
                                                className={`w-full h-full ${locked ? 'opacity-50' : ''}`}
                                                resizeMode="cover"
                                            />
                                            {locked && (
                                                <View className="absolute inset-0 items-center justify-center bg-black/10">
                                                    <Lock color="#fff" size={24} />
                                                </View>
                                            )}
                                        </View>
                                        <View className="px-3">
                                            <Text className="text-slate-800 dark:text-gray-100 font-bold text-base leading-tight mb-1">
                                                {track.title}
                                            </Text>
                                            <Text className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-wide">
                                                {track.duration}
                                            </Text>
                                        </View>

                                        {locked && (
                                            <View className="absolute top-2 right-2 bg-amber-500 px-2 py-0.5 rounded-full z-10">
                                                <Text className="text-white text-[10px] font-bold">PREMIUM</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
