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

-   Azle: 1_043_651
-   Motoko: 7_451
-   Rust: 311_027

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
| Moderate | Even                   | Azle   | $99.91           | $83.26                       | $83.26                        | $24.56          | $17.38              | $1.08      | $0.83                  | $5.29      | $315.56     |
| Moderate | Even                   | Motoko | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.12               | $1.08      | $0.83                  | $5.29      | $298.30     |
| Moderate | Even                   | Rust   | $99.91           | $83.26                       | $83.26                        | $24.56          | $5.18               | $1.08      | $0.83                  | $5.29      | $303.36     |
| Moderate | Query Heavy            | Azle   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.17               | $1.08      | $0.83                  | $5.29      | $142.16     |
| Moderate | Query Heavy            | Motoko | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.00               | $1.08      | $0.83                  | $5.29      | $141.99     |
| Moderate | Query Heavy            | Rust   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.05               | $1.08      | $0.83                  | $5.29      | $142.04     |
| Moderate | Update Heavy           | Azle   | $50.45           | $0.83                        | $83.26                        | $24.56          | $17.38              | $1.08      | $0.83                  | $5.29      | $183.68     |
| Moderate | Update Heavy           | Motoko | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.12               | $1.08      | $0.83                  | $5.29      | $166.43     |
| Moderate | Update Heavy           | Rust   | $50.45           | $0.83                        | $83.26                        | $24.56          | $5.18               | $1.08      | $0.83                  | $5.29      | $171.48     |
| Heavy    | Even                   | Azle   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $1,737.78           | $108.23    | $832.55                | $10.57     | $181,645.85 |
| Heavy    | Even                   | Motoko | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $12.41              | $108.23    | $832.55                | $10.57     | $179,920.47 |
| Heavy    | Even                   | Rust   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $517.89             | $108.23    | $832.55                | $10.57     | $180,425.96 |
| Heavy    | Query Heavy            | Azle   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $17.38              | $108.23    | $832.55                | $10.57     | $90,126.14  |
| Heavy    | Query Heavy            | Motoko | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.12               | $108.23    | $832.55                | $10.57     | $90,108.89  |
| Heavy    | Query Heavy            | Rust   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $5.18               | $108.23    | $832.55                | $10.57     | $90,113.94  |
| Heavy    | Update Heavy           | Azle   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $1,737.78           | $108.23    | $832.55                | $10.57     | $94,278.01  |
| Heavy    | Update Heavy           | Motoko | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $12.41              | $108.23    | $832.55                | $10.57     | $92,552.63  |
| Heavy    | Update Heavy           | Rust   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $517.89             | $108.23    | $832.55                | $10.57     | $93,058.12  |

## Averages

| Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| (207_317 / 1_043_651)  | (1_850 / 7_451)          | (6_990 / 311_027)      | (121x / 175x)                 | (35x / 9x)                  | (-121x / -175x)               | (-4x / -36x)                  | (-35x / -9x)                | (4x / 36x)                    |

## Benchmarks

| Description                           | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ------------------------------------- | ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| create: with no powers                | (206_913 / 1_117_062)  | (1_441 / 7_048)          | (6_921 / 429_716)      | (144x / 158x)                 | (30x / 3x)                  | (-144x / -158x)               | (-5x / -61x)                  | (-30x / -3x)                | (5x / 61x)                    |
| create: with powers                   | (205_402 / 1_281_628)  | (1_963 / 12_602)         | (8_376 / 528_535)      | (105x / 102x)                 | (25x / 2x)                  | (-105x / -102x)               | (-4x / -42x)                  | (-25x / -2x)                | (4x / 42x)                    |
| update: nonexistent superhero         | (146_897 / 1_055_828)  | (924 / 6_718)            | (3_034 / 403_631)      | (159x / 157x)                 | (48x / 3x)                  | (-159x / -157x)               | (-3x / -60x)                  | (-48x / -3x)                | (3x / 60x)                    |
| update: add powers                    | (242_230 / 1_407_061)  | (2_434 / 15_059)         | (9_123 / 590_264)      | (100x / 93x)                  | (27x / 2x)                  | (-100x / -93x)                | (-4x / -39x)                  | (-27x / -2x)                | (4x / 39x)                    |
| update: remove powers                 | (242_768 / 1_162_057)  | (2_922 / 8_702)          | (14_035 / 417_162)     | (83x / 134x)                  | (17x / 3x)                  | (-83x / -134x)                | (-5x / -48x)                  | (-17x / -3x)                | (5x / 48x)                    |
| delete_hero: nonexistent superhero    | (146_928 / 717_812)    | (924 / 2_378)            | (2_993 / 37_522)       | (159x / 302x)                 | (49x / 19x)                 | (-159x / -302x)               | (-3x / -16x)                  | (-49x / -19x)               | (3x / 16x)                    |
| delete_hero: superhero with powers    | (233_761 / 802_523)    | (2_149 / 3_603)          | (6_695 / 41_224)       | (109x / 223x)                 | (35x / 19x)                 | (-109x / -223x)               | (-3x / -11x)                  | (-35x / -19x)               | (3x / 11x)                    |
| delete_hero: superhero without powers | (233_639 / 805_236)    | (2_046 / 3_500)          | (4_741 / 40_163)       | (114x / 230x)                 | (49x / 20x)                 | (-114x / -230x)               | (-2x / -11x)                  | (-49x / -20x)               | (2x / 11x)                    |
