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
    style = "bg-white dark:bg-slate-800"
}: PressableCardProps) {
    return (
        <Pressable
            onPress={onPress}
            className={`rounded-[32px] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 active:opacity-90 min-w-[45%] ${style}`}
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
            <View className="py-2 items-center justify-center bg-white dark:bg-slate-800">
                <Text className="text-slate-800 dark:text-gray-100 text-md font-semibold text-center font-sans tracking-tight">
                    {title}
                </Text>
            </View>
        </Pressable>
    );
}