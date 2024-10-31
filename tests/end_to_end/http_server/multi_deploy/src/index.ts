import { init, postUpgrade, Server } from 'azle/experimental';
import express from 'express';
import { Server as NodeServer } from 'http';

let initCalled: boolean = false;
let postUpgradeCalled: boolean = false;

export default Server(serverCallback, {
    init: init([], () => {
        console.info('Init was called');
        initCalled = true;
        postUpgradeCalled = false;
    }),
    postUpgrade: postUpgrade([], () => {
        console.info('Post Upgrade was called');
        postUpgradeCalled = true;
        initCalled = false;
    })
});

function serverCallback(): NodeServer {
    const app = express();

    app.get('/get-init-called', (_req, res) => {
        res.send(initCalled);
    });

    app.get('/get-post-upgrade-called', (_req, res) => {
        res.send(postUpgradeCalled);
    });

    app.get('/get-azle-init-called', (_req, res) => {
        res.send(globalThis._azleInitCalled);
    });

    app.get('/get-azle-post-upgrade-called', (_req, res) => {
        res.send(globalThis._azlePostUpgradeCalled);
    });

    return app.listen();
}
