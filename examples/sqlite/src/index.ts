// TODO unfortunately SQL.js is not working currently
// TODO See this issue: https://github.com/sql-js/sql.js/issues/568

// TODO we also need to remember to add these tests into test.yml

import { Server } from 'azle';
import express from 'express';
import initSqlJs from 'sql.js/dist/sql-asm.js';

export default Server(async () => {
    const app = express();

    app.post('/', async (req, res) => {
        try {
            console.log('about to load');
            const SQL = await initSqlJs({
                // locateFile: (filename) => {
                //     console.log('filename', filename);
                //     return `/dist/${filename}`;
                // }
            });
            console.log('loaded');

            console.log('about to created db');
            const db = new SQL.Database();
            console.log('db created');

            // db.run(`
            //     CREATE TABLE users
            //         (
            //             id INTEGER PRIMARY KEY AUTOINCREMENT,
            //             username TEXT NOT NULL UNIQUE
            //         );
            // `);
        } catch (error: any) {
            console.log('there was an error');
            console.log(error.message);
            console.log(error.stack);
            console.log(error);
        }

        res.send('Hello world');
    });

    return app.listen();
});
