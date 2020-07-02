import React, { useState } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { FormGroup, TextField } from '@material-ui/core';
import {
  useDeletePostMutation,
  useEditPostMutation,
  GetPostsByUserDocument,
  useMeQuery,
} from '../../generated/graphql';

interface Props {
  post: any;
}

const Post: React.FC<Props> = ({ post }) => {
  const { data } = useMeQuery();
  const [deletePost, error] = useDeletePostMutation();
  const [editPost] = useEditPostMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  let location = useLocation();
  let user = data?.me;
  const author = post.user.username;
  let body = null;

  const editCurrentPost = (post: any) => {
    setTitle(post.title);
    setDescription(post.description);
    setIsEditing(!isEditing);
  };

  if (error && error.data?.deletePost === false) {
    return <Redirect to="/404" />;
  }

  const shortenPostDescription = (post: any) =>
    post.length > 55 ? `${post.substring(0, 55)}...` : post;

  if (data) {
    const path =
      location.pathname === '/'
        ? `/user/${author}/${user?.id}/posts/${post.id}`
        : `${location.pathname}/${post.id}`;

    body = (
      <li key={post.id}>
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
                    {
                      query: GetPostsByUserDocument,
                      variables: { userId: user?.id },
                    },
                  ],
                });

                if (response.data?.editPost === false) {
                  return <Redirect to="/404" />;
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
            <>
              <Link to={{ pathname: path }}>
                <div>
                  <h3>Author: {author}</h3>
                  <h4>
                    <span className="post-title">Post Title:</span> {post.title}
                  </h4>
                  <h6>{shortenPostDescription(post.description)}</h6>
                </div>
              </Link>
              <button
                className="primaryBtn"
                onClick={() => editCurrentPost(post)}
              >
                Edit Post
              </button>
            </>
          )}
          {body}
          <button
            className="secondaryBtn"
            onClick={async (e) => {
              e.preventDefault();
              const response = await deletePost({
                variables: {
                  id: post.id,
                },
                refetchQueries: [
                  {
                    query: GetPostsByUserDocument,
                    variables: { userId: user?.id },
                  },
                ],
              });

              if (response.data?.deletePost === false) {
                return <Redirect to="/404" />;
              }
            }}
          >
            Delete Post
          </button>
        </div>
      </li>
    );
  }

  return <div>{body}</div>;
};

export default Post;
