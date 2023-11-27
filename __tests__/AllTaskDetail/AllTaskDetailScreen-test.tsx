import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import AllTaskDetailScreen from '../../src/screens/ProfileScreen/DetailsScreen/AllTaskDetailScreen';

it.skip('AllTaskDetailScreen is Rendered', () => {
  render(<AllTaskDetailScreen route={undefined} />);
  screen.getByText(/Desciption/i);
});

test.skip('navigates to TaskDetail when "Update Progress" button is pressed', () => {
  const navigateMock = jest.fn();
  const { getByText } = render(
    <AllTaskDetailScreen navigation={{ navigate: navigateMock }} />,
  );
  const updateProgressButton = getByText('Update Progress');
  fireEvent.press(updateProgressButton);
  expect(navigateMock).toHaveBeenCalledWith('AllTaskDetailProgress');
});

it.skip('fetches and renders task data', async () => {
  const taskDetail = [
    {
      message: 'task returned successfully',
      taskData: {
        percentCompleted: 30,
        endsOn: 1700870400,
        github: {
          issue: {
            url: 'https://api.github.com/repos/Real-Dev-Squad/mobile-app/issues/329',
          },
        },
        assignee: 'dhruv',
        title: 'Profile screen All task details screen',
        type: 'feature',
        priority: 'TBD',
        startedOn: 1699947984.941,
        status: 'IN_PROGRESS',
        assigneeId: 'fzeDGri78s7TtmrY1Pv2',

        dependsOn: [],
      },
    },
  ];
  global.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({ detail: taskDetail }),
  });

  const { getByText } = render(<AllTaskDetailScreen />);

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  expect(getByText('Profile screen All task details screen')).toBeTruthy();
  expect(getByText(String('feature').toUpperCase())).toBeTruthy();
});
