import {
    Canister,
    init,
    postUpgrade,
    query,
    serverCanisterMethods,
    setNodeServer,
    text,
    update
} from 'azle/experimental';
import express from 'express';
import { Server as NodeServer } from 'http';

let httpQueryText = '';
let httpUpdateText = '';

let candidQueryText = '';
let candidUpdateText = '';

export default Canister({
    ...serverCanisterMethods(serverCallback),
    init: init([text, text, text, text], (param0, param1, param2, param3) => {
        httpQueryText = `${param0}-init`;
        httpUpdateText = `${param1}-init`;

        candidQueryText = `${param2}-init`;
        candidUpdateText = `${param3}-init`;

        setNodeServer(serverCallback());
    }),
    postUpgrade: postUpgrade(
        [text, text, text, text],
        (param0, param1, param2, param3) => {
            httpQueryText = `${param0}-postUpgrade`;
            httpUpdateText = `${param1}-postUpgrade`;

            candidQueryText = `${param2}-postUpgrade`;
            candidUpdateText = `${param3}-postUpgrade`;

            setNodeServer(serverCallback());
        }
    ),
    candidQuery: query([], text, () => {
        return candidQueryText;
    }),
    candidUpdate: update([], text, () => {
        return candidUpdateText;
    })
});

function serverCallback(): NodeServer {
    const app = express();

    app.get('/http-query', (_req, res) => {
        res.send(httpQueryText);
    });

    app.post('/http-update', (_req, res) => {
        res.send(httpUpdateText);
    });
    return app.listen();
}
