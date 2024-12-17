# Benchmarks for null_example

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | setPartiallyNullRecord | 5_669_357    | 2_857_742 | $0.0000037999 | $3.79             | <font color="red">+6_797</font>  |
| 1   | setSmallNullRecord     | 4_129_120    | 2_241_648 | $0.0000029807 | $2.98             | <font color="red">+12_208</font> |
| 2   | setLargeNullRecord     | 5_374_897    | 2_739_958 | $0.0000036432 | $3.64             | <font color="red">+20_467</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 5_662_560    | 2_855_024 | $0.0000037962 | $3.79             |
| 1   | setSmallNullRecord     | 4_116_912    | 2_236_764 | $0.0000029742 | $2.97             |
| 2   | setLargeNullRecord     | 5_354_430    | 2_731_772 | $0.0000036324 | $3.63             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
