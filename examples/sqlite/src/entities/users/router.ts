import express, { Request, Response, Router } from 'express';
import { v4 } from 'uuid';

import { db } from '../..';
import {
    countUsers,
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser
} from './db';

export function getRouter(): Router {
    const router = express.Router();

    router.get(
        '/',
        (
            req: Request<any, any, any, { limit?: string; offset?: string }>,
            res
        ) => {
            const limit = Number(req.query.limit ?? -1);
            const offset = Number(req.query.offset ?? 0);

            const users = getUsers(db, limit, offset);

            res.json(users);
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

            const user = createUser(db, {
                username,
                age
            });

            res.json(user);
        }
    );

    router.post('/batch/:num', (req, res) => {
        const num = Number(req.params.num);

        for (let i = 0; i < Number(req.params.num); i++) {
            createUser(db, {
                username: `lastmjs${v4()}`,
                age: i
            });
        }

        res.json({
            Success: `${num} users created`
        });
    });

    router.put('/', updateHandler);

    router.patch('/', updateHandler);

    router.delete('/', (req: Request<any, any, { id: number }>, res) => {
        const { id } = req.body;

        const deletedId = deleteUser(db, id);

        res.json(deletedId);
    });

    return router;
}

function updateHandler(
    req: Request<any, any, { id: number; username?: string; age?: number }>,
    res: Response
) {
    const { id, username, age } = req.body;

    const user = updateUser(db, {
        id,
        username,
        age
    });

    res.json(user);
}
