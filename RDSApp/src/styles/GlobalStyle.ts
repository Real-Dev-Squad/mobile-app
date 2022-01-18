import {StyleSheet} from 'react-native';

export const TabViewStyle = StyleSheet.create({
  tab_bar: {
    paddingHorizontal: 5,
    padding: 10,
    // paddingTop: 0,
    backgroundColor: '#C4C5C5',
    // position: 'absolute',
    borderTopWidth: 0,
  },
  tab_icon: {
    height: 20,
    width: 20,
  },
});
export const ScreenViewContainer = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_view: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
