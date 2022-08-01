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

-   Azle: 901_725_467
-   Motoko: 1_401_409
-   Rust: 822_011_018

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

| Usage    | Query/Update Heaviness | CDK    | Ingress Messages | Ingress Bytes Query Messages | Ingress Bytes Update Messages | Update Messages | Update Instructions | Xnet Calls | Xnet Byte Transmission | GB Storage | Total Cost    |
| -------- | ---------------------- | ------ | ---------------- | ---------------------------- | ----------------------------- | --------------- | ------------------- | ---------- | ---------------------- | ---------- | ------------- |
| Light    | Even                   | Azle   | $1.00            | $0.08                        | $0.08                         | $0.25           | $150.15             | $0.01      | $0.00                  | $2.64      | $154.21       |
| Light    | Even                   | Motoko | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.23               | $0.01      | $0.00                  | $2.64      | $4.30         |
| Light    | Even                   | Rust   | $1.00            | $0.08                        | $0.08                         | $0.25           | $136.87             | $0.01      | $0.00                  | $2.64      | $140.94       |
| Light    | Query Heavy            | Azle   | $0.50            | $0.08                        | $0.00                         | $0.00           | $1.50               | $0.01      | $0.00                  | $2.64      | $4.75         |
| Light    | Query Heavy            | Motoko | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25         |
| Light    | Query Heavy            | Rust   | $0.50            | $0.08                        | $0.00                         | $0.00           | $1.37               | $0.01      | $0.00                  | $2.64      | $4.61         |
| Light    | Update Heavy           | Azle   | $0.50            | $0.00                        | $0.08                         | $0.25           | $150.15             | $0.01      | $0.00                  | $2.64      | $153.64       |
| Light    | Update Heavy           | Motoko | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.23               | $0.01      | $0.00                  | $2.64      | $3.72         |
| Light    | Update Heavy           | Rust   | $0.50            | $0.00                        | $0.08                         | $0.25           | $136.87             | $0.01      | $0.00                  | $2.64      | $140.36       |
| Moderate | Even                   | Azle   | $99.91           | $83.26                       | $83.26                        | $24.56          | $15,014.64          | $1.08      | $0.83                  | $5.29      | $15,312.82    |
| Moderate | Even                   | Motoko | $99.91           | $83.26                       | $83.26                        | $24.56          | $23.33              | $1.08      | $0.83                  | $5.29      | $321.51       |
| Moderate | Even                   | Rust   | $99.91           | $83.26                       | $83.26                        | $24.56          | $13,687.31          | $1.08      | $0.83                  | $5.29      | $13,985.49    |
| Moderate | Query Heavy            | Azle   | $50.45           | $83.26                       | $0.83                         | $0.25           | $150.15             | $1.08      | $0.83                  | $5.29      | $292.13       |
| Moderate | Query Heavy            | Motoko | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.23               | $1.08      | $0.83                  | $5.29      | $142.22       |
| Moderate | Query Heavy            | Rust   | $50.45           | $83.26                       | $0.83                         | $0.25           | $136.87             | $1.08      | $0.83                  | $5.29      | $278.86       |
| Moderate | Update Heavy           | Azle   | $50.45           | $0.83                        | $83.26                        | $24.56          | $15,014.64          | $1.08      | $0.83                  | $5.29      | $15,180.94    |
| Moderate | Update Heavy           | Motoko | $50.45           | $0.83                        | $83.26                        | $24.56          | $23.33              | $1.08      | $0.83                  | $5.29      | $189.64       |
| Moderate | Update Heavy           | Rust   | $50.45           | $0.83                        | $83.26                        | $24.56          | $13,687.31          | $1.08      | $0.83                  | $5.29      | $13,853.61    |
| Heavy    | Even                   | Azle   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $1,501,463.80       | $108.23    | $832.55                | $10.57     | $1,681,371.86 |
| Heavy    | Even                   | Motoko | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $2,333.49           | $108.23    | $832.55                | $10.57     | $182,241.55   |
| Heavy    | Even                   | Rust   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $1,368,731.20       | $108.23    | $832.55                | $10.57     | $1,548,639.27 |
| Heavy    | Query Heavy            | Azle   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $15,014.64          | $108.23    | $832.55                | $10.57     | $105,123.40   |
| Heavy    | Query Heavy            | Motoko | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $23.33              | $108.23    | $832.55                | $10.57     | $90,132.10    |
| Heavy    | Query Heavy            | Rust   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $13,687.31          | $108.23    | $832.55                | $10.57     | $103,796.07   |
| Heavy    | Update Heavy           | Azle   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $1,501,463.80       | $108.23    | $832.55                | $10.57     | $1,594,004.02 |
| Heavy    | Update Heavy           | Motoko | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $2,333.49           | $108.23    | $832.55                | $10.57     | $94,873.71    |
| Heavy    | Update Heavy           | Rust   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $1,368,731.20       | $108.23    | $832.55                | $10.57     | $1,461,271.43 |

## Averages

| Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| (64_536 / 901_725_467) | (200 / 1_401_409)        | (200 / 822_011_018)    | (323x / 3_111x)               | (323x / 76x)                | (-323x / -3_111x)             | (1x / -377x)                  | (-323x / -76x)              | (1x / 377x)                   |

## Benchmarks

| Description         | Azle Wasm Instructions   | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ------------------- | ------------------------ | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| get_bytes: 0 kb     | (64_542 / 28_758_792)    | (200 / 2_361)            | (200 / 67_131)         | (323x / 12_181x)              | (323x / 432x)               | (-323x / -12_181x)            | (1x / -28x)                   | (-323x / -432x)             | (1x / 28x)                    |
| get_bytes: 1 kb     | (64_542 / 30_429_367)    | (200 / 8_181)            | (200 / 1_652_923)      | (323x / 3_720x)               | (323x / 18x)                | (-323x / -3_720x)             | (1x / -202x)                  | (-323x / -18x)              | (1x / 202x)                   |
| get_bytes: 10 kb    | (64_507 / 45_578_417)    | (200 / 59_343)           | (200 / 15_919_187)     | (323x / 768x)                 | (323x / 3x)                 | (-323x / -768x)               | (1x / -268x)                  | (-323x / -3x)               | (1x / 268x)                   |
| get_bytes: 100 kb   | (64_542 / 197_421_147)   | (200 / 271_189)          | (200 / 158_595_080)    | (323x / 728x)                 | (323x / 1x)                 | (-323x / -728x)               | (1x / -585x)                  | (-323x / -1x)               | (1x / 585x)                   |
| get_bytes: 1_000 kb | (64_542 / 1_712_458_746) | (200 / 2_689_939)        | (200 / 1_585_366_595)  | (323x / 637x)                 | (323x / 1x)                 | (-323x / -637x)               | (1x / -589x)                  | (-323x / -1x)               | (1x / 589x)                   |
| get_bytes: 2_000 kb | (64_542 / 3_395_706_335) | (200 / 5_377_439)        | (200 / 3_170_465_193)  | (323x / 631x)                 | (323x / 1x)                 | (-323x / -631x)               | (1x / -590x)                  | (-323x / -1x)               | (1x / 590x)                   |
