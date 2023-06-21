import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { TodoStyles } from './Styles/TodoStyles';
import Task from './taskType';
import Data from './Data';

const TodoComponent = ({ navigationProp }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    getTodos();
  }, [changed, tasks]);

  const getTodos = async () => {
    const todos = await fetch(
      'https://backend-goals-production.up.railway.app/goal/',
    );
    const todosJsonData = await todos.json();
    setTasks([...Data.data, ...todosJsonData.data]);
  };
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
    <View style={TodoStyles.flex}>
    <Text style={TodoStyles.title}>To Do's</Text>
    <TouchableOpacity
      style={styles.CreateGoalButton}
      onPress={() => navigationProp.navigate('CreatingGoals')}
    >
      <Text style={{ color: 'black',elevation:10 }}> Add</Text>
    </TouchableOpacity>
    </View>
    <View style={{ paddingVertical: 35 }}>
      {tasks?.length === 0 ? (
        <Text style={TodoStyles.taskNotFound}>No tasks found</Text>
      ) : (
        tasks?.map((task) => {
          const {title,assigned_by} = task?.attributes
            return (
              <Card
                posStyle={tasks.indexOf(task) !== 0 ? 'absolute' : 'relative'}
                key={task.id}
                item={task}
                changecard={changeCardFunction}
                removeCard={removeCard}
                disabled={disabled}
                setDisabled={setDisabled}
                title={title}
                assigned_by={assigned_by}
              />
            );
          })
          .reverse()
      )}
      <View style={TodoStyles.shodowcard} />
    </View>
  </View>)
};

const styles = StyleSheet.create({
  CreateGoalButton: {
    // width: '100%',
    // height: 50,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default TodoComponent;
