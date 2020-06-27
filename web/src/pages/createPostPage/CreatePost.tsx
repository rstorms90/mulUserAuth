import React, { useState } from 'react';
import { FormGroup, TextField } from '@material-ui/core';
import { useMeQuery, useAddPostMutation } from '../../generated/graphql';
import { useHistory } from 'react-router-dom';

interface Props {}

export const CreatePost: React.FC<Props> = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addPost] = useAddPostMutation();

  const history = useHistory();

  const { data, loading } = useMeQuery();

  let userData: any = null;

  if (loading) {
    userData = <div>Loading...</div>;
  }

  if (!data) {
    userData = <div>Error</div>;
  }

  if (data && !data?.me) {
    userData = <div>Unauthenticated — Create Account</div>;
  }

  if (data && data?.me) {
    userData = (
      <div>
        Current User: {data?.me?.username}
        <h1>Create Post</h1>
        <form
          className=""
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await addPost({
              variables: {
                title,
                description,
              },
            });

            if (response && response.data) {
              console.log('success to add post');
              history.push(`/user/${data?.me?.username}/${data?.me?.id}/posts`);
            } else {
              alert('failure to post');
            }
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
          <button className="commonBtn" type="submit">
            Add Post
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Create Post Page</h1>
      <div>{userData}</div>
    </div>
  );
};
