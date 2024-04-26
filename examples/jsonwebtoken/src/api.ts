import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.post('/create-token', async (req, res) => {
    try {
        console.log(0);
        const response = await fetch('icp://aaaaa-aa/raw_rand');
        const randomness = Buffer.from(await response.json());

        console.log('randomness', randomness);

        const payload = {
            userId: '123456',
            username: 'exampleUser'
        };

        console.log('payload done');

        // TODO it breaks here
        const token = jwt.sign(payload, randomness, {
            algorithm: 'HS256',
            expiresIn: '1h'
        });

        console.log('token done');

        res.send(token);
    } catch (error) {
        console.log(error);
    }
});

app.listen();
