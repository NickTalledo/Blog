import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import { getPosts } from '../api';

jest.mock('../api', () => ({
  getPosts: jest.fn(),
}));

const dummyPosts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
];

const renderWithRouter = (component) => {
  return render(<Router>{component}</Router>);
};

describe('HomePage', () => {
  beforeEach(() => {
    getPosts.mockResolvedValue(dummyPosts);
  });

  test('renders loading state', async () => {
    getPosts.mockImplementation(() => new Promise(() => {}));
    renderWithRouter(<HomePage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders posts list', async () => {
    renderWithRouter(<HomePage />);
    await waitFor(() => screen.getByText('All Posts'));
    expect(screen.getByText('All Posts')).toBeInTheDocument();

    dummyPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  test('renders error state', async () => {
    const errorMessage = 'Error fetching posts';
    getPosts.mockRejectedValue(new Error(errorMessage));
    renderWithRouter(<HomePage />);
    await waitFor(() => screen.getByText(`Error: ${errorMessage}`));
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });
});
