import React, { useState, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import { Send } from 'lucide-react-native';
import Colors from '@/constants/Colors';

const Support = () => {
    const navigation = useNavigation(); // Use the navigation hook
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello! How can I help you today?', sender: 'support' },
        { id: '2', text: 'I need some help with my order.', sender: 'user' },
        { id: '3', text: 'Sure! Let me check that for you.', sender: 'support' },
    ]);
    const [messageText, setMessageText] = useState('');

    const handleSendMessage = () => {
        if (messageText.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { id: String(prevMessages.length + 1), text: messageText, sender: 'user' },
            ]);
            setMessageText('');
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ color: '#007bff', marginLeft: 10 }}>Back</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const renderItem = ({ item }: any) => {
        return (
            <View
                style={[
                    styles.messageContainer,
                    item.sender === 'user' ? styles.userMessage : styles.supportMessage,
                ]}
            >
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageList}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder="Type your message..."
                    placeholderTextColor="#888"
                />
                <Send onPress={handleSendMessage} style={{ marginLeft: 10 }} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    messageList: {
        paddingBottom: 80,
    },
    messageContainer: {
        maxWidth: '80%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.light.secondary,
        borderRadius: 10,
    },
    supportMessage: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.light.tertiary,
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    textInput: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
        fontSize: 16,
    },
});

export default Support;
