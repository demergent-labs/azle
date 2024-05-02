import { ic, jsonStringify } from 'azle';
import express, { Request, Router } from 'express';
import { v4 } from 'uuid';

import { db } from '../../';
import { countUsers, createUser, getUser, getUsers } from './db';

// TODO also do put and patch
export function getRouter(): Router {
    const router = express.Router();

    router.get(
        '/',
        (
            req: Request<any, any, any, { limit?: string; offset?: string }>,
            res
        ) => {
            console.log('are we even getting here?');

            try {
                const limit = Number(req.query.limit ?? -1);
                const offset = Number(req.query.offset ?? 0);

                const users = getUsers(db, limit, offset);

                res.json(users);
            } catch (error) {
                console.log(error);
            }
        }
    );

    router.get('/count', (_req, res) => {
        res.json(countUsers(db));
    });

    router.get('/:id', (req, res) => {
        const { id } = req.params;

        const user = getUser(db, Number(id));

        res.json(user);
    });

    router.post(
        '/',
        (req: Request<any, any, { username: string; age: number }>, res) => {
            const { username, age } = req.body;

            const id = createUser(db, {
                username,
                age
            });

            res.json(id);
        }
    );

    router.post('/batch/:num', (req, res) => {
        try {
            const start = ic.instructionCounter();

            const num = Number(req.params.num);

            for (let i = 0; i < Number(req.params.num); i++) {
                createUser(db, {
                    username: `lastmjs${v4()}`,
                    age: i
                });
            }

            const end = ic.instructionCounter();

            res.send(
                jsonStringify({
                    Success: `${num} users created`,
                    instructions: end - start
                })
            );
        } catch (error) {
            console.log('error', error);
        }
    });

    return router;
}
