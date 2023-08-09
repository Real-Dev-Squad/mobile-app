import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MembersPage from '../../../src/screens/MemberScreen/MembersPage';

describe('MainScreen', () => {
  test.skip('renders title and input fields correctly', () => {
    const { getByText, getByPlaceholderText } = render(<MembersPage />);
    const titleText = getByText('Add New Goal');
    const titleInput = getByPlaceholderText(
      'Enter title max of 50 characters.',
    );
    const descriptionInput = getByPlaceholderText('Enter max 200 characters.');
    expect(titleText).toBeTruthy();
    expect(titleInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
  });

  test.skip('navigates to MemberScreen when "Assigned To" is pressed', () => {
    const navigateMock = jest.fn();
    const { getByText } = render(
      <MembersPage navigation={{ navigate: navigateMock }} />,
    );
    const assignedToText = getByText("Enter member's name");
    fireEvent.press(assignedToText);
    expect(navigateMock).toHaveBeenCalledWith(
      "Member's page",
      expect.any(Object),
    );
  });

  test.skip('navigates to FormScreen when "Create" button is pressed', () => {
    const navigateMock = jest.fn();
    const { getByText } = render(
      <MembersPage navigation={{ push: navigateMock }} />,
    );
    const createButton = getByText('Create');
    fireEvent.press(createButton);
    expect(navigateMock).toHaveBeenCalledWith('Form screen');
  });
});
