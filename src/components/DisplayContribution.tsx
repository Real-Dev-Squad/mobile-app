import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';

const DisplayContribution = ({ tasks }) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const { isProdEnvironment } = useSelector((store) => store.localFeatureFlag);

  const formatTimeAgo = (timestamp: number) => {
    const currentDate = moment();
    const endDate = moment.unix(timestamp);
    return endDate.from(currentDate);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
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
        {isProdEnvironment ? (
          <></>
        ) : (
          <TouchableOpacity onPress={() => setCollapsed(!isCollapsed)}>
            <Text style={styles.expandButton}>
              {isCollapsed ? 'Expand' : 'Collapse'}
            </Text>
          </TouchableOpacity>
        )}

        <Collapsible collapsed={isCollapsed}>
          <View style={styles.expandableContent}>
            <ProgressBar />
          </View>
        </Collapsible>
      </View>
    );
  };

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 16,
    margin: 12,
    backgroundColor: 'white',
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1D1283',
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#333',
  },
  createdBy: {
    color: 'grey',
  },
  assignee: {
    color: 'grey',
  },
  endsOn: {
    color: 'grey',
  },
  startedOn: {
    color: 'grey',
  },
  status: {
    fontWeight: 'bold',
    color: '#3498db',
  },

  expandButton: {
    color: '#3498db',
    marginTop: 10,
  },

  expandableContent: {
    paddingBottom: 30,
  },

  progressBar: {
    width: '100%',
    // marginBottom: 16,
  },

  progressControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 16,
  },

  button: {
    fontSize: 20,
    color: '#3498db',
  },

  progressText: {
    fontSize: 18,
    color: '#333',
  },
});

export default DisplayContribution;
