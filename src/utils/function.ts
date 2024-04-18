import express, { Express } from 'express';
import routes from '../routes';
import session from 'express-session';
import passport from 'passport'
import cors from 'cors';
import MongoStore from 'connect-mongo';
import { config } from 'dotenv';
config();
require('../strategies/discord');

export function CreateApplication(): Express {
    const app = express();
    // Enabling Middleware
    app.use(express.json());
    app.use(express.urlencoded());

    // Enable CORS
    app.use(cors({ origin: ['http://locahost:3000'], credentials: true, }));
    // Enable Sessions
    app.use(
        session({
            secret: 'JUSTACORGICOOKIERANDOMSESSIONSECRET',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60000 * 60 * 24 * 7,
            },
            store: MongoStore.create({ mongoUrl: process.env.MONGO, })
        })
    );

    // Enable Sessions
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', routes);


    return app;
}

