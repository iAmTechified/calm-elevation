
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Send, ArrowLeft, Sparkles, MessageSquare } from 'lucide-react-native';
import { sendMessageToAI, ChatMessage } from '../../lib/chat';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function ChatScreen() {
    const router = useRouter();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        // Initial welcome message
        setMessages([
            {
                id: 'init',
                role: 'assistant',
                content: "Hi, I'm Cal. How are you feeling today? I can help guide you to the right place in the app."
            }
        ]);
    }, []);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Wait a small bit to simulate thinking if it's too fast (local mock)
            await new Promise(r => setTimeout(r, 600));

            const response = await sendMessageToAI(userMsg.content, messages);
            setMessages(prev => [...prev, response]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: "I'm having a little trouble connecting right now. Please try again."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const navigateTo = (route: string) => {
        router.push(route as any);
    };

    const renderItem = ({ item }: { item: ChatMessage }) => {
        const isUser = item.role === 'user';
        return (
            <View className={`w-full flex-row ${isUser ? 'justify-end' : 'justify-start'} mb-4 px-4`}>
                {!isUser && (
                    <View className="w-8 h-8 rounded-full bg-primary/20 items-center justify-center mr-2 self-end mb-1">
                        <Sparkles size={16} color="#4A90E2" />
                    </View>
                )}
                <View className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser ? 'bg-primaryLight rounded-tr-none' : 'bg-gray-100 rounded-tl-none'}`}>
                    <Text className={`text-[15px] leading-5 ${isUser ? 'text-white' : 'text-slate-800'}`}>
                        {item.content}
                    </Text>
                    {item.action && (
                        <TouchableOpacity
                            onPress={() => navigateTo(item.action!.target)}
                            className="mt-3 bg-white/90 border border-primary/20 py-2 px-4 rounded-xl flex-row items-center justify-center"
                        >
                            <Text className="text-primaryLight font-medium mr-2">Go to Section</Text>
                            <ArrowLeft size={14} color="#0e7490" style={{ transform: [{ rotate: '180deg' }] }} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100 bg-white z-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-gray-50">
                    <ArrowLeft size={24} color="#333" />
                </TouchableOpacity>
                <View className="items-center">
                    <Text className="font-semibold text-lg text-slate-800">Cal AI Guide</Text>
                    <Text className="text-xs text-slate-500">Always here to help</Text>
                </View>
                <View className="w-10" />
            </View>

            <LinearGradient
                colors={['#f0f9ff', '#ffffff']}
                className="flex-1"
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingVertical: 20 }}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />
            </LinearGradient>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
                className="bg-white border-t border-gray-100 px-4 py-3"
            >
                <View className="flex-row items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
                    <TextInput
                        className="flex-1 text-base text-slate-800 max-h-20 py-2"
                        placeholder="Type a message..."
                        placeholderTextColor="#94a3b8"
                        value={input}
                        onChangeText={setInput}
                        multiline
                        returnKeyType="send"
                        onSubmitEditing={handleSend}
                    />
                    <TouchableOpacity
                        onPress={handleSend}
                        disabled={isLoading || !input.trim()}
                        className={`p-2 rounded-full ml-2 ${input.trim() ? 'bg-primaryLight' : 'bg-gray-300'}`}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Send size={20} color="white" />
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
