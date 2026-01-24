import React, { ReactNode } from 'react';
import { View, ImageSourcePropType, ViewStyle } from 'react-native';
import { Image, ImageContentFit } from 'expo-image';
import { useRouter } from 'expo-router';
import Back from './Back';

interface HeroHeaderProps {
    image?: string | ImageSourcePropType; // expo-image accepts string urls too
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

    const getContentFit = (): ImageContentFit => {
        switch (imageResizeMode) {
            case 'stretch': return 'fill';
            case 'center': return 'none';
            case 'repeat': return 'none'; // repeat handled via unique prop if needed, fallback to none/cover
            default: return imageResizeMode as ImageContentFit;
        }
    };

    return (
        <View className={`absolute top-0 w-full pb-8 ${className} z-[50]`}>
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

            <View className="items-center justify-center h-[300px] -m-[20px] -mt-[120px] z-[0]">
                {children ? (
                    children
                ) : image ? (
                    <Image
                        source={image}
                        className="w-full h-full"
                        style={{ width: '100%', height: '100%' }}
                        contentFit={getContentFit()}
                        transition={200}
                    />
                ) : null}
            </View>
        </View>
    );
}
