import { query, Server, text, update } from 'azle';
import express from 'express';

export default Server(
    () => {
        const app = express();

        app.get('/http-query', (_req, res) => {
            res.send('http-query-server');
        });

        app.post('/http-update', (_req, res) => {
            res.send('http-update-server');
        });

        return app.listen();
    },
    {
        candidQuery: query([], text, () => {
            return 'candidQueryServer';
        }),
        candidUpdate: update([], text, () => {
            return 'candidUpdateServer';
        })
    }
);
