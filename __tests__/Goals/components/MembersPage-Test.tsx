import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import MembersPage from '../../../src/screens/MemberScreen/MembersPage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../src/screens/GoalScreen/GoalScreen';

// Mock the fetch function
jest.mock('node-fetch');

describe('MembersPage', () => {
  const navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MembersSceen'
  > = {
    navigate: jest.fn(),
  };

  const params = {
    selectedMember: 'test member',
    setSelectedMember: jest.fn(),
  };

  it('renders the component', () => {
    const { getByText } = render(
      <MembersPage
        navigation={navigation}
        route={{ key: '', name: 'MembersSceen', params: { ...params } }}
      />,
    );
    expect(getByText("Real Dev Squad Member's")).toBeTruthy();
  });

  it('fetches and renders members data', async () => {
    // Mock the response from the API
    const mockMembers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ members: mockMembers }),
    });

    const { getByText } = render(
      <MembersPage
        navigation={navigation}
        route={{ key: '', name: 'MembersSceen', params: { ...params } }}
      />,
    );

    // Wait for API call to finish
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Verify that the member's names are rendered
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
  });

  it('displays an error message when API call fails', async () => {
    // Mock a failed response from the API
    global.fetch.mockRejectedValueOnce(new Error('API error'));

    const { getByTestId } = render(
      <MembersPage
        navigation={navigation}
        route={{ key: '', name: 'MembersSceen', params: { ...params } }}
      />,
    );

    // Wait for API call to finish
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    // Verify that loading state is hidden
    expect(() => getByTestId('loader')).toThrow();

    // Verify that the error message
  });
});
