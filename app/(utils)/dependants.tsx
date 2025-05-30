import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Pencil, Plus, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';

const Dependants = () => {
    const dependants = [
        {
            id: 3,
            name: "Emily Doe",
            accessType: "View Only",
            profileImage: "https://randomuser.me/api/portraits/women/22.jpg",
            relationship: "Wife",
            age: 38
        },
        {
            id: 4,
            name: "Michael Doe",
            accessType: "Full Access",
            profileImage: "https://randomuser.me/api/portraits/men/18.jpg",
            relationship: "Son",
            age: 20
        }
    ];
    

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                    {dependants.map(dep => (
                        <View key={dep.id} style={styles.card}>
                        <Image source={{ uri: dep.profileImage }} style={styles.image} />
                        <View style={styles.info}>
                          <Text style={styles.name}>{dep.name}</Text>
                          <Text>Relationship: {dep.relationship}</Text>
                          <Text>Age: {dep.age}</Text>
                          <Text>Access Type: {dep.accessType}</Text>
                          <View style={styles.actions}>
                            <TouchableOpacity onPress={() => console.log(`Edit ${dep.name}`)} style={styles.iconButton}>
                              <Pencil size={20} color={Colors.dark.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log(`Delete ${dep.name}`)} style={styles.iconButton}>
                              <Trash2 size={20} color="red" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      
                    ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    router.push('/(utils)/create-dependants');
                }}
            >
                <Plus color={"#fff"} size={24} />
            </TouchableOpacity>
            </SafeAreaView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
    },
    actions: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 12,
      },
      iconButton: {
        padding: 4,
      },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.dark.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    fabAvatar: {
        width: 64,
        height: 64,
        borderRadius: 16,
        resizeMode: 'cover',
    },
});

export default Dependants;
