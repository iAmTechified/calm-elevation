import React, { ReactNode } from 'react';
import { View, Image, ImageSourcePropType, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import Back from './Back';

interface HeroHeaderProps {
    image?: ImageSourcePropType;
    iconColor?: string;
    onBack?: () => void;
    className?: string;
    rightElement?: ReactNode;
    children?: ReactNode;
    backButtonStyle?: string;
    imageResizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

export default function HeroHeader({
    image,
    iconColor = "#000",
    onBack,
    className = "",
    rightElement,
    children,
    backButtonStyle = "bg-white",
    imageResizeMode = "cover"
}: HeroHeaderProps) {
    const router = useRouter();

    return (
        <View className={`absolute top-0 w-full pb-8 ${className}`}>
            <View className="flex-row p-6 pt-16 justify-between items-center z-[50]">
                <View>
                    <Back
                        onPress={onBack || (() => router.back())}
                        style={backButtonStyle}
                        iconColor={iconColor}
                    />
                </View>
                {rightElement && (
                    <View className="mr-6 mt-2">
                        {rightElement}
                    </View>
                )}
            </View>

            <View className="items-center justify-center h-[300px] -m-[20px] -mt-[110px]">
                {children ? (
                    children
                ) : image ? (
                    <Image
                        source={image}
                        className="w-full h-full"
                        resizeMode={imageResizeMode}
                    />
                ) : null}
            </View>
        </View>
    );
}
