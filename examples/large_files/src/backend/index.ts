import { Server } from 'azle';
import express, { Request } from 'express';
import { statSync, existsSync } from 'fs';

export default Server(() => {
    const app = express();

    app.get('/exists', (req: Request<any, any, any, { path: string }>, res) => {
        res.send(existsSync(req.query.path));
    });

    app.get('/size', (req: Request<any, any, any, { path: string }>, res) => {
        res.json(getFileSize(req.query.path));
    });

    app.use(express.static('/assets'));

    return app.listen();
});

function getFileSize(path: string): number {
    try {
        const stats = statSync(path);
        if (stats.isFile()) {
            return stats.size;
        } else {
            return 0;
        }
    } catch (err) {
        return 0;
    }
}
