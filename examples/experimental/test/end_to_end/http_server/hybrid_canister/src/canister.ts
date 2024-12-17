import {
    Canister,
    query,
    serverCanisterMethods,
    text,
    update
} from 'azle/experimental';
import express from 'express';
import { Server as NodeServer } from 'http';

export default Canister({
    ...serverCanisterMethods(serverCallback),
    candidQuery: query([], text, () => {
        return 'candidQueryCanister';
    }),
    candidUpdate: update([], text, () => {
        return 'candidUpdateCanister';
    })
});

function serverCallback(): NodeServer {
    const app = express();

    app.get('/http-query', (_req, res) => {
        res.send('http-query-canister');
    });

    app.post('/http-update', (_req, res) => {
        res.send('http-update-canister');
    });
    return app.listen();
}
