import { StyleSheet } from 'react-native';

export const TodoStyles = StyleSheet.create({
  shodowcard: {
    width: '80%',
    paddingVertical: 30,
    borderWidth: 4,
    borderColor: '#cfcbc2',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
  },
  title: {
    fontSize: 25,
    color: '#492ed1',
    fontWeight: 'bold',
  },
});
