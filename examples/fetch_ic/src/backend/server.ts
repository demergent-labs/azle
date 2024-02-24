import { ic, Server } from 'azle';
import express from 'express';

// TODO test httpresposne status code and headers
// TODO make sure to test requests and responses, i.e. headers in requests and headers in responses

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.get('/headers-array', (req, res) => {
        res.json({
            whoami: ic.caller().toString(),
            value: req.headers
        });
    });

    app.get('/headers-object', (req, res) => {
        res.json({
            whoami: ic.caller().toString(),
            value: req.headers
        });
    });

    app.post('/body-uint8array', (req, res) => {
        res.json({
            whoami: ic.caller().toString(),
            value: req.body
        });
    });

    app.put('/body-string', (req, res) => {
        res.json({
            whoami: ic.caller().toString(),
            value: req.body
        });
    });

    app.patch('/body-array-buffer', (req, res) => {
        res.json({
            whoami: ic.caller().toString(),
            value: req.body
        });
    });

    app.delete('/body-blob', (req, res) => {
        res.json({
            whoami: ic.caller().toString(),
            value: req.body
        });
    });

    app.post('/body-data-view', (req, res) => {
        res.json({
            whoami: ic.caller().toString(),
            value: req.body
        });
    });

    app.get('/url-query-params-get', (req, res) => {
        res.json({
            whoami: ic.caller().toString(),
            value: req.query
        });
    });

    app.post('/url-query-params-post', (req, res) => {
        res.json({
            whoami: ic.caller().toString(),
            value: req.query
        });
    });

    app.use(express.static('/dist'));

    return app.listen();
});
