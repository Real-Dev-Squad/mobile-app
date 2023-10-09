import { StyleSheet } from 'react-native';

export const profileScreenStyles = StyleSheet.create({
  mainview: {
    flex: 1,
    paddingTop: 60,
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
    position: 'absolute',
    width: '100%',
    height: '8%',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
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
  logoutButton: {
    backgroundColor: '#E20062',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '40%',
    alignItems: 'center',
    position: 'relative',
    // bottom: 10,
    margin: 10,
    alignSelf: 'center',
    color: 'white',

    // paddingHorizontal: 8,
    // paddingVertical: 6,
    // borderRadius: 20,
    // elevation: 2,
    // top: 10,
    // backgroundColor: '#E20062',
    // alignSelf: 'flex-end',
    // margin: 5,
    // width: '40%',
    // textAlign: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
