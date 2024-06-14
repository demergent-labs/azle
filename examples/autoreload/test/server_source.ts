export const originalServerTs = `import express from 'express';

const app = express();

app.get('/test', (req, res) => {
    res.send('test');
});

app.listen();
`;

export const testChangedServerTs = `import express from 'express';

const app = express();

app.get('/test-changed', (req, res) => {
    res.send('test-changed');
});

app.listen();
`;

export const testChangedRapidlyServerTs = `import express from 'express';

const app = express();

app.get('/test-changed-rapidly', (req, res) => {
    res.send('test-changed-rapidly');
});

app.listen();
`;
