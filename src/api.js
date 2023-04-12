import axios from 'axios';

export const API_BASE_URL = 'http://localhost:3001/v1/api';

export const getPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);

    const responseClone = response.clone();

    responseClone.text().then((text) => console.log('Raw response:', text));

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const editPost = async (id, post) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/posts/${id}`, post);

    console.log('Updated post payload:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error editing post:', error);
    throw error;
  }
};
