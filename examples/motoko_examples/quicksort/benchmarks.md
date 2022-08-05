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

-   Azle: 131_496_042
-   Motoko: 48_766
-   Rust: 826_776

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
| Light    | Even                   | Azle   | $1.00            | $0.08                        | $0.08                         | $0.25           | $21.90              | $0.01      | $0.00                  | $2.64      | $25.96      |
| Light    | Even                   | Motoko | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.01               | $0.01      | $0.00                  | $2.64      | $4.07       |
| Light    | Even                   | Rust   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.14               | $0.01      | $0.00                  | $2.64      | $4.20       |
| Light    | Query Heavy            | Azle   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.22               | $0.01      | $0.00                  | $2.64      | $3.47       |
| Light    | Query Heavy            | Motoko | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Rust   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Update Heavy           | Azle   | $0.50            | $0.00                        | $0.08                         | $0.25           | $21.90              | $0.01      | $0.00                  | $2.64      | $25.38      |
| Light    | Update Heavy           | Motoko | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.01               | $0.01      | $0.00                  | $2.64      | $3.50       |
| Light    | Update Heavy           | Rust   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.14               | $0.01      | $0.00                  | $2.64      | $3.63       |
| Moderate | Even                   | Azle   | $99.91           | $83.26                       | $83.26                        | $24.56          | $2,189.54           | $1.08      | $0.83                  | $5.29      | $2,487.72   |
| Moderate | Even                   | Motoko | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.81               | $1.08      | $0.83                  | $5.29      | $298.99     |
| Moderate | Even                   | Rust   | $99.91           | $83.26                       | $83.26                        | $24.56          | $13.77              | $1.08      | $0.83                  | $5.29      | $311.94     |
| Moderate | Query Heavy            | Azle   | $50.45           | $83.26                       | $0.83                         | $0.25           | $21.90              | $1.08      | $0.83                  | $5.29      | $163.88     |
| Moderate | Query Heavy            | Motoko | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.01               | $1.08      | $0.83                  | $5.29      | $142.00     |
| Moderate | Query Heavy            | Rust   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.14               | $1.08      | $0.83                  | $5.29      | $142.12     |
| Moderate | Update Heavy           | Azle   | $50.45           | $0.83                        | $83.26                        | $24.56          | $2,189.54           | $1.08      | $0.83                  | $5.29      | $2,355.84   |
| Moderate | Update Heavy           | Motoko | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.81               | $1.08      | $0.83                  | $5.29      | $167.11     |
| Moderate | Update Heavy           | Rust   | $50.45           | $0.83                        | $83.26                        | $24.56          | $13.77              | $1.08      | $0.83                  | $5.29      | $180.07     |
| Heavy    | Even                   | Azle   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $218,954.17         | $108.23    | $832.55                | $10.57     | $398,862.23 |
| Heavy    | Even                   | Motoko | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $81.20              | $108.23    | $832.55                | $10.57     | $179,989.26 |
| Heavy    | Even                   | Rust   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $1,376.67           | $108.23    | $832.55                | $10.57     | $181,284.73 |
| Heavy    | Query Heavy            | Azle   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $2,189.54           | $108.23    | $832.55                | $10.57     | $92,298.30  |
| Heavy    | Query Heavy            | Motoko | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.81               | $108.23    | $832.55                | $10.57     | $90,109.57  |
| Heavy    | Query Heavy            | Rust   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $13.77              | $108.23    | $832.55                | $10.57     | $90,122.53  |
| Heavy    | Update Heavy           | Azle   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $218,954.17         | $108.23    | $832.55                | $10.57     | $311,494.39 |
| Heavy    | Update Heavy           | Motoko | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $81.20              | $108.23    | $832.55                | $10.57     | $92,621.43  |
| Heavy    | Update Heavy           | Rust   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $1,376.67           | $108.23    | $832.55                | $10.57     | $93,916.89  |

## Averages

| Azle Wasm Instructions      | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| --------------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| (129_768_043 / 131_496_042) | (43_332 / 48_766)        | (537_133 / 826_776)    | (2_058x / 1_431x)             | (727x / 74x)                | (-2_058x / -1_431x)           | (-7x / -23x)                  | (-727x / -74x)              | (7x / 23x)                    |

## Benchmarks

| Description            | Azle Wasm Instructions      | Motoko Wasm Instructions | Rust Wasm Instructions  | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | --------------------------- | ------------------------ | ----------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| sort: empty list       | (347_675 / 1_177_237)       | (288 / 2_456)            | (200 / 69_235)          | (1_207x / 479x)               | (1_738x / 17x)              | (-1_207x / -479x)             | (1x / -28x)                   | (-1_738x / -17x)            | (-1x / 28x)                   |
| sort: one item         | (348_715 / 986_510)         | (288 / 2_599)            | (200 / 77_038)          | (1_211x / 380x)               | (1_744x / 13x)              | (-1_211x / -380x)             | (1x / -30x)                   | (-1_744x / -13x)            | (-1x / 30x)                   |
| sort: two item         | (2_993_185 / 3_662_408)     | (1_828 / 4_282)          | (15_456 / 101_429)      | (1_637x / 855x)               | (194x / 36x)                | (-1_637x / -855x)             | (-8x / -24x)                  | (-194x / -36x)              | (8x / 24x)                    |
| sort: ten items        | (38_687_228 / 39_587_826)   | (14_375 / 17_973)        | (175_182 / 331_823)     | (2_691x / 2_203x)             | (221x / 119x)               | (-2_691x / -2_203x)           | (-12x / -18x)                 | (-221x / -119x)             | (12x / 18x)                   |
| sort: negative numbers | (17_501_763 / 18_313_743)   | (6_834 / 10_003)         | (78_053 / 211_846)      | (2_561x / 1_831x)             | (224x / 86x)                | (-2_561x / -1_831x)           | (-11x / -21x)                 | (-224x / -86x)              | (11x / 21x)                   |
| sort: 100 items        | (718_729_691 / 725_248_529) | (236_377 / 255_285)      | (2_953_707 / 4_169_286) | (3_041x / 2_841x)             | (243x / 174x)               | (-3_041x / -2_841x)           | (-12x / -16x)                 | (-243x / -174x)             | (12x / 16x)                   |
