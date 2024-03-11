import { View, Text, Button, Platform } from 'react-native';
import React from 'react';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import * as Permissions from 'react-native-permissions';

const Calendar = () => {
  const eventConfig = {
    title: '  Meeting with Client',
    startDate: '2024-02-20T10:00:00.000Z',
    endDate: '2024-02-20T11:00:00.000Z',
    location: 'Office',
    notes: 'Discuss project details',
  };
  const addCalendarEvent = async () => {
    try {
      Permissions.request(
        Platform.select({
          ios: Permissions.PERMISSIONS.IOS.CALENDARS_WRITE_ONLY,
          android: Permissions.PERMISSIONS.ANDROID.WRITE_CALENDAR,
        }),
      )
        .then((result) => {
          if (result !== Permissions.RESULTS.GRANTED) {
            throw new Error(`No permission: ${result}`);
          }
          return AddCalendarEvent.presentEventCreatingDialog(eventConfig);
        })
        .then(
          (eventInfo: {
            calendarItemIdentifier: string;
            eventIdentifier: string;
          }) => {
            // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
            // These are two different identifiers on iOS.
            // On Android, where they are both equal and represent the event id, also strings.
            // when { action: 'CANCELED' } is returned, the dialog was dismissed
            console.warn(JSON.stringify(eventInfo));
          },
        );
    } catch (e) {}
  };

  return (
    <View>
      <Button title="Add Calendar Event" onPress={addCalendarEvent} />
    </View>
  );
};

export default Calendar;
