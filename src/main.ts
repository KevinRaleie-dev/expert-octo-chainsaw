import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import Redis from 'ioredis';
import session from 'express-session';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './Resolvers/hello';
import { db } from './db/connection';
import { UserResolver } from "./Resolvers/user";
import { RegisterResolver } from "./Resolvers/register";
import { LoginResolver } from "./Resolvers/login";
import connectRedis from 'connect-redis';
import { AppContext } from "./types";

const app = express();
const port: number = 4000;
const redisStore = connectRedis(session);
const redis = new Redis();

const main = async () => {

    db();
    app.use(cors({
        origin: 'http://localhost:3000'
    }));

    app.set('trust-proxy', 1);
    app.use(session({
        store: new redisStore({ client: redis, disableTouch: true }), cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
            sameSite: 'lax',
            secure: false, //change to true to use https
        },
        saveUninitialized: false,
        secret: 'supersecretcookie',
        resave: false,
        name: 'me',
    }));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                HelloResolver, 
                UserResolver, 
                RegisterResolver,
                LoginResolver
            ], 
            validate: false,
        }),
        context: ({req, res}): AppContext => ({req, res})
    });

    apolloServer.applyMiddleware({app});

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}${apolloServer.graphqlPath}`);
    });

}

main();