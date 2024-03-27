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
  return (
    <View style={GoalCardStyles.card}>
      <View>
        <Text style={GoalCardStyles.title}>{props.title}</Text>
      </View>
      <View>
        <Text>
          <Text style={GoalCardStyles.heading}>{Strings.Task_Assignee} </Text>
          <Text style={GoalCardStyles.text}>{props.taskAssignee}</Text>
        </Text>
      </View>
      <View>
        <Text style={GoalCardStyles.text}>{props.taskDescription}</Text>
      </View>
      <View style={[GoalCardStyles.flex, GoalCardStyles.container]}>
        <Text style={GoalCardStyles.dueText}>Due now</Text>
        <ProgressBar progress={props.progress} />
      </View>
    </View>
  );
}

export default GoalCard;
