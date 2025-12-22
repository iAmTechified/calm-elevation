import { Pressable, Text, View, Image, ImageSourcePropType } from "react-native";


interface LessonCardProps {
    onPress: () => void;
    title: string;
    completedLessons: number;
    totalLessons: number;
    imagePlaceholderColor?: string;
    imageSource?: ImageSourcePropType;
    style?: string;
}

export default function LessonCard({
    onPress,
    title,
    completedLessons,
    totalLessons,
    imagePlaceholderColor = "bg-blue-200",
    imageSource,
    style
}: LessonCardProps) {
    const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return (
        <Pressable
            onPress={onPress}
            className={`bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 active:opacity-95 w-full mb-4 ${style}`}
        >
            {/* Image Placeholder Section */}
            <View className={`h-28 w-full ${!imageSource ? imagePlaceholderColor : 'bg-white'} items-center justify-center relative`}>
                {imageSource ? (
                    <Image source={imageSource} className="w-full h-full" resizeMode="cover" />
                ) : (
                    <View className="absolute bottom-0 w-full h-4 bg-black/5" />
                )}
            </View>

            {/* Content Section */}
            <View className="p-5 py-2 pt-4">
                <Text className="text-slate-500 font-bold font-sans text-sm mb-1 tracking-wide">
                    {completedLessons}/{totalLessons} Completed
                </Text>

                <Text className="text-slate-800 text-xl font-bold font-sans mb-2 tracking-tight">
                    {title}
                </Text>

                {/* Progress Bar */}
                <View className="h-[15px] p-1 mb-2 justify-center items-start bg-slate-100 rounded-full w-full overflow-hidden">
                    <View
                        className="h-[10px] bg-emerald-300 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </View>
            </View>
        </Pressable>
    );
}
