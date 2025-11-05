import React, { useState, useEffect } from 'react';
import { View, Alert, Image } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import CustomButton from '../Components/CustomButton';
import globalStyles, { colors } from '../Styles/GlobalStyles';
import styles from '../Styles/LoginStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const API_URL = 'http://192.168.1.8:1337'; // tu backend Strapi

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
      Alert.alert('Error', 'Por favor, complete todos los campos.', [{ text: 'OK' }]);
      return;
    }

    try {
      
      const response = await axios.post(`${API_URL}/api/auth/local`, {
        identifier: User, 
        password: Password,
      });

      const { jwt, user } = response.data;

      
      await AsyncStorage.setItem('jwt', jwt);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      Alert.alert('Bienvenido', `Hola ${user.username}!`);
      console.log('✅ Token guardado:', jwt);

      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error.response?.data || error.message);
      Alert.alert(
        'Error',
        error.response?.data?.error?.message || 'Usuario o contraseña incorrectos.'
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
