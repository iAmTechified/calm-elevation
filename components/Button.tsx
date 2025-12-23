import { Pressable, Text } from "react-native";

interface ButtonProps {
    onPress: () => void;
    text: string;
    style?: string;
    textStyle?: string;
    disabled?: boolean;
}

export default function Button({ onPress, text, style, textStyle, disabled }: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className={`py-5 px-6 rounded-3xl bg-primary w-full shadow-[5px_5px_5px_0px] ${style} ${disabled ? 'opacity-50' : ''}`}
            style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
        >
            <Text className={`font-semibold font-sans text-lg tracking-wide text-center ${textStyle}`}>
                {text}
            </Text>
        </Pressable>
    );
}