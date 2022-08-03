# Azle/Motoko/Rust Benchmarks

-   These benchmarks should be considered preliminary (especially the Motoko benchmarks, something seems off with the function prelude)
-   These benchmarks were implemented using the performance counter API
    -   Performance counter information in [The Internet Computer Interface Spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-imports)
    -   Performance counter information in [the forum](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027)
-   Each benchmark is the average of 1 run
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

-   Azle: 1_047_236
-   Motoko: 7_451
-   Rust: 306_344

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
| Light    | Even                   | Azle   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.17               | $0.01      | $0.00                  | $2.64      | $4.24       |
| Light    | Even                   | Motoko | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $4.07       |
| Light    | Even                   | Rust   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.05               | $0.01      | $0.00                  | $2.64      | $4.12       |
| Light    | Query Heavy            | Azle   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Motoko | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Rust   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Update Heavy           | Azle   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.17               | $0.01      | $0.00                  | $2.64      | $3.66       |
| Light    | Update Heavy           | Motoko | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.49       |
| Light    | Update Heavy           | Rust   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.05               | $0.01      | $0.00                  | $2.64      | $3.54       |
| Moderate | Even                   | Azle   | $99.91           | $83.26                       | $83.26                        | $24.56          | $17.44              | $1.08      | $0.83                  | $5.29      | $315.62     |
| Moderate | Even                   | Motoko | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.12               | $1.08      | $0.83                  | $5.29      | $298.30     |
| Moderate | Even                   | Rust   | $99.91           | $83.26                       | $83.26                        | $24.56          | $5.10               | $1.08      | $0.83                  | $5.29      | $303.28     |
| Moderate | Query Heavy            | Azle   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.17               | $1.08      | $0.83                  | $5.29      | $142.16     |
| Moderate | Query Heavy            | Motoko | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.00               | $1.08      | $0.83                  | $5.29      | $141.99     |
| Moderate | Query Heavy            | Rust   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.05               | $1.08      | $0.83                  | $5.29      | $142.04     |
| Moderate | Update Heavy           | Azle   | $50.45           | $0.83                        | $83.26                        | $24.56          | $17.44              | $1.08      | $0.83                  | $5.29      | $183.74     |
| Moderate | Update Heavy           | Motoko | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.12               | $1.08      | $0.83                  | $5.29      | $166.43     |
| Moderate | Update Heavy           | Rust   | $50.45           | $0.83                        | $83.26                        | $24.56          | $5.10               | $1.08      | $0.83                  | $5.29      | $171.40     |
| Heavy    | Even                   | Azle   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $1,743.75           | $108.23    | $832.55                | $10.57     | $181,651.82 |
| Heavy    | Even                   | Motoko | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $12.41              | $108.23    | $832.55                | $10.57     | $179,920.47 |
| Heavy    | Even                   | Rust   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $510.09             | $108.23    | $832.55                | $10.57     | $180,418.16 |
| Heavy    | Query Heavy            | Azle   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $17.44              | $108.23    | $832.55                | $10.57     | $90,126.20  |
| Heavy    | Query Heavy            | Motoko | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.12               | $108.23    | $832.55                | $10.57     | $90,108.89  |
| Heavy    | Query Heavy            | Rust   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $5.10               | $108.23    | $832.55                | $10.57     | $90,113.86  |
| Heavy    | Update Heavy           | Azle   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $1,743.75           | $108.23    | $832.55                | $10.57     | $94,283.98  |
| Heavy    | Update Heavy           | Motoko | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $12.41              | $108.23    | $832.55                | $10.57     | $92,552.63  |
| Heavy    | Update Heavy           | Rust   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $510.09             | $108.23    | $832.55                | $10.57     | $93,050.32  |

## Averages

| Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| (208_419 / 1_047_236)  | (1_850 / 7_451)          | (6_972 / 306_344)      | (122x / 176x)                 | (35x / 9x)                  | (-122x / -176x)               | (-4x / -36x)                  | (-35x / -9x)                | (4x / 36x)                    |

## Benchmarks

| Description                           | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ------------------------------------- | ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| create: with no powers                | (208_096 / 1_120_658)  | (1_441 / 7_048)          | (6_906 / 422_518)      | (144x / 159x)                 | (30x / 3x)                  | (-144x / -159x)               | (-5x / -60x)                  | (-30x / -3x)                | (5x / 60x)                    |
| create: with powers                   | (206_594 / 1_285_753)  | (1_963 / 12_602)         | (8_366 / 521_727)      | (105x / 102x)                 | (25x / 2x)                  | (-105x / -102x)               | (-4x / -41x)                  | (-25x / -2x)                | (4x / 41x)                    |
| update: nonexistent superhero         | (147_625 / 1_058_955)  | (924 / 6_718)            | (3_020 / 397_392)      | (160x / 158x)                 | (49x / 3x)                  | (-160x / -158x)               | (-3x / -59x)                  | (-49x / -3x)                | (3x / 59x)                    |
| update: add powers                    | (243_437 / 1_411_505)  | (2_434 / 15_059)         | (9_110 / 582_302)      | (100x / 94x)                  | (27x / 2x)                  | (-100x / -94x)                | (-4x / -39x)                  | (-27x / -2x)                | (4x / 39x)                    |
| update: remove powers                 | (243_975 / 1_165_611)  | (2_922 / 8_702)          | (14_019 / 410_929)     | (83x / 134x)                  | (17x / 3x)                  | (-83x / -134x)                | (-5x / -47x)                  | (-17x / -3x)                | (5x / 47x)                    |
| delete_hero: nonexistent superhero    | (147_656 / 720_719)    | (924 / 2_378)            | (2_987 / 36_533)       | (160x / 303x)                 | (49x / 20x)                 | (-160x / -303x)               | (-3x / -15x)                  | (-49x / -20x)               | (3x / 15x)                    |
| delete_hero: superhero with powers    | (235_045 / 805_986)    | (2_149 / 3_603)          | (6_650 / 40_196)       | (109x / 224x)                 | (35x / 20x)                 | (-109x / -224x)               | (-3x / -11x)                  | (-35x / -20x)               | (3x / 11x)                    |
| delete_hero: superhero without powers | (234_923 / 808_699)    | (2_046 / 3_500)          | (4_718 / 39_157)       | (115x / 231x)                 | (50x / 21x)                 | (-115x / -231x)               | (-2x / -11x)                  | (-50x / -21x)               | (2x / 11x)                    |
