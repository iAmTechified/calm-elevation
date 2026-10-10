
import React from 'react';
import { View, Text, Modal, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

interface CheckInModalProps {
    visible: boolean;
    onClose: () => void;
    onMoodSelect: (moodScore: number) => void;
}

const MOODS = [
    { score: 20, image: require('../assets/moods/worried.jpeg'), key: 'worried', label: 'Worried' },
    { score: 40, image: require('../assets/moods/sad.jpeg'), key: 'sad', label: 'Sad' },
    { score: 60, image: require('../assets/moods/indifferent.jpeg'), key: 'okay', label: 'Okay' },
    { score: 80, image: require('../assets/moods/happy.jpeg'), key: 'good', label: 'Good' },
    { score: 100, image: require('../assets/moods/strong.jpeg'), key: 'great', label: 'Great' },
];

export const CheckInModal: React.FC<CheckInModalProps> = ({ visible, onClose, onMoodSelect }) => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-[#1e3a8a] relative">
                {/* Close Button */}
                <TouchableOpacity
                    onPress={onClose}
                    style={{ top: Math.max(insets.top, 16) + 8, left: Math.max(insets.left, 16) + 4 }}
                    className="absolute bg-white/20 p-2 rounded-full z-20"
                >
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>

                {/* Content with ScrollView for small devices */}
                <ScrollView
                    className="flex-1 w-full"
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 24,
                        paddingTop: Math.max(insets.top, 20) + 50,
                        paddingBottom: Math.max(insets.bottom, 20) + 20,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="items-center w-full max-w-sm">
                        {/* Mascot */}
                        <View className="mb-6 items-center justify-center">
                            <Image
                                source={require('../assets/cal_success.png')}
                                className="w-40 h-40"
                                resizeMode="contain"
                            />
                        </View>

                        {/* Text */}
                        <Text className="text-white text-2xl font-bold text-center mb-4">
                            {t('checkIn.greeting')}
                        </Text>

                        <Text className="text-white/80 text-center text-base leading-relaxed mb-6 font-sans">
                            {t('checkIn.subtext')}
                        </Text>

                        {/* Mood Section */}
                        <View className="mt-4 w-full">
                            <Text className="text-white text-lg text-center mb-5 font-medium">
                                {t('checkIn.prompt')}
                            </Text>

                            <View className="flex-row justify-between items-center w-full">
                                {MOODS.map((mood, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => onMoodSelect(mood.score)}
                                        className="items-center flex-1 max-w-[56px]"
                                    >
                                        <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mb-1.5 overflow-hidden border border-white/30">
                                            <Image
                                                source={mood.image}
                                                className="w-full h-full"
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <Text className="text-white text-xs font-medium text-center" numberOfLines={1}>
                                            {t(`checkIn.moods.${mood.key}`, { defaultValue: mood.label })}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};
