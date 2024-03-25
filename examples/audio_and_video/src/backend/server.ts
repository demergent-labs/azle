import express from 'express';

import { rangeResponse } from './range_response';

const app = express();

app.use('/media', rangeResponse());

app.use(express.static('/dist'));

app.listen();
