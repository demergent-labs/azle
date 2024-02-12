import { Server } from 'azle';
import express, { Request } from 'express';

let db = {
    hello: ''
};

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.get('/db', (req, res) => {
        res.json(db);
    });

    app.post('/db/update', (req: Request<any, any, typeof db>, res) => {
        db = req.body;

        res.json(db);
    });

    app.use(express.static('/dist'));

    return app.listen();
});
