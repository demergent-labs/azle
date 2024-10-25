# Benchmarks for canister1

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap0Remove | 2_012_204    | 1_394_881 | $0.0000018547 | $1.85             |
| 1   | stableMap1Remove | 2_656_712    | 1_652_684 | $0.0000021975 | $2.19             |
| 2   | stableMap2Remove | 1_998_239    | 1_389_295 | $0.0000018473 | $1.84             |
| 3   | stableMap3Remove | 3_074_621    | 1_819_848 | $0.0000024198 | $2.41             |
| 4   | stableMap4Remove | 4_774_464    | 2_499_785 | $0.0000033239 | $3.32             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

No benchmarks reported

# Benchmarks for canister2

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap5Remove | 2_200_481    | 1_470_192 | $0.0000019549 | $1.95             |
| 1   | stableMap6Remove | 3_554_763    | 2_011_905 | $0.0000026752 | $2.67             |
| 2   | stableMap7Remove | 1_815_862    | 1_316_344 | $0.0000017503 | $1.75             |
| 3   | stableMap8Remove | 1_855_492    | 1_332_196 | $0.0000017714 | $1.77             |
| 4   | stableMap9Remove | 2_904_049    | 1_751_619 | $0.0000023291 | $2.32             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

No benchmarks reported

# Benchmarks for canister3

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap10Remove | 2_369_923    | 1_537_969 | $0.0000020450 | $2.04             |
| 1   | stableMap11Remove | 6_762_860    | 3_295_144 | $0.0000043815 | $4.38             |
| 2   | stableMap12Remove | 4_351_585    | 2_330_634 | $0.0000030990 | $3.09             |
| 3   | stableMap13Remove | 2_683_564    | 1_663_425 | $0.0000022118 | $2.21             |
| 4   | stableMap14Remove | 7_101_166    | 3_430_466 | $0.0000045614 | $4.56             |
| 5   | stableMap15Remove | 4_274_250    | 2_299_700 | $0.0000030578 | $3.05             |
| 6   | stableMap16Remove | 2_923_308    | 1_759_323 | $0.0000023393 | $2.33             |
| 7   | stableMap17Remove | 3_058_816    | 1_813_526 | $0.0000024114 | $2.41             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

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
