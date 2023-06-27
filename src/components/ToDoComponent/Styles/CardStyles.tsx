import { StyleSheet } from 'react-native';

export const CardStyles = StyleSheet.create({
  card: {
    width: '90%',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 20,
    alignSelf: 'center',
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // // Shadow for Android
    elevation: 5,
    position: 'relative',
    backgroundColor: '#fff',
    zIndex: -2,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  viewStyle: {
    justifyContent: 'center',
  },
  taskText: {
    fontSize: 18,
    color: '#252525',
    fontWeight: 'bold',
  },
  icon: {
    resizeMode: 'cover',
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
    marginRight: 15,
    marginLeft: 15,
  },
});
