import express, { Request } from 'express';
import {
    access,
    copyFile,
    mkdir,
    readFile,
    rename,
    stat,
    unlink,
    writeFile
} from 'fs/promises';

import { ls, lsHtml, tree } from './list_files';

const app = express();
app.use(express.json());

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
        req: Request<any, any, any, { path: string; recursive: boolean }>,
        res
    ) => {
        res.send(`<pre>${await ls(req.query.path, req.query.recursive)}</pre>`);
    }
);

app.get(
    '/lsHtml',
    async (
        req: Request<any, any, any, { path: string; recursive: boolean }>,
        res
    ) => {
        res.send(`${await lsHtml(req.query.path, req.query.recursive)}`);
    }
);

app.get('/tree', async (req: Request<any, any, any, { path: string }>, res) => {
    res.send(`<pre>${await tree(req.query.path)}</pre>`);
});

app.get(
    '/read-file',
    async (req: Request<any, any, any, { path: string }>, res) => {
        const content = await readFile(req.query.path, 'utf8');
        res.send(content);
    }
);

app.post('/write-file', async (req, res) => {
    const { path: filePath, content } = req.body;
    await writeFile(filePath, content, 'utf8');
    res.send(`File written to ${filePath}`);
});

app.post('/create-directory', async (req, res) => {
    const { path: dirPath } = req.body;
    await mkdir(dirPath);
    res.send(`Directory created at ${dirPath}`);
});

app.post('/copy-file', async (req, res) => {
    const { source, destination } = req.body;
    await copyFile(source, destination);
    res.send(`File copied from ${source} to ${destination}`);
});

app.post('/delete-file', async (req, res) => {
    const { path: filePath } = req.body;
    await unlink(filePath);
    res.send(`File deleted at ${filePath}`);
});

app.post('/rename-file', async (req, res) => {
    const { oldPath, newPath } = req.body;
    await rename(oldPath, newPath);
    res.send(`File renamed from ${oldPath} to ${newPath}`);
});

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
