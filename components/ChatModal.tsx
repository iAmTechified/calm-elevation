import React, { useState, useRef, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    useColorScheme,
    Keyboard,
    LayoutAnimation,
    UIManager,
} from 'react-native';
import { X, Send, Bot, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '../constants/Colors';
import { sendMessageToAI, ChatMessage } from '../lib/chat';
import { router } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ChatModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function ChatModal({ visible, onClose }: ChatModalProps) {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const isDark = colorScheme === 'dark';

    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            content: "Hi! I'm Cal. How are you feeling right now?",
            role: 'assistant',
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [visible, messages]);

    const handleSendMessage = async () => {
        if (!messageText.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            content: messageText.trim(),
            role: 'user',
        };

        // UI update immediately
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMessages((prev) => [...prev, userMsg]);
        setMessageText('');
        setIsTyping(true);

        try {
            const response = await sendMessageToAI(userMsg.content, messages);

            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setMessages((prev) => [...prev, response]);

            // Handle Navigation Actions
            if (response.action && response.action.type === 'navigate') {
                setTimeout(() => {
                    onClose();
                    router.push(response.action!.target as any);
                }, 1500);
            }

        } catch (error) {
            console.error("Chat Error", error);
        } finally {
            setIsTyping(false);
        }
    };

    const renderMessage = ({ item }: { item: ChatMessage }) => {
        const isUser = item.role === 'user';
        return (
            <View
                style={[
                    styles.messageRow,
                    isUser ? styles.messageRowUser : styles.messageRowCal,
                ]}
            >
                {!isUser && (
                    <View style={[styles.avatarContainer, { backgroundColor: theme.surfaceHighlight }]}>
                        <Bot size={16} color={theme.primary} />
                    </View>
                )}

                <View
                    style={[
                        styles.messageBubble,
                        isUser
                            ? { backgroundColor: theme.primary, borderBottomRightRadius: 2 }
                            : { backgroundColor: isDark ? '#334155' : '#F0F2F5', borderBottomLeftRadius: 2 },
                    ]}
                >
                    <Text
                        style={[
                            styles.messageText,
                            isUser ? { color: '#FFFFFF' } : { color: theme.text },
                        ]}
                    >
                        {item.content}
                    </Text>
                </View>

                {isUser && (
                    <View style={[styles.avatarContainer, { backgroundColor: theme.surfaceHighlight, marginLeft: 8, marginRight: 0 }]}>
                        <User size={16} color={theme.textSecondary} />
                    </View>
                )}
            </View>
        );
    };

    return (
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        //     style={styles.container}
        //     enabled={Platform.OS === 'ios'}
        //     keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        // >
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
                className='h-[100px]'
            >

                    <ScrollView className='h-[400px]'>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                            style={styles.container}
                            enabled={Platform.OS === 'ios'}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                        >
                            <View
                                style={[
                                    styles.modalContent,
                                    {
                                        backgroundColor: isDark ? Colors.dark.surface : '#FFFFFF',
                                        shadowColor: isDark ? '#000' : '#000',
                                    },
                                ]}
                            >
                                {/* Header */}
                                <View
                                    style={[
                                        styles.header,
                                        { borderBottomColor: isDark ? '#334155' : '#F0F0F0' },
                                    ]}
                                >
                                    <View style={styles.headerTitleContainer}>
                                        <Bot size={20} color={theme.primary} style={{ marginRight: 8 }} />
                                        <View>
                                            <Text style={[styles.headerTitle, { color: theme.text }]}>
                                                Chat with Cal
                                            </Text>
                                            <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
                                                AI Wellness Companion
                                            </Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        onPress={onClose}
                                        style={[styles.closeButton, { backgroundColor: isDark ? '#334155' : '#F5F5F5' }]}
                                    >
                                        <X size={20} color={theme.text} />
                                    </TouchableOpacity>
                                </View>

                                {/* Chat Area */}
                                <FlatList
                                    ref={flatListRef}
                                    style={{ flex: 1 }}
                                    data={messages}
                                    renderItem={renderMessage}
                                    keyExtractor={(item) => item.id}
                                    contentContainerStyle={styles.listContent}
                                    showsVerticalScrollIndicator={false}
                                    ListFooterComponent={
                                        isTyping ? (
                                            <View style={[styles.messageRow, styles.messageRowCal]}>
                                                <View style={[styles.avatarContainer, { backgroundColor: theme.surfaceHighlight }]}>
                                                    <Bot size={16} color={theme.primary} />
                                                </View>
                                                <View style={[styles.messageBubble, { backgroundColor: isDark ? '#334155' : '#F0F2F5', borderBottomLeftRadius: 2 }]}>
                                                    <Text style={{ color: theme.textSecondary, fontSize: 12, fontStyle: 'italic' }}>Typing...</Text>
                                                </View>
                                            </View>
                                        ) : null
                                    }
                                />

                                {/* Input Area */}
                                <View
                                    style={[
                                        styles.inputContainer,
                                        {
                                            borderTopColor: isDark ? '#334155' : '#F0F0F0',
                                            backgroundColor: isDark ? Colors.dark.surface : '#FFFFFF',
                                        },
                                    ]}
                                >
                                    <TextInput
                                        style={[
                                            styles.input,
                                            {
                                                backgroundColor: isDark ? '#0F172A' : '#F8F9FA',
                                                color: theme.text,
                                                borderColor: isDark ? '#334155' : '#E9ECEF',
                                            },
                                        ]}
                                        placeholder="Type a message..."
                                        placeholderTextColor={theme.textSecondary}
                                        value={messageText}
                                        onChangeText={setMessageText}
                                        multiline
                                        maxLength={500}
                                    />
                                    <TouchableOpacity
                                        style={[
                                            styles.sendButton,
                                            {
                                                backgroundColor: messageText.trim()
                                                    ? theme.primary
                                                    : isDark
                                                        ? '#334155'
                                                        : '#E0E0E0',
                                                opacity: messageText.trim() ? 1 : 0.7,
                                            },
                                        ]}
                                        onPress={handleSendMessage}
                                        disabled={!messageText.trim()}
                                    >
                                        <Send size={18} color="#FFFFFF" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
            </Modal>
        // </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    blurContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        height: '85%', // Taller modal
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 20,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
    },
    headerSubtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 10,
    },
    closeButton: {
        padding: 8,
        borderRadius: 20,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 20,
    },
    messageRow: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        maxWidth: '100%',
    },
    messageRowUser: {
        justifyContent: 'flex-end',
    },
    messageRowCal: {
        justifyContent: 'flex-start',
    },
    avatarContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    messageBubble: {
        padding: 12,
        borderRadius: 20,
        maxWidth: '75%',
    },
    messageText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 15,
        lineHeight: 22,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        minHeight: 44,
        maxHeight: 100,
        borderRadius: 22,
        paddingHorizontal: 16,
        paddingTop: 12, // For multiline vertical centering
        paddingBottom: 12,
        marginRight: 10,
        fontFamily: 'Poppins_400Regular',
        fontSize: 15,
        borderWidth: 1,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0, // Align with bottom of input
    },
});
