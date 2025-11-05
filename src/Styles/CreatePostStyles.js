import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '../Styles/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSizes.title,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: spacing.md,
    borderRadius: 12,
  },
  counterText: {
    textAlign: 'right',
    color: colors.gray,
    fontSize: fontSizes.small,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
});

export default styles;
