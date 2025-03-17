⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for superheroes

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | create      | 4_433_383    | 2_363_353 | $0.0000031425 | $3.14             | <font color="green">-3_139</font> |
| 1   | create      | 5_684_959    | 2_863_983 | $0.0000038082 | $3.80             | <font color="red">+11_513</font>  |
| 2   | update      | 6_098_137    | 3_029_254 | $0.0000040279 | $4.02             | <font color="red">+3_004</font>   |
| 3   | update      | 4_373_101    | 2_339_240 | $0.0000031104 | $3.11             | <font color="red">+2_814</font>   |
| 4   | deleteHero  | 1_223_818    | 1_079_527 | $0.0000014354 | $1.43             | <font color="green">-1_897</font> |
| 5   | deleteHero  | 1_216_175    | 1_076_470 | $0.0000014313 | $1.43             | <font color="green">-2_162</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 4_436_522    | 2_364_608 | $0.0000031441 | $3.14             |
| 1   | create      | 5_673_446    | 2_859_378 | $0.0000038020 | $3.80             |
| 2   | update      | 6_095_133    | 3_028_053 | $0.0000040263 | $4.02             |
| 3   | update      | 4_370_287    | 2_338_114 | $0.0000031089 | $3.10             |
| 4   | deleteHero  | 1_225_715    | 1_080_286 | $0.0000014364 | $1.43             |
| 5   | deleteHero  | 1_218_337    | 1_077_334 | $0.0000014325 | $1.43             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
