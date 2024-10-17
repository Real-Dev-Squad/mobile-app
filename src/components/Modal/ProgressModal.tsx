import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { styles } from './ProgressModalStyle';

function ProgressModal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(45); // Define the progress state

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleSliderChange = (value) => {
    const roundedValue = Math.round(value / 10) * 10;
    setProgress(roundedValue);
  };

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity onPress={toggleModal}>
        <CircularProgress
          value={progress}
          inActiveStrokeColor={'#58a07c'}
          inActiveStrokeOpacity={0.2}
          progressValueColor={'#fff'}
          strokeLinecap="round"
          activeStrokeColor="#6a6bcf"
          valueSuffix={'%'}
        />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} animationIn="bounceInDown">
        <View>
          <Card style={styles.cardContainer}>
            <Card.Content>
              <Title style={styles.titleText}>Update Your Task Progress</Title>
            </Card.Content>

            <Card.Content>
              <Paragraph> Assigning a task? Mark its progress as 0%.</Paragraph>
              <Paragraph> Task started? Update the progress to 10%.</Paragraph>
              <Paragraph>
                In the testing phase? Indicate a 40% completion.
              </Paragraph>
              <Paragraph>Under review? Progress should be at 70%.</Paragraph>
              <Paragraph>
                Moving to staging? Achieve a 95% completion rate.
              </Paragraph>
              <Paragraph>
                Task deployed to production? Reach the 100% milestone.
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Paragraph>Slide to update progress:</Paragraph>
              <Slider
                style={styles.sliderStyle}
                value={progress}
                onValueChange={handleSliderChange}
                minimumValue={0}
                maximumValue={100}
                step={10}
              />
              <Paragraph>Current Progress: {progress}%</Paragraph>
            </Card.Content>
            <Button style={styles.Button} onPress={toggleModal}>
              Close
            </Button>
          </Card>
        </View>
      </Modal>
    </View>
  );
}

export default ProgressModal;
