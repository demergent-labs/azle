import express from 'express';

import { initState, postUpgradeState } from '../';
import { getRouter as getRouterPosts } from './posts/router';
import { getRouter as getRouterUsers } from './users/router';

export function initServer() {
    let app = express();

    app.use(express.json());

    app.use('/users', getRouterUsers());
    app.use('/posts', getRouterPosts());

    app.get('/init-state', (_req, res) => {
        res.json(initState.value);
    });

    app.get('/post-upgrade-state', (_req, res) => {
        res.json(postUpgradeState.value);
    });

    return app.listen();
}
