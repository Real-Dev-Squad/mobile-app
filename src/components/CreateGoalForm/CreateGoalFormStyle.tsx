import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    border: '2px solid black',
    padding: 30,
  },
  form: {
    border: '2px solid black',
    padding: 10,
    borderRadius: 15,
  },
  paragraph: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  input: {
    height: 30,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#ecf0f1',
    fontSize: 12,
  },
  formchild: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  toggle: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglechild: {
    margin: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 6,
    marginTop: 12,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttoncontainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    color: 'white'
  }
});