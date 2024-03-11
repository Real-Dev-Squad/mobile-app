import { StyleSheet, View } from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import { formatDate, screenHeight, screenWidth } from '../../helpers/SiteUtils';
import LayoutHeader from '../../components/Calendar/LayoutHeader';
import TimeSlotView from '../../components/Calendar/TimeSlotView';
import { ScrollView } from 'react-native-gesture-handler';
import CurrentTimeDenotingHorizontalLine from '../../components/Calendar/CurrentTimeDenotingHorizontalLine';

const CalendarLayout = ({
  progressVal,
  usersWithTimeSlots,
  selectedDate,
  setSelectedDate,
  getMatchingTimeSlots,
  userData,
  showInviteForm,
  setShowInviteForm,
}: // selectedUsers,
{
  progressVal: number;
  usersWithTimeSlots: any;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  getMatchingTimeSlots: () => void;
  userData: any;
  showInviteForm: boolean;
  setShowInviteForm: Dispatch<SetStateAction<boolean>>;
}) => {
  console.log('🚀 ~ progressVal:', progressVal);
  const MULTIPLIER = (120 * progressVal) / 50;
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  console.log('🚀 ~ contentSize:', contentSize);

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    console.log('heryer is am');
    setContentSize({ width: contentWidth, height: contentHeight });
  };

  const handleLayout = useCallback((event) => {
    console.log('Layout event:', event.nativeEvent);
    const { x, y, width, height } = event.nativeEvent.layout;
    // setElementPosition({ x, y, width, height });
  }, []); // Empty dependency array means the function will not be recreated on re-renders.
  const ScrollViewRef = useRef();
  // const handlePress = () => {
  //   if (ScrollViewRef.current) {
  //     ScrollViewRef?.current?.scrollTo({
  //       x: 0,
  //       y: 484,
  //       animated: true,
  //     });
  //   }
  // };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}
      // onContentSizeChange={handleContentSizeChange}
      // scrollEventThrottle={50}
      // onScroll={(event) => {
      //   console.log('OBJECT SCROLL TO>>>', {
      //     y: event.nativeEvent.contentOffset.y,
      //   });
      // }}
      // ref={ScrollViewRef}
    >
      <LayoutHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ScrollView
        style={styles.timeSlotColView}
        scrollEventThrottle={50}
        onScroll={(event) => {
          console.log('OBJECT SCROLL TO>>>', {
            y: event.nativeEvent.contentOffset.y,
          });
        }}
      >
        <TimeSlotView
          setShowInviteForm={setShowInviteForm}
          multiplier={MULTIPLIER}
          data={usersWithTimeSlots}
          selectedDate={selectedDate}
          getMatchingTimeSlots={getMatchingTimeSlots}
          userData={userData}
          showInviteForm={showInviteForm}
        />
        {formatDate(selectedDate) === formatDate(new Date()) && (
          <CurrentTimeDenotingHorizontalLine
            progressVal={progressVal}
            multiplier={MULTIPLIER}
          />
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default CalendarLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    alignItems: 'center',
    padding: 2,
  },
  timeSlotColView: {
    borderWidth: 2,
    width: '100%',
    minHeight: screenHeight,
    flex: 1,
    backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 2,
  },
  eventColView: {
    borderWidth: 2,
  },
});
