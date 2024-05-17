import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import withHeader from '../../helpers/withHeader';
import { storeData } from '../../utils/dataStore';
import Strings from '../../i18n/en';
import { updateStatus } from '../AuthScreen/Util';
import { HomeViewStyle } from './styles';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { getUser } from '../../actions';

const HomeScreen = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { loggedInUserData, setLoggedInUserData } = useContext(AuthContext);
  console.log("test")

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
              onPress={() => changeStatus(Strings.OUT_OF_OFFICE)}
            >
              <Text style={HomeViewStyle.oooBtn}>{Strings.OOOBtn1_Text}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  useEffect(() => {
    // TODO: get the userId from global store
    dispatch(getUser('lDaUIVTP4sXRwPWh3Gn4'));
  }, [dispatch]);

  return <View style={HomeViewStyle.container}>{renderScreen()}</View>;
};

export default withHeader(HomeScreen);
