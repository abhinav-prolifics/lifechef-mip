import React, { useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Send } from 'lucide-react-native';
import moment from 'moment';
import { useRouter } from 'expo-router';

const Support = () => {
    const navigation = useNavigation();
    const router = useRouter();

    const [messages, setMessages] = useState([
        // May 28, 2025
        {
            id: '1',
            text: 'Hi! Ready to start your personalized diet plan today?',
            sender: 'support',
            timestamp: '2025-05-28T09:00:00Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        },
        {
            id: '2',
            text: 'Yes, I want to lose 5 kgs in 2 months. Can you help?',
            sender: 'user',
            timestamp: '2025-05-28T09:01:00Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        },
        {
            id: '3',
            text: 'Absolutely! I’ll customize your meal plans accordingly.',
            sender: 'support',
            timestamp: '2025-05-28T09:02:00Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        },
        {
            id: '4',
            text: 'Great, looking forward to the plan!',
            sender: 'user',
            timestamp: '2025-05-28T09:03:30Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png  ',
        },

        // May 28 continued (shipping/tracking analogy replaced)
        {
            id: '5',
            text: 'Your first week’s meal plan is ready and sent to your email.',
            sender: 'support',
            timestamp: '2025-05-28T09:05:00Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        },
        {
            id: '6',
            text: 'Thanks! Can you also include snack options?',
            sender: 'user',
            timestamp: '2025-05-28T09:05:45Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png  ',
        },
        {
            id: '7',
            text: 'Sure, I’ve added healthy snacks to your plan now.',
            sender: 'support',
            timestamp: '2025-05-28T09:06:20Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        },

        // May 26, 2025
        {
            id: '8',
            text: 'Hi, I’m unsure if I can eat dairy products on this plan?',
            sender: 'user',
            timestamp: '2025-05-26T14:22:00Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png  ',
        },
        {
            id: '9',
            text: 'No worries! We can customize your plan to be dairy-free.',
            sender: 'support',
            timestamp: '2025-05-26T14:23:10Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        },
        {
            id: '10',
            text: 'Perfect, thanks! What about sugar intake?',
            sender: 'user',
            timestamp: '2025-05-26T14:24:00Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png  ',
        },
        {
            id: '11',
            text: 'We recommend limiting added sugars to under 25g daily.',
            sender: 'support',
            timestamp: '2025-05-26T14:25:00Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        },

        // May 20, 2025
        {
            id: '12',
            text: 'Hello, is this the diet support chat?',
            sender: 'user',
            timestamp: '2025-05-20T10:00:00Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png  ',
        },
        {
            id: '13',
            text: 'Yes, how can I help you with your diet goals today?',
            sender: 'support',
            timestamp: '2025-05-20T10:01:00Z',
            avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        },
    ]);


    const [messageText, setMessageText] = useState('');

    const handleSendMessage = () => {
        if (messageText.trim()) {
            const newMessage = {
                id: String(messages.length + 1),
                text: messageText,
                sender: 'user',
                timestamp: new Date().toISOString(),
                avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png  ',
            };
            setMessages((prev) => [...prev, newMessage]);
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

    const getProcessedMessages = (messages) => {
        const result = [];
        let lastDate = null;

        const sorted = [...messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        sorted.forEach((msg) => {
            const date = moment(msg.timestamp).format('YYYY-MM-DD');
            if (date !== lastDate) {
                result.push({
                    id: `date-${date}`,
                    type: 'date',
                    date,
                });
                lastDate = date;
            }
            result.push({ ...msg, type: 'message' });
        });

        return result;
    };

    const renderItem = ({ item }) => {
        if (item.type === 'date') {
            return (
                <View style={styles.dateSeparator}>
                    <Text style={styles.dateText}>
                        {moment(item.date).format('MMMM D, YYYY')}
                    </Text>
                </View>
            );
        }

        const isUser = item.sender === 'user';
        return (
            <View style={[styles.messageRow, isUser ? styles.rowReverse : {}]}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View
                    style={[
                        styles.messageContainer,
                        isUser ? styles.userMessage : styles.supportMessage,
                    ]}
                >
                    <Text style={styles.messageText}>{item.text}</Text>
                    <Text style={styles.timestampText}>
                        {moment(item.timestamp).format('LT')}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={getProcessedMessages(messages)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder="Type your message..."
                    placeholderTextColor="#888"
                />
                <Send onPress={handleSendMessage} style={{ marginLeft: 10 }} color="#007bff" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5ddd5',
    },
    messageList: {
        paddingBottom: 80,
        paddingHorizontal: 10,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 5,
    },
    rowReverse: {
        flexDirection: 'row-reverse',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginHorizontal: 6,
    },
    messageContainer: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    userMessage: {
        backgroundColor: '#dcf8c6',
    },
    supportMessage: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    timestampText: {
        fontSize: 12,
        color: '#999',
        alignSelf: 'flex-end',
        marginTop: 4,
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
    dateSeparator: {
        alignItems: 'center',
        marginVertical: 10,
    },
    dateText: {
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
    },
});

export default Support;
