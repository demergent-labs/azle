import express from 'express';

const app = express();

app.get('/get-azle-init-called', (_req, res) => {
    res.send((globalThis as any)._azleInitCalled);
});

app.get('/get-azle-post-upgrade-called', (_req, res) => {
    res.send((globalThis as any)._azlePostUpgradeCalled);
});

app.listen();
