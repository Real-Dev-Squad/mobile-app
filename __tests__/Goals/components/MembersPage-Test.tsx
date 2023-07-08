import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import MembersPage from '../../../src/screens/MemberScreen/MembersPage';

// Mock the fetch function
jest.mock('node-fetch');

describe('MembersPage', () => {
  it('renders the component', () => {
    render(<MembersPage />);
  });

  it('fetches and renders members data', async () => {
    // Mock the response from the API
    const mockMembers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ members: mockMembers }),
    });

    const { getByText, getByTestId } = render(<MembersPage />);

    // Verify that loading state is displayed
    expect(getByTestId('loader')).toBeTruthy();

    // Wait for API call to finish
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Verify that loading state is hidden
    expect(() => getByTestId('loader')).toThrow();

    // Verify that the member's names are rendered
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
  });

  it('displays an error message when API call fails', async () => {
    // Mock a failed response from the API
    global.fetch.mockRejectedValueOnce(new Error('API error'));

    const { getByText, getByTestId } = render(<MembersPage />);

    // Verify that loading state is displayed
    expect(getByTestId('loader')).toBeTruthy();

    // Wait for API call to finish
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Verify that loading state is hidden
    expect(() => getByTestId('loader')).toThrow();

    // Verify that the error message
  });
});
