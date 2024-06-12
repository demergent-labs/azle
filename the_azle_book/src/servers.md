# Servers TL;DR

Just write Node.js servers like this:

```typescript
import { createServer } from 'http';

const server = createServer((req, res) => {
    res.write('Hello World!');
    res.end();
});

server.listen();
```

or write Express servers like this:

```typescript
import express, { Request } from 'express';

let db = {
    hello: ''
};

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

app.listen();
```

or NestJS servers like this:

```typescript
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    await app.listen(3000);
}

bootstrap();
```

# Servers

-   [Node.js http.server](#nodejs-httpserver)
-   [Express](#express)
-   [Server](#server)
-   [Limitations](#limitations)

Azle supports building HTTP servers on ICP using the [Node.js http.Server](https://nodejs.org/api/http.html#class-httpserver) class as the foundation. These servers can serve static files or act as API backends, or both.

Azle currently has good but not comprehensive support for [Node.js http.Server](https://nodejs.org/api/http.html#class-httpserver) and [Express](https://expressjs.com/). Support for other libraries like [Nest](https://nestjs.com/) are works-in-progress.

Once [deployed](./deployment.md) you can access your server at a URL like this locally `http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000` or like this on mainnet `https://bkyz2-fmaaa-aaaaa-qaaaq-cai.raw.icp0.io`.

You can use any HTTP client to interact with your server, such as `curl`, `fetch`, or a web browser. See the [Interacting with your canister section](./deployment.md#interacting-with-your-canister) of the [deployment chapter](./deployment.md) for help in constructing your canister URL.

## Node.js http.server

Azle supports instances of [Node.js http.Server](https://nodejs.org/api/http.html#class-httpserver). `listen()` must be called on the server instance for Azle to use it to handle HTTP requests. Azle does not respect a port being passed into `listen()`. The port is set by the ICP replica (e.g. `dfx start --host 127.0.0.1:8000`), not by Azle.

Here's an example of a very simple [Node.js http.Server](https://nodejs.org/api/http.html#class-httpserver):

```typescript
import { createServer } from 'http';

const server = createServer((req, res) => {
    res.write('Hello World!');
    res.end();
});

server.listen();
```

## Express

[Express](https://expressjs.com/) is one of the most popular backend JavaScript web frameworks, and it's the recommended way to get started building servers in Azle. Here's the main code from the [hello_world example](https://github.com/demergent-labs/azle/tree/main/examples/hello_world):

```typescript
import express, { Request } from 'express';

let db = {
    hello: ''
};

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

app.listen();
```

### jsonStringify

When working with `res.json` you may run into errors because of attempting to send back JavaScript objects that are not strictly `JSON`. This can happen when trying to send back an object with a `BigInt` for example.

Azle has created a special function called `jsonStringify` that will serialize many ICP-specific data structures to `JSON` for you:

```typescript
import { jsonStringify } from 'azle';
import express, { Request } from 'express';

let db = {
    bigInt: 0n
};

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

app.listen();
```

## Server

If you need to add [canister methods](./query_methods.md) to your HTTP server, the `Server` function imported from `azle` allows you to do so.

Here's an example of a very simple HTTP server:

```typescript
import { Server } from 'azle';
import express from 'express';

export default Server(() => {
    const app = express();

    app.get('/http-query', (_req, res) => {
        res.send('http-query-server');
    });

    app.post('/http-update', (_req, res) => {
        res.send('http-update-server');
    });

    return app.listen();
});
```

You can add canister methods like this:

```typescript
import { query, Server, text, update } from 'azle';
import express from 'express';

export default Server(
    () => {
        const app = express();

        app.get('/http-query', (_req, res) => {
            res.send('http-query-server');
        });

        app.post('/http-update', (_req, res) => {
            res.send('http-update-server');
        });

        return app.listen();
    },
    {
        candidQuery: query([], text, () => {
            return 'candidQueryServer';
        }),
        candidUpdate: update([], text, () => {
            return 'candidUpdateServer';
        })
    }
);
```

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

## Limitations

For a deeper understanding of possible limitations you may want to refer to [The HTTP Gateway Protocol Specification](https://internetcomputer.org/docs/current/references/http-gateway-protocol-spec).

-   The top-level route `/api` is currently reserved by the replica locally
-   The `Transfer-Encoding` header is not supported
-   `gzip` responses most likely do not work
-   HTTP requests are generally limited to ~2 MiB
-   HTTP responses are generally limited to ~3 MiB
-   You cannot set HTTP status codes in the 1xx range
