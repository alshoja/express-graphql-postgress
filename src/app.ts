import express from "express";
import { Request, Response, NextFunction } from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.setHeaders();
    }

    private config(): void {
        dotenv.config();
        this.setApollowServer();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    private setHeaders() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader(
                'Access-Control-Allow-Methods',
                'OPTIONS, GET, POST, PUT, PATCH, DELETE'
            );
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }

    private async setApollowServer() {
        await createConnection();
        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [UserResolver],
            }),
            context: ({ req, res }) => ({ req, res })
        });

        await apolloServer.start();
        apolloServer.applyMiddleware({ app: this.app, cors: false });
    }

}

export default new App().app;
