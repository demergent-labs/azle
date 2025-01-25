import { msgCaller } from 'azle';
import express from 'express';

const app = express();

app.get('/whoami', (req, res) => {
    res.send(msgCaller().toString());
});

app.use(express.static('/dist'));

app.listen();
