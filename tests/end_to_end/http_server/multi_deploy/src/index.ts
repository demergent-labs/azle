import 'azle';

import express from 'express';

const app = express();

app.get('/get-azle-init-called', (_req, res) => {
    res.send(globalThis._azleInitCalled);
});

app.get('/get-azle-post-upgrade-called', (_req, res) => {
    res.send(globalThis._azlePostUpgradeCalled);
});

app.listen();
