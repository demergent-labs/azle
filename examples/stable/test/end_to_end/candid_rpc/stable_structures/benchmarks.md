# Benchmarks for canister1

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | stableMap0Remove | 2_154_200    | 1_451_680 | $0.0000019303 | $1.93             | <font color="green">-3_691</font>  |
| 1   | stableMap1Remove | 2_809_491    | 1_713_796 | $0.0000022788 | $2.27             | <font color="green">-5_261</font>  |
| 2   | stableMap2Remove | 2_133_305    | 1_443_322 | $0.0000019191 | $1.91             | <font color="green">-10_275</font> |
| 3   | stableMap3Remove | 3_260_476    | 1_894_190 | $0.0000025186 | $2.51             | <font color="green">-16_488</font> |
| 4   | stableMap4Remove | 5_069_121    | 2_617_648 | $0.0000034806 | $3.48             | <font color="green">-16_964</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap0Remove | 2_157_891    | 1_453_156 | $0.0000019322 | $1.93             |
| 1   | stableMap1Remove | 2_814_752    | 1_715_900 | $0.0000022816 | $2.28             |
| 2   | stableMap2Remove | 2_143_580    | 1_447_432 | $0.0000019246 | $1.92             |
| 3   | stableMap3Remove | 3_276_964    | 1_900_785 | $0.0000025274 | $2.52             |
| 4   | stableMap4Remove | 5_086_085    | 2_624_434 | $0.0000034896 | $3.48             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | stableMap5Remove | 2_335_494    | 1_524_197 | $0.0000020267 | $2.02             | <font color="green">-11_473</font> |
| 1   | stableMap6Remove | 3_902_798    | 2_151_119 | $0.0000028603 | $2.86             | <font color="red">+623</font>      |
| 2   | stableMap7Remove | 1_806_664    | 1_312_665 | $0.0000017454 | $1.74             | <font color="red">+793</font>      |
| 3   | stableMap8Remove | 1_831_619    | 1_322_647 | $0.0000017587 | $1.75             | <font color="green">-2_403</font>  |
| 4   | stableMap9Remove | 3_056_353    | 1_812_541 | $0.0000024101 | $2.41             | <font color="green">-2_725</font>  |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap5Remove | 2_346_967    | 1_528_786 | $0.0000020328 | $2.03             |
| 1   | stableMap6Remove | 3_902_175    | 2_150_870 | $0.0000028599 | $2.85             |
| 2   | stableMap7Remove | 1_805_871    | 1_312_348 | $0.0000017450 | $1.74             |
| 3   | stableMap8Remove | 1_834_022    | 1_323_608 | $0.0000017600 | $1.75             |
| 4   | stableMap9Remove | 3_059_078    | 1_813_631 | $0.0000024115 | $2.41             |

# Benchmarks for canister3

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | stableMap10Remove | 2_559_159    | 1_613_663 | $0.0000021456 | $2.14             | <font color="red">+9_264</font>   |
| 1   | stableMap11Remove | 7_182_982    | 3_463_192 | $0.0000046049 | $4.60             | <font color="red">+6_319</font>   |
| 2   | stableMap12Remove | 4_601_208    | 2_430_483 | $0.0000032317 | $3.23             | <font color="red">+3_591</font>   |
| 3   | stableMap13Remove | 2_874_842    | 1_739_936 | $0.0000023135 | $2.31             | <font color="red">+4_726</font>   |
| 4   | stableMap14Remove | 7_398_741    | 3_549_496 | $0.0000047197 | $4.71             | <font color="red">+11_698</font>  |
| 5   | stableMap15Remove | 4_534_834    | 2_403_933 | $0.0000031964 | $3.19             | <font color="red">+4_241</font>   |
| 6   | stableMap16Remove | 3_170_615    | 1_858_246 | $0.0000024709 | $2.47             | <font color="red">+3_114</font>   |
| 7   | stableMap17Remove | 3_311_052    | 1_914_420 | $0.0000025455 | $2.54             | <font color="green">-1_394</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap10Remove | 2_549_895    | 1_609_958 | $0.0000021407 | $2.14             |
| 1   | stableMap11Remove | 7_176_663    | 3_460_665 | $0.0000046015 | $4.60             |
| 2   | stableMap12Remove | 4_597_617    | 2_429_046 | $0.0000032298 | $3.22             |
| 3   | stableMap13Remove | 2_870_116    | 1_738_046 | $0.0000023110 | $2.31             |
| 4   | stableMap14Remove | 7_387_043    | 3_544_817 | $0.0000047134 | $4.71             |
| 5   | stableMap15Remove | 4_530_593    | 2_402_237 | $0.0000031942 | $3.19             |
| 6   | stableMap16Remove | 3_167_501    | 1_857_000 | $0.0000024692 | $2.46             |
| 7   | stableMap17Remove | 3_312_446    | 1_914_978 | $0.0000025463 | $2.54             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
