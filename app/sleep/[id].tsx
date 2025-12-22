import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { X, Play, Pause, SkipBack, SkipForward } from 'lucide-react-native';
import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

export default function SleepPlayerScreen() {
    const router = useRouter();
    const { id, title, audioUrl } = useLocalSearchParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(600 * 60 * 1000); // Default 10 hours ish

    // Load Sound
    useEffect(() => {
        async function loadSound() {
            try {
                // If audioUrl is string constraint, ensure it's not array
                const url = Array.isArray(audioUrl) ? audioUrl[0] : audioUrl;

                if (!url) {
                    setIsLoading(false);
                    return;
                }

                console.log('Loading Sound:', url);
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: url },
                    { shouldPlay: true, isLooping: true },
                    onPlaybackStatusUpdate
                );
                setSound(newSound);
                setIsPlaying(true);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading sound', error);
                setIsLoading(false);
            }
        }

        loadSound();

        return () => {
            if (sound) {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
        };
    }, [audioUrl]);

    const onPlaybackStatusUpdate = (status: any) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis || duration);
            setIsPlaying(status.isPlaying);
        }
    };

    const togglePlayback = async () => {
        if (!sound) return;
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    };

    const formatTime = (millis: number) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1e1b4b]">
            <StatusBar style="light" />

            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
                >
                    <X color="#FFF" size={24} />
                </TouchableOpacity>
                {/* Spacer */}
                <View className="w-10" />
            </View>

            <View className="flex-1 items-center justify-center -mt-20">
                {/* Rings Animation (Static for now, could be animated) */}
                <View className="items-center justify-center relative">
                    <View className="absolute w-[500px] h-[500px] rounded-full border border-white/5" />
                    <View className="absolute w-[400px] h-[400px] rounded-full border border-white/10" />
                    <View className="absolute w-[300px] h-[300px] rounded-full border border-white/20" />

                    {/* Mascot */}
                    <Image
                        source={require('../../assets/cal_meditating_cloud.png')}
                        style={{ width: 250, height: 250 }}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {/* Player Controls */}
            <View className="px-8 pb-12 w-full items-center">

                {/* Play Button */}
                <TouchableOpacity
                    onPress={togglePlayback}
                    className="w-20 h-20 bg-white rounded-full items-center justify-center mb-8 shadow-lg shadow-white/10"
                >
                    {isLoading ? (
                        <ActivityIndicator color="#1e1b4b" size="large" />
                    ) : isPlaying ? (
                        <Pause color="#1e1b4b" size={32} fill="#1e1b4b" />
                    ) : (
                        <Play color="#1e1b4b" size={32} fill="#1e1b4b" className="ml-1" />
                    )}
                </TouchableOpacity>

                <Text className="text-white/80 text-xl font-medium mb-8 text-center">
                    {title || 'Sleep Sound'}
                </Text>

                {/* Slider / Progress Bar Placeholder */}
                <View className="w-full flex-row items-center gap-3">
                    <Text className="text-white/60 text-sm font-medium w-12 text-right">
                        {formatTime(position)}
                    </Text>
                    <View className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <View
                            className="h-full bg-teal-300 rounded-full"
                            style={{ width: duration > 0 ? `${(position / duration) * 100}%` : '0%' }}
                        />
                    </View>
                    <Text className="text-white/60 text-sm font-medium w-12 text-right">
                        {formatTime(duration)}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
