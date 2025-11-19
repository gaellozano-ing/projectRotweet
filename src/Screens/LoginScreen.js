import React, { useState, useEffect } from 'react';
import { View, Alert, Image } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import CustomButton from '../Components/CustomButton';
import globalStyles, { colors } from '../Styles/GlobalStyles';
import styles from '../Styles/LoginStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const API_URL = 'http://192.168.1.6:1337'; // backend Strapi

export default function LoginScreen({ navigation }) {
  const [User, setUser] = useState('');
  const [Password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);
  

  useEffect(() => {
    const isValid = User.trim() !== '' && Password.trim() !== '';
    setFormValid(isValid);
  }, [User, Password]);

  const handleSave = async () => {
  if (!formValid) {
    Alert.alert('Error', 'Please complete all fields.', [{ text: 'OK' }]);
    return;
  }

  try {
    const response = await axios.post(`${API_URL}/api/auth/local`, {
      identifier: User,
      password: Password,
    });

    const { jwt, user } = response.data;

    // GUARDAR JWT Y USER
    await AsyncStorage.setItem('jwt', jwt);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    // ======================================
    // 1️⃣ OBTENER EL PROFILE DEL USUARIO
    // ======================================
    const profileRes = await axios.get(
      `${API_URL}/api/profiles?filters[user][id][$eq]=${user.id}&populate=avatar`
    );

    const profile = profileRes.data.data[0];

    // Guardar profile completo
    await AsyncStorage.setItem('profile', JSON.stringify(profile));

    Alert.alert('Welcome', `Hola ${user.username}!`);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });

  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    Alert.alert(
      'Error',
      error.response?.data?.error?.message || 'Incorrect username or password.'
    );
  }
};

  return (
    <View style={[globalStyles.container, globalStyles.centered]}>
      <Image
        source={require('../assets/img/RotTweetLogo.png')}
        style={{ width: 120, height: 120, margin: 10 }}
        resizeMode="contain"
      />

      <Text variant="headlineMedium" style={[styles.title]}>
        Welcome to RotWeet
      </Text>
      <Text variant="headlineMedium" style={[styles.title, globalStyles.titleText]}>
        Login
      </Text>

      <View style={styles.formContainer}>
        <TextInput
          label="User"
          value={User}
          onChangeText={setUser}
          mode="outlined"
          left={<TextInput.Icon icon="at" />}
          style={styles.input}
          theme={{ roundness: 12 }}
        />

        <TextInput
          label="Password"
          value={Password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          left={<TextInput.Icon icon="lock" />}
          style={styles.input}
          theme={{ roundness: 12 }}
        />
      </View>

      <CustomButton
        icon="login-variant"
        title="Login"
        onPress={handleSave}
        disabled={!formValid}
      />

      <CustomButton
        icon="account-plus"
        title="Don't have an account? Create one"
        mode="text"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}
