import { StyleSheet } from 'react-native';
import { colors } from './GlobalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginVertical: 10,
  },
  changePhoto: {
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
});
