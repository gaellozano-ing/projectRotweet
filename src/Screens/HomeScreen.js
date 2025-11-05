import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

import styles from '../Styles/HomeStyles';
import globalStyles, { colors, spacing } from '../Styles/GlobalStyles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={[styles.container, { paddingBottom: spacing.xl }]}>

      <Text
        variant="headlineMedium"
        style={[styles.title, globalStyles.titleText, { color: colors.darkGray }]}
      >
        ¡Bienvenido a X!
      </Text>
      <Text style={[styles.subtitle, globalStyles.paragraph, { color: colors.darkGray }]}>
        Aquí verías tu feed, publicaciones y más.
      </Text>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Login')}
        style={[styles.button, globalStyles.roundedButton]}
        
      >
        Cerrar sesión
      </Button>
    </View>
  );
}
