# Assets TL;DR

You can automatically copy static assets (essentially files and folders) into your canister's filesystem during deploy by using the `assets`, `assets_large` and `build_assets` properties of the canister object in your project's `dfx.json` file.

Here's an example that copies the `src/frontend/dist` directory on the deploying machine into the `dist` directory of the canister, using the `assets` and `build_assets` properties:

```json
{
    "canisters": {
        "backend": {
            "type": "azle",
            "main": "src/backend/index.ts",
            "assets": [["src/frontend/dist", "dist"]],
            "build_assets": "npm run build"
        }
    }
}
```

The `assets` property is an array of tuples, where the first element of the tuple is the source directory on the deploying machine, and the second element of the tuple is the destination directory in the canister. Use `assets` for total assets under ~90 MiB in size.

The `build_assets` property allows you to specify custom terminal commands that will run before Azle copies the assets into the canister. You can use `build_assets` to build your frontend code for example. In this case we are running `npm run build`, which refers to an npm script that we have specified in our `package.json` file.

There is also an `assets_large` property that works similarly to the `assets` property, but allows for total assets up to ~2 GiB in size. We are working on increasing this limit further.

Once you have loaded assets into your canister, they are accessible from that canister's filesystem. Here's an example of using the Express static middleware to serve a frontend from the canister's filesystem:

```typescript
import express from 'express';

const app = express();

app.use(express.static('/dist'));

app.listen();
```

Assuming the `/dist` directory in the canister has an appropriate `index.html` file, this canister would serve a frontend at its URL when loaded in a web browser.
