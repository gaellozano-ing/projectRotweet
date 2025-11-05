import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from './GlobalStyles';

export default StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    fontWeight: 'bold',
    fontSize: fontSizes.medium,
    color: colors.text,
    marginRight: 6,
  },
  username: {
    fontSize: fontSizes.small,
    color: colors.gray,
  },
  tweetText: {
    fontSize: fontSizes.medium,
    color: colors.text,
    lineHeight: 20,
  },
    separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: 5,
  },
   iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    paddingRight: spacing.xl,
  },
});
