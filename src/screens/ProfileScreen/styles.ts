import {StyleSheet} from 'react-native';

export const profileScreenStyles = StyleSheet.create({
  mainview: {
    flex: 1,
    paddingTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    padding: 18,
    color: 'black',
  },
  subTitleText: {
    fontSize: 20,
    paddingBottom: 10,
    color: 'black',
  },
  imageView: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalViewOld: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  buttonOpen: {
    backgroundColor: '#E20062',
  },
  buttonClose: {
    backgroundColor: '#1D1283',
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
  },
  icon: {
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
