
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ArrowLeft, HelpCircle } from 'lucide-react-native';

export default function SleepScreen() {
    const router = useRouter();

    const tracks = [
        {
            id: 1,
            title: 'Crackling Fire',
            duration: '10 hr 1 min',
            image: require('../../assets/sleep_fireplace.png'),
            audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3' // Fire sound
        },
        {
            id: 2,
            title: 'Night Ambience',
            duration: '10 hrs',
            image: require('../../assets/sleep_lullaby.png'),
            audioUrl: 'https://assets.mixkit.co/active_storage/sfx/61/61-preview.mp3' // Crickets/Night
        },
        {
            id: 3,
            title: 'Gentle Ocean',
            duration: '10 hrs',
            image: require('../../assets/sleep_ocean.png'),
            audioUrl: 'https://assets.mixkit.co/active_storage/sfx/243/243-preview.mp3' // Gentle waves
        },
        {
            id: 4,
            title: 'Soft Rain',
            duration: '10 hr 2 mins',
            image: require('../../assets/sleep_ocean.png'), // Keeping placeholder image for now
            audioUrl: 'https://assets.mixkit.co/active_storage/sfx/113/113-preview.mp3' // Light rain
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-[#1e1b4b]" edges={['top']}>
            <StatusBar style="light" />

            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between relative z-10">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
                >
                    <ArrowLeft color="#FFF" size={24} />
                </TouchableOpacity>
                <Text className="text-3xl font-bold text-white absolute w-full text-center">Sleep</Text>
                <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                    <HelpCircle color="#FFF" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 bg-white mt-4 rounded-t-[40px]" contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Hero Section - overlap with header bg but inside scrollview? 
                    Actually the design shows the image overlapping the top edge or sitting on it.
                    Let's just put the image at the top of the white section, slightly offset upwards if needed.
                */}
                <View className="items-center justify-center -mt-24 mb-6 relative z-0 pointer-events-none">
                    <Image
                        source={require('../../assets/cal_sleeping_moon.png')}
                        style={{ width: 280, height: 280 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Description */}
                <View className="px-8 mb-8 -mt-4">
                    <Text className="text-slate-600 text-center leading-relaxed text-lg font-medium">
                        Make bedtime a relaxing, anxiety-free time, with calming sounds from nature, music, and more.
                    </Text>
                </View>

                {/* Tracks Grid */}
                <View className="px-6 flex-row flex-wrap justify-between gap-y-6">
                    {tracks.map((track) => (
                        <TouchableOpacity
                            key={track.id}
                            onPress={() => router.push({
                                pathname: '/sleep/[id]',
                                params: {
                                    id: track.id,
                                    title: track.title,
                                    audioUrl: track.audioUrl,
                                    // We can't pass require() result easily params sometimes, usually pass ID and require in the other file.
                                    // But here we'll just pass ID and look it up there. 
                                    // For simplicity let's only pass serializable data.
                                    // We will redefine the data in the details screen or export it.
                                }
                            })}
                            className="w-[48%] bg-white rounded-2xl shadow-sm border border-slate-100 pb-3 overflow-hidden"
                        >
                            <View className="h-32 w-full bg-slate-100 mb-3 relative">
                                <Image
                                    source={track.image}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                                {/* Optional Heart Icon */}
                                {/* <View className="absolute top-2 right-2 w-8 h-8 bg-black/30 rounded-full items-center justify-center">
                                    <Heart color="#FFF" size={16} />
                                </View> */}
                            </View>
                            <View className="px-3">
                                <Text className="text-slate-800 font-bold text-base leading-tight">
                                    {track.title}
                                </Text>
                                <Text className="text-slate-400 text-sm mt-1">
                                    {track.duration}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
