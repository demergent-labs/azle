import { Server } from 'azle';
import express from 'express';

// TODO test setting the global http arguments

// TODO remember to remove the need for Server here
export default Server(() => {
    const app = express();

    app.use(express.json());

    app.post('/fetch-head', async (_req, res) => {
        const response = await fetch(
            `https://cat-fact.herokuapp.com/facts/591f989cd369931519ce361d`,
            {
                method: 'HEAD'
            }
        );

        res.json(Array.from(response.headers.entries()));
    });

    app.post('/fetch-get', async (_req, res) => {
        const response = await fetch(
            `https://cat-fact.herokuapp.com/facts/591f989cd369931519ce361d`
        );

        res.json({
            headers: Array.from(response.headers.entries()),
            body: await response.json()
        });
    });

    app.post('/fetch-get-query-params', async (_req, res) => {
        const response = await fetch(
            `https://cat-fact.herokuapp.com/facts/random?amount=2`
        );

        res.json(await response.json());
    });

    app.post('/fetch-post', async (_req, res) => {
        const response = await fetch(new URL('https://rpc.ankr.com/eth'), {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_getBalance',
                params: [
                    '0xeac0827eff0c6e3ff28a7d4a54f65cb7689d7b99',
                    'earliest'
                ],
                id: 1
            })
        });
        const responseJson = await response.json();

        res.json(responseJson);
    });

    app.post('/request-headers', async (_req, res) => {
        const response = await fetch(`https://httpbin.org/headers`, {
            headers: {
                'X-Azle-Request-Key-0': 'X-Azle-Request-Value-0',
                'X-Azle-Request-Key-1': 'X-Azle-Request-Value-1',
                'X-Azle-Request-Key-2': 'X-Azle-Request-Value-2'
            }
        });
        const responseJson = await response.json();

        res.json(responseJson);
    });

    app.post('/get-status-201', async (_req, res) => {
        try {
            const response = await fetch(`https://httpbin.org/status/201`);

            res.json({
                status: response.status,
                statusText: response.statusText
            });
        } catch (error) {
            console.log(error);
        }
    });

    app.post('/get-status-205', async (_req, res) => {
        try {
            const response = await fetch(`https://httpbin.org/status/205`, {
                method: 'POST'
            });

            res.json({
                status: response.status,
                statusText: response.statusText
            });
        } catch (error) {
            console.log(error);
        }
    });

    app.post('/get-status-301', async (_req, res) => {
        try {
            const response = await fetch(`https://httpbin.org/status/301`);

            res.json({
                status: response.status,
                statusText: response.statusText
            });
        } catch (error) {
            console.log(error);
        }
    });

    app.post('/get-status-304', async (_req, res) => {
        try {
            const response = await fetch(`https://httpbin.org/status/304`, {
                method: 'POST'
            });

            res.json({
                status: response.status,
                statusText: response.statusText
            });
        } catch (error) {
            console.log(error);
        }
    });

    app.post('/get-status-401', async (_req, res) => {
        try {
            const response = await fetch(`https://httpbin.org/status/401`);

            res.json({
                status: response.status,
                statusText: response.statusText
            });
        } catch (error) {
            console.log(error);
        }
    });

    app.post('/get-status-418', async (_req, res) => {
        try {
            const response = await fetch(`https://httpbin.org/status/418`, {
                method: 'POST'
            });

            res.json({
                status: response.status,
                statusText: response.statusText
            });
        } catch (error) {
            console.log(error);
        }
    });

    app.post('/get-status-500', async (_req, res) => {
        try {
            const response = await fetch(`https://httpbin.org/status/500`);

            res.json({
                status: response.status,
                statusText: response.statusText
            });
        } catch (error) {
            console.log(error);
        }
    });

    app.post('/get-status-501', async (_req, res) => {
        try {
            const response = await fetch(`https://httpbin.org/status/501`, {
                method: 'POST'
            });

            res.json({
                status: response.status,
                statusText: response.statusText
            });
        } catch (error) {
            console.log(error);
        }
    });

    return app.listen();
});
