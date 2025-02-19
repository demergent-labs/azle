# Benchmarks for canister1

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap0Remove | 2_172_879    | 1_459_151 | $0.0000019402 | $1.94             |
| 1   | stableMap1Remove | 2_827_887    | 1_721_154 | $0.0000022886 | $2.28             |
| 2   | stableMap2Remove | 2_151_963    | 1_450_785 | $0.0000019291 | $1.92             |
| 3   | stableMap3Remove | 3_290_441    | 1_906_176 | $0.0000025346 | $2.53             |
| 4   | stableMap4Remove | 5_099_755    | 2_629_902 | $0.0000034969 | $3.49             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for canister2

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap5Remove | 2_353_315    | 1_531_326 | $0.0000020362 | $2.03             |
| 1   | stableMap6Remove | 3_924_147    | 2_159_658 | $0.0000028716 | $2.87             |
| 2   | stableMap7Remove | 1_822_047    | 1_318_818 | $0.0000017536 | $1.75             |
| 3   | stableMap8Remove | 1_845_098    | 1_328_039 | $0.0000017659 | $1.76             |
| 4   | stableMap9Remove | 3_086_857    | 1_824_742 | $0.0000024263 | $2.42             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for canister3

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap10Remove | 2_561_629    | 1_614_651 | $0.0000021470 | $2.14             |
| 1   | stableMap11Remove | 7_207_247    | 3_472_898 | $0.0000046178 | $4.61             |
| 2   | stableMap12Remove | 4_633_759    | 2_443_503 | $0.0000032491 | $3.24             |
| 3   | stableMap13Remove | 2_893_101    | 1_747_240 | $0.0000023233 | $2.32             |
| 4   | stableMap14Remove | 7_422_733    | 3_559_093 | $0.0000047324 | $4.73             |
| 5   | stableMap15Remove | 4_565_339    | 2_416_135 | $0.0000032127 | $3.21             |
| 6   | stableMap16Remove | 3_178_121    | 1_861_248 | $0.0000024748 | $2.47             |
| 7   | stableMap17Remove | 3_330_353    | 1_922_141 | $0.0000025558 | $2.55             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
