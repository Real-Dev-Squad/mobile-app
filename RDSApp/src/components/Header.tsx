import React from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import Colors from "../assets/colors/Colors";
import Images from "../assets/images/Image";

const Header = () => {
  return (
    <SafeAreaView style={{backgroundColor: Colors.Primary_Color}}>
      <View style={styles.container}>
        <Image source={Images.rdsLogo} style={styles.logo} />
        <StatusBar barStyle={"light-content"} />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const statusBarHeight = () => StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? statusBarHeight() + 5 : 5,
    paddingBottom: 5,
    backgroundColor: Colors.Primary_Color,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 35,
    height: 40,
  },
});
