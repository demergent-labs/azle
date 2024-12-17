import express, { Request } from 'express';

const app = express();

app.use(express.json());

app.get(
    '/read-test0',
    async (req: Request<any, any, any, { filename: string }>, res) => {
        const response = await fetch(`file://${req.query.filename}`);
        const responseText = await response.text();

        res.send(responseText);
    }
);

app.post(
    '/read-test2',
    async (req: Request<any, any, { filename: string }>, res) => {
        const response = await fetch(`file://${req.body.filename}`);
        const responseText = await response.text();

        res.send(responseText);
    }
);

app.put(
    '/read-test3',
    async (req: Request<any, any, { filename: string }>, res) => {
        const response = await fetch(`file://${req.body.filename}`);
        const responseText = await response.text();

        res.send(responseText);
    }
);

app.patch(
    '/read-test5',
    async (req: Request<any, any, { filename: string }>, res) => {
        const response = await fetch(`file://${req.body.filename}`);
        const responseText = await response.text();

        res.send(responseText);
    }
);

app.listen();
