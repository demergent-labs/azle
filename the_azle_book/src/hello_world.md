# Hello World

-   [Quick start](#quick-start)
-   [Methodical start](#slow-start)
    -   [The project directory and file structure](#the-project-directory-and-file-structure)
    -   [index.ts](#indexts)
    -   [tsconfig.json](#tsconfigjson)
    -   [dfx.json](#dfxjson)
    -   [Local deployment](#local-deployment)
    -   [Interacting with your canister from the command line](#interacting-with-your-canister-from-the-command-line)
    -   [Interacting with your canister from the web UI](#interacting-with-your-canister-from-the-web-ui)

Let's build your first application (canister) with Azle!

Before embarking please ensure you've followed all of [the installation instructions](./installation.md).

We'll build a simple `Hello World` canister that shows the basics of importing Azle, exposing a query method, exposing an update method, and storing some state in a global variable. We'll then interact with it from the command line and from our web browser.

## Quick Start

```bash
npx azle new hello_world
cd hello_world

npm install
npm run dfx_install
npm run replica_start
npm run canister_deploy_local

npm run canister_call_set_message
npm run canister_call_get_message
```

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
import { $query, $update } from 'azle';

// This is a global variable that is stored on the heap
let message: string = '';

// Query calls complete quickly because they do not go through consensus
$query;
export function getMessage(): string {
    return message;
}

// Update calls take a few seconds to complete
// This is because they persist state changes and go through consensus
$update;
export function setMessage(newMessage: string): void {
    message = newMessage; // This change will be persisted
}
```

Let's discuss each section of the code.

```typescript
import { $query, $update } from 'azle';
```

The code starts off by importing the `$query` and `$update` annotations from `azle`. The `azle` module provides most of the Internet Computer (IC) APIs for your canister.

```typescript
// This is a global variable that is stored on the heap
let message: string = '';
```

We have created a global variable to store the state of our application. This variable is in scope to all of the functions defined in this module. We have annotated it with a type and set it equal to an empty string.

```typescript
// Query calls complete quickly because they do not go through consensus
$query;
export function getMessage(): string {
    return message;
}
```

We are exposing a canister query method here. When query methods are called they execute quickly because they do not have to go through consensus. This method simply returns our global `message` variable.

```typescript
// Update calls take a few seconds to complete
// This is because they persist state changes and go through consensus
$update;
export function setMessage(newMessage: string): void {
    message = newMessage; // This change will be persisted
}
```

We are exposing an update method here. When update methods are called they take a few seconds to complete. This is because they persist changes and go through consensus. A majority of nodes in a subnet must agree on all state changes introduced in calls to update methods. This method accepts a `string` from the caller and will store it in our global `message` variable.

That's it! We've created a very simple getter/setter `Hello World` application. But no `Hello World` project is complete without actually yelling `Hello world`!

To do that, we'll need to setup the rest of our project.

### tsconfig.json

Create the following in `azle_hello_world/tsconfig.json`:

```json
{
    "compilerOptions": {
        "strict": true,
        "target": "ES2020",
        "experimentalDecorators": true,
        "strictPropertyInitialization": false,
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
            "build": "npx azle azle_hello_world",
            "root": "src",
            "ts": "src/index.ts",
            "candid": "src/index.did",
            "wasm": ".azle/azle_hello_world/azle_hello_world.wasm.gz"
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
