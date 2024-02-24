import { ic, Server } from 'azle';
import express from 'express';

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.get('/headers-array', (req, res) => {
        res.setHeader('x-azle-response-0', 'x-azle-response-0');
        res.setHeader('x-azle-response-1', 'x-azle-response-1');
        res.setHeader('x-azle-response-2', 'x-azle-response-2');

        res.json({
            whoami: ic.caller().toString(),
            value: req.headers
        });
    });

    app.get('/headers-object', (req, res) => {
        res.setHeader('x-azle-response-0', 'x-azle-response-0');
        res.setHeader('x-azle-response-1', 'x-azle-response-1');
        res.setHeader('x-azle-response-2', 'x-azle-response-2');

        res.json({
            whoami: ic.caller().toString(),
            value: req.headers
        });
    });

    app.post('/body-uint8array', (req, res) => {
        res.setHeader('x-azle-response-0', 'x-azle-response-0');
        res.setHeader('x-azle-response-1', 'x-azle-response-1');
        res.setHeader('x-azle-response-2', 'x-azle-response-2');

        res.json({
            whoami: ic.caller().toString(),
            value: req.body
        });
    });

    app.put('/body-string', (req, res) => {
        res.setHeader('x-azle-response-0', 'x-azle-response-0');
        res.setHeader('x-azle-response-1', 'x-azle-response-1');
        res.setHeader('x-azle-response-2', 'x-azle-response-2');

        res.json({
            whoami: ic.caller().toString(),
            value: req.body
        });
    });

    app.patch('/body-array-buffer', (req, res) => {
        res.setHeader('x-azle-response-0', 'x-azle-response-0');
        res.setHeader('x-azle-response-1', 'x-azle-response-1');
        res.setHeader('x-azle-response-2', 'x-azle-response-2');

        res.json({
            whoami: ic.caller().toString(),
            value: req.body
        });
    });

    app.delete('/body-blob', (req, res) => {
        res.setHeader('x-azle-response-0', 'x-azle-response-0');
        res.setHeader('x-azle-response-1', 'x-azle-response-1');
        res.setHeader('x-azle-response-2', 'x-azle-response-2');

        res.json({
            whoami: ic.caller().toString(),
            value: req.body
        });
    });

    app.post('/body-data-view', (req, res) => {
        res.setHeader('x-azle-response-0', 'x-azle-response-0');
        res.setHeader('x-azle-response-1', 'x-azle-response-1');
        res.setHeader('x-azle-response-2', 'x-azle-response-2');

        res.json({
            whoami: ic.caller().toString(),
            value: req.body
        });
    });

    app.get('/url-query-params-get', (req, res) => {
        res.setHeader('x-azle-response-0', 'x-azle-response-0');
        res.setHeader('x-azle-response-1', 'x-azle-response-1');
        res.setHeader('x-azle-response-2', 'x-azle-response-2');

        res.json({
            whoami: ic.caller().toString(),
            value: req.query
        });
    });

    app.post('/url-query-params-post', (req, res) => {
        res.setHeader('x-azle-response-0', 'x-azle-response-0');
        res.setHeader('x-azle-response-1', 'x-azle-response-1');
        res.setHeader('x-azle-response-2', 'x-azle-response-2');

        res.json({
            whoami: ic.caller().toString(),
            value: req.query
        });
    });

    app.get('/not-authorized-get', (req, res) => {
        res.status(401).send('Not Authorized');
    });

    app.post('/not-authorized-post', (req, res) => {
        res.status(401).send('Not Authorized');
    });

    app.head('/head', (req, res) => {
        res.setHeader('x-azle-response-0', 'x-azle-response-0');
        res.setHeader('x-azle-response-1', 'x-azle-response-1');
        res.setHeader('x-azle-response-2', 'x-azle-response-2');
        res.end();
    });

    app.options('/options', (req, res) => {
        res.setHeader('x-azle-response-options', 'x-azle-response-options');
        res.end();
    });

    app.use(express.static('/dist'));

    return app.listen();
});
