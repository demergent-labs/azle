# Bitcoin

Examples:

-   [basic_bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/basic_bitcoin)
-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)
-   [bitcoin_psbt](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin_psbt)
-   [bitcoinjs_lib](https://github.com/demergent-labs/azle/tree/main/examples/bitcoinjs_lib)
-   [bitcore_lib](https://github.com/demergent-labs/azle/tree/main/examples/bitcore_lib)
-   [ckbtc](https://github.com/demergent-labs/azle/tree/main/examples/ckbtc)

There are two main ways to interact with Bitcoin on ICP: through the [management canister](#management-canister) and through the [ckBTC canister](#ckbtc).

## management canister

To sign Bitcoin transactions using [threshold ECDSA](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/encryption/t-ecdsa) and interact with the Bitcoin blockchain directly from ICP, make [cross-canister calls](./fetch.md) to the following methods on the [management canister](https://internetcomputer.org/docs/current/references/ic-interface-spec#ic-management-canister): `ecdsa_public_key`, `sign_with_ecdsa`, `bitcoin_get_balance`, `bitcoin_get_balance_query`, `bitcoin_get_utxos`, `bitcoin_get_utxos_query`, `bitcoin_send_transaction`, `bitcoin_get_current_fee_percentiles`.

To construct your cross-canister calls to these methods, use `canister id` `aaaaa-aa` and the management canister's [Candid type information](https://internetcomputer.org/docs/current/references/ic-interface-spec#ic-candid) to construct the arguments to send in the `body` of your `fetch` call.

Here's an example of doing a test cross-canister call to the `bitcoin_get_balance` method:

```typescript
import { serialize } from 'azle';

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

[ckBTC](https://internetcomputer.org/docs/current/developer-docs/multi-chain/bitcoin/ckbtc/overview) is an [ICRC](https://internetcomputer.org/docs/current/references/icrc1-standard) canister that wraps underlying bitcoin controlled with threshold ECDSA.

ICRCs are a set of standards for ICP canisters that define the method signatures and corresponding types for those canisters.

You interact with the `ckBTC` canister by calling its methods. You can do this from the frontend with [@dfinity/agent](https://www.npmjs.com/package/@dfinity/agent), or from an Azle canister through [cross-canister calls](./fetch.md).

Here's an example of doing a test cross-canister call to the `ckBTC` `icrc1_balance_of` method:

```typescript
import { ic, serialize } from 'azle';

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
