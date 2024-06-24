import { ic, jsonStringify, StableBTreeMap } from 'azle/experimental';
import express from 'express';

let db = StableBTreeMap(0);

const app = express();

app.get('/test', async (_req, res) => {
    res.send('Hello from the consumer');
});

app.post('/test-long-running', async (req, res) => {
    for (let i = 0; i < 50_000; i++) {
        db.insert(i, {
            id: i,
            username: `lastmjs${i}`
        });

        if (i % 1_000 === 0) {
            console.log(`1_000 records inserted`);
        }

        if (i % 30_000 === 0) {
            await ic.chunk();
        }
    }

    res.send(
        jsonStringify({
            instructions: ic.performanceCounter(1)
        })
    );
});

app.listen();
