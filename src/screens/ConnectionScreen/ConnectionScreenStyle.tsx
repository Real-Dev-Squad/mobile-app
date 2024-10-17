import { StyleSheet } from "react-native";
import StyleConfig from "../../utils/StyleConfig";
import { scale } from "../../utils/utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: StyleConfig.colors.white,
  },

  retryButton: {
    backgroundColor: StyleConfig.colors.primary,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: 8,
  },
  retry: {
    color: StyleConfig.colors.white,
  },

  noInternetText: {
    color: StyleConfig.colors.darkGrey,
    fontWeight: '500',
    fontSize: scale(16),
    margin: scale(10),
  },

  offlineImage: {
    height: scale(150),
    width: scale(150),
  },
});