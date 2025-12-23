import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { X, Play, Pause } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { useAudioPlayer } from 'expo-audio';
import { Audio } from 'expo-av';
import { CheckInModal } from '../../components/CheckInModal';

import { sleepTracks } from './_data';
import { useStats } from '../../hooks/useStats';

export default function SleepPlayerScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { updateEmotionalState } = useStats();

    const track = sleepTracks.find(t => t.id === id);
    const audioSource = track?.audioSource;

    // Initialize player with the source
    const player = useAudioPlayer(audioSource);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [sessionTime, setSessionTime] = useState(0); // Time elapsed in this session
    const totalDuration = track?.totalDurationSeconds || 3600; // Default 1 hour if missing

    // Provide immediate feedback when player is ready and setup background audio
    useEffect(() => {
        const setupAudio = async () => {
            try {
                await Audio.setAudioModeAsync({
                    staysActiveInBackground: true,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false
                });
            } catch (e) {
                console.log('Error setting audio mode', e);
            }
        };
        setupAudio();

        if (player) {
            // Configure player to loop infinitely
            player.loop = true;
            player.play();
            setIsPlaying(true);
            setIsLoading(false);
        }
    }, [player]);

    // Track session time (fake progress for the user)
    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setSessionTime(prev => {
                    const next = prev + 1;
                    if (next >= totalDuration) {
                        // Optional: Stop player if session complete? 
                        // For now, let it loop, just cap the visual progress or wrap?
                        // "loop for duration" usually means stop after duration.
                        // Let's stop.
                        if (player) player.pause();
                        setIsPlaying(false);

                        // Reward user for completing the "session" (even if looping usually, here it ends)
                        // +0.2 (20 pts) for a full sleep session
                        updateEmotionalState(0.2);
                        setIsCheckInVisible(true);

                        return totalDuration;
                    }

                    // Logic: Every minute, give small boost?
                    // Maybe every 5 minutes +0.05
                    // Let's do it on completion for now to avoid complexity or abuse, 
                    // or ideally check milestones. 
                    if (next % 300 === 0) { // Every 5 mins
                        updateEmotionalState(0.05);
                    }

                    return next;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, totalDuration, player, updateEmotionalState]);

    const togglePlayback = () => {
        if (!player) return;

        if (player.playing) {
            player.pause();
            setIsPlaying(false);
        } else {
            player.play();
            setIsPlaying(true);
        }
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) {
            return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
        }
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Calculate progress percentage based on session time relative to total desired duration
    const progress = totalDuration > 0 ? (sessionTime / totalDuration) * 100 : 0;

    // CheckIn handling
    const [isCheckInVisible, setIsCheckInVisible] = useState(false);
    const { recordMood } = useStats();

    const handleCheckIn = async (moodScore: number) => {
        await recordMood(moodScore);
        setIsCheckInVisible(false);
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1e1b4b]">
            <StatusBar style="light" />

            <CheckInModal
                visible={isCheckInVisible}
                onClose={() => {
                    setIsCheckInVisible(false);
                    router.back();
                }}
                onMoodSelect={handleCheckIn}
            />

            {/* Header */}
            <View
                className="px-6 py-4 flex-row items-center justify-between"
                style={{ zIndex: 100, elevation: 10, position: 'relative' }}
            >
                <TouchableOpacity
                    onPress={() => {
                        if (player) player.pause();
                        router.back();
                    }}
                    className="w-20 h-20 bg-white/20 rounded-full items-center justify-center"
                    style={{ zIndex: 101, elevation: 11 }}
                >
                    <X color="#FFF" size={24} />
                </TouchableOpacity>
                {/* Spacer */}
                <View className="w-10" />
            </View>

            <View className="flex-1 items-center justify-center -mt-20" pointerEvents="box-none">
                {/* Rings Animation (Static for now) */}
                <View className="items-center justify-center relative" pointerEvents="none">
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
                    {track?.title || 'Sleep Sound'}
                </Text>

                {/* Slider / Progress Bar */}
                <View className="w-full flex-row items-center gap-3">
                    <Text className="text-white/60 text-sm font-medium w-12 text-right">
                        {formatTime(sessionTime)}
                    </Text>
                    <View className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <View
                            className="h-full bg-teal-300 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </View>
                    <Text className="text-white/60 text-sm font-medium w-12 text-right">
                        {formatTime(totalDuration)}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
