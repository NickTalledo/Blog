import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import CreatePage from '../pages/CreatePage';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

const renderWithRouter = (component) => {
  return render(<Router>{component}</Router>);
};

describe('CreatePage', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
  });

  test('renders create page form', () => {
    renderWithRouter(<CreatePage />);
    expect(screen.getByText('Create a New Blog Post')).toBeInTheDocument();
    expect(screen.getByLabelText('Title:')).toBeInTheDocument();
    expect(screen.getByLabelText('Content:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create Post' })
    ).toBeInTheDocument();
  });

  test('submits form with entered values', () => {
    const title = 'Test Title';
    const content = 'Test Content';

    renderWithRouter(<CreatePage />);

    fireEvent.change(screen.getByLabelText('Title:'), {
      target: { value: title },
    });
    fireEvent.change(screen.getByLabelText('Content:'), {
      target: { value: content },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create Post' }));

    expect(dispatch).toHaveBeenCalledWith(createPost({ title, content }));
  });
});
