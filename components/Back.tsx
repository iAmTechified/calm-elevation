import { TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";

interface BackProps {
    onPress: () => void;
    style?: string;
    iconColor?: string;
}

export default function Back({ onPress, style, iconColor = "#fff" }: BackProps) {
    return (
        <TouchableOpacity onPress={onPress} className={`rounded-full bg-[#70C6C9] p-2 ${style}`}>
            <ChevronLeft size={23} strokeWidth={5} stroke={iconColor} color={iconColor} />
        </TouchableOpacity>
    );
}