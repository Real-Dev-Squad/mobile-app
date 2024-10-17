import { StyleSheet } from "react-native";
import Colors from "../constants/colors/Colors";

export const styles = StyleSheet.create({
  safeAreaContainer:{ 
    backgroundColor: Colors.Primary_Color 
  },
  container: {
    padding: 15,
    backgroundColor: Colors.Primary_Color,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  logo: {
    width: 45,
    height: 45,
  },
});