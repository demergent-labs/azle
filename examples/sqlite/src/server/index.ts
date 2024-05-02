import { ic, jsonStringify } from 'azle';
import express, { Request } from 'express';
import { v4 } from 'uuid';

import { db, initState, postUpgradeState } from '../';
import { countUsers, createUser, getUser, getUsers } from './users';

export function initServer() {
    let app = express();

    app.use(express.json());

    app.get('/init-state', (_req, res) => {
        res.json(initState.value);
    });

    app.get('/post-upgrade-state', (_req, res) => {
        res.json(postUpgradeState.value);
    });

    app.get(
        '/users',
        (
            req: Request<any, any, any, { limit?: string; offset?: string }>,
            res
        ) => {
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

    app.get('/users/count', (_req, res) => {
        res.json(countUsers(db));
    });

    app.get('/users/:id', (req, res) => {
        const { id } = req.params;

        const user = getUser(db, Number(id));

        res.json(user);
    });

    app.post(
        '/users',
        (req: Request<any, any, { username: string; age: number }>, res) => {
            const { username, age } = req.body;

            const id = createUser(db, {
                username,
                age
            });

            res.json(id);
        }
    );

    app.post('/users/batch/:num', (req, res) => {
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

    // TODO also do put and patch

    return app.listen();
}
