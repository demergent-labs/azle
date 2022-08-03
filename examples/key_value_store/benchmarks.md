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

-   Azle: 799_345
-   Motoko: 101_474
-   Rust: 73_118

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
| Light    | Even                   | Azle   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.13               | $0.01      | $0.00                  | $2.64      | $4.20       |
| Light    | Even                   | Motoko | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.02               | $0.01      | $0.00                  | $2.64      | $4.08       |
| Light    | Even                   | Rust   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.01               | $0.01      | $0.00                  | $2.64      | $4.08       |
| Light    | Query Heavy            | Azle   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Motoko | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Rust   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Update Heavy           | Azle   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.13               | $0.01      | $0.00                  | $2.64      | $3.62       |
| Light    | Update Heavy           | Motoko | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.02               | $0.01      | $0.00                  | $2.64      | $3.51       |
| Light    | Update Heavy           | Rust   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.01               | $0.01      | $0.00                  | $2.64      | $3.50       |
| Moderate | Even                   | Azle   | $99.91           | $83.26                       | $83.26                        | $24.56          | $13.31              | $1.08      | $0.83                  | $5.29      | $311.49     |
| Moderate | Even                   | Motoko | $99.91           | $83.26                       | $83.26                        | $24.56          | $1.69               | $1.08      | $0.83                  | $5.29      | $299.87     |
| Moderate | Even                   | Rust   | $99.91           | $83.26                       | $83.26                        | $24.56          | $1.22               | $1.08      | $0.83                  | $5.29      | $299.40     |
| Moderate | Query Heavy            | Azle   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.13               | $1.08      | $0.83                  | $5.29      | $142.12     |
| Moderate | Query Heavy            | Motoko | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.02               | $1.08      | $0.83                  | $5.29      | $142.00     |
| Moderate | Query Heavy            | Rust   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.01               | $1.08      | $0.83                  | $5.29      | $142.00     |
| Moderate | Update Heavy           | Azle   | $50.45           | $0.83                        | $83.26                        | $24.56          | $13.31              | $1.08      | $0.83                  | $5.29      | $179.61     |
| Moderate | Update Heavy           | Motoko | $50.45           | $0.83                        | $83.26                        | $24.56          | $1.69               | $1.08      | $0.83                  | $5.29      | $167.99     |
| Moderate | Update Heavy           | Rust   | $50.45           | $0.83                        | $83.26                        | $24.56          | $1.22               | $1.08      | $0.83                  | $5.29      | $167.52     |
| Heavy    | Even                   | Azle   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $1,330.99           | $108.23    | $832.55                | $10.57     | $181,239.05 |
| Heavy    | Even                   | Motoko | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $168.96             | $108.23    | $832.55                | $10.57     | $180,077.03 |
| Heavy    | Even                   | Rust   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $121.75             | $108.23    | $832.55                | $10.57     | $180,029.81 |
| Heavy    | Query Heavy            | Azle   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $13.31              | $108.23    | $832.55                | $10.57     | $90,122.07  |
| Heavy    | Query Heavy            | Motoko | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $1.69               | $108.23    | $832.55                | $10.57     | $90,110.45  |
| Heavy    | Query Heavy            | Rust   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $1.22               | $108.23    | $832.55                | $10.57     | $90,109.98  |
| Heavy    | Update Heavy           | Azle   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $1,330.99           | $108.23    | $832.55                | $10.57     | $93,871.21  |
| Heavy    | Update Heavy           | Motoko | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $168.96             | $108.23    | $832.55                | $10.57     | $92,709.19  |
| Heavy    | Update Heavy           | Rust   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $121.75             | $108.23    | $832.55                | $10.57     | $92,661.97  |

## Averages

| Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| (154_616 / 799_345)    | (91_262 / 101_474)       | (18_938 / 73_118)      | (11x / 35x)                   | (22x / 12x)                 | (-11x / -35x)                 | (4x / -1x)                    | (-22x / -12x)               | (-4x / 1x)                    |

## Benchmarks

| Description                      | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| -------------------------------- | ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| set                              | (141_234 / 738_171)    | (2_442 / 5_257)          | (2_474 / 50_137)       | (58x / 140x)                  | (59x / 15x)                 | (-58x / -140x)                | (1x / -10x)                   | (-59x / -15x)               | (-1x / 10x)                   |
| set: medium key                  | (146_296 / 964_443)    | (34_226 / 38_523)        | (8_614 / 57_212)       | (4x / 25x)                    | (18x / 17x)                 | (-4x / -25x)                  | (4x / -1x)                    | (-18x / -17x)               | (-4x / 1x)                    |
| set: medium value                | (141_641 / 743_494)    | (17_774 / 22_103)        | (3_534 / 51_854)       | (8x / 34x)                    | (40x / 14x)                 | (-8x / -34x)                  | (5x / -2x)                    | (-40x / -14x)               | (-5x / 2x)                    |
| set: medium value and medium key | (147_243 / 755_393)    | (52_802 / 58_745)        | (9_750 / 58_833)       | (3x / 13x)                    | (15x / 13x)                 | (-3x / -13x)                  | (5x / 1x)                     | (-15x / -13x)               | (-5x / -1x)                   |
| set: big key                     | (181_496 / 803_569)    | (256_387 / 270_542)      | (47_479 / 105_661)     | (-1x / 3x)                    | (4x / 8x)                   | (1x / -3x)                    | (6x / 3x)                     | (-4x / -8x)                 | (-6x / -3x)                   |
| set: big value                   | (142_266 / 764_733)    | (17_610 / 31_988)        | (8_046 / 65_514)       | (8x / 24x)                    | (18x / 12x)                 | (-8x / -24x)                  | (2x / -2x)                    | (-18x / -12x)               | (-2x / 2x)                    |
| set: big value and big key       | (182_140 / 825_612)    | (257_596 / 283_161)      | (52_668 / 122_613)     | (-1x / 3x)                    | (4x / 7x)                   | (1x / -3x)                    | (5x / 2x)                     | (-4x / -7x)                 | (-5x / -2x)                   |
