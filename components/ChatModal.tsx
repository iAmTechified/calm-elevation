import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { X, Send } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

interface ChatModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function ChatModal({ visible, onClose }: ChatModalProps) {
    const [message, setMessage] = React.useState('');

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Chat with Cal</Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <X size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.chatArea}>
                            <View style={styles.calMessage}>
                                <Text style={styles.messageText}>Hi! How represent you feeling today?</Text>
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Type a message..."
                                placeholderTextColor="#999"
                                value={message}
                                onChangeText={setMessage}
                            />
                            <TouchableOpacity style={styles.sendButton}>
                                <Send size={20} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </BlurView>
        </Modal>
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
    content: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '80%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
        color: '#333',
    },
    closeButton: {
        padding: 5,
    },
    chatArea: {
        flex: 1,
    },
    calMessage: {
        backgroundColor: '#F0F8FF',
        padding: 15,
        borderRadius: 20,
        borderBottomLeftRadius: 5,
        alignSelf: 'flex-start',
        maxWidth: '80%',
    },
    messageText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 30,
        padding: 5,
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#333',
    },
    sendButton: {
        backgroundColor: '#4A90E2',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
});
