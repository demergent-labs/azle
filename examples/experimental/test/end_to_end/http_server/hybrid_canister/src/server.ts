import { IDL, query, update } from 'azle';
import { Server } from 'azle/experimental';
import express from 'express';

export default class extends Server {
    constructor() {
        super();

        const app = express();

        app.get('/http-query', (_req, res) => {
            res.send('http-query-server');
        });

        app.post('/http-update', (_req, res) => {
            res.send('http-update-server');
        });

        this.nodeServer = app.listen();
    }

    @query([], IDL.Text)
    candidQuery(): string {
        return 'candidQueryServer';
    }

    @update([], IDL.Text)
    candidUpdate(): string {
        return 'candidUpdateServer';
    }
}
