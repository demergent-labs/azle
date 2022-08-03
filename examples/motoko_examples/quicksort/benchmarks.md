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

-   Azle: 131_476_500
-   Motoko: 48_766
-   Rust: 823_557

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
| Light    | Even                   | Azle   | $1.00            | $0.08                        | $0.08                         | $0.25           | $21.89              | $0.01      | $0.00                  | $2.64      | $25.96      |
| Light    | Even                   | Motoko | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.01               | $0.01      | $0.00                  | $2.64      | $4.07       |
| Light    | Even                   | Rust   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.14               | $0.01      | $0.00                  | $2.64      | $4.20       |
| Light    | Query Heavy            | Azle   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.22               | $0.01      | $0.00                  | $2.64      | $3.46       |
| Light    | Query Heavy            | Motoko | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Rust   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Update Heavy           | Azle   | $0.50            | $0.00                        | $0.08                         | $0.25           | $21.89              | $0.01      | $0.00                  | $2.64      | $25.38      |
| Light    | Update Heavy           | Motoko | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.01               | $0.01      | $0.00                  | $2.64      | $3.50       |
| Light    | Update Heavy           | Rust   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.14               | $0.01      | $0.00                  | $2.64      | $3.63       |
| Moderate | Even                   | Azle   | $99.91           | $83.26                       | $83.26                        | $24.56          | $2,189.22           | $1.08      | $0.83                  | $5.29      | $2,487.39   |
| Moderate | Even                   | Motoko | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.81               | $1.08      | $0.83                  | $5.29      | $298.99     |
| Moderate | Even                   | Rust   | $99.91           | $83.26                       | $83.26                        | $24.56          | $13.71              | $1.08      | $0.83                  | $5.29      | $311.89     |
| Moderate | Query Heavy            | Azle   | $50.45           | $83.26                       | $0.83                         | $0.25           | $21.89              | $1.08      | $0.83                  | $5.29      | $163.88     |
| Moderate | Query Heavy            | Motoko | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.01               | $1.08      | $0.83                  | $5.29      | $142.00     |
| Moderate | Query Heavy            | Rust   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.14               | $1.08      | $0.83                  | $5.29      | $142.12     |
| Moderate | Update Heavy           | Azle   | $50.45           | $0.83                        | $83.26                        | $24.56          | $2,189.22           | $1.08      | $0.83                  | $5.29      | $2,355.52   |
| Moderate | Update Heavy           | Motoko | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.81               | $1.08      | $0.83                  | $5.29      | $167.11     |
| Moderate | Update Heavy           | Rust   | $50.45           | $0.83                        | $83.26                        | $24.56          | $13.71              | $1.08      | $0.83                  | $5.29      | $180.01     |
| Heavy    | Even                   | Azle   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $218,921.63         | $108.23    | $832.55                | $10.57     | $398,829.69 |
| Heavy    | Even                   | Motoko | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $81.20              | $108.23    | $832.55                | $10.57     | $179,989.26 |
| Heavy    | Even                   | Rust   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $1,371.31           | $108.23    | $832.55                | $10.57     | $181,279.37 |
| Heavy    | Query Heavy            | Azle   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $2,189.22           | $108.23    | $832.55                | $10.57     | $92,297.98  |
| Heavy    | Query Heavy            | Motoko | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.81               | $108.23    | $832.55                | $10.57     | $90,109.57  |
| Heavy    | Query Heavy            | Rust   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $13.71              | $108.23    | $832.55                | $10.57     | $90,122.47  |
| Heavy    | Update Heavy           | Azle   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $218,921.63         | $108.23    | $832.55                | $10.57     | $311,461.85 |
| Heavy    | Update Heavy           | Motoko | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $81.20              | $108.23    | $832.55                | $10.57     | $92,621.43  |
| Heavy    | Update Heavy           | Rust   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $1,371.31           | $108.23    | $832.55                | $10.57     | $93,911.53  |

## Averages

| Azle Wasm Instructions      | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| --------------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| (129_749_382 / 131_476_500) | (43_332 / 48_766)        | (535_104 / 823_557)    | (2_057x / 1_431x)             | (726x / 75x)                | (-2_057x / -1_431x)           | (-7x / -23x)                  | (-726x / -75x)              | (7x / 23x)                    |

## Benchmarks

| Description            | Azle Wasm Instructions      | Motoko Wasm Instructions | Rust Wasm Instructions  | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | --------------------------- | ------------------------ | ----------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| sort: empty list       | (347_288 / 1_175_379)       | (288 / 2_456)            | (200 / 68_267)          | (1_206x / 479x)               | (1_736x / 17x)              | (-1_206x / -479x)             | (1x / -28x)                   | (-1_736x / -17x)            | (-1x / 28x)                   |
| sort: one item         | (348_328 / 984_046)         | (288 / 2_599)            | (200 / 76_073)          | (1_209x / 379x)               | (1_742x / 13x)              | (-1_209x / -379x)             | (1x / -29x)                   | (-1_742x / -13x)            | (-1x / 29x)                   |
| sort: two item         | (2_991_044 / 3_658_380)     | (1_828 / 4_282)          | (15_685 / 100_695)      | (1_636x / 854x)               | (191x / 36x)                | (-1_636x / -854x)             | (-9x / -24x)                  | (-191x / -36x)              | (9x / 24x)                    |
| sort: ten items        | (38_683_731 / 39_584_048)   | (14_375 / 17_973)        | (175_433 / 331_210)     | (2_691x / 2_202x)             | (221x / 120x)               | (-2_691x / -2_202x)           | (-12x / -18x)                 | (-221x / -120x)             | (12x / 18x)                   |
| sort: negative numbers | (17_496_609 / 18_307_671)   | (6_834 / 10_003)         | (78_430 / 211_290)      | (2_560x / 1_830x)             | (223x / 87x)                | (-2_560x / -1_830x)           | (-11x / -21x)                 | (-223x / -87x)              | (11x / 21x)                   |
| sort: 100 items        | (718_629_291 / 725_149_476) | (236_377 / 255_285)      | (2_940_677 / 4_153_807) | (3_040x / 2_841x)             | (244x / 175x)               | (-3_040x / -2_841x)           | (-12x / -16x)                 | (-244x / -175x)             | (12x / 16x)                   |
