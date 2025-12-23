
import React from 'react';
import { View, Text, Modal, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface CheckInModalProps {
    visible: boolean;
    onClose: () => void;
    onMoodSelect: (moodScore: number) => void;
}

const MOODS = [
    { score: 20, image: require('../assets/moods/worried.jpeg'), label: 'Worried' },
    { score: 40, image: require('../assets/moods/sad.jpeg'), label: 'Sad' },
    { score: 60, image: require('../assets/moods/indifferent.jpeg'), label: 'Okay' },
    { score: 80, image: require('../assets/moods/happy.jpeg'), label: 'Good' },
    { score: 100, image: require('../assets/moods/strong.jpeg'), label: 'Great' },
];

export const CheckInModal: React.FC<CheckInModalProps> = ({ visible, onClose, onMoodSelect }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-[#1e3a8a] relative items-center justify-center p-6">
                {/* Close Button */}
                <TouchableOpacity
                    onPress={onClose}
                    className="absolute top-12 left-6 bg-white/20 p-2 rounded-full z-10"
                >
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>

                {/* Content */}
                <View className="items-center w-full max-w-sm">
                    {/* Mascot */}
                    <View className="mb-8 items-center justify-center">
                        <Image
                            source={require('../assets/cal_success.png')}
                            className="w-48 h-48"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Text */}
                    <Text className="text-white text-2xl font-bold text-center mb-6">
                        Yay, I'm glad you're here!
                    </Text>

                    <Text className="text-white/80 text-center text-lg leading-relaxed mb-6 font-sans">
                        Showing up consistently is an important step to enhance our well-being.
                    </Text>

                    {/* Mood Section */}
                    <View className="mt-8 w-full">
                        <Text className="text-white text-xl text-center mb-6 font-medium">
                            How's it going today?
                        </Text>

                        <View className="flex-row justify-between items-center px-2">
                            {MOODS.map((mood, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => onMoodSelect(mood.score)}
                                    className="items-center"
                                >
                                    <View className="w-14 h-14 rounded-full bg-white/20 items-center justify-center mb-2 overflow-hidden border border-white/30 backdrop-blur-sm">
                                        <Image
                                            source={mood.image}
                                            className="w-full h-full"
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <Text className="text-white text-xs font-medium">
                                        {mood.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
