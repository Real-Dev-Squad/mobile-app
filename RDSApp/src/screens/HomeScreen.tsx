import React, {useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import withHeader from "../helpers/withHeader";
import Strings from "../i18n/en";
import {HomeViewStyle} from "../styles/GlobalStyle";

const HomeScreen = () => {
  const [status, SetStatus] = useState<string>("active");
  const [oooStatus, SetOOOStatus] = useState<boolean>(false);
  const changeStatus = () =>
    status === "active" ? SetStatus("idle") : SetStatus("active");
  const changeoooStatus = () =>
    oooStatus === false ? SetOOOStatus(true) : SetOOOStatus(false);
  return (
    <View style={HomeViewStyle.container}>
      {oooStatus === false && (
        <View>
          <Text style={HomeViewStyle.heading}>
            {status === "active" ? Strings.Active_Text : Strings.Idle_Text}
          </Text>
          <TouchableOpacity
            style={
              status === "idle"
                ? HomeViewStyle.idleBtn
                : HomeViewStyle.activeButton
            }
            onPress={changeStatus}>
            <Text
              style={
                status === "idle"
                  ? HomeViewStyle.idleBtnText
                  : HomeViewStyle.activeBtnText
              }>
              {status === "active"
                ? Strings.IdleBtn_Text
                : Strings.ActiveBtn_Text}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {oooStatus === true && (
        <Text style={HomeViewStyle.heading}>{Strings.OOOStatus_Text}</Text>
      )}
      <TouchableOpacity onPress={changeoooStatus}>
        <Text style={HomeViewStyle.oooBtn}>
          {oooStatus === false ? Strings.OOOBtn1_Text : Strings.OOOBtn2_Text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default withHeader(HomeScreen);
