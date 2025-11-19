import React from 'react';
import { View, Image, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../Components/CustomButton'; 
import styles from '../Styles/HomeStyles';
import globalStyles, { colors } from '../Styles/GlobalStyles';

export default function HomeScreen({ navigation }) {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('jwt'); 
      Alert.alert('Session closed', 'You have successfully logged out.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
      Alert.alert('Error', 'Could not log out.');
    }
  };

  return (
    <View style={styles.container}>

      {/* 🔹 Logo RotTweet */}
      <Image
        source={require("../assets/img/RotTweetLogo.png")}
        style={{ width: 80, height: 80, marginBottom: 10 }}
        resizeMode="contain"
      />

      {/* 🔹 Título */}
      <Text 
        variant="headlineMedium" 
        style={[styles.title, globalStyles.titleText]}
      >
        Welcome to <Text style={{ color: colors.primary }}>RotTweet</Text>!
      </Text>

      {/* 🔹 Subtítulo */}
      <Text style={[styles.subtitle, globalStyles.paragraph]}>
        User settings and options.
      </Text>

      {/* 🔹 Botón Logout */}
      <CustomButton
        title="Log out"
        icon="logout"
        mode="contained"
        onPress={handleLogout}
        style={{ marginTop: 30 }}
      />
    </View>
  );
}