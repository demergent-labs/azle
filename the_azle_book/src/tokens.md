# Tokens TL;DR

[Canisters](https://internetcomputer.org/docs/current/concepts/canisters-code) can either:

1. Interact with tokens that already exist
2. Implement, extend, or proxy tokens

Canisters can use cross-canister calls to interact with tokens implemented using [ICRC](https://github.com/dfinity/ICRC) or other standards. They can also interact with non-ICP tokens through [threshold ECDSA](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/encryption/t-ecdsa).

Canisters can implement tokens from scratch, or extend or proxy implementations already written.

Demergent Labs does not keep any token implementations up-to-date. Here are some old implementations for inspiration and learning:

-   [ICRC-1](https://github.com/demergent-labs/ICRC-1)
-   [extendable-token-azle](https://github.com/lastmjs/extendable-token-azle)

# Tokens

Examples:

-   [basic_bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/basic_bitcoin)
-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)
-   [bitcoinjs-lib](https://github.com/demergent-labs/azle/tree/main/examples/bitcoinjs-lib)
-   [bitcore-lib](https://github.com/demergent-labs/azle/tree/main/examples/bitcore-lib)
-   [ckbtc](https://github.com/demergent-labs/azle/tree/main/examples/ckbtc)
-   [ethereum_json_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ethereum_json_rpc)
-   [ethers](https://github.com/demergent-labs/azle/tree/main/examples/ethers)
-   [ethers_base](https://github.com/demergent-labs/azle/tree/main/examples/ethers_base)
-   [extendable-token-azle](https://github.com/lastmjs/extendable-token-azle)
-   [ic_evm_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ic_evm_rpc)
-   [icrc](https://github.com/demergent-labs/azle/tree/main/examples/icrc)
-   [ICRC-1](https://github.com/demergent-labs/ICRC-1)
-   [ledger_canister](https://github.com/demergent-labs/azle/tree/main/examples/ledger_canister)

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
