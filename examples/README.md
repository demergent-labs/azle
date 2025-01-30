# Azle Examples and Tests

## TLDR

Use the `examples` directory to learn how to use Azle.

Stable mode examples are in the `stable` directory.

Experimental mode examples are in the `experimental` directory.

## Examples

The `examples` directory is used for both automated testing and end-developer education. Please freely peruse the examples to learn how to use Azle; It's probably the best documentation that you'll find.

We use various directory names to indicate higher-level purposes:

- `demo`: Intended as more complete and easy-to-understand examples
- `test`: Intended as possibly more confusing and less finished examples that are used for automated testing
    - `end_to_end`: Simple example-based tests that call into a canister using the JavaScript agent or `dfx`
    - `property`: Property-based tests that attempt to test canisters under arbitrary inputs
    - `candid_rpc`: Tests for the Candid RPC (remote procedure call) ICP APIs (`@query`, `@update`, Candid, `IDL`, etc)
    - `http_server`: Tests for the HTTP Server functionality, doing away with Candid RPC and focusing on core web 2 APIs
