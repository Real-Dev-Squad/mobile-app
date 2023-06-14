import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import data from './Data';
import { TodoStyles } from './Styles/TodoStyles';
import Task from './taskType';

const TodoComponent = ({ navigationProp }) => {
  const [tasks, setTasks] = useState<Task[]>(data);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    setTasks(tasks);
  }, [changed, tasks]);

  const changeCardFunction = () => {
    setChanged(true);
    const item = tasks.shift() as Task;
    tasks.push(item);
    setChanged(false);
  };

  const removeCard = (id: any) => {
    const newArr = tasks.filter((task) => task.id !== id);
    setTasks(newArr);
    setDisabled(false);
  };

  return (
    <View style={TodoStyles.container}>
      <Text style={TodoStyles.title}>To Do's</Text>
      <TouchableOpacity
        style={styles.CreateGoalButton}
        onPress={() => navigationProp.navigate('CreatingGoals')}
      >
        <Text style={{ color: 'black' }}> Create new goal</Text>
      </TouchableOpacity>
      <View style={{ paddingVertical: 35 }}>
        {tasks.length === 0 ? (
          <Text style={TodoStyles.taskNotFound}>No tasks found</Text>
        ) : (
          tasks
            .map((task) => {
              return (
                <Card
                  posStyle={tasks.indexOf(task) !== 0 ? 'absolute' : 'relative'}
                  key={task.id}
                  item={task}
                  changecard={changeCardFunction}
                  removeCard={removeCard}
                  disabled={disabled}
                  setDisabled={setDisabled}
                />
              );
            })
            .reverse()
        )}
        <View style={TodoStyles.shodowcard} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CreateGoalButton: {
    width: '100%',
    height: 50,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default TodoComponent;
