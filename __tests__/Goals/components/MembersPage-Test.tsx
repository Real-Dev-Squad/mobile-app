import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import MembersPage from '../../../src/screens/MemberScreen/MembersPage';

// Mock the fetch function
jest.mock('node-fetch');

describe('MembersPage', () => {
  it('renders the component', () => {
    render(
      <MembersPage
        key={''}
        name={'MembersPage'}
        params={{ selectedMember: 'test member', setSelectedMember: () => {} }}
      />,
    );
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
        key={''}
        name={'MembersPage'}
        params={{ selectedMember: 'test member', setSelectedMember: () => {} }}
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
        key={''}
        name={'MembersPage'}
        params={{ selectedMember: 'test member', setSelectedMember: () => {} }}
      />,
    );

    // Wait for API call to finish
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Verify that the error message
  });
});
