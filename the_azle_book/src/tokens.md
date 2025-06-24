# Tokens TL;DR

<a href="https://internetcomputer.org/docs/current/concepts/canisters-code" target="_blank">Canisters</a> can either:

1. Interact with tokens that already exist
2. Implement, extend, or proxy tokens

Canisters can use cross-canister calls to interact with tokens implemented using <a href="https://github.com/dfinity/ICRC" target="_blank">ICRC</a> or other standards. They can also interact with non-ICP tokens through <a href="https://internetcomputer.org/docs/current/developer-docs/smart-contracts/encryption/t-ecdsa" target="_blank">threshold ECDSA</a>.

Canisters can implement tokens from scratch, or extend or proxy implementations already written.

Demergent Labs does not keep any token implementations up-to-date. Here are some old implementations for inspiration and learning:

- <a href="https://github.com/demergent-labs/ICRC-1" target="_blank">ICRC-1</a>
- <a href="https://github.com/lastmjs/extendable-token-azle" target="_blank">extendable-token-azle</a>

# Tokens

Examples:

- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/demo/basic_bitcoin" target="_blank">basic_bitcoin</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/stable/test/end_to_end/candid_rpc/bitcoin" target="_blank">bitcoin</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/test/end_to_end/http_server/bitcoinjs_lib" target="_blank">bitcoinjs-lib</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/test/end_to_end/http_server/bitcore_lib" target="_blank">bitcore-lib</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/demo/ckbtc" target="_blank">ckbtc</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/stable/test/end_to_end/candid_rpc/ethereum_json_rpc" target="_blank">ethereum_json_rpc</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/test/end_to_end/http_server/ethers" target="_blank">ethers</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/test/end_to_end/http_server/ethers_base" target="_blank">ethers_base</a>
- <a href="https://github.com/lastmjs/extendable-token-azle" target="_blank">extendable-token-azle</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/test/end_to_end/http_server/ic_evm_rpc" target="_blank">ic_evm_rpc</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/stable/test/end_to_end/candid_rpc/icrc" target="_blank">icrc</a>
- <a href="https://github.com/demergent-labs/ICRC-1" target="_blank">ICRC-1</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/stable/test/end_to_end/candid_rpc/ledger_canister" target="_blank">ledger_canister</a>

<!-- -   ICRC transfer from frontend
-   ICRC transfer from backend
-   ckBTC/ckETH transfer from frontend
-   ckBTC/ckETH transfer from backend
-   BTC/ETH transfers from backend
-   Show get balance, total supply, etc as well
-   Basically show the basic needs of users, how to transfer tokens and look up balances

## Interacting with tokens

### ICP tokens

### Foreign blockchain tokens

## Implementing tokens

There are three ways to interact with tokens on ICP. You can interact with a token implemented in another canister with its own standard. You can interact with a token implemented in another canister using ICRC. You can interact with a token canister. You can initiate transfers in a token canister. Or you can implement your own token canister to augment underlying functionality.

You could also act as a proxy to another canister.

You could also interact with tokens on another blockchain like Bitcoin or Ethereum. You can also use ckTokens.

Interacting with:

Custom standard/non-standard ICP tokens
ICRC standard ICP tokens
ck foreign ICP tokens
Foreign tokens

Implementing:

Custom standard/non-standard ICP tokens
ICRC standard ICP tokens
ck foreign ICP tokens

So you can initiate transfers on a custom ICP token. You can initiate transfers on ICRC ICP tokens. You can initiate transfers, read balances, etc on ck tokens which are wrapped tokens on another blockchain. And you can interact with tokens on other blockchains with ECDSA now and soon EdDSA.

So there's interacting with a token that already exists. And then there's creating your own token. If you want to create your own token without changing its functionality, you can just deploy a canister that already exists. If you need to implement your own functionality, you would have to implement your own.

Let's have implementations of all ICRC standards in Azle with tests.

For the TL;DR let's just explain each of these categories and show some code snippets.

This could take a bit of work. -->
