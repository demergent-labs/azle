import express from 'express';

import { getRouter as getRouterPosts } from '../entities/posts/router';
import { getRouter as getRouterUsers } from '../entities/users/router';

export function initServer() {
    let app = express();

    app.use(express.json());

    app.use('/users', getRouterUsers());
    app.use('/posts', getRouterPosts());

    app.get('/init-called', (_req, res) => {
        res.json(globalThis._azleInitCalled);
    });

    app.get('/post-upgrade-called', (_req, res) => {
        res.json(globalThis._azlePostUpgradeCalled);
    });

    return app.listen();
}
