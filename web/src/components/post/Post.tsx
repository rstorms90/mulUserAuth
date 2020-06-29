import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FormGroup, TextField } from '@material-ui/core';
import {
  useDeletePostMutation,
  useEditPostMutation,
} from '../../generated/graphql';

interface Props {
  post: any;
}

const Post: React.FC<Props> = ({ post }) => {
  const [deletePost] = useDeletePostMutation();
  const [editPost] = useEditPostMutation();

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [isEditing, setIsEditing] = useState(false);

  let location = useLocation();

  const editCurrentPost = () => {
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
              });

              if (response.data?.editPost === false) {
                console.log(`Unauthenticated — Not the owner of post.`);
              } else {
                console.log(`Edited Post`);
              }
              editCurrentPost();
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
          <button className="primaryBtn" onClick={editCurrentPost}>
            Edit Post
          </button>
        )}

        <button
          className="secondaryBtn"
          onClick={async (e) => {
            e.preventDefault();
            console.log(post.id);
            const response = await deletePost({
              variables: {
                id: post.id,
              },
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
