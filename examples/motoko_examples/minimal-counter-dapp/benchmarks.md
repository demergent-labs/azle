# Azle/Motoko/Rust Benchmarks

-   These benchmarks should be considered preliminary (especially the Motoko benchmarks, something seems off with the function prelude)
-   These benchmarks were implemented using the performance counter API
    -   Performance counter information in [The Internet Computer Interface Spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-imports)
    -   Performance counter information in [the forum](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027)
-   Each benchmark is the average of 10 runs
-   The following may be inaccurate or missing from the benchmarks as described [here](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027):
    -   Candid serialization/deserialization of function parameters and return types
    -   Canister method prologue/epilogue
    -   Some Motoko runtime behavior (such as garbage collection)
-   You can find a raw CSV file with this data [here](./benchmarks.csv)
-   A rough USD cost model for various app scenarios can be found [here](https://docs.google.com/spreadsheets/d/1PQ53R9hYE1fuMB_z-Bl6dyymm7end7rVJ85TvGEh0BQ)

The format for benchmark numbers is (x / y) where:

-   x = Wasm instructions counted only in the function body
-   y = Wasm instructions counted in the function body and the function prelude

## USD Cost Estimates Per Year

These estimates use the average Wasm instructions per update function call including the function prelude from the benchmarks below.

The Wasm instruction counts used are:

-   Azle: 715_055
-   Motoko: 1_349
-   Rust: 18_287

### Application Scenarios

| Usage    | Query/Update Heaviness | Ingress Bytes Per Query Message | Ingress Bytes Per Update Message | GB Storage | Query Messages Per Second | Update Messages Per Second | Xnet Calls Per Second | Xnet Call Bytes |
| -------- | ---------------------- | ------------------------------- | -------------------------------- | ---------- | ------------------------- | -------------------------- | --------------------- | --------------- |
| Light    | Even                   | 100                             | 100                              | 0.5        | 0.01                      | 0.01                       | 0.001                 | 20              |
| Light    | Query Heavy            | 100                             | 100                              | 0.5        | 0.01                      | 0.0001                     | 0.001                 | 20              |
| Light    | Update Heavy           | 100                             | 100                              | 0.5        | 0.0001                    | 0.01                       | 0.001                 | 20              |
| Moderate | Even                   | 1_000                           | 1_000                            | 1          | 1                         | 1                          | 0.1                   | 200             |
| Moderate | Query Heavy            | 1_000                           | 1_000                            | 1          | 1                         | 0.01                       | 0.1                   | 200             |
| Moderate | Update Heavy           | 1_000                           | 1_000                            | 1          | 0.01                      | 1                          | 0.1                   | 200             |
| Heavy    | Even                   | 10_000                          | 10_000                           | 2          | 100                       | 100                        | 10                    | 2_000           |
| Heavy    | Query Heavy            | 10_000                          | 10_000                           | 2          | 100                       | 1                          | 10                    | 2_000           |
| Heavy    | Update Heavy           | 10_000                          | 10_000                           | 2          | 1                         | 100                        | 10                    | 2_000           |

### Application USD Cost Estimates Per Year

| Usage    | Query/Update Heaviness | CDK    | Ingress Messages | Ingress Bytes Query Messages | Ingress Bytes Update Messages | Update Messages | Update Instructions | Xnet Calls | Xnet Byte Transmission | GB Storage | Total Cost  |
| -------- | ---------------------- | ------ | ---------------- | ---------------------------- | ----------------------------- | --------------- | ------------------- | ---------- | ---------------------- | ---------- | ----------- |
| Light    | Even                   | Azle   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.12               | $0.01      | $0.00                  | $2.64      | $4.19       |
| Light    | Even                   | Motoko | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $4.07       |
| Light    | Even                   | Rust   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $4.07       |
| Light    | Query Heavy            | Azle   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Motoko | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Rust   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Update Heavy           | Azle   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.12               | $0.01      | $0.00                  | $2.64      | $3.61       |
| Light    | Update Heavy           | Motoko | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.49       |
| Light    | Update Heavy           | Rust   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.49       |
| Moderate | Even                   | Azle   | $99.91           | $83.26                       | $83.26                        | $24.56          | $11.91              | $1.08      | $0.83                  | $5.29      | $310.08     |
| Moderate | Even                   | Motoko | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.02               | $1.08      | $0.83                  | $5.29      | $298.20     |
| Moderate | Even                   | Rust   | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.30               | $1.08      | $0.83                  | $5.29      | $298.48     |
| Moderate | Query Heavy            | Azle   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.12               | $1.08      | $0.83                  | $5.29      | $142.11     |
| Moderate | Query Heavy            | Motoko | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.00               | $1.08      | $0.83                  | $5.29      | $141.99     |
| Moderate | Query Heavy            | Rust   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.00               | $1.08      | $0.83                  | $5.29      | $141.99     |
| Moderate | Update Heavy           | Azle   | $50.45           | $0.83                        | $83.26                        | $24.56          | $11.91              | $1.08      | $0.83                  | $5.29      | $178.21     |
| Moderate | Update Heavy           | Motoko | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.02               | $1.08      | $0.83                  | $5.29      | $166.32     |
| Moderate | Update Heavy           | Rust   | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.30               | $1.08      | $0.83                  | $5.29      | $166.61     |
| Heavy    | Even                   | Azle   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $1,190.64           | $108.23    | $832.55                | $10.57     | $181,098.70 |
| Heavy    | Even                   | Motoko | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $2.25               | $108.23    | $832.55                | $10.57     | $179,910.31 |
| Heavy    | Even                   | Rust   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $30.45              | $108.23    | $832.55                | $10.57     | $179,938.51 |
| Heavy    | Query Heavy            | Azle   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $11.91              | $108.23    | $832.55                | $10.57     | $90,120.67  |
| Heavy    | Query Heavy            | Motoko | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.02               | $108.23    | $832.55                | $10.57     | $90,108.78  |
| Heavy    | Query Heavy            | Rust   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.30               | $108.23    | $832.55                | $10.57     | $90,109.07  |
| Heavy    | Update Heavy           | Azle   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $1,190.64           | $108.23    | $832.55                | $10.57     | $93,730.86  |
| Heavy    | Update Heavy           | Motoko | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $2.25               | $108.23    | $832.55                | $10.57     | $92,542.47  |
| Heavy    | Update Heavy           | Rust   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $30.45              | $108.23    | $832.55                | $10.57     | $92,570.68  |

## Averages

| Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| (108_195 / 715_055)    | (217 / 1_349)            | (726 / 18_287)         | (497x / 531x)                 | (164x / 39x)                | (-497x / -531x)               | (-3x / -14x)                  | (-164x / -39x)              | (3x / 14x)                    |

## Benchmarks

| Description | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ----------- | ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| count       | (115_168 / 647_575)    | (226 / 1_359)            | (934 / 18_523)         | (510x / 477x)                 | (134x / 35x)                | (-510x / -477x)               | (-4x / -14x)                  | (-134x / -35x)              | (4x / 14x)                    |
| get_count   | (115_695 / 652_536)    | (226 / 1_359)            | (808 / 18_305)         | (512x / 480x)                 | (143x / 36x)                | (-512x / -480x)               | (-4x / -13x)                  | (-143x / -36x)              | (4x / 13x)                    |
| reset       | (93_721 / 845_053)     | (200 / 1_330)            | (437 / 18_034)         | (469x / 635x)                 | (216x / 47x)                | (-469x / -635x)               | (-2x / -14x)                  | (-216x / -47x)              | (2x / 14x)                    |
