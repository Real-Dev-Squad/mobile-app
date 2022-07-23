import React from 'react';
import { Text, View } from 'react-native';
import Strings from '../../i18n/en';
import ProgressBar from '../ProgressBar';
import { GoalCardStyles } from './GoalCardStyle';

export type GoalCardProps = {
  title: String;
  taskAssignee: String;
  taskDescription: String;
  progress: number;
};

function GoalCard(props: GoalCardProps) {
  const styles = GoalCardStyles;

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View>
        <Text>
          <Text style={styles.heading}>{Strings.Task_Assignee} </Text>
          <Text style={styles.text}>{props.taskAssignee}</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.text}>{props.taskDescription}</Text>
      </View>
      <View style={[styles.flex, styles.container]}>
        <Text style={styles.dueText}>Due now</Text>
        <ProgressBar progress={props.progress} />
      </View>
    </View>
  );
}

export default GoalCard;
