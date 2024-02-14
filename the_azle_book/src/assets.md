# Assets

You can specify static assets (essentially files and folders) to be automatically included in your canister during deploy. You can specify assets using the `assets` property of your `dfx.json` file:

```json
{
    "canisters": {
        "backend": {
            "type": "custom",
            "main": "src/backend/index.ts",
            "candid": "src/backend/index.did",
            "candid_gen": "http",
            "build": "npx azle backend",
            "wasm": ".azle/backend/backend.wasm",
            "gzip": true,
            "assets": [["src/frontend/dist", "dist"]],
            "build_assets": "npm run build",
            "metadata": [
                {
                    "name": "candid:service",
                    "path": "src/backend/index.did"
                },
                {
                    "name": "cdk:name",
                    "content": "azle"
                }
            ]
        }
    }
}
```

Let's focus on the `assets` property:

```json
"assets": [["src/frontend/dist", "dist"]],
```

We are instructing Azle to include the `src/frontend/dist` directory at the `dist` directory of the Azle canister.

Azle canisters have their own file system separate from their host (i.e. your computer). You must load files into the Azle file system somehow. Using the `assets` property of `dfx.json` is one of those ways. You can also manually upload files yourself by creating endpoints and using `fs` to write to the filesystem. To do this you will have to split all files into chunks of 2 MiB or less to upload them. We are working on a way to allow automatic uploading of files.

There is a ~90 MiB limit for the `assets` property. The hard limit for a single canister will be 400 GiB currently. We are working on a way to automatically upload files for you.

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

```typescript
app.use(express.static('/dist'));
```

TODO show an example of chunk uploading? Maybe we should just implement a simple chunk uploader so that they could at least do it?

TODO also describe the build_assets property
