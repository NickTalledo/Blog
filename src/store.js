import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/posts';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export { store };
