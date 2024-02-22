import { Server } from 'azle';
import { statSync, existsSync } from 'fs';
import express, { Request } from 'express';

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

function getFileSize(filePath: string): number {
    try {
        const stats = statSync(filePath);
        if (stats.isFile()) {
            return stats.size;
        } else {
            return 0;
        }
    } catch (err) {
        return 0;
    }
}
