import { View } from 'react-native';
import React, { useState } from 'react';
import Data from './Data';
import GoalScreenHeader from '../GoalScreenHeader';
import GoalCard from '../GoalCard';

const LongGoalsComponent = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <GoalScreenHeader
        title={'Long Term Goals'}
        onPress={() => setShow(!show)}
        shouldShowArrowDownIcon={show}
      />

      {show ? (
        <View testID="flatlist">
          {Data.map((item) => {
            return (
              <GoalCard
                key={item.id}
                title={item.title}
                taskAssignee={item.assignee}
                taskDescription={item.description}
                progress={item.progress}
              />
            );
          })}
        </View>
      ) : null}
    </>
  );
};

export default LongGoalsComponent;
