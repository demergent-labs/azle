import { ic, Server } from 'azle';
import express from 'express';

export default Server(() => {
    const app = express();

    app.use(express.json());

    // TODO make sure to test requests and responses, i.e. headers in requests and headers in responses

    // TODO test all HTTP methods
    // TODO test all body possibilities
    // TODO test all url possibilities (query params, hashtags, full url with protocol or not)

    app.get('/headers-array', (req, res) => {
        res.json(req.headers);
    });

    app.get('/headers-object', (req, res) => {
        res.json(req.headers);
    });

    app.post('/body-uint8array', (req, res) => {
        console.log('/body-uint8array req.headers', req.headers);
        console.log('/body-uint8array req.body', req.body);

        res.json(req.body);
    });

    app.post('/body-string', (req, res) => {
        console.log('/body-uint8array req.headers', req.headers);
        console.log('/body-string req.body', req.body);

        res.json(req.body);
    });

    app.get('/whoami', (req, res) => {
        res.send(ic.caller().toString());
    });

    app.use(express.static('/dist'));

    return app.listen();
});
