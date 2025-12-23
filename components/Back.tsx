import { TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useColorScheme } from "nativewind";

interface BackProps {
    onPress: () => void;
    style?: string;
    iconColor?: string;
}

export default function Back({ onPress, style, iconColor }: BackProps) {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const defaultColor = isDark ? "#fff" : "#334155";
    const finalIconColor = iconColor || defaultColor;

    return (
        <TouchableOpacity onPress={onPress} className={`rounded-full bg-[#70C6C9] p-2 ${style}`}>
            <ChevronLeft size={23} strokeWidth={5} stroke={finalIconColor} color={finalIconColor} />
        </TouchableOpacity>
    );
}