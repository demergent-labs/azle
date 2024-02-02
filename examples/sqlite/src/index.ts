import { Server } from 'azle';
import express from 'express';
import initSqlJs from 'sql.js/dist/sql-asm.js';

export default Server(async () => {
    const app = express();

    app.post('/', async (req, res) => {
        const SQL = await initSqlJs({});

        const db = new SQL.Database();

        db.run(`
            CREATE TABLE users
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE
                );
        `);

        res.send('Hello world');
    });

    return app.listen();
});
