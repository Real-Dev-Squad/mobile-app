import StyleConfig from "../utils/StyleConfig";
import { scale } from "../utils/utils";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: StyleConfig.colors.borderLight,
    borderRadius: 10,
    padding: scale(14),
    margin: scale(12),
    backgroundColor: 'white',
    elevation: scale(2),
  },
  title: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: scale(8),
    color: StyleConfig.colors.primary,
  },
  text: {
    fontSize: scale(12),
    marginBottom: scale(6),
    fontWeight: 'bold',
    color: StyleConfig.colors.darkGrey,
  },
  createdBy: {
    color: 'grey',
  },
  assignee: {
    color: StyleConfig.colors.justGrey,
  },
  endsOn: {
    color: StyleConfig.colors.justGrey,
  },
  startedOn: {
    color: StyleConfig.colors.justGrey,
  },
  status: {
    fontWeight: 'bold',
    color: StyleConfig.colors.lightBlue,
  },

  isActiveButton: {
    color: StyleConfig.colors.lightBlue,
    marginTop: scale(10),
  },

  emptyView: {
    color: 'black',
    marginTop: scale(20),
  },
});
