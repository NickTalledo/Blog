import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, deletePost } from '../reducers/posts';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts.find((p) => p.id === parseInt(id))
  );

  useEffect(() => {
    if (!post) {
      dispatch(fetchPost(id));
    }
  }, [dispatch, id, post]);

  const handleDelete = async () => {
    dispatch(deletePost(id));
    navigate('/');
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>Last updated: {post.last_updated}</p>
      <p>Originally published: {post.originally_published}</p>
      <p>{post.content}</p>
      <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PostPage;
