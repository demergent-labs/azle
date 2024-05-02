import { ic, jsonStringify } from 'azle';
import express, { Request, Router } from 'express';
import { v4 } from 'uuid';

import { db } from '../../';
import { createUser } from '../users/db';
import { countPosts, createPost, getPost, getPosts } from './db';

// TODO also do put and patch
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

            const userId = createUser(db, {
                username: `lastmjs${v4()}`,
                age: 33
            });

            const id = createPost(db, {
                user_id: userId,
                title,
                body
            });

            res.json(id);
        }
    );

    router.post('/batch/:num', (req, res) => {
        try {
            const start = ic.instructionCounter();

            const num = Number(req.params.num);

            for (let i = 0; i < Number(req.params.num); i++) {
                const userId = createUser(db, {
                    username: `lastmjs${v4()}`,
                    age: i
                });

                createPost(db, {
                    user_id: userId,
                    title: `Post ${v4()}`,
                    body: `${v4()}${v4()}${v4()}${v4()}`
                });
            }

            const end = ic.instructionCounter();

            res.send(
                jsonStringify({
                    Success: `${num} posts created`,
                    instructions: end - start
                })
            );
        } catch (error) {
            console.log('error', error);
        }
    });

    return router;
}
