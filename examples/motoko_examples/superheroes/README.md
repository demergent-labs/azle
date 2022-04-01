# Superheroes

Reimplementation of the [Motoko Superheroes example](https://github.com/dfinity/examples/tree/master/motoko/superheroes)

This example demonstrates how to build a
[CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
application on the [Internet Computer](https://dfinity.org) using
[Motoko](https://sdk.dfinity.org/docs/language-guide/motoko.html) and
[React](https://reactjs.org).

## Prerequisites

Verify the following before running this demo:

- You have downloaded and installed [Node.js](https://nodejs.org).

- You have downloaded and installed the [DFINITY Canister
  SDK](https://sdk.dfinity.org).

- You have stopped any Internet Computer or other network process that would
  create a port conflict on 8000.

## Demo

1. Start a local internet computer.

   ```text
   dfx start
   ```

1. Open a new terminal window.

1. Reserve an identifier for your canister.

   ```text
   dfx canister create --all
   ```

1. Build your front-end.

   ```text
   npm install
   ```

1. Build your canister.

   ```text
   dfx build
   ```

1. Deploy your canister.

   ```text
   dfx canister install --all
   ```

1. Run webpack server.

   ```text
   npm start
   ```

1. Open http://localhost:8080/ URL in your web browser.
