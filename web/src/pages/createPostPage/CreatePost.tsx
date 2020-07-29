import React, { useState } from 'react';
import { FormGroup, TextField } from '@material-ui/core';
import {
  useMeQuery,
  useAddPostMutation,
  GetPostsByUserDocument,
} from '../../generated/graphql';
import { useHistory } from 'react-router-dom';

interface Props {}

export const CreatePost: React.FC<Props> = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addPost] = useAddPostMutation();

  const history = useHistory();

  const { data, loading } = useMeQuery();

  let userData: any = null;
  let user = data?.me;

  if (loading) {
    userData = <div>Loading...</div>;
  }

  if (!data) {
    userData = <div>Error</div>;
  }

  if (data && !user) {
    userData = <div>Unauthenticated — Create an account</div>;
  }

  if (data && user) {
    userData = (
      <div>
        Current User: {user?.username}
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
              refetchQueries: [
                {
                  query: GetPostsByUserDocument,
                  variables: { userId: user?.id },
                },
              ],
            });

            if (response && response.data) {
              history.push(`/user/${user?.username}/${user?.id}/posts`);
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
              required
              inputProps={{
                minLength: 15,
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
              required
              inputProps={{
                minLength: 15,
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
