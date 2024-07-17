# Candid RPC or HTTP Server

Azle applications ([canisters](https://internetcomputer.org/docs/current/concepts/canisters-code)) can be developed using two main methodologies: [Candid RPC](./candid_rpc.md) and [HTTP Server](./http_server.md).

Candid RPC embraces ICP's [Candid language](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/candid/), exposing canister methods directly to Candid-speaking clients, and using Candid for serialization and deserialization purposes.

HTTP Server embraces traditional web server techniques, allowing you to write HTTP servers using popular libraries such as [Express](https://expressjs.com/), and using [JSON](https://www.json.org/json-en.html) for simple serialization and deserialization purposes.

Candid RPC is heading towards 1.0 and production-readiness in 2024.

HTTP Server will remain experimental for an unknown length of time.
