# Benchmarks for superheroes

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | create      | 4_442_131    | 2_366_852 | $0.0000031471 | $3.14             | <font color="red">+8_748</font>    |
| 1   | create      | 5_681_096    | 2_862_438 | $0.0000038061 | $3.80             | <font color="green">-3_863</font>  |
| 2   | update      | 6_100_224    | 3_030_089 | $0.0000040290 | $4.02             | <font color="red">+2_087</font>    |
| 3   | update      | 4_361_514    | 2_334_605 | $0.0000031043 | $3.10             | <font color="green">-11_587</font> |
| 4   | deleteHero  | 1_223_548    | 1_079_419 | $0.0000014353 | $1.43             | <font color="green">-270</font>    |
| 5   | deleteHero  | 1_213_960    | 1_075_584 | $0.0000014302 | $1.43             | <font color="green">-2_215</font>  |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 4_433_383    | 2_363_353 | $0.0000031425 | $3.14             |
| 1   | create      | 5_684_959    | 2_863_983 | $0.0000038082 | $3.80             |
| 2   | update      | 6_098_137    | 3_029_254 | $0.0000040279 | $4.02             |
| 3   | update      | 4_373_101    | 2_339_240 | $0.0000031104 | $3.11             |
| 4   | deleteHero  | 1_223_818    | 1_079_527 | $0.0000014354 | $1.43             |
| 5   | deleteHero  | 1_216_175    | 1_076_470 | $0.0000014313 | $1.43             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
