import { StyleSheet } from 'react-native';

export const AuthViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#2819b3',
  },
  imageContainer: {
    paddingTop: 0,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  constContainer: {
    paddingTop: 20,
    flex: 0.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
  },

  btnView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    minHeight: 60,
    minWidth: 200,
    width: '55%',
  },

  logo: {
    width: 190,
    height: 190,
  },
  githubLogo: {
    flex: 0.2,
    justifyContent: 'center',
    paddingStart: 8,
  },
  signInTxtView: {
    flex: 0.7,
    justifyContent: 'center',
    paddingRight: 5,
  },
  welcomeMsg: {
    fontSize: 35,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cmpnyName: {
    fontSize: 35,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  signInText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addressBarStyle: {
    backgroundColor: '#7130e3',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressBarLink: {
    color: '#5ced83',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  addressBarCancel: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 5,
  },
  addressBarIcon: {
    resizeMode: 'cover',
    width: 20,
    height: 20,
    marginRight: 10,
  },
  webViewStyles: {
    flex: 1,
    paddingBottom: '20%',
  },
});
