import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 16,
    margin: 12,
    backgroundColor: 'white',
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1D1283',
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#333',
  },
  createdBy: {
    color: 'grey',
  },
  assignee: {
    color: 'grey',
  },
  endsOn: {
    color: 'grey',
  },
  startedOn: {
    color: 'grey',
  },
  status: {
    fontWeight: 'bold',
    color: '#3498db',
  },

  isActiveButton: {
    color: '#3498db',
    marginTop: 10,
  },

  isActiveableContent: {
    paddingBottom: 30,
  },

  progressBar: {
    width: '100%',
    // marginBottom: 16,
  },

  progressControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 16,
  },

  button: {
    fontSize: 20,
    color: '#3498db',
  },

  progressText: {
    fontSize: 18,
    color: '#333',
  },
  emptyView: {
    color: 'black',
    marginTop: 20,
  },
});