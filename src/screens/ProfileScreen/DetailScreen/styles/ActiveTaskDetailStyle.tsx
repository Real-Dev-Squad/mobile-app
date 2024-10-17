import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e7cfe7',
    alignContent: 'space-between',
  },
  mainTitle: {
    color: '#2827CC',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  titles: {
    fontSize: 20,
    elevation: 2,
    marginBottom: 5,
    marginTop: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  buttonStyle: {
    width: 150,
    height: 40,
    backgroundColor: '#9cb8b5',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonTextStyle: {
    color: 'black',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    fontSize: 15,
  },
  buttoncontainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'grey',
    padding: 6,
    marginTop: 12,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});