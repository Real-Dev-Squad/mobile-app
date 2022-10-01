import { StyleSheet } from 'react-native';

export const ProgressBarStyles = StyleSheet.create({
  bar: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'green',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 2,
  },
  innerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    overflow: 'hidden',
    width: 120,
    backgroundColor: '#fff',
  },
});
