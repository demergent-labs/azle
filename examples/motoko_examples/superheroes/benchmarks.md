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
