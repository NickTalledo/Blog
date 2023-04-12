import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import EditPage from '../pages/EditPage';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore({ reducer: rootReducer });

const renderWithRedux = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

test('EditPage renders, updates fields and submits form', async () => {
  jest
    .spyOn(require('react-router-dom'), 'useParams')
    .mockReturnValue({ id: '1' });

  renderWithRedux(
    <Router>
      <EditPage />
    </Router>
  );

  const titleInput = screen.getByLabelText(/New Title:/i);
  const contentTextarea = screen.getByLabelText(/New Content:/i);
  const submitButton = screen.getByRole('button', { name: /Update Post/i });

  expect(titleInput).toBeInTheDocument();
  expect(contentTextarea).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
  fireEvent.change(contentTextarea, { target: { value: 'Updated Content' } });

  fireEvent.click(submitButton);

  await waitFor(() =>
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  );
});
