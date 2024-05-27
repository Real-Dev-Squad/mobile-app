import { StyleSheet } from 'react-native';

export const profileScreenStyles = StyleSheet.create({
  progressStyle: {
    backgroundColor: '#ffff',
    padding: 4,
    borderRadius: 5,
    elevation: 2,
    marginTop: 8,
  },
  mainview: {
    flex: 1,
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  isActiveableContent: {
    paddingBottom: 30,
  },
  titleText: {
    color: '#041187', // You can customize the text color
    fontSize: 26,
    fontWeight: 'bold',
    padding: 5,
  },
  linkText: {
    color: '#0366d6',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 20,
    paddingBottom: 10,
    color: 'black',
    fontWeight: 'bold', // You can add this if you want to make it bold
  },
  subTitleTypeText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
  },
  smallTitle: {
    color: 'black',
    fontWeight: '600',
    // paddingVertical: 8,
    textAlign: 'left',
    flex: 1,
  },
  imageView: {
    alignItems: 'center',
  },
  stickyButtonContainer: {
    position: 'absolute',
    bottom: 16, // Adjust the value based on your preference
    left: '20%', // Center the button horizontally
    transform: [{ translateX: -50 }], // Center the button horizontally
    width: '80%', // Adjust the width based on your preference
    zIndex: 2, // Ensure the button is above other elements
  },
  taskUpdateTitle: {
    marginTop: 20,
    color: '#041187',
    fontSize: 26,
    fontWeight: '800',
  },
  taskUpdateDateTitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 20,
  },
  taskUpdateQuestion: {
    marginTop: 16,
    color: '#616161',
    fontSize: 16,
  },
  taskUpdateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  progressUpdateBackground: {
    borderRadius: 8,
    backgroundColor: '#1C315E',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  progressText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  progressListLeftPadding: {
    marginLeft: 5,
    color: 'black',
  },
  updateButtonContainer: {
    backgroundColor: '#0034a5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '45%',
    borderRadius: 10,
  },
  updatebutton: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '800',
  },
  missedProgressCount: {
    color: 'red',
    fontWeight: '700',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  submitProgressContainer: {
    backgroundColor: '#0034a5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '30%',
    borderRadius: 10,
    marginTop: 16,
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
  mainContainer: {
    // marginHorizontal: 24,
    // marginVertical: 8,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#F7F7F7',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  cardBackground: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#F0F0F0',
    borderRadius: 8,
  },
  flexItemWidth: {
    width: '50%',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    // backgroundColor: '#E20062',
    // borderRadius: 20,
    // padding: 10,
    // elevation: 2,
    // width: '40%',
    // alignItems: 'center',
    // position: 'absolute',
    // bottom: 10,
    // color: 'white',

    paddingHorizontal: 5,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
    top: 10,
    backgroundColor: '#E20062',
    alignSelf: 'flex-end',
    margin: 5,
    width: '20%',
    textAlign: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //UI enhance
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    // elevation: 1,
  },
  DropDownElement: {
    // padding: 2,
    color: 'black',
    width: '100%',
    alignSelf: 'center',
    height: 'auto',
  },
  DropDownbackground: {
    padding: 5,
    // elevation: 1,
    height: 'auto',
    alignSelf: 'center',
    width: '100%',
    // backgroundColor: '#fff',
    // borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    // elevation: 1,
  },
});
