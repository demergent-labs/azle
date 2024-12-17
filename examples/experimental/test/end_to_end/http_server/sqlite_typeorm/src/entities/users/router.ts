import express, { Request, Response, Router } from 'express';
import { v4 } from 'uuid';

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
        async (
            req: Request<any, any, any, { limit?: string; offset?: string }>,
            res
        ) => {
            const limit = Number(req.query.limit ?? -1);
            const offset = Number(req.query.offset ?? 0);

            const users = await getUsers(limit, offset);

            res.json(users);
        }
    );

    router.get('/count', async (_req, res) => {
        res.json(await countUsers());
    });

    router.get('/:id', async (req, res) => {
        const { id } = req.params;

        const user = await getUser(Number(id));

        res.json(user);
    });

    router.post(
        '/',
        async (
            req: Request<any, any, { username: string; age: number }>,
            res
        ) => {
            const { username, age } = req.body;

            const user = await createUser({
                username,
                age
            });

            res.json(user);
        }
    );

    router.post('/batch/:num', async (req, res) => {
        const num = Number(req.params.num);

        for (let i = 0; i < Number(req.params.num); i++) {
            await createUser({
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

    router.delete('/', async (req: Request<any, any, { id: number }>, res) => {
        const { id } = req.body;

        const deletedId = await deleteUser(id);

        res.json(deletedId);
    });

    return router;
}

async function updateHandler(
    req: Request<any, any, { id: number; username?: string; age?: number }>,
    res: Response
): Promise<void> {
    const { id, username, age } = req.body;

    const user = await updateUser({
        id,
        username,
        age
    });

    res.json(user);
}
