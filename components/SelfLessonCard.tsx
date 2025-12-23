import { TouchableOpacity, View, Text } from 'react-native';
import { CheckCircle2, Lock } from 'lucide-react-native';

function SelfLessonCard({ lesson, isCompleted, isUnlocked, isPaywalled, onPress }: { lesson: any, isCompleted: boolean, isUnlocked: boolean, isPaywalled: boolean, onPress: () => void }) {

    // Determine styles based on state
    const bgStyle = isCompleted ? 'rgba(236, 253, 245, 1)' : !isUnlocked ? 'rgba(241, 245, 249, 1)' : 'white';
    const borderStyle = isCompleted ? '#10B981' : !isUnlocked ? 'transparent' : '#f1f5f9';
    const opacityStyle = !isUnlocked && !isCompleted ? 0.6 : 1;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: '48%',
                padding: 16,
                borderRadius: 16,
                backgroundColor: bgStyle,
                borderColor: borderStyle,
                borderWidth: 1,
                opacity: opacityStyle,
                marginBottom: 10
            }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: !isUnlocked ? '#94a3b8' : '#38bdf8' }}>Day {lesson.day}</Text>
                {isCompleted ? (
                    <CheckCircle2 size={18} color="#10B981" />
                ) : (isUnlocked && !isPaywalled) ? null : (
                    <Lock size={16} color={isPaywalled ? "#F59E0B" : "#94A3B8"} />
                )}
            </View>
            <Text
                numberOfLines={1}
                style={{ fontSize: 15, fontWeight: '600', color: !isUnlocked ? '#94a3b8' : '#1e293b' }}
            >
                {lesson.title}
            </Text>

            {isPaywalled && (
                <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#f59e0b', paddingHorizontal: 6, paddingVertical: 2, borderTopRightRadius: 16, borderBottomLeftRadius: 8 }}>
                    <Text style={{ color: 'white', fontSize: 8, fontWeight: '800' }}>PREMIUM</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

export default SelfLessonCard