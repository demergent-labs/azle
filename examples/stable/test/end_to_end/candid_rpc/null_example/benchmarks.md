# Benchmarks for null_example

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | setPartiallyNullRecord | 6_073_908    | 3_019_563 | $0.0000040150 | $4.01             | <font color="red">+411_348</font> |
| 1   | setSmallNullRecord     | 4_420_550    | 2_358_220 | $0.0000031357 | $3.13             | <font color="red">+303_638</font> |
| 2   | setLargeNullRecord     | 5_738_692    | 2_885_476 | $0.0000038367 | $3.83             | <font color="red">+384_262</font> |

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
