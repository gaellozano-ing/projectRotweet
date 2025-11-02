import { StyleSheet } from 'react-native';

export const colors = {
   primary: '#f4a261',      // naranja suave y cálido (color principal)
  background: '#fff5eb',   // fondo crema claro, da buena lectura
  text: '#3d3d3d',         // texto gris oscuro (sin llegar a negro)
  gray: '#bcbcbc',         // gris medio para bordes o placeholders
  lightGray: '#e0e0e0',    // gris claro para fondos secundarios
  darkGray: '#5a5a5a',     // gris oscuro para títulos o subtítulos
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const fontSizes = {
  small: 14,
  medium: 16,
  large: 20,
  title: 24,
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  titleText: {
    fontSize: fontSizes.title,
    fontWeight: '600',
    color: colors.text,
  },
  paragraph: {
    fontSize: fontSizes.medium,
    color: colors.darkGray,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedButton: {
    borderRadius: 30,
    paddingVertical: spacing.sm,
  },
});

export default globalStyles;
