import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Skelton from '../../../src/components/Skelton';
import { Text } from 'react-native';

describe('TaskDetailScreen', () => {
  it('Should render skelton if content is still loading', async () => {
    const { getByTestId } = render(
      <Skelton isLoading={true}>
        <Text testID="content">This will not be rendered</Text>
      </Skelton>,
    );
    const skelton = getByTestId('skelton');
    expect(skelton).toBeTruthy();
    const content = screen.queryByTestId('content');
    expect(content).toBeFalsy();
  });
  it('Should not render skelton if content is loaded', () => {
    const { getByTestId } = render(
      <Skelton isLoading={false}>
        <Text testID="content">This will be rendered</Text>
      </Skelton>,
    );
    const content = getByTestId('content');
    expect(content).toBeTruthy();
    const skelton = screen.queryByTestId('skelton');
    expect(skelton).toBeFalsy();
  });
});
