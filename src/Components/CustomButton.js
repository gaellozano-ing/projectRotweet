import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { colors } from '../Styles/GlobalStyles';

export default function CustomButton({ title, mode = 'contained', onPress, style, icon, disabled}) {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      icon={icon}
      style={[styles.button, style]}
      buttonColor={mode === 'contained' ? colors.primary : undefined}
      textColor={mode === 'text' ? colors.primary : '#fff'}
      contentStyle={styles.content}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    borderRadius: 30,
  },
  content: {
    paddingVertical: 6,
  },
});
