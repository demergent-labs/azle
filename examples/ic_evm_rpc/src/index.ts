import { serialize, Server } from 'azle';
import express from 'express';

export default Server(() => {
    const app = express();

    app.post('/', async (req, res) => {
        const response = await fetch(`icp://be2us-64aaa-aaaaa-qaabq-cai/test`, {
            body: serialize({
                candidPath: '/src/evm_rpc.did',
                args: ['did you get it?']
            })
        });
        const responseJson = await response.json();

        res.send(`Hello world: ${responseJson}`);
    });

    return app.listen();
});
