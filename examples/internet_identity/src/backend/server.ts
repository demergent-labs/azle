import { ic, Server } from 'azle';
import express from 'express';

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.get('/whoami', (req, res) => {
        res.send(ic.caller().toString());
    });

    app.use(express.static('/dist'));

    return app.listen();
});
