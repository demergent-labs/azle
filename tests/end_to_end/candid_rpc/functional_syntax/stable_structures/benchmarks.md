# Benchmarks for canister1

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade      | 3_523_314_453 | 2_609_915_781 | $0.0034703267 | $3_470.32         |
| 1   | stableMap0Remove | 2_058_108     | 1_413_243     | $0.0000018791 | $1.87             |
| 2   | stableMap1Remove | 2_728_772     | 1_681_508     | $0.0000022359 | $2.23             |
| 3   | stableMap2Remove | 2_063_992     | 1_415_596     | $0.0000018823 | $1.88             |
| 4   | stableMap3Remove | 3_576_067     | 2_020_426     | $0.0000026865 | $2.68             |
| 5   | stableMap4Remove | 5_495_133     | 2_788_053     | $0.0000037072 | $3.70             |

## Baseline benchmarks Azle version: 0.24.2-rc.88

No benchmarks reported

# Benchmarks for canister2

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade      | 3_504_692_203 | 2_602_466_881 | $0.0034604221 | $3_460.42         |
| 1   | stableMap5Remove | 2_365_741     | 1_536_296     | $0.0000020428 | $2.04             |
| 2   | stableMap6Remove | 3_651_576     | 2_050_630     | $0.0000027267 | $2.72             |
| 3   | stableMap7Remove | 1_888_074     | 1_345_229     | $0.0000017887 | $1.78             |
| 4   | stableMap8Remove | 1_927_627     | 1_361_050     | $0.0000018097 | $1.80             |
| 5   | stableMap9Remove | 2_972_177     | 1_778_870     | $0.0000023653 | $2.36             |

## Baseline benchmarks Azle version: 0.24.2-rc.88

No benchmarks reported

# Benchmarks for canister3

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade       | 3_563_890_980 | 2_626_146_392 | $0.0034919081 | $3_491.90         |
| 1   | stableMap10Remove | 2_545_264     | 1_608_105     | $0.0000021382 | $2.13             |
| 2   | stableMap11Remove | 7_468_842     | 3_577_536     | $0.0000047569 | $4.75             |
| 3   | stableMap12Remove | 4_866_787     | 2_536_714     | $0.0000033730 | $3.37             |
| 4   | stableMap13Remove | 2_753_522     | 1_691_408     | $0.0000022490 | $2.24             |
| 5   | stableMap14Remove | 7_608_615     | 3_633_446     | $0.0000048313 | $4.83             |
| 6   | stableMap15Remove | 4_852_781     | 2_531_112     | $0.0000033655 | $3.36             |
| 7   | stableMap16Remove | 2_983_704     | 1_783_481     | $0.0000023714 | $2.37             |
| 8   | stableMap17Remove | 3_110_833     | 1_834_333     | $0.0000024391 | $2.43             |

## Baseline benchmarks Azle version: 0.24.2-rc.88

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
