import { StyleSheet } from 'react-native';
import { colors } from './GlobalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerBackground: {
    height: 150,
    justifyContent: 'flex-start',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 40,
  },
  headerRightButtons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginRight: 20,
  },
  profileInfo: {
    padding: 16,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  avatar: {
    borderWidth: 0,
    borderColor: colors.gray,
  },
  editButton: {
    marginTop: '10',
    borderColor: colors.gray
    
  },
  editlabel:{
    color:colors.primary,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 12,
  },
  username: {
    fontSize: 15,
    color: colors.gray,
    marginBottom: 12,
  },
  bio: {
    fontSize: 15,
    color: colors.darkGray,
    marginBottom: 12,
  },
  joinDate: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 12,
  },
  followInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  followText: {
    color: colors.gray,
    marginRight: 20,
  },
  followCount: {
    color: colors.gray,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: colors.gray,
    paddingTop: 16,
  },
  tabText: {
    color: colors.gray,
    fontSize: 14,
  },
  
});