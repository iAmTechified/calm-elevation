import { Image, ImageSourcePropType } from "react-native";
import { Pressable, Text, View } from "react-native";

interface PressableCardProps {
    onPress: () => void;
    title: string;
    imagePlaceholderColor?: string;
    style?: string;
    imageSource?: ImageSourcePropType;
}

export default function PressableCard({
    onPress,
    title,
    imagePlaceholderColor = "bg-slate-200",
    imageSource,
    style = "bg-white"
}: PressableCardProps) {
    return (
        <Pressable
            onPress={onPress}
            className={`rounded-[32px] overflow-hidden shadow-sm border border-slate-100 active:opacity-90 min-w-[45%] ${style}`}
        >
            {/* Image Placeholder Section */}
            <View className={`h-28 w-full ${imagePlaceholderColor} items-center justify-center`}>
                {/* Placeholder content - can be replaced with Image later */}
                {imageSource && (
                    <Image
                        source={imageSource}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    />
                )}
            </View>

            {/* Title Section */}
            <View className="py-2 items-center justify-center bg-white">
                <Text className="text-slate-800 text-md font-bold text-center font-sans tracking-tight">
                    {title}
                </Text>
            </View>
        </Pressable>
    );
}