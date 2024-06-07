import express, { Request, Response, Router } from 'express';
import { v4 } from 'uuid';

import { drizzleDb } from '../..';
import { createUser } from '../users/db';
import {
    countPosts,
    createPost,
    deletePost,
    getPost,
    getPosts,
    updatePost
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

            const posts = await getPosts(drizzleDb, limit, offset);

            res.json(posts);
        }
    );

    router.get('/count', async (_req, res) => {
        res.json(await countPosts(drizzleDb));
    });

    router.get('/:id', async (req, res) => {
        const { id } = req.params;

        const post = await getPost(drizzleDb, Number(id));

        res.json(post);
    });

    router.post(
        '/',
        async (
            req: Request<any, any, { title: string; body: string }>,
            res
        ) => {
            const { title, body } = req.body;

            const user = await createUser(drizzleDb, {
                username: `lastmjs${v4()}`,
                age: 33
            });

            const post = await createPost(drizzleDb, {
                user_id: user.id,
                title,
                body
            });

            res.json(post);
        }
    );

    router.post('/batch/:num', async (req, res) => {
        const num = Number(req.params.num);

        for (let i = 0; i < Number(req.params.num); i++) {
            const user = await createUser(drizzleDb, {
                username: `lastmjs${v4()}`,
                age: i
            });

            await createPost(drizzleDb, {
                user_id: user.id,
                title: `Post ${v4()}`,
                body: `${v4()}${v4()}${v4()}${v4()}`
            });
        }

        res.send({
            Success: `${num} posts created`
        });
    });

    router.put('/', updateHandler);

    router.patch('/', updateHandler);

    router.delete('/', async (req: Request<any, any, { id: number }>, res) => {
        const { id } = req.body;

        const deletedId = await deletePost(drizzleDb, id);

        res.json(deletedId);
    });

    return router;
}

async function updateHandler(
    req: Request<
        any,
        any,
        { id: number; user_id?: number; title?: string; body?: string }
    >,
    res: Response
) {
    const { id, user_id, title, body } = req.body;

    const post = await updatePost(drizzleDb, {
        id,
        user_id,
        title,
        body
    });

    res.json(post);
}
