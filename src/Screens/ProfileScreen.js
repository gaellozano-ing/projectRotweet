import React, { useEffect, useState } from 'react';
import { View, ImageBackground, ActivityIndicator } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import styles from '../Styles/ProfileStyles';
import CustomButton from '../Components/CustomButton';
import { colors } from '../Styles/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.1.8:1337'; // tu backend Strapi

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (!token) {
          navigation.navigate('Login');
          return;
        }

        // ✅ 1️⃣ Obtener el usuario autenticado con su perfil poblado
        const userRes = await axios.get(
          `${API_URL}/api/users/me?populate[profile][populate][avatar]=*`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const user = userRes.data;
        console.log('👤 Usuario con perfil:', user);

        const profileData = user.profile; // el perfil asociado

        if (!profileData) {
          setProfile(null);
          return;
        }

        // ✅ 2️⃣ Construir el objeto con la información
        setProfile({
          name: profileData.name, //perfil name
          username: `${user.username}`, // username del user
          bio: profileData.bio || '',
          joinDate: new Date(user.createdAt).toLocaleDateString(),
          avatar:
            profileData.avatar?.formats?.thumbnail?.url ||
            profileData.avatar?.url ||
            null,
        });
      } catch (error) {
        console.log('❌ Error al obtener perfil:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>No se encontró información del perfil</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/img/descarga.jpeg')}
        style={styles.headerBackground}
      >
        <View style={styles.headerButtons}>
          <MaterialDesignIcons
            name="arrow-left"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.headerRightButtons}>
            <MaterialDesignIcons name="magnify" size={24} color="white" style={styles.headerIcon} />
            <MaterialDesignIcons name="dots-vertical" size={24} color="white" />
          </View>
        </View>
      </ImageBackground>

      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={80}
            source={
              profile.avatar
                ? { uri: `${API_URL}${profile.avatar}` }
                : require('../assets/img/descarga.jpeg')
            }
            style={styles.avatar}
          />
          <CustomButton
            mode="contained"
            style={styles.editButton}
            title="Editar perfil"
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>

        
        <Text style={styles.name}>{profile.name}</Text>

        
        <Text style={styles.username}>{profile.username}</Text>

        <Text style={styles.bio}>{profile.bio}</Text>
        <Text style={styles.joinDate}>
          <MaterialDesignIcons name="calendar-month" size={16} color={colors.darkGray} />{' Se unio en '}
          {profile.joinDate}
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
