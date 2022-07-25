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

-   Azle: 924_865
-   Motoko: 22_564
-   Rust: 147_897

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
| Light    | Even                   | Azle   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.15               | $0.01      | $0.00                  | $2.64      | $4.22       |
| Light    | Even                   | Motoko | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $4.07       |
| Light    | Even                   | Rust   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.02               | $0.01      | $0.00                  | $2.64      | $4.09       |
| Light    | Query Heavy            | Azle   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Motoko | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Rust   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Update Heavy           | Azle   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.15               | $0.01      | $0.00                  | $2.64      | $3.64       |
| Light    | Update Heavy           | Motoko | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.49       |
| Light    | Update Heavy           | Rust   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.02               | $0.01      | $0.00                  | $2.64      | $3.51       |
| Moderate | Even                   | Azle   | $99.91           | $83.26                       | $83.26                        | $24.56          | $15.40              | $1.08      | $0.83                  | $5.29      | $313.58     |
| Moderate | Even                   | Motoko | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.38               | $1.08      | $0.83                  | $5.29      | $298.55     |
| Moderate | Even                   | Rust   | $99.91           | $83.26                       | $83.26                        | $24.56          | $2.46               | $1.08      | $0.83                  | $5.29      | $300.64     |
| Moderate | Query Heavy            | Azle   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.15               | $1.08      | $0.83                  | $5.29      | $142.14     |
| Moderate | Query Heavy            | Motoko | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.00               | $1.08      | $0.83                  | $5.29      | $141.99     |
| Moderate | Query Heavy            | Rust   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.02               | $1.08      | $0.83                  | $5.29      | $142.01     |
| Moderate | Update Heavy           | Azle   | $50.45           | $0.83                        | $83.26                        | $24.56          | $15.40              | $1.08      | $0.83                  | $5.29      | $181.70     |
| Moderate | Update Heavy           | Motoko | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.38               | $1.08      | $0.83                  | $5.29      | $166.68     |
| Moderate | Update Heavy           | Rust   | $50.45           | $0.83                        | $83.26                        | $24.56          | $2.46               | $1.08      | $0.83                  | $5.29      | $168.76     |
| Heavy    | Even                   | Azle   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $1,539.99           | $108.23    | $832.55                | $10.57     | $181,448.06 |
| Heavy    | Even                   | Motoko | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $37.57              | $108.23    | $832.55                | $10.57     | $179,945.63 |
| Heavy    | Even                   | Rust   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $246.26             | $108.23    | $832.55                | $10.57     | $180,154.33 |
| Heavy    | Query Heavy            | Azle   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $15.40              | $108.23    | $832.55                | $10.57     | $90,124.16  |
| Heavy    | Query Heavy            | Motoko | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.38               | $108.23    | $832.55                | $10.57     | $90,109.14  |
| Heavy    | Query Heavy            | Rust   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $2.46               | $108.23    | $832.55                | $10.57     | $90,111.22  |
| Heavy    | Update Heavy           | Azle   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $1,539.99           | $108.23    | $832.55                | $10.57     | $94,080.22  |
| Heavy    | Update Heavy           | Motoko | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $37.57              | $108.23    | $832.55                | $10.57     | $92,577.80  |
| Heavy    | Update Heavy           | Rust   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $246.26             | $108.23    | $832.55                | $10.57     | $92,786.49  |

## Averages

| Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| (141_659 / 924_865)    | (14_169 / 22_564)        | (5_249 / 147_897)      | (17x / 47x)                   | (34x / 6x)                  | (-17x / -47x)                 | (3x / -8x)                    | (-34x / -6x)                | (-3x / 8x)                    |

## Benchmarks

| Description                | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| -------------------------- | ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| insert                     | (141_351 / 843_970)    | (18_753 / 24_130)        | (2_819 / 142_619)      | (8x / 36x)                    | (51x / 6x)                  | (-8x / -36x)                  | (7x / -6x)                    | (-51x / -6x)                | (-7x / 6x)                    |
| insert: medium description | (141_521 / 1_064_293)  | (5_655 / 13_111)         | (4_106 / 144_584)      | (34x / 78x)                   | (35x / 7x)                  | (-34x / -78x)                 | (-0x / -12x)                  | (-35x / -7x)                | (0x / 12x)                    |
| insert: long description   | (142_105 / 866_332)    | (18_098 / 30_450)        | (8_823 / 156_489)      | (8x / 28x)                    | (16x / 6x)                  | (-8x / -28x)                  | (2x / -5x)                    | (-16x / -6x)                | (-2x / 5x)                    |
