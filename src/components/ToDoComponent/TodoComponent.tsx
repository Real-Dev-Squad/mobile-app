import { Text, View } from 'react-native';
import React, { useState } from 'react';
import Card from './Card';
import data from './Data';
import { TodoStyles } from './Styles/TodoStyles';

const TodoComponent = () => {
  const [tasks, setTasks] = useState(data);
  const [position, setpostion] = useState(1);

  const changeCardFunction = (id: any) => {
    const newData = tasks.filter((item) => item.id == id);
    tasks.shift();
    tasks.push(newData[0]);
    position !== tasks[tasks.length - 1].id
      ? setpostion(tasks[position + 1].id)
      : setpostion(tasks[0].id);
  };

  const removeCard = (id: any) => {
    const newdata = data.filter((item) => item.id !== id);
    setTasks(newdata);
  };
  return (
    <View style={TodoStyles.container}>
      <Text style={TodoStyles.title}>To Do's</Text>
      <View style={{ paddingVertical: 35 }}>
        {tasks
          .map((task) => {
            return (
              <Card
                posStyle={task.id !== position ? 'absolute' : 'relative'}
                key={task.id}
                item={task}
                changecard={changeCardFunction}
                removeCard={removeCard}
              />
            );
          })
          .reverse()}
        <View style={TodoStyles.shodowcard} />
      </View>
    </View>
  );
};

export default TodoComponent;
