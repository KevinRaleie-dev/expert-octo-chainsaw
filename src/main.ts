import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import Redis from 'ioredis';
import session from 'express-session';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import databaseConnection from './db/connection';
import { UserResolver } from './resolvers/user-resolver';
import { AuthResolver } from './resolvers/auth-resolver';
import connectRedis from 'connect-redis';
import { AppContext } from './utils/types';
import { MeResolver } from './resolvers/me-resolver';

const app = express();
const port = 4000;
const redisStore = connectRedis(session);
const redis = new Redis();

const main = async () => {
  databaseConnection();
  app.use(
    cors({
      origin: 'http://localhost:3000',
    }),
  );

  app.set('trust-proxy', 1);
  app.use(
    session({
      store: new redisStore({ client: redis, disableTouch: true }),
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        sameSite: 'lax',
        secure: false, //change to true to use https
      },
      saveUninitialized: false,
      secret: 'supersecretcookie',
      resave: false,
      name: 'me',
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MeResolver, UserResolver, AuthResolver],
      validate: false,
    }),
    context: ({ req, res }): AppContext => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}${apolloServer.graphqlPath}`);
  });
};

main();
