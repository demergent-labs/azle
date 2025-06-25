# Candid RPC or HTTP Server

Azle applications (<a href="https://internetcomputer.org/docs/building-apps/essentials/canisters" target="_blank">canisters</a>) can be developed using two main methodologies: [Candid RPC](./candid_rpc.md) and [HTTP Server](./http_server.md).

Candid RPC embraces ICP's <a href="https://internetcomputer.org/docs/building-apps/interact-with-canisters/candid/candid-concepts" target="_blank">Candid language</a>, exposing canister methods directly to Candid-speaking clients, and using Candid for serialization and deserialization purposes.

HTTP Server embraces traditional web server techniques, allowing you to write HTTP servers using popular libraries such as <a href="https://expressjs.com/" target="_blank">Express</a>, and using <a href="https://www.json.org/json-en.html" target="_blank">JSON</a> for simple serialization and deserialization purposes.

Candid RPC is now in the release candidate phase, and is heading towards 1.0 imminently.

HTTP Server will remain experimental for an unknown length of time.
