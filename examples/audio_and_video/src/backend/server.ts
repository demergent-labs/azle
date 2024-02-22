import { Server } from 'azle';
import express from 'express';

import { rangeResponse } from './range_response';

export default Server(() => {
    const app = express();

    app.use('/media', rangeResponse());

    app.use(express.static('/dist'));

    return app.listen();
});
