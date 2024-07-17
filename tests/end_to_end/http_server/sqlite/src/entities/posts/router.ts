import express, { Request, Response, Router } from 'express';
import { v4 } from 'uuid';

import { db } from '../..';
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
        (
            req: Request<any, any, any, { limit?: string; offset?: string }>,
            res
        ) => {
            const limit = Number(req.query.limit ?? -1);
            const offset = Number(req.query.offset ?? 0);

            const posts = getPosts(db, limit, offset);

            res.json(posts);
        }
    );

    router.get('/count', (_req, res) => {
        res.json(countPosts(db));
    });

    router.get('/:id', (req, res) => {
        const { id } = req.params;

        const post = getPost(db, Number(id));

        res.json(post);
    });

    router.post(
        '/',
        (req: Request<any, any, { title: string; body: string }>, res) => {
            const { title, body } = req.body;

            const user = createUser(db, {
                username: `lastmjs${v4()}`,
                age: 33
            });

            const post = createPost(db, {
                user_id: user.id,
                title,
                body
            });

            res.json(post);
        }
    );

    router.post('/batch/:num', (req, res) => {
        const num = Number(req.params.num);

        for (let i = 0; i < Number(req.params.num); i++) {
            const user = createUser(db, {
                username: `lastmjs${v4()}`,
                age: i
            });

            createPost(db, {
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

    router.delete('/', (req: Request<any, any, { id: number }>, res) => {
        const { id } = req.body;

        const deletedId = deletePost(db, id);

        res.json(deletedId);
    });

    return router;
}

function updateHandler(
    req: Request<
        any,
        any,
        { id: number; user_id?: number; title?: string; body?: string }
    >,
    res: Response
): void {
    const { id, user_id, title, body } = req.body;

    const post = updatePost(db, {
        id,
        user_id,
        title,
        body
    });

    res.json(post);
}
