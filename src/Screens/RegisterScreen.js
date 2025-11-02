import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../Components/CustomButton';
import globalStyles, { colors } from '../Styles/GlobalStyles';
import styles from '../Styles/RegisterStyles';
import axios from 'axios';


export default function RegisterScreen({ navigation }) {
  const [Username, setUsermame] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const API_URL = 'http://192.168.1.6:1337/api/auth/local/register'; // reemplaza con tu IP


  const handleRegister = async () => {
  if (!Username || !email || !password) {
    alert('Por favor completa todos los campos');
    return;
  }

  try {
    const response = await axios.post(API_URL, {
      username: Username,
      email: email,
      password: password,
    });

    console.log('Usuario registrado:', response.data);
    alert('Registro exitoso');
    navigation.navigate('Login');

  } catch (error) {
    console.log('Error al registrar:', error.response?.data || error.message);
    alert(
      error.response?.data?.error?.message ||
      'Error al registrarse. Verifica tus datos o la conexión.'
    );
  }
};


  return (
    <View style={[globalStyles.container, globalStyles.centered]}>
      <Icon name="twitter" size={80} color={colors.primary} style={styles.icon} />

      <Text variant="headlineMedium" style={[styles.title, globalStyles.titleText]}>
        Crear cuenta
      </Text>

      <View style={styles.formContainer}>
        <TextInput
          label="Username"
          value={Username}
          onChangeText={setUsermame}
          mode="outlined"
          left={<TextInput.Icon icon="account" />}
          style={styles.input}
          theme={{ roundness: 12 }}
        />

        <TextInput
          label="email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          left={<TextInput.Icon icon="email" />}
          style={styles.input}
          theme={{ roundness: 12 }}
        />

        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          left={<TextInput.Icon icon="lock" />}
          style={styles.input}
          theme={{ roundness: 12 }}
        />
      </View>

      <CustomButton
        icon='account-plus'
        title="Registrarse"
        onPress={handleRegister}
      />

      <CustomButton
        title="¿Ya tienes cuenta? Iniciar sesión"
        mode="text"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}
