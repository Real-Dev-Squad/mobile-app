/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import TaskScreen from '../src/screens/TaskScreen/TaskScreen';

 // Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<TaskScreen />);
  });
  
  it('snapshot should match', () => {
    const tree = renderer.create(<TaskScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });