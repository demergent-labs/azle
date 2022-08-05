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

-   Azle: 759_299
-   Motoko: 5_676
-   Rust: 41_569

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
| Light    | Even                   | Azle   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.13               | $0.01      | $0.00                  | $2.64      | $4.19       |
| Light    | Even                   | Motoko | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $4.07       |
| Light    | Even                   | Rust   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.01               | $0.01      | $0.00                  | $2.64      | $4.07       |
| Light    | Query Heavy            | Azle   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Motoko | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Rust   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Update Heavy           | Azle   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.13               | $0.01      | $0.00                  | $2.64      | $3.62       |
| Light    | Update Heavy           | Motoko | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.49       |
| Light    | Update Heavy           | Rust   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.01               | $0.01      | $0.00                  | $2.64      | $3.50       |
| Moderate | Even                   | Azle   | $99.91           | $83.26                       | $83.26                        | $24.56          | $12.64              | $1.08      | $0.83                  | $5.29      | $310.82     |
| Moderate | Even                   | Motoko | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.09               | $1.08      | $0.83                  | $5.29      | $298.27     |
| Moderate | Even                   | Rust   | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.69               | $1.08      | $0.83                  | $5.29      | $298.87     |
| Moderate | Query Heavy            | Azle   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.13               | $1.08      | $0.83                  | $5.29      | $142.11     |
| Moderate | Query Heavy            | Motoko | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.00               | $1.08      | $0.83                  | $5.29      | $141.99     |
| Moderate | Query Heavy            | Rust   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.01               | $1.08      | $0.83                  | $5.29      | $141.99     |
| Moderate | Update Heavy           | Azle   | $50.45           | $0.83                        | $83.26                        | $24.56          | $12.64              | $1.08      | $0.83                  | $5.29      | $178.95     |
| Moderate | Update Heavy           | Motoko | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.09               | $1.08      | $0.83                  | $5.29      | $166.40     |
| Moderate | Update Heavy           | Rust   | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.69               | $1.08      | $0.83                  | $5.29      | $166.99     |
| Heavy    | Even                   | Azle   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $1,264.31           | $108.23    | $832.55                | $10.57     | $181,172.37 |
| Heavy    | Even                   | Motoko | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $9.45               | $108.23    | $832.55                | $10.57     | $179,917.51 |
| Heavy    | Even                   | Rust   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $69.22              | $108.23    | $832.55                | $10.57     | $179,977.28 |
| Heavy    | Query Heavy            | Azle   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $12.64              | $108.23    | $832.55                | $10.57     | $90,121.40  |
| Heavy    | Query Heavy            | Motoko | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.09               | $108.23    | $832.55                | $10.57     | $90,108.86  |
| Heavy    | Query Heavy            | Rust   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.69               | $108.23    | $832.55                | $10.57     | $90,109.45  |
| Heavy    | Update Heavy           | Azle   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $1,264.31           | $108.23    | $832.55                | $10.57     | $93,804.53  |
| Heavy    | Update Heavy           | Motoko | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $9.45               | $108.23    | $832.55                | $10.57     | $92,549.68  |
| Heavy    | Update Heavy           | Rust   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $69.22              | $108.23    | $832.55                | $10.57     | $92,609.44  |

## Averages

| Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| (134_817 / 759_299)    | (1_126 / 5_676)          | (1_171 / 41_569)       | (338x / 262x)                 | (168x / 19x)                | (-338x / -262x)               | (-1x / -13x)                  | (-168x / -19x)              | (1x / 13x)                    |

## Benchmarks

| Description | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ----------- | ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| add: small  | (116_042 / 679_659)    | (226 / 1_727)            | (1_785 / 40_159)       | (513x / 394x)                 | (66x / 17x)                 | (-513x / -394x)               | (-8x / -23x)                  | (-66x / -17x)               | (8x / 23x)                    |
| add: large  | (116_061 / 907_873)    | (1_378 / 10_597)         | (1_915 / 51_569)       | (86x / 86x)                   | (62x / 18x)                 | (-86x / -86x)                 | (-1x / -5x)                   | (-62x / -18x)               | (1x / 5x)                     |
| sub: small  | (116_262 / 682_418)    | (2_217 / 3_718)          | (1_866 / 39_661)       | (52x / 184x)                  | (62x / 17x)                 | (-52x / -184x)                | (1x / -11x)                   | (-62x / -17x)               | (-1x / 11x)                   |
| sub: large  | (116_559 / 696_261)    | (1_287 / 10_506)         | (1_854 / 51_537)       | (91x / 66x)                   | (65x / 14x)                 | (-91x / -66x)                 | (-1x / -5x)                   | (-65x / -14x)               | (1x / 5x)                     |
| mul: small  | (115_833 / 689_299)    | (228 / 1_729)            | (607 / 38_345)         | (508x / 399x)                 | (191x / 18x)                | (-508x / -399x)               | (-3x / -22x)                  | (-191x / -18x)              | (3x / 22x)                    |
| mul: large  | (115_868 / 703_483)    | (2_028 / 11_247)         | (607 / 50_136)         | (57x / 63x)                   | (191x / 14x)                | (-57x / -63x)                 | (3x / -4x)                    | (-191x / -14x)              | (-3x / 4x)                    |
| div: small  | (201_484 / 777_311)    | (256 / 1_754)            | (1_154 / 39_148)       | (787x / 443x)                 | (175x / 20x)                | (-787x / -443x)               | (-5x / -22x)                  | (-175x / -20x)              | (5x / 22x)                    |
| div: zero   | (155_032 / 728_147)    | (207 / 1_705)            | (547 / 36_384)         | (749x / 427x)                 | (283x / 20x)                | (-749x / -427x)               | (-3x / -21x)                  | (-283x / -20x)              | (3x / 21x)                    |
| div: large  | (201_040 / 1_098_695)  | (3_235 / 12_451)         | (1_141 / 48_933)       | (62x / 88x)                   | (176x / 22x)                | (-62x / -88x)                 | (3x / -4x)                    | (-176x / -22x)              | (-3x / 4x)                    |
| clearall    | (93_991 / 629_846)     | (200 / 1_325)            | (232 / 19_818)         | (470x / 475x)                 | (405x / 32x)                | (-470x / -475x)               | (-1x / -15x)                  | (-405x / -32x)              | (1x / 15x)                    |
