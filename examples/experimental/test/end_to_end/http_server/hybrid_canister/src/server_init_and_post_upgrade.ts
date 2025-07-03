import { IDL, init, postUpgrade, query, update } from 'azle';
import { Server } from 'azle/experimental';
import express from 'express';

let httpQueryText = '';
let httpUpdateText = '';

let candidQueryText = '';
let candidUpdateText = '';

export default class extends Server {
    constructor() {
        super();

        const app = express();

        app.get('/http-query', (_req, res) => {
            res.send(httpQueryText);
        });

        app.post('/http-update', (_req, res) => {
            res.send(httpUpdateText);
        });

        this.nodeServer = app.listen();
    }

    @init([IDL.Text, IDL.Text, IDL.Text, IDL.Text])
    init(param0: string, param1: string, param2: string, param3: string): void {
        httpQueryText = `${param0}-init`;
        httpUpdateText = `${param1}-init`;

        candidQueryText = `${param2}-init`;
        candidUpdateText = `${param3}-init`;
    }

    @postUpgrade([IDL.Text, IDL.Text, IDL.Text, IDL.Text])
    postUpgrade(
        param0: string,
        param1: string,
        param2: string,
        param3: string
    ): void {
        httpQueryText = `${param0}-postUpgrade`;
        httpUpdateText = `${param1}-postUpgrade`;

        candidQueryText = `${param2}-postUpgrade`;
        candidUpdateText = `${param3}-postUpgrade`;
    }

    @query([], IDL.Text)
    candidQuery(): string {
        return candidQueryText;
    }

    @update([], IDL.Text)
    candidUpdate(): string {
        return candidUpdateText;
    }
}
