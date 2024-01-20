import { Server } from 'azle';
import express from 'express';

let globalState = '';

export default Server(() => {
    const app = express();

    app.use(express.text());

    app.get('/', (req, res) => {
        res.send('Express server: Hello World!');
    });

    app.get('/global-state', (req, res) => {
        res.send(`globalState: ${globalState}\n`);
    });

    app.post('/global-state/update', (req, res) => {
        console.log('req.headers', req.headers);

        globalState = req.body;

        res.send(globalState);
    });

    return app.listen();
});
