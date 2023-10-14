# Hello World

-   [Quick start](#quick-start)
-   [Methodical start](#slow-start)
    -   [The project directory and file structure](#the-project-directory-and-file-structure)
    -   [index.ts](#indexts)
    -   [tsconfig.json](#tsconfigjson)
    -   [dfx.json](#dfxjson)
    -   [Local deployment](#local-deployment)
    -   [Common deployment issues](#common-deployment-issues)
    -   [Interacting with your canister from the command line](#interacting-with-your-canister-from-the-command-line)
    -   [Interacting with your canister from the web UI](#interacting-with-your-canister-from-the-web-ui)

Let's build your first application (canister) with Azle!

Before embarking please ensure you've followed all of [the installation instructions](./installation.md), especially noting [the build dependencies](./installation.md#build-dependencies).

We'll build a simple `Hello World` canister that shows the basics of importing Azle, exposing a query method, exposing an update method, and storing some state in a global variable. We'll then interact with it from the command line and from our web browser.

## Quick Start

We are going to use the Azle `new` command which creates a simple example project.

First use the `new` command to create a new project called `azle_hello_world`:

```bash
npx azle new azle_hello_world
```

Now let's go inside of our project:

```bash
cd azle_hello_world
```

We should install Azle and all of its dependencies:

```bash
npm install
```

Start up your local replica:

```bash
dfx start
```

In another terminal, deploy your canister:

```bash
dfx deploy azle_hello_world
```

Call the `setMessage` method:

```bash
dfx canister call azle_hello_world setMessage '("Hello world!")'
```

Call the `getMessage` method:

```bash
dfx canister call azle_hello_world getMessage
```

If you run into an error during deployment, see [the common deployment issues section](./deployment.md#common-deployment-issues).

See the official [azle_hello_world](https://github.com/demergent-labs/azle_hello_world) example for more information.

## Methodical start

### The project directory and file structure

Assuming you're starting completely from scratch, run these commands to setup your project's directory and file structure:

```bash
mkdir azle_hello_world
cd azle_hello_world

mkdir src

touch src/index.ts
touch tsconfig.json
touch dfx.json
```

Now install Azle, which will create your `package.json` and `package-lock.json` files:

```bash
npm install azle
```

Open up `azle_hello_world` in your text editor (we recommend [VS Code](https://code.visualstudio.com/)).

### index.ts

Here's the main code of the project, which you should put in the `azle_hello_world/src/index.ts` file of your canister:

```typescript
import { Canister, query, text, update, Void } from 'azle';

// This is a global variable that is stored on the heap
let message = '';

export default Canister({
    // Query calls complete quickly because they do not go through consensus
    getMessage: query([], text, () => {
        return message;
    }),
    // Update calls take a few seconds to complete
    // This is because they persist state changes and go through consensus
    setMessage: update([text], Void, (newMessage) => {
        message = newMessage; // This change will be persisted
    })
});
```

Let's discuss each section of the code.

```typescript
import { Canister, query, text, update, Void } from 'azle';
```

The code starts off by importing `Canister`, `query`, `text`, `update` and `Void` from `azle`. The `azle` module provides most of the Internet Computer (IC) APIs for your canister.

```typescript
// This is a global variable that is stored on the heap
let message = '';
```

We have created a global variable to store the state of our application. This variable is in scope to all of the functions defined in this module. We have set it equal to an empty string.

```typescript
export default Canister({
    ...
});
```

The `Canister` function allows us to export our canister's definition to the Azle IC environment.

```typescript
// Query calls complete quickly because they do not go through consensus
getMessage: query([], text, () => {
    return message;
}),
```

We are exposing a canister query method here. This method simply returns our global `message` variable. We use a `CandidType` object called `text` to instruct Azle to encode the return value as a Candid `text` value. When query methods are called they execute quickly because they do not have to go through consensus.

```typescript
// Update calls take a few seconds to complete
// This is because they persist state changes and go through consensus
setMessage: update([text], Void, (newMessage) => {
    message = newMessage; // This change will be persisted
});
```

We are exposing an update method here. This method accepts a `string` from the caller and will store it in our global `message` variable. We use a `CandidType` object called `text` to instruct Azle to decode the `newMessage` parameter from a Candid `text` value to a JavaScript string value. Azle will infer the TypeScript type for `newMessage`. We use a `CandidType` object called `Void` to instruct Azle to encode the return value as the absence of a Candid value.

When update methods are called they take a few seconds to complete. This is because they persist changes and go through consensus. A majority of nodes in a subnet must agree on all state changes introduced in calls to update methods.

That's it! We've created a very simple getter/setter `Hello World` application. But no `Hello World` project is complete without actually yelling `Hello world`!

To do that, we'll need to setup the rest of our project.

### tsconfig.json

Create the following in `azle_hello_world/tsconfig.json`:

```json
{
    "compilerOptions": {
        "strict": true,
        "target": "ES2020",
        "moduleResolution": "node",
        "allowJs": true,
        "outDir": "HACK_BECAUSE_OF_ALLOW_JS"
    }
}
```

### dfx.json

Create the following in `azle_hello_world/dfx.json`:

```json
{
    "canisters": {
        "azle_hello_world": {
            "type": "custom",
            "main": "src/index.ts",
            "candid": "src/index.did",
            "build": "npx azle azle_hello_world",
            "wasm": ".azle/azle_hello_world/azle_hello_world.wasm",
            "gzip": true
        }
    }
}
```

### Local deployment

Let's deploy to our local replica.

First startup the replica:

```bash
dfx start --background
```

Then deploy the canister:

```bash
dfx deploy
```

### Common deployment issues

If you run into an error during deployment, see [the common deployment issues section](./deployment.md#common-deployment-issues).

### Interacting with your canister from the command line

Once we've deployed we can ask for our message:

```bash
dfx canister call azle_hello_world getMessage
```

We should see `("")` representing an empty message.

Now let's yell `Hello World!`:

```bash
dfx canister call azle_hello_world setMessage '("Hello World!")'
```

Retrieve the message:

```bash
dfx canister call azle_hello_world getMessage
```

We should see `("Hello World!")`.

### Interacting with your canister from the web UI

After deploying your canister, you should see output similar to the following in your terminal:

```bash
Deployed canisters.
URLs:
  Backend canister via Candid interface:
    azle_hello_world: http://127.0.0.1:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai
```

Open up [http://127.0.0.1:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai](http://127.0.0.1:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai) or the equivalent URL from your terminal to access the web UI and interact with your canister.
