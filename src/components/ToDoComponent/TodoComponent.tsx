import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { TodoStyles } from './Styles/TodoStyles';
import Task from './taskType';
import GoalsApi from '../../constants/apiConstant/GoalsApi';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const TodoComponent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getTodos();
    }
  }, [isFocused]);

  const getTodos = async () => {
    const todos = await fetch(GoalsApi.GET_TODO_S);
    console.log(todos, 'todos');
    const todosJsonData = await todos.json();
    setTasks([...todosJsonData.data]);
    setLoader(false);
  };
  const changeCardFunction = () => {
    // setChanged(true);
    const item = tasks.shift() as Task;
    const filteredTasks = tasks.filter(
      (task) => task.attributes?.id === item.attributes?.id,
    );
    setTasks([...filteredTasks, item]);
    // setChanged(false);
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
          onPress={() => navigation.navigate('CreatingGoals')}
        >
          <Text
            style={{
              color: 'black',
              elevation: 10,
              paddingHorizontal: 6,
              paddingVertical: 6,
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
      {loader ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={{ paddingVertical: 35 }}>
          {tasks?.length === 0 ? (
            <Text style={TodoStyles.taskNotFound}>No tasks found</Text>
          ) : (
            tasks
              ?.map((task) => {
                const { title, assigned_by } = task?.attributes;
                console.log(assigned_by);
                return (
                  <Card
                    posStyle={
                      tasks.indexOf(task) !== 0 ? 'absolute' : 'relative'
                    }
                    key={task.id}
                    item={task}
                    changecard={changeCardFunction}
                    removeCard={removeCard}
                    disabled={disabled}
                    setDisabled={setDisabled}
                    title={title}
                    assigned_by={assigned_by === '' ? 'Unknown' : assigned_by}
                  />
                );
              })
              .reverse()
          )}
          <View style={TodoStyles.shodowcard} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'black',
  },
  CreateGoalButton: {
    // width: '100%',
    // height: 50,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default TodoComponent;
