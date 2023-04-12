import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, updatePost } from '../reducers/posts';
import { editPost } from '../api';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.find((p) => p.id === id));

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      if (!post) {
        dispatch(fetchPost(id));
      }
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }
      setIsLoading(false);
    };

    fetchAndUpdate();
  }, [dispatch, id, post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedPost = await editPost(id, { title, content });
      dispatch(updatePost(updatedPost));
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('Error updating the post:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">New Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content"> New Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPage;
