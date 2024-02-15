import { Server } from 'azle';
import express from 'express';

export default Server(() => {
    const app = express();

    app.get('/test', (req, res) => {
        res.send('test');
    });

    return app.listen();
});
