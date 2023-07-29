import React from 'react';
import { Alert } from 'react-native';
import { deadlineDate } from './SettingGoalsComponents/DeadLineDatePicker';
import { descriptionData, selectedMemberData, titleData } from './CreateGoals';

const postData = async () => {
  const url = 'https://backend-goals-production.up.railway.app/goal/';
  let request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/vnd.api+json',
    },
    body: JSON.stringify({
      data: {
        type: 'Goal',
        id: '',
        attributes: {
          title: titleData,
          description: descriptionData,
          assigned_to: selectedMemberData,
          ends_on: deadlineDate,
        },
      },
    }),
  });
  request = await request.json();
  if (request.ok) {
    Alert.alert(`Successfully created the goal.`);
  } else {
    Alert.alert(`${request.status}`);
  }
};

export default postData;
