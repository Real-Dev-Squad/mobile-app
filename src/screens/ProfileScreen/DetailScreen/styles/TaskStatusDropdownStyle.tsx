import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    height: 50,
    elevation: 5,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#6f9ee6',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    textShadowColor: 'Blue',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});