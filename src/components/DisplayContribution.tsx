import React from 'react';
import { Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { DisplayContributionDTO } from './UserContibution/types';
import { useNavigation } from '@react-navigation/native';
import {styles} from "./displayContribution.styles"
const DisplayContribution = ({ tasks }: { tasks: DisplayContributionDTO[] }) => {
  const navigation = useNavigation();

  const formatTimeAgo = (timestamp: number) => {
    const currentDate = moment();
    const endDate = moment.unix(timestamp);
    return endDate.from(currentDate);
  };
  const navigationHandler = (item: DisplayContributionDTO) => {
    // @ts-ignore
    navigation.navigate('TaskDetail', {
      title: item.title,
      taskId: item.id,
      isActive: item.status !== 'COMPLETED',
    });
  };
  const renderItem = ({ item }: { item: DisplayContributionDTO }) => {
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
          <Text style={styles.endsOn}>{formatTimeAgo(item.endsOn ?? 0)}</Text>
        </Text>
        <Text style={styles.text}>
          Started On:{' '}
          <Text style={styles.startedOn}>
            {formatTimeAgo(item.startedOn ?? 0)}
          </Text>
        </Text>
        <Text style={[styles.text, styles.status]}>Status: {item.status}</Text>
      </TouchableOpacity>
    );
  };

  return tasks?.length > 0 ? (
    <FlatList
      data={tasks}
      keyExtractor={(item, index) => item.id ?? index.toString()}
      renderItem={renderItem}
    />
  ) : (
    <Text style={styles.emptyView}>No tasks found...</Text>
  );
};



export default DisplayContribution;
