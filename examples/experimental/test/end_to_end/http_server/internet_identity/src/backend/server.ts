import { ic } from 'azle/experimental';
import express from 'express';

const app = express();

app.get('/whoami', (req, res) => {
    res.send(ic.msgCaller().toString());
});

app.use(express.static('/dist'));

app.listen();
