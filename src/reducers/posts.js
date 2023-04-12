import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  const data = await response.json();
  return data;
});

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  const data = await response.json();
  return data;
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  return data;
});

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, title, content }) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();
    return data;
  }
);

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        //console.log('Post fetched:', action.payload);
        const postIndex = state.findIndex(
          (post) => post.id === action.payload.id
        );
        if (postIndex === -1) {
          state.push(action.payload);
        } else {
          state[postIndex] = action.payload;
        }
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log('Updated post payload:', action.payload);
        const postIndex = state.findIndex(
          (post) => post.id === action.payload.id
        );
        if (postIndex !== -1) {
          state[postIndex] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postIndex = state.findIndex((post) => post.id === action.payload);
        if (postIndex !== -1) {
          state.splice(postIndex, 1);
        }
      });
  },
});

export default postsSlice.reducer;
