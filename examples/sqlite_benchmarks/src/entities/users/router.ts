import { ic } from 'azle';
import express, { Router } from 'express';
import { v4 } from 'uuid';

import { db } from '../..';
// import {
//     countUsers,
//     createUser,
//     deleteUser,
//     getUser,
//     getUsers,
//     updateUser
// } from './db';
import { sqlite } from '../../db';

export function getRouter(): Router {
    const router = express.Router();

    router.post('/batch-insert/:num', (req, res) => {
        try {
            const num = Number(req.params.num);

            const sqlQueryStart = `INSERT INTO users (username, age) VALUES `;

            console.log(
                'instructions before sqlQueryValues',
                ic.instructionCounter()
            );

            const sqlQueryValues = new Array(num).fill(0).map(() => {
                return `("lastmjs_${v4()}", ${Math.floor(
                    Math.random() * 100
                )})`;
            });

            console.log(
                'instructions after sqlQueryValues',
                ic.instructionCounter()
            );

            const sqlQuery = sqlQueryStart + sqlQueryValues.join(', ');

            // console.log('sqlQuery', sqlQuery);

            db.exec(sqlQuery);

            console.log('instructions after db.exec', ic.instructionCounter());

            const id = sqlite<number>`SELECT last_insert_rowid()`(
                db,
                (sqlValues) => sqlValues[0] as number
            )[0];

            res.json(id);
        } catch (error) {
            console.log(error);
        }
    });

    return router;
}
