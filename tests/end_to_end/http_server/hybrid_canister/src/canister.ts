import {
    Canister,
    query,
    serverCanisterMethods,
    text,
    update
} from 'azle/experimental';
import express from 'express';

export default Canister({
    ...serverCanisterMethods(serverCallback),
    candidQuery: query([], text, () => {
        return 'candidQueryCanister';
    }),
    candidUpdate: update([], text, () => {
        return 'candidUpdateCanister';
    })
});

// TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function serverCallback() {
    const app = express();

    app.get('/http-query', (_req, res) => {
        res.send('http-query-canister');
    });

    app.post('/http-update', (_req, res) => {
        res.send('http-update-canister');
    });
    return app.listen();
}
