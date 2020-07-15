import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { PostResolver } from './resolvers/PostResolver';
import { AuthRoutesResolver } from './resolvers/AuthRoutesResolver';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import cors from 'cors';
import { User } from './entity/User';
import { sendRefreshToken } from './sendRefreshToken';
import { createAccessToken, createRefreshToken } from './auth';

(async () => {
  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use('/refresh_token', cookieParser());
  app.use('/user_confirmation', cookieParser());
  app.get('/', (_req, res) => res.send('hello'));
  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    // Token is valid and
    // we can send back an access token
    const user = await User.findOne({ where: { id: payload.userId } });

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  app.post('/user_confirmation', async (req, res) => {
    const token = req.cookies.emc;
    if (!token) {
      console.log('no token');
      return res.send({ ok: false, emailConfirmationToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.EMAIL_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, emailConfirmationToken: '' });
    }

    // Token is valid and
    // we can send back an emailConfirmation token
    const user = await User.findOne({ where: { email: payload.email } });

    if (!user) {
      return res.send({ ok: false, emailConfirmationToken: '' });
    }

    if (user.confirmed) {
      return res.send({ ok: false, emailConfirmationToken: '' });
    }

    return res.send({
      ok: true,
      emailConfirmationToken: token,
    });
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver, AuthRoutesResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('Express server started!');
  });
})();
