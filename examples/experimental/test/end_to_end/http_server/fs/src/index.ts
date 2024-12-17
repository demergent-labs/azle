import express, { Request } from 'express';
import {
    createReadStream,
    existsSync,
    mkdirSync,
    readFileSync,
    rmdirSync,
    statSync,
    unlinkSync,
    writeFileSync
} from 'fs';
import { mkdir, readFile, rmdir, unlink, writeFile } from 'fs/promises';

const app = express();

app.use(express.json());

app.get(
    '/read-file-sync',
    (req: Request<any, any, any, { filename: string }>, res) => {
        const contents = readFileSync(req.query.filename).toString();

        res.send(contents);
    }
);

app.get(
    '/read-file',
    async (req: Request<any, any, any, { filename: string }>, res) => {
        const contents = (await readFile(req.query.filename)).toString();

        res.send(contents);
    }
);

app.post(
    '/write-file-sync',
    (req: Request<any, any, { files: [string, string][] }>, res) => {
        req.body.files.forEach(([filename, contents]) => {
            writeFileSync(filename, contents);
        });

        res.send(`No. files written: ${req.body.files.length}`);
    }
);

app.post(
    '/write-file',
    async (req: Request<any, any, { files: [string, string][] }>, res) => {
        for (const [filename, contents] of req.body.files) {
            await writeFile(filename, contents);
        }

        res.send(`No. files written: ${req.body.files.length}`);
    }
);

app.post(
    '/unlink-sync',
    (req: Request<any, any, any, { filename: string }>, res) => {
        unlinkSync(req.query.filename);

        res.send(`File ${req.query.filename} deleted`);
    }
);

app.post(
    '/unlink',
    async (req: Request<any, any, any, { filename: string }>, res) => {
        await unlink(req.query.filename);

        res.send(`File ${req.query.filename} deleted`);
    }
);

app.post(
    '/rmdir-sync',
    (req: Request<any, any, any, { dirname: string }>, res) => {
        rmdirSync(req.query.dirname);

        res.send(`Directory ${req.query.dirname} deleted`);
    }
);

app.post(
    '/rmdir',
    async (req: Request<any, any, any, { dirname: string }>, res) => {
        await rmdir(req.query.dirname);

        res.send(`Directory ${req.query.dirname} deleted`);
    }
);

app.post(
    '/mkdir-sync',
    (req: Request<any, any, any, { dirname: string }>, res) => {
        mkdirSync(req.query.dirname);

        res.send(`Directory ${req.query.dirname} created`);
    }
);

app.post(
    '/mkdir',
    async (req: Request<any, any, any, { dirname: string }>, res) => {
        await mkdir(req.query.dirname);

        res.send(`Directory ${req.query.dirname} created`);
    }
);

app.get(
    '/exists-sync',
    (req: Request<any, any, any, { name: string }>, res) => {
        res.send(existsSync(req.query.name));
    }
);

app.get(
    '/create-read-stream-larger-than-high-water-mark-chunked',
    async (req, res) => {
        const fileLength = statSync('/image.jpg').size;

        const chunkSize = 2_000_000;

        for (let i = 0; i < fileLength; i += chunkSize) {
            const fileStream = createReadStream('/image.jpg', {
                start: i,
                end: i + chunkSize - 1
            });

            for await (const data of fileStream) {
                res.write(data);
            }
        }

        res.end();
    }
);

app.get('/create-read-stream-larger-than-high-water-mark', async (req, res) => {
    const fileStream = createReadStream('/image.jpg');

    for await (const data of fileStream) {
        res.write(data);
    }

    res.end();
});

app.get('/high-water-mark-boundary', async (req, res) => {
    const fileStream = createReadStream('/image.jpg', {
        start: 0,
        end: 16_384
    });

    let chunk = Buffer.from([]);

    for await (const data of fileStream) {
        chunk = data;
    }

    res.send(chunk.length.toString());
});

app.listen();
