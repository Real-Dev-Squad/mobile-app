import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  centerMain: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  content: {
    // margin: 4,
    // alignSelf: 'center',
  },
  modalView: {
    justifyContent: 'center',
    marginHorizontal: 30,
    backgroundColor: '#f2f0f0',
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#F0F0F0',
    borderRadius: 8,
  },
  block: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'flex-start',
  },
  buttonBg: {
    width: '100%',
    backgroundColor: '#0034a5',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  textTitle: {
    flex: 2,
    color: '#000000',
    flexWrap: 'wrap',
  },
  dateText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});