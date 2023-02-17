# Cross Canister

We need to explain the difference between queries and composite queries, or at least explain how to do async queries.

We need to explain cross canister updates and queries, replicated mode, etc

Explain how queries are able to run in replicated mode. Basically if an HTTPS API call is submitted for a query, it will run in replicated mode. State changes are still discarded. Also if an update call does a cross-canister request to a query method, it will run in replicated mode. This information comes from here: https://forum.dfinity.org/t/inter-canister-query-calls-community-consideration/6754/93

Also explain how cross-subnet calls can take 2x of cross-canister or normal update calls: https://forum.dfinity.org/t/can-i-run-multiple-inter-canister-update-calls-in-parallel/13115/6

Try to show multiple concurrent cross-canister calls using Promise.all

Cross subnet call latency: https://forum.dfinity.org/t/can-i-run-multiple-inter-canister-update-calls-in-parallel/13115/6
