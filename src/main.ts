import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './Resolvers/hello';
import { db } from './db/connection';
import { UserResolver } from "./Resolvers/user";
import { RegisterResolver } from "./Resolvers/register";
import { LoginResolver } from "./Resolvers/login";

const app = express();
const port: number = 4000;

const main = async () => {

    db();
    app.use(cors({
        origin: '*'
    }));
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                HelloResolver, 
                UserResolver, 
                RegisterResolver,
                LoginResolver
            ], 
            validate: false
        }),
    });

    apolloServer.applyMiddleware({app});

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}${apolloServer.graphqlPath}`);
    });

}

main();