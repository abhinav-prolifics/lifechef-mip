import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';

const CreateDependants = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [age, setAge] = useState('');
    const [accessType, setAccessType] = useState('');

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <SafeAreaView>
                    <View style={styles.form}>
                        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.image} />
                            ) : (
                                <View style={styles.placeholder}>
                                    <Text style={styles.placeholderText}>Upload Photo</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Name"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Relationship</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Father"
                                value={relationship}
                                onChangeText={setRelationship}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Age</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Age"
                                keyboardType="numeric"
                                value={age}
                                onChangeText={setAge}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Access Type</Text>
                            <View style={styles.optionContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        accessType === 'Full' && styles.selectedOption,
                                    ]}
                                    onPress={() => setAccessType('Full')}
                                >
                                    <Text style={styles.optionTitle}>Full Access</Text>
                                    <Text style={styles.optionDescription}>
                                        Can view and manage all medical records and appointments.
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        accessType === 'Read Only' && styles.selectedOption,
                                    ]}
                                    onPress={() => setAccessType('Read Only')}
                                >
                                    <Text style={styles.optionTitle}>Read Only</Text>
                                    <Text style={styles.optionDescription}>
                                        Can view information but cannot make changes or book.
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Button
                        onPress={()=>{}}
                        title='Create Dependant'
                        />

                    </View>
                </SafeAreaView>
            </ScrollView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    form: {
        gap: 5,
    },
    imageContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    placeholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#666',
        fontSize: 14,
    },
    inputGroup: {
        marginBottom: 10,
    },
    label: {
        marginBottom: 4,
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    optionContainer: {
        gap: 12,
        marginTop:10,
    },
    option: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#f9f9f9',
    },
    selectedOption: {
        borderColor: '#007bff',
        backgroundColor: '#e6f0ff',
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    optionDescription: {
        fontSize: 14,
        color: '#555',
    },

});

export default CreateDependants;
