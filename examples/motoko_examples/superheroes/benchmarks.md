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

## Averages

| Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| (190_657 / 1_100_588)  | (3_271 / 8_872)          | (6_250 / 292_401)      | (71x / 167x)                  | (37x / 11x)                 | (-71x / -167x)                | (-2x / -29x)                  | (-37x / -11x)               | (2x / 29x)                    |

## Benchmarks

| Description                           | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ------------------------------------- | ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| create: with no powers                | (208_481 / 1_105_932)  | (4_048 / 9_655)          | (6_719 / 396_222)      | (68x / 120x)                  | (31x / 3x)                  | (-68x / -120x)                | (-2x / -43x)                  | (-31x / -3x)                | (2x / 43x)                    |
| create: with powers                   | (210_079 / 1_505_615)  | (6_259 / 16_898)         | (6_963 / 502_369)      | (37x / 92x)                   | (31x / 3x)                  | (-37x / -92x)                 | (-1x / -30x)                  | (-31x / -3x)                | (1x / 30x)                    |
| update: non-existant superhero        | (148_298 / 1_074_732)  | (1_752 / 7_546)          | (2_954 / 384_841)      | (85x / 142x)                  | (50x / 3x)                  | (-85x / -142x)                | (-2x / -51x)                  | (-50x / -3x)                | (2x / 51x)                    |
| update: add powers                    | (247_868 / 1_430_326)  | (4_321 / 16_946)         | (13_976 / 558_343)     | (57x / 84x)                   | (18x / 3x)                  | (-57x / -84x)                 | (-3x / -33x)                  | (-18x / -3x)                | (3x / 33x)                    |
| update: remove powers                 | (248_286 / 1_189_398)  | (4_321 / 10_101)         | (9_131 / 391_892)      | (57x / 118x)                  | (27x / 3x)                  | (-57x / -118x)                | (-2x / -39x)                  | (-27x / -3x)                | (2x / 39x)                    |
| delete_hero: non-existant superhero   | (147_994 / 726_873)    | (1_752 / 3_206)          | (2_975 / 34_729)       | (84x / 227x)                  | (50x / 21x)                 | (-84x / -227x)                | (-2x / -11x)                  | (-50x / -21x)               | (2x / 11x)                    |
| delete_hero: superhero with powers    | (157_159 / 1_045_749)  | (1_858 / 3_312)          | (3_634 / 35_397)       | (88x / 329x)                  | (43x / 30x)                 | (-88x / -329x)                | (-2x / -11x)                  | (-43x / -30x)               | (2x / 11x)                    |
| delete_hero: superhero without powers | (157_094 / 726_080)    | (1_858 / 3_312)          | (3_649 / 35_413)       | (88x / 225x)                  | (43x / 20x)                 | (-88x / -225x)                | (-2x / -11x)                  | (-43x / -20x)               | (2x / 11x)                    |
