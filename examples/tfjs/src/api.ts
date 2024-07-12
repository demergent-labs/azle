import * as tf from '@tensorflow/tfjs';
import { ic } from 'azle/experimental';
import express from 'express';

async function init(): Promise<void> {
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

    let model: tf.LayersModel;

    app.post('/load-model', async (_req, res) => {
        model = await tf.loadLayersModel('file://spam/model.json');

        res.send('Model loaded');
    });

    app.get('/prediction', async (_req, res) => {
        // TODO Tokenization and prediction for this specific model have not yet been figured out
        // const prediction = model.predict(tf.tensor([]));
        console.info(model);

        res.send('Prediction not yet implemented');
    });

    app.listen();
}

init();
