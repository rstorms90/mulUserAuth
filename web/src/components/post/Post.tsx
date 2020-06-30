import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FormGroup, TextField } from '@material-ui/core';
import {
  useDeletePostMutation,
  useEditPostMutation,
  PostsDocument,
  useMeQuery,
} from '../../generated/graphql';

interface Props {
  post: any;
}

const Post: React.FC<Props> = ({ post }) => {
  const { data } = useMeQuery();
  const [deletePost] = useDeletePostMutation();
  const [editPost] = useEditPostMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  let location = useLocation();
  let user = data?.me;

  const editCurrentPost = (post: any) => {
    setTitle(post.title);
    setDescription(post.description);
    setIsEditing(!isEditing);
  };

  const shortenPostDescription = (post: any) =>
    post.length > 55 ? `${post.substring(0, 55)}...` : post;

  return (
    <li key={post.id}>
      <Link to={{ pathname: `${location.pathname}/${post.id}` }}>
        <div>
          <h4>
            <span className="post-title">Post Title:</span> {post.title}
          </h4>
          <h6>{shortenPostDescription(post.description)}</h6>
        </div>
      </Link>

      <div>
        {isEditing ? (
          <form
            className=""
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await editPost({
                variables: {
                  id: post.id,
                  title: title,
                  description: description,
                },
                refetchQueries: [
                  { query: PostsDocument, variables: { userId: user?.id } },
                ],
              });

              if (response.data?.editPost === false) {
                console.log(`Unauthenticated — Not the owner of post.`);
              } else {
                console.log(`Edited Post`);
              }
              editCurrentPost(post);
            }}
          >
            <FormGroup>
              <TextField
                label="Post Title"
                variant="filled"
                value={title}
                color="primary"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                label="Post Description"
                variant="filled"
                value={description}
                color="primary"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FormGroup>
            <button className="primaryBtn" type="submit">
              Edit Post
            </button>
          </form>
        ) : (
          <button className="primaryBtn" onClick={() => editCurrentPost(post)}>
            Edit Post
          </button>
        )}

        <button
          className="secondaryBtn"
          onClick={async (e) => {
            e.preventDefault();
            const response = await deletePost({
              variables: {
                id: post.id,
              },
              refetchQueries: [
                { query: PostsDocument, variables: { userId: user?.id } },
              ],
            });

            if (response) {
              console.log(`Removed Post`);
            } else {
              console.log(`Unauthenticated — Not admin.`);
            }
          }}
        >
          Delete Post
        </button>
      </div>
    </li>
  );
};

export default Post;
