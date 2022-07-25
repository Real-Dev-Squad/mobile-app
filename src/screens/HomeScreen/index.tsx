import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import withHeader from '../../helpers/withHeader';
import { storeData } from '../../utils/dataStore';
import Strings from '../../i18n/en';
import { updateStatus } from '../AuthScreen/utils';
import { HomeViewStyle } from './styles';
import Toast from 'react-native-toast-message';

const HomeScreen = () => {
  const [loader, setLoader] = useState<boolean>(false);

  const { loggedInUserData, setLoggedInUserData } = useContext(AuthContext);

  const changeStatus = (status: string) => {
    setLoader(true);
    loggedInUserData &&
      updateStatus(status)
        .then(() => {
          setLoggedInUserData({
            ...loggedInUserData,
            status: status,
          });
          storeData(
            'userData',
            JSON.stringify({
              ...loggedInUserData,
              status: status,
            }),
          );
        })
        .catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: err,
            position: 'bottom',
            bottomOffset: 80,
          });
        })
        .finally(() => setLoader(false));
  };

  const renderScreen = () => {
    if (loggedInUserData?.status === Strings.OUT_OF_OFFICE) {
      return (
        <>
          <Text style={HomeViewStyle.heading}>{Strings.OOOStatus_Text}</Text>
          <TouchableOpacity onPress={() => changeStatus(Strings.ACTIVE)}>
            <Text style={HomeViewStyle.oooBtn}>{Strings.OOOBtn2_Text}</Text>
          </TouchableOpacity>
        </>
      );
    }

    return (
      <View>
        <Text style={HomeViewStyle.heading}>
          {loggedInUserData?.status === Strings.ACTIVE
            ? Strings.Active_Text
            : Strings.Idle_Text}
        </Text>
        {loader ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <TouchableOpacity
              key={loggedInUserData?.status || ''}
              style={
                loggedInUserData?.status === Strings.IDLE
                  ? HomeViewStyle.idleBtn
                  : HomeViewStyle.activeButton
              }
              onPress={() =>
                changeStatus(
                  loggedInUserData?.status === Strings.ACTIVE
                    ? Strings.IDLE
                    : Strings.ACTIVE,
                )
              }
            >
              <Text
                style={
                  loggedInUserData?.status === Strings.IDLE
                    ? HomeViewStyle.idleBtnText
                    : HomeViewStyle.activeBtnText
                }
              >
                {loggedInUserData?.status === Strings.ACTIVE
                  ? Strings.IdleBtn_Text
                  : Strings.ActiveBtn_Text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeStatus(Strings.OUT_OF_OFFICE)}
            >
              <Text style={HomeViewStyle.oooBtn}>{Strings.OOOBtn1_Text}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };
  return <View style={HomeViewStyle.container}>{renderScreen()}</View>;
};

export default withHeader(HomeScreen);
