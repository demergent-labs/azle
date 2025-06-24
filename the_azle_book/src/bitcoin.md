# Bitcoin

Examples:

- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/demo/basic_bitcoin" target="_blank">basic_bitcoin</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/stable/test/end_to_end/candid_rpc/bitcoin" target="_blank">bitcoin</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/demo/bitcoin_psbt" target="_blank">bitcoin_psbt</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/test/end_to_end/http_server/bitcoinjs_lib" target="_blank">bitcoinjs_lib</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/test/end_to_end/http_server/bitcore_lib" target="_blank">bitcore_lib</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/demo/ckbtc" target="_blank">ckbtc</a>

There are two main ways to interact with Bitcoin on ICP: through the [management canister](#management-canister) and through the [ckBTC canister](#ckbtc).

## management canister

To sign Bitcoin transactions using <a href="https://internetcomputer.org/docs/current/developer-docs/smart-contracts/encryption/t-ecdsa" target="_blank">threshold ECDSA</a> and interact with the Bitcoin blockchain directly from ICP, make [cross-canister calls](./fetch.md) to the following methods on the <a href="https://internetcomputer.org/docs/current/references/ic-interface-spec#ic-management-canister" target="_blank">management canister</a>: `ecdsa_public_key`, `sign_with_ecdsa`, `bitcoin_get_balance`, `bitcoin_get_balance_query`, `bitcoin_get_utxos`, `bitcoin_get_utxos_query`, `bitcoin_send_transaction`, `bitcoin_get_current_fee_percentiles`.

To construct your cross-canister calls to these methods, use `canister id` `aaaaa-aa` and the management canister's <a href="https://internetcomputer.org/docs/current/references/ic-interface-spec#ic-candid" target="_blank">Candid type information</a> to construct the arguments to send in the `body` of your `fetch` call.

Here's an example of doing a test cross-canister call to the `bitcoin_get_balance` method:

```typescript
import { serialize } from 'azle/experimental';

// ...

const response = await fetch(`icp://aaaaa-aa/bitcoin_get_balance`, {
    body: serialize({
        args: [
            {
                'bc1q34aq5drpuwy3wgl9lhup9892qp6svr8ldzyy7c',
                min_confirmations: [],
                network: { regtest: null }
            }
        ],
        cycles: 100_000_000n
    })
});
const responseJson = await response.json();

// ...
```

## ckBTC

<a href="https://internetcomputer.org/docs/current/developer-docs/multi-chain/bitcoin/ckbtc/overview" target="_blank">ckBTC</a> is an <a href="https://internetcomputer.org/docs/current/references/icrc1-standard" target="_blank">ICRC</a> canister that wraps underlying bitcoin controlled with threshold ECDSA.

ICRCs are a set of standards for ICP canisters that define the method signatures and corresponding types for those canisters.

You interact with the `ckBTC` canister by calling its methods. You can do this from the frontend with <a href="https://www.npmjs.com/package/@dfinity/agent" target="_blank">@dfinity/agent</a>, or from an Azle canister through [cross-canister calls](./fetch.md).

Here's an example of doing a test cross-canister call to the `ckBTC` `icrc1_balance_of` method:

```typescript
import { ic, serialize } from 'azle/experimental';

// ...

const response = await fetch(
    `icp://mc6ru-gyaaa-aaaar-qaaaq-cai/icrc1_balance_of`,
    {
        body: serialize({
            candidPath: `/candid/icp/icrc.did`,
            args: [
                {
                    owner: ic.id(),
                    subaccount: [
                        padPrincipalWithZeros(ic.caller().toUint8Array())
                    ]
                }
            ]
        })
    }
);
const responseJson = await response.json();

// ...

function padPrincipalWithZeros(principalBlob: Uint8Array): Uint8Array {
    let newUin8Array = new Uint8Array(32);
    newUin8Array.set(principalBlob);
    return newUin8Array;
}
```
