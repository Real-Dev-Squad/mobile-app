import { FlatList } from 'react-native';
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
        <FlatList
          data={Data}
          renderItem={({ item }) => (
            <GoalCard
              title={item.title}
              taskAssignee={item.assignee}
              taskDescription={item.description}
              progress={item.progress}
            />
          )}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled={true}
          testID="flatlist"
        />
      ) : null}
    </>
  );
};

export default LongGoalsComponent;
