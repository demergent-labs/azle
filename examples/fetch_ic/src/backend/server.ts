import { ic } from 'azle';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/headers-array', (req, res) => {
    res.setHeader('X-Azle-Response-Key-0', 'X-Azle-Response-Value-0');
    res.setHeader('X-Azle-Response-Key-1', 'X-Azle-Response-Value-1');
    res.setHeader('X-Azle-Response-Key-2', 'X-Azle-Response-Value-2');

    res.json({
        whoami: ic.caller().toString(),
        value: req.headers
    });
});

app.get('/headers-object', (req, res) => {
    res.setHeader('X-Azle-Response-Key-0', 'X-Azle-Response-Value-0');
    res.setHeader('X-Azle-Response-Key-1', 'X-Azle-Response-Value-1');
    res.setHeader('X-Azle-Response-Key-2', 'X-Azle-Response-Value-2');

    res.json({
        whoami: ic.caller().toString(),
        value: req.headers
    });
});

app.post('/body-uint8array', (req, res) => {
    res.setHeader('X-Azle-Response-Key-0', 'X-Azle-Response-Value-0');
    res.setHeader('X-Azle-Response-Key-1', 'X-Azle-Response-Value-1');
    res.setHeader('X-Azle-Response-Key-2', 'X-Azle-Response-Value-2');

    res.json({
        whoami: ic.caller().toString(),
        value: req.body
    });
});

app.put('/body-string', (req, res) => {
    res.setHeader('X-Azle-Response-Key-0', 'X-Azle-Response-Value-0');
    res.setHeader('X-Azle-Response-Key-1', 'X-Azle-Response-Value-1');
    res.setHeader('X-Azle-Response-Key-2', 'X-Azle-Response-Value-2');

    res.json({
        whoami: ic.caller().toString(),
        value: req.body
    });
});

app.patch('/body-array-buffer', (req, res) => {
    res.setHeader('X-Azle-Response-Key-0', 'X-Azle-Response-Value-0');
    res.setHeader('X-Azle-Response-Key-1', 'X-Azle-Response-Value-1');
    res.setHeader('X-Azle-Response-Key-2', 'X-Azle-Response-Value-2');

    res.json({
        whoami: ic.caller().toString(),
        value: req.body
    });
});

app.delete('/body-blob', (req, res) => {
    res.setHeader('X-Azle-Response-Key-0', 'X-Azle-Response-Value-0');
    res.setHeader('X-Azle-Response-Key-1', 'X-Azle-Response-Value-1');
    res.setHeader('X-Azle-Response-Key-2', 'X-Azle-Response-Value-2');

    res.json({
        whoami: ic.caller().toString(),
        value: req.body
    });
});

app.post('/body-data-view', (req, res) => {
    res.setHeader('X-Azle-Response-Key-0', 'X-Azle-Response-Value-0');
    res.setHeader('X-Azle-Response-Key-1', 'X-Azle-Response-Value-1');
    res.setHeader('X-Azle-Response-Key-2', 'X-Azle-Response-Value-2');

    res.json({
        whoami: ic.caller().toString(),
        value: req.body
    });
});

app.get('/url-query-params-get', (req, res) => {
    res.setHeader('X-Azle-Response-Key-0', 'X-Azle-Response-Value-0');
    res.setHeader('X-Azle-Response-Key-1', 'X-Azle-Response-Value-1');
    res.setHeader('X-Azle-Response-Key-2', 'X-Azle-Response-Value-2');

    res.json({
        whoami: ic.caller().toString(),
        value: req.query
    });
});

app.post('/url-query-params-post', (req, res) => {
    res.setHeader('X-Azle-Response-Key-0', 'X-Azle-Response-Value-0');
    res.setHeader('X-Azle-Response-Key-1', 'X-Azle-Response-Value-1');
    res.setHeader('X-Azle-Response-Key-2', 'X-Azle-Response-Value-2');

    res.json({
        whoami: ic.caller().toString(),
        value: req.query
    });
});

app.get('/not-authorized-get', (_req, res) => {
    res.status(401).send('Not Authorized');
});

app.post('/not-authorized-post', (_req, res) => {
    res.status(401).send('Not Authorized');
});

app.head('/head', (_req, res) => {
    res.setHeader('X-Azle-Response-Key-0', 'X-Azle-Response-Value-0');
    res.setHeader('X-Azle-Response-Key-1', 'X-Azle-Response-Value-1');
    res.setHeader('X-Azle-Response-Key-2', 'X-Azle-Response-Value-2');
    res.end();
});

app.options('/options', (_req, res) => {
    res.setHeader(
        'X-Azle-Response-Key-Options',
        'X-Azle-Response-Value-Options'
    );
    res.end();
});

app.use(express.static('/dist'));

app.listen();
