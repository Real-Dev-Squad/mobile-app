import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  viewContainer:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  cardContainer: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  paragraphText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#555',
    marginBottom: 10,
  },
  Modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    alignContent: 'center',
    margin: 37,
  },

  Button: {
    marginTop: 20,
    backgroundColor: '#6a6bcf',
    padding: 10,
    borderRadius: 8,
  },
  sliderStyle:{ 
    width: '80%', 
    alignSelf: 'center' 
  }
});