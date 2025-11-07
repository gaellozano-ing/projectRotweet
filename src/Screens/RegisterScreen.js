import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../Components/CustomButton';
import globalStyles, { colors } from '../Styles/GlobalStyles';
import styles from '../Styles/RegisterStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [Username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);

  const API_URL = 'http://192.168.1.8:1337'; 

  useEffect(()=>{
     const isValid = Username.trim() !== '' && password.trim() !== '' && email.trim() !='' && password.trim() != '';
    setFormValid(isValid);
  }, [Username, password, email, password]);

 

  const handleRegister = async () => {
  if (!Username || !name || !email || !password) {
    Alert.alert('Incomplete fields', 'Please complete all fields.');
    return;
  } else if (password.trim().length < 8) {
    Alert.alert('Invalid password', 'The password must be at least 8 characters long.');
    return;
  }

    try {
      // Registrar el usuario en Strapi
      const registerRes = await axios.post(`${API_URL}/api/auth/local/register`, {
        username: Username,
        email: email,
        password: password,
      });

      console.log('user Registrer:', registerRes.data);

      const { jwt, user } = registerRes.data;

      //  token
      await AsyncStorage.setItem('jwt', jwt);

      //create profile
      const profileRes = await axios.post(
        `${API_URL}/api/profiles`,
        {
          data: {
            name: name,
            bio: '',
            user: user.id, //  user profile
          },
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      console.log('Profile created and associated:', profileRes.data);

      Alert.alert('Successful', `Welcome ${name} (${Username})`);
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error registering:', error.response?.data || error.message);
      Alert.alert(
        'Error registering:',
        error.response?.data?.error?.message ||
          'An error occurred. Please check your details or your connection.'
      );
    }
  };

  return (
    <View style={[globalStyles.container, globalStyles.centered]}>
      <MaterialDesignIcons name="twitter" size={80} color={colors.primary} style={styles.icon} />

      <Text variant="headlineMedium" style={[styles.title, globalStyles.titleText]}>
        Create account
      </Text>

      <View style={styles.formContainer}>

        {/* Full Name */}
        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          left={<TextInput.Icon icon="account-outline" />}
          style={styles.input}
          theme={{ roundness: 12 }}
        />

        {/* Username */}
        <TextInput
          label="Username"
          value={Username}
          onChangeText={setUsername}
          mode="outlined"
          left={<TextInput.Icon icon="at" />}
          style={styles.input}
          theme={{ roundness: 12 }}
        />

        {/* Email */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          left={<TextInput.Icon icon="email" />}
          style={styles.input}
          theme={{ roundness: 12 }}
        />

        {/* Password */}
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          left={<TextInput.Icon icon="lock" />}
          style={styles.input}
          theme={{ roundness: 12 }}
        />
      </View>

      <CustomButton icon="account-plus" title="Register" onPress={handleRegister} disabled={!formValid}/>

      <CustomButton
        title="Already have an account? Log in"
        mode="text"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}
