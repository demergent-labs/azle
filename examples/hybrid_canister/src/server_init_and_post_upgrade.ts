import {
    init,
    postUpgrade,
    query,
    Server,
    setNodeServer,
    text,
    update
} from 'azle';
import express from 'express';

let httpQueryText = '';
let httpUpdateText = '';

let candidQueryText = '';
let candidUpdateText = '';

export default Server(serverCallback, {
    init: init([text, text, text, text], (param0, param1, param2, param3) => {
        httpQueryText = param0;
        httpUpdateText = param1;

        candidQueryText = param2;
        candidUpdateText = param3;

        setNodeServer(serverCallback());
    }),
    postUpgrade: postUpgrade(
        [text, text, text, text],
        (param0, param1, param2, param3) => {
            httpQueryText = param0;
            httpUpdateText = param1;

            candidQueryText = param2;
            candidUpdateText = param3;

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

function serverCallback() {
    const app = express();

    app.get('/http-query', (_req, res) => {
        res.send(httpQueryText);
    });

    app.post('/http-update', (_req, res) => {
        res.send(httpUpdateText);
    });

    return app.listen();
}
