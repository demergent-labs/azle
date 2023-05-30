# Bitcoin

The Internet Computer (IC) interacts with the Bitcoin blockchain through the use of `tECDSA`, the `Bitcoin integration`, and a ledger canister called `ckBTC`.

## tECDSA

`tECDSA` on the IC allows canisters to request access to threshold ECDSA keypairs on the `tECDSA` subnet. This functionality is exposed through two management canister methods:

-   [ecdsa_public_key](./management_canister/ecdsa_public_key.html)
-   [sign_with_ecdsa](./management_canister/sign_with_ecdsa.html)

The following are examples using `tECDSA`:

-   [basic_bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/basic_bitcoin)
-   [threshold_ecdsa](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/threshold_ecdsa)

## Bitcoin integration

The `Bitcoin integration` allows canisters on the IC to interact directly with the Bitcoin network. This functionality is exposed through the following management canister methods:

-   [bitcoin_get_balance](./management_canister/bitcoin_get_balance.md)
-   [bitcoin_get_current_fee_percentiles](./management_canister/bitcoin_get_current_fee_percentiles.md)
-   [bitcoin_get_utxos](./management_canister/bitcoin_get_utxos.md)
-   [bitcoin_send_transaction](./management_canister/bitcoin_send_transaction.md)

The following are examples using the `Bitcoin integration`:

-   [basic_bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/basic_bitcoin)
-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)

## ckBTC

`ckBTC` is a ledger canister deployed to the IC. It follows the `ICRC` standard, and can be accessed easily from an Azle canister using `azle/canisters/ICRC` if you only need the `ICRC` methods. For access to the full ledger methods you will need to create your own [Service](../cross_canister.md) for now.

The following are examples using `ckBTC`:

-   [ckBTC](https://github.com/demergent-labs/azle/tree/main/examples/ckbtc)
