import React from 'react';
import { View, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../Components/CustomButton'; 
import styles from '../Styles/HomeStyles';
import globalStyles, { colors } from '../Styles/GlobalStyles';

export default function HomeScreen({ navigation }) {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('jwt'); // delete token
      Alert.alert('Session closed', 'You have successfully logged out.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], //  Avoid going back using the phone's button.
      });
    } catch (error) {
      console.log('Logout error:', error);
      Alert.alert('Error', 'Could not log out.');
    }
  };

  return (
    <View style={styles.container}>
      <MaterialDesignIcons name="twitter" size={60} color={colors.primary} style={styles.icon} />

      <Text variant="headlineMedium" style={[styles.title, globalStyles.titleText]}>
        ¡welcome a X!
      </Text>

      <Text style={[styles.subtitle, globalStyles.paragraph]}>
        User settings and options.
      </Text>

      {/* Logout button */}
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

