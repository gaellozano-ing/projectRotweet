import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from './GlobalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: fontSizes.title,
    color: colors.darkGray,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 30,
    textAlign: 'center',
    color: colors.darkGray,
  },
  button: {
    borderRadius: 30,
    marginTop: spacing.md,
  },
});
