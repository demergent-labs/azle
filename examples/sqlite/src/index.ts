// TODO let's make routes for each of the User and BlogPost
// TODO do all crud

// TODO let's see if we can get init and post upgrade to work well
// TODO implement stable storage and push it as far as possible

import { ic, jsonStringify } from 'azle';
import express, { Request } from 'express';
import initSqlJs from 'sql.js/dist/sql-asm.js';
import { v4 } from 'uuid';

import { createUser, getUser, getUsers } from './users';

async function init() {
    const SQL = await initSqlJs({});

    let db = new SQL.Database();

    // TODO we want to do this to save the db across upgrades
    // TODO test how big the db can get like this
    // db.export

    db.run(`
        CREATE TABLE users
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                age INTEGER NOT NULL
            );
    `);

    let app = express();

    app.use(express.json());

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

    app.listen();
}

init();
