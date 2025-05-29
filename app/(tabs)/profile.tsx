import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { MoveRight, Wallet, User, ShoppingBag, ArrowRightIcon, LucideHelpCircle, Banknote, LogOutIcon, Lock, HeartHandshake } from 'lucide-react-native';
import Banner from "../../assets/images/banner.jpg";
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    totalOrders: 25,
    profileImage: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
  };

  const information = [
    {
      id: 1,
      name: "Your Orders",
      icon: ShoppingBag,
    },
    {
      id: 2,
      name: "Care Giver",
      icon: HeartHandshake,
    },
    {
      id: 3,
      name: "Address book",
      icon: User,
    },
    {
      id: 4,
      name: "Change Password",
      icon: Lock,
    },
    {
      id: 5,
      name: "E-Gift Cards",
      icon: Wallet,
    },
    {
      id: 6,
      name: "Logout",
      icon: LogOutIcon,
    }
  ];


  const handleButtonPress = (id:number) => {
    if (id == 2) {
      router.push("/(utils)/dependants");
    } else
    if (id === 6) {
      router.replace("/auth");
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Profile Container */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.banner}>
          <Image source={Banner} style={styles.backgroundImage} />
          <View style={styles.bannerText}>
            <View style={styles.bannerBox}>
              <Text style={styles.bannerTextTitle}>Add your birthday</Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.bannerTextSubtitle}>Enter details</Text>
                <MoveRight height={20} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.detailsItemContainer}>
          <View style={styles.itemsContainer}>
            {/* Wallet Card */}
            <View style={styles.items}>
              <Wallet size={30} />
              <Text style={styles.cardTitle}>Wallet</Text>
            </View>

            {/* Support Card */}
            <View style={styles.items}>
              <LucideHelpCircle size={30} />
              <Text style={styles.cardTitle}>Support</Text>
            </View>

            {/* Payments Card */}
            <View style={styles.items}>
              <Banknote size={30} />
              <Text style={styles.cardTitle}>Payments</Text>
            </View>
          </View>
        </View>

        {/* your information */}
        <View style={styles.yourInformationContainer}>
          <Text style={styles.header}>YOUR INFORMATION</Text>
          {information.map((item) => (
            <TouchableOpacity key={item.id} style={styles.informationCardContainer}
              onPress={()=>handleButtonPress(item.id)}
            >
              <View style={styles.informationCard}>
                <item.icon size={24} color="#333" />
                <Text style={styles.informationCardLabel}>{item.name}</Text>
              </View>
              <ArrowRightIcon size={24} color="#333" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  profileImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  banner: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    opacity: 0.5,
    backgroundColor: Colors.light.primary,
  },
  bannerText: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  bannerBox: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  bannerTextTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerTextSubtitle: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  detailsItemContainer: {
    marginTop: 14,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  items: {
    backgroundColor: '#fff',
    padding: 15,
    width: '30%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTitle: {
    fontSize: 14,
    marginTop: 10,
    color: '#333',
  },
  yourInformationContainer: {
    // padding:10,
    marginTop: 14,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  informationCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 15,
    backgroundColor: "#fff",
    margin: 2,
    borderRadius: 10,
  },
  informationCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  informationCardLabel: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
});

export default Profile;
