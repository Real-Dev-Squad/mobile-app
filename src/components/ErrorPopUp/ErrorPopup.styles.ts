import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
  childContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
  },
  text: {
    fontSize: 16,
    paddingVertical: 10,
    width: '75%',
    textAlign: 'center',
    paddingTop: 20,
  },
  successIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingBottom: 20,
    paddingTop: 10,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    height: 96,
  },
  button: {
    backgroundColor: '#E20062',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    // bottom: 10,
    margin: 10,
    alignSelf: 'center',
    color: 'white',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subContainer: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
});
