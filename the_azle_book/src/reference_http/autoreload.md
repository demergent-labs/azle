# Autoreload

> Deploying to mainnet with AZLE_AUTORELOAD=true will expose your canister to arbitrary untrusted JavaScript code execution

You can turn on automatic reloading of your canister's final compiled JavaScript by using the `AZLE_AUTORELOAD` environment variable during deploy:

```bash
AZLE_AUTORELOAD=true dfx deploy
```

The autoreload feature watches all `.ts` and `.js` files recursively in the directory with your `dfx.json` file (the root directory of your project), excluding files found in `.azle`, `.dfx`, and `node_modules`.

Autoreload only works properly if you do not change the methods of your canister. HTTP-based canisters will generally work well with autoreload as the query and update methods `http_request` and `http_request_update` will not need to change often. Candid-based canisters with explicit `query` and `update` methods may require manual deploys more often.

Autoreload will not reload assets uploaded through the `assets` property of your `dfx.json`.

It is extremely important to keep in mind that setting `AZLE_AUTORELOAD=true` will create an update method in your canister called `reload_js` that has no authorization built into it. If you deploy this to mainnet, anyone will be able to call this method and change the JavaScript of your canister.
