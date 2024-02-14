# Server

-   [Express](#express)
-   [Limitations](#limitations)

The `Server` function imported from `azle` allows you to build [canisters](https://internetcomputer.org/docs/current/concepts/canisters-code) ([ICP](https://internetcomputer.org/) applications) that act as HTTP servers on ICP. These servers can serve static files or act as API backends, or both.

Here's an example of a very simple HTTP server:

```typescript
import { Server } from 'azle';
import { createServer } from 'http';

export default Server(() => {
    return createServer((req, res) => {
        res.write('Hello World!');
        res.end();
    });
});
```

Once [deployed](./deployment.md) you can access your server at a URL like this: `http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000`. You can use any HTTP client to interact with your server, such as `curl`, `fetch`, or a web browser. See [the Interacting with your canister section](./deployment.md#interacting-with-your-canister) of the [deployment chapter](./deployment.md) for help in constructing your canister URL.

The `default` export of your `main` module must be the result of calling `Server`, and the callback argument to `Server` must return a [Node.js http.Server](https://nodejs.org/api/http.html#class-httpserver). The `main` module is specified by the `main` property of your project's [dfx.json file](https://github.com/demergent-labs/azle/blob/main/examples/hello_world/dfx.json#L5). The `dfx.json` file must be at the root directory of your project.

The callback argument to `Server` can be asynchronous:

```typescript
import { Server } from 'azle';
import { createServer } from 'http';

export default Server(async () => {
    const message = await asynchronousHelloWorld();

    return createServer((req, res) => {
        res.write(message);
        res.end();
    });
});

async function asynchronousHelloWorld() {
    // do some asynchronous task
    return 'Hello World Asynchronous!';
}
```

## Express

[Express](https://expressjs.com/) is one of the most popular backend JavaScript web frameworks, and it's the recommended way to get started building servers in Azle. Here's the main code from the [hello_world example](https://github.com/demergent-labs/azle/tree/main/examples/hello_world):

```typescript
import { Server } from 'azle';
import express, { Request } from 'express';

let db = {
    hello: ''
};

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.get('/db', (req, res) => {
        res.json(db);
    });

    app.post('/db/update', (req: Request<any, any, typeof db>, res) => {
        db = req.body;

        res.json(db);
    });

    app.use(express.static('/dist'));

    return app.listen();
});
```

### jsonStringify

When working with `res.json` you may run into errors because of attempting to send back JavaScript objects that are not strictly `JSON`. This can happen when trying to send back an object with a `BigInt` for example.

Azle has created a special function called `jsonStringify` that will serialize many ICP-specific data structures to `JSON` for you:

```typescript
import { jsonStringify, Server } from 'azle';
import express, { Request } from 'express';

let db = {
    bigInt: 0n
};

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.get('/db', (req, res) => {
        res.send(jsonStringify(db));
    });

    app.post('/db/update', (req: Request<any, any, typeof db>, res) => {
        db = req.body;

        res.send(jsonStringify(db));
    });

    app.use(express.static('/dist'));

    return app.listen();
});
```

## Limitations

For a deep understanding of possible limitations you may want to refer to [The HTTP Gateway Protocol Specification](https://internetcomputer.org/docs/current/references/http-gateway-protocol-spec).

-   The top-level route `/api` is currently reserved by the replica locally
-   The `Transfer-Encoding` header is not supported
-   `gzip` responses most likely do not work
-   HTTP requests and responses are generally limited to ~2 MiB
-   You cannot set HTTP status codes in the 1xx range
