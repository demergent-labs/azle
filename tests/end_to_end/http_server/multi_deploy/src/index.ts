import { init, postUpgrade, Server } from 'azle/experimental';
import express from 'express';

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

// TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function serverCallback() {
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
