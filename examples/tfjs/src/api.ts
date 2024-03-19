import { ic } from 'azle';
import express from 'express';
import * as tf from '@tensorflow/tfjs';

async function init() {
    const app = express();

    app.use(express.json());

    tf.env().platform = {
        fetch,
        now: () => Number(ic.time()), // TODO time probably off (look into nano vs milli)
        encode: (text) => Buffer.from(text),
        decode: (bytes) => Buffer.from(bytes).toString(),
        isTypedArray: ((array: any) => {
            return (array instanceof Float32Array ||
                array instanceof Int32Array ||
                array instanceof Uint8Array ||
                array instanceof Uint8ClampedArray) as any;
        }) as any
    };

    const model = await tf.loadLayersModel('file://spam/model.json');

    app.get('/prediction', async (_req, res) => {
        // TODO Tokenization and prediction for this specific model have not yet been figured out
        // const prediction = model.predict(tf.tensor([]));

        res.send('Prediction not yet implemented');
    });

    app.listen();
}

init();
