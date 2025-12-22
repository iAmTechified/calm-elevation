
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react-native';

interface LessonNavigationControlsProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

export default function LessonNavigationControls({
    currentPage,
    totalPages,
    onPrev,
    onNext,
}: LessonNavigationControlsProps) {
    return (
        <View className="flex-1 flex-row gap-3">
            {currentPage > 0 && (
                <TouchableOpacity
                    onPress={onPrev}
                    className="flex-1 h-14 bg-teal-500 rounded-full items-center justify-center shadow-md active:opacity-90"
                >
                    <ChevronLeft size={24} stroke="#fff" strokeWidth={4} color="white" />
                </TouchableOpacity>
            )}

            <TouchableOpacity
                onPress={onNext}
                className="flex-1 h-14 bg-teal-500 rounded-full items-center justify-center shadow-md active:opacity-90"
            >
                {currentPage === totalPages - 1 ? (
                    <Check size={24} stroke="#fff" strokeWidth={4} color="white" />
                ) : (
                    <ChevronRight size={24} stroke="#fff" strokeWidth={4} color="white" />
                )}
            </TouchableOpacity>
        </View>
    );
}
