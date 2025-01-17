# Benchmarks for null_example

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setPartiallyNullRecord | 8_979_163    | 4_181_665 | $0.0000055602 | $5.56             | <font color="green">-3_262</font>  |
| 1   | setSmallNullRecord     | 5_389_277    | 2_745_710 | $0.0000036509 | $3.65             | <font color="red">+14_225</font>   |
| 2   | setLargeNullRecord     | 8_693_382    | 4_067_352 | $0.0000054082 | $5.40             | <font color="green">-10_039</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 8_982_425    | 4_182_970 | $0.0000055620 | $5.56             |
| 1   | setSmallNullRecord     | 5_375_052    | 2_740_020 | $0.0000036433 | $3.64             |
| 2   | setLargeNullRecord     | 8_703_421    | 4_071_368 | $0.0000054136 | $5.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
