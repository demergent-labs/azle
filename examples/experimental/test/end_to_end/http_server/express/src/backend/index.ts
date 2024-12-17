import express, { Request, Response } from 'express';
import { createReadStream, writeFileSync } from 'fs';

let globalState = {};

writeFileSync(
    '/dist/test.html',
    `<!DOCTYPE html><html><body>HTML from the filesystem</body></html>`
);

writeFileSync('/dist/test.txt', 'I have written some text to this file');

writeFileSync('/dist/send-file.txt', 'Does this work too?');

const app = express();

app.get('/res-send', (req, res) => {
    res.send('Just testing res.send');
});

app.get('/res-write', (req, res) => {
    res.write('Why hello there sir');
    res.end();
});

app.get('/file-stream', (req, res) => {
    const fileStream = createReadStream('/dist/test.txt');

    fileStream.pipe(res);
});

app.get('/global-state', (req, res) => {
    res.json(globalState);
});

app.get('/500', (req, res) => {
    res.sendStatus(500);
});

app.get('/send-file', (req, res) => {
    res.sendFile('/dist/send-file.txt');
});

app.use(express.json());

app.post('/global-state/post', changeGlobalState);
app.put('/global-state/put', changeGlobalState);
app.patch('/global-state/patch', changeGlobalState);

app.delete('/global-state/delete', (req, res) => {
    globalState = {};

    res.json(globalState);
});

const router = express.Router();

router.get('/user/:id', (req, res) => {
    res.send(req.params.id);
});

router.get('/post', (req, res) => {
    res.send(req.query.id);
});

app.use('/router', router);

app.use(express.static('/dist'));

app.listen();

function changeGlobalState(req: Request, res: Response): void {
    globalState = req.body;

    res.json(globalState);
}
