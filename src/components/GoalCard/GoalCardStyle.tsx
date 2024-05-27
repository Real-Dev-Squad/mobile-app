import {StyleSheet} from 'react-native';

export const GoalCardStyles = StyleSheet.create({
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
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
  heading: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  dueText: {
    fontSize: 14,
    color: 'red',
  },
});
