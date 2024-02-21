import { Server } from 'azle';
import express from 'express';

export default Server(() => {
    const app = express();

    app.get('/', (req, res) => {
        res.send('Hello world');
    });

    app.get('/size-of-assets', (req, res) => {
        res.send('Hello world');
    });

    return app.listen();
});
