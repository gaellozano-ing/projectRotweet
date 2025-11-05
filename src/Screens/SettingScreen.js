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
      await AsyncStorage.removeItem('jwt'); // 🧹 Elimina el token
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], // 👈 Evita volver atrás con el botón del celular
      });
    } catch (error) {
      console.log('❌ Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
  };

  return (
    <View style={styles.container}>
      <MaterialDesignIcons name="twitter" size={60} color={colors.primary} style={styles.icon} />

      <Text variant="headlineMedium" style={[styles.title, globalStyles.titleText]}>
        ¡welcome a X!
      </Text>

      <Text style={[styles.subtitle, globalStyles.paragraph]}>
        Configuración y opciones del usuario.
      </Text>

      {/* 🔘 Botón de cerrar sesión */}
      <CustomButton
        title="Cerrar sesión"
        icon="logout"
        mode="contained"
        onPress={handleLogout}
        style={{ marginTop: 30 }}
      />
    </View>
  );
}

