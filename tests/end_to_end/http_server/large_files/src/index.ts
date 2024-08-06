import express, { Request } from 'express';
import { access, readFile, stat } from 'fs/promises';
import mime from 'mime';
import { extname } from 'path';

import { ls } from './list_files';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    res.send(
        `<pre>${await ls(undefined, {
            recursive: true,
            display: 'html'
        })}</pre>`
    );
});

app.get(
    '/exists',
    async (req: Request<any, any, any, { path: string }>, res) => {
        try {
            await access(req.query.path);
            res.send(true);
        } catch {
            res.send(false);
        }
    }
);

app.get('/size', async (req: Request<any, any, any, { path: string }>, res) => {
    const size = await getFileSize(req.query.path);
    res.json(size);
});

app.get(
    '/ls',
    async (
        req: Request<
            any,
            any,
            any,
            {
                path: string;
                recursive: boolean;
                display: 'tree' | 'html' | 'unix';
            }
        >,
        res
    ) => {
        res.send(
            `<pre>${await ls(req.query.path, {
                recursive: req.query.recursive,
                display: req.query.display ?? 'html'
            })}</pre>`
        );
    }
);

app.get(
    '/read-file',
    async (req: Request<any, any, any, { path: string }>, res) => {
        const filePath = req.query.path;
        const fileExt = extname(filePath);
        const mimeType = mime.lookup(fileExt) || 'application/octet-stream';

        const content = await readFile(filePath);

        res.setHeader('Content-Type', mimeType);
        res.send(content);
    }
);

app.use(express.static('/assets'));

app.listen();

async function getFileSize(filePath: string): Promise<number> {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            return stats.size;
        } else {
            return 0;
        }
    } catch {
        return 0;
    }
}
