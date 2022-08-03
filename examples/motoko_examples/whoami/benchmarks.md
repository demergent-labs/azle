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

-   Azle: 35_179_129
-   Motoko: 2_900
-   Rust: 30_414

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
| Light    | Even                   | Azle   | $1.00            | $0.08                        | $0.08                         | $0.25           | $5.86               | $0.01      | $0.00                  | $2.64      | $9.92       |
| Light    | Even                   | Motoko | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $4.07       |
| Light    | Even                   | Rust   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.01               | $0.01      | $0.00                  | $2.64      | $4.07       |
| Light    | Query Heavy            | Azle   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.06               | $0.01      | $0.00                  | $2.64      | $3.30       |
| Light    | Query Heavy            | Motoko | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Rust   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Update Heavy           | Azle   | $0.50            | $0.00                        | $0.08                         | $0.25           | $5.86               | $0.01      | $0.00                  | $2.64      | $9.35       |
| Light    | Update Heavy           | Motoko | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.49       |
| Light    | Update Heavy           | Rust   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.01               | $0.01      | $0.00                  | $2.64      | $3.49       |
| Moderate | Even                   | Azle   | $99.91           | $83.26                       | $83.26                        | $24.56          | $585.77             | $1.08      | $0.83                  | $5.29      | $883.95     |
| Moderate | Even                   | Motoko | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.05               | $1.08      | $0.83                  | $5.29      | $298.23     |
| Moderate | Even                   | Rust   | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.51               | $1.08      | $0.83                  | $5.29      | $298.68     |
| Moderate | Query Heavy            | Azle   | $50.45           | $83.26                       | $0.83                         | $0.25           | $5.86               | $1.08      | $0.83                  | $5.29      | $147.84     |
| Moderate | Query Heavy            | Motoko | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.00               | $1.08      | $0.83                  | $5.29      | $141.99     |
| Moderate | Query Heavy            | Rust   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.01               | $1.08      | $0.83                  | $5.29      | $141.99     |
| Moderate | Update Heavy           | Azle   | $50.45           | $0.83                        | $83.26                        | $24.56          | $585.77             | $1.08      | $0.83                  | $5.29      | $752.07     |
| Moderate | Update Heavy           | Motoko | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.05               | $1.08      | $0.83                  | $5.29      | $166.35     |
| Moderate | Update Heavy           | Rust   | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.51               | $1.08      | $0.83                  | $5.29      | $166.81     |
| Heavy    | Even                   | Azle   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $58,576.80          | $108.23    | $832.55                | $10.57     | $238,484.86 |
| Heavy    | Even                   | Motoko | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $4.83               | $108.23    | $832.55                | $10.57     | $179,912.89 |
| Heavy    | Even                   | Rust   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $50.64              | $108.23    | $832.55                | $10.57     | $179,958.71 |
| Heavy    | Query Heavy            | Azle   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $585.77             | $108.23    | $832.55                | $10.57     | $90,694.53  |
| Heavy    | Query Heavy            | Motoko | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.05               | $108.23    | $832.55                | $10.57     | $90,108.81  |
| Heavy    | Query Heavy            | Rust   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.51               | $108.23    | $832.55                | $10.57     | $90,109.27  |
| Heavy    | Update Heavy           | Azle   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $58,576.80          | $108.23    | $832.55                | $10.57     | $151,117.02 |
| Heavy    | Update Heavy           | Motoko | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $4.83               | $108.23    | $832.55                | $10.57     | $92,545.05  |
| Heavy    | Update Heavy           | Rust   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $50.64              | $108.23    | $832.55                | $10.57     | $92,590.87  |

## Averages

| Azle Wasm Instructions    | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ------------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| (35_071_499 / 35_179_129) | (324 / 2_900)            | (847 / 30_414)         | (103_738x / 12_629x)          | (70_905x / 1_108x)          | (-103_738x / -12_629x)        | (-2x / -12x)                  | (-70_905x / -1_108x)        | (2x / 12x)                    |

## Benchmarks

| Description | Azle Wasm Instructions    | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ----------- | ------------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| id          | (50_713_407 / 50_388_864) | (430 / 4_334)            | (400 / 39_879)         | (117_938x / 11_626x)          | (126_784x / 1_264x)         | (-117_938x / -11_626x)        | (1x / -9x)                    | (-126_784x / -1_264x)       | (-1x / 9x)                    |
| whoami      | (19_429_592 / 19_969_394) | (217 / 1_465)            | (1_293 / 20_949)       | (89_537x / 13_631x)           | (15_027x / 953x)            | (-89_537x / -13_631x)         | (-6x / -14x)                  | (-15_027x / -953x)          | (6x / 14x)                    |
