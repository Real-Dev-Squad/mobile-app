import { StyleSheet } from 'react-native';

export const CardStyles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: '#492ed1',
    borderRadius: 15,
    padding: 5,
    margin: 15,
    width: '75%',
    alignSelf: 'center',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-between',
    marginTop: 5,
  },
  title: {
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  heading: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  commentIcon: {
    resizeMode: 'cover',
    width: 25,
    height: 25,
  },
  doneBtn: {
    backgroundColor: '#492ed1',
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  doneIcon: {
    resizeMode: 'cover',
    width: 17,
    height: 17,
  },
});
