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
    // fontWeight: 'bold',
    padding: 18,
    color: 'black',
  },
  subTitleText: {
    fontSize: 20,
    paddingBottom: 10,
    color: 'black',
  },
  imageView: {
    // marginTop: 24,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
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
    // elevation: 5,
  },
  button: {
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 4,
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 10,
    width: '60%',
    elevation: 2,
    color: 'white',
  },
  buttonOpen: {
    // backgroundColor: '#1D1283',
    color: 'white',
    // backgroundColor: '#E20062',
    // backgroundColor: 'white',
  },
  buttonClose: {
    // backgroundColor: '#1D1283',
    // backgroundColor: '#E20062',
    backgroundColor: 'white',
    // backgroundColor: '#E20062',
  },
  // buttonClose: {
  //   backgroundColor: '#1D1283',
  // },
  textStyle: {
    color: 'black',
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
