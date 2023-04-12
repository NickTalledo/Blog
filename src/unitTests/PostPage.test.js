import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import PostPage from '../pages/PostPage';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

const dummyPost = {
  id: 1,
  title: 'Test Post',
  last_updated: '2023-04-09T18:00:00.000Z',
  originally_published: '2023-04-09T18:00:00.000Z',
  content: 'Test content',
};

const renderWithRouter = (component) => {
  return render(<Router>{component}</Router>);
};

describe('PostPage', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) =>
      callback({ posts: [dummyPost] })
    );
  });

  test('renders post details', async () => {
    renderWithRouter(<PostPage />);
    await waitFor(() => screen.getByText(dummyPost.title));
    expect(screen.getByText(dummyPost.title)).toBeInTheDocument();
    expect(screen.getByText(dummyPost.content)).toBeInTheDocument();
  });

  test('renders loading state', async () => {
    useSelector.mockImplementation((callback) => callback({ posts: [] }));
    renderWithRouter(<PostPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
