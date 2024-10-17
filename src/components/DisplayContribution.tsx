import React from 'react';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { displayContributionType, taskType } from './UserContibution/Type';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/DisplayContributionStyle';
type TaskItem = {
  taskId: string;
  isActive: string;
};
const DisplayContribution = ({ tasks }: { tasks: taskType }) => {
  const navigation = useNavigation();

  const formatTimeAgo = (timestamp: number) => {
    const currentDate = moment();
    const endDate = moment.unix(timestamp);
    return endDate.from(currentDate);
  };
  const navigationHandler = (item: TaskItem) => {
    navigation.navigate('TaskDetail', {
      title: item.title,
      taskId: item.id,
      isActive: item.status !== 'COMPLETED',
    });
  };
  const renderItem = ({ item }: { item: displayContributionType }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigationHandler(item)}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>
          Created By: <Text style={styles.createdBy}>{item.createdBy}</Text>
        </Text>
        <Text style={styles.text}>
          Assignee: <Text style={styles.assignee}>{item.assignee}</Text>
        </Text>
        <Text style={styles.text}>
          Ends On:{' '}
          <Text style={styles.endsOn}>{formatTimeAgo(item.endsOn)}</Text>
        </Text>
        <Text style={styles.text}>
          Started On:{' '}
          <Text style={styles.startedOn}>{formatTimeAgo(item.startedOn)}</Text>
        </Text>
        <Text style={[styles.text, styles.status]}>Status: {item.status}</Text>
        {/* {isActive &&
          (isProdEnvironment ? (
            <></>
          ) : (
            <TouchableOpacity onPress={() => setCollapsed(!isCollapsed)}>
              <Text style={styles.isActiveButton}>
                {isCollapsed ? 'isActive' : 'Collapse'}
              </Text>
            </TouchableOpacity>
          ))} */}
      </TouchableOpacity>
    );
  };

  return tasks?.length > 0 ? (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  ) : (
    <Text style={styles.emptyView}>No tasks found...</Text>
  );
};

export default DisplayContribution;