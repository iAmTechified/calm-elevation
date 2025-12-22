import { Pressable, Text } from "react-native";

interface ButtonProps {
    onPress: () => void;
    text: string;
    style?: string;
    textStyle?: string;
}

export default function Button({ onPress, text, style, textStyle }: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            className={`py-5 px-6 rounded-3xl bg-primary w-full shadow-[5px_5px_5px_0px] ${style}`}
            style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.8 : 1 }],
                transition: "all ease-in-out 0.2s"
            })}
        >
            <Text className={`font-semibold font-sans text-lg tracking-wide text-center ${textStyle}`}>
                {text}
            </Text>
        </Pressable>
    );
}