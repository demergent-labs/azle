# Benchmarks for null_example

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | setPartiallyNullRecord | 8_997_329    | 4_188_931 | $0.0000055699 | $5.56             | <font color="red">+18_166</font>  |
| 1   | setSmallNullRecord     | 5_387_316    | 2_744_926 | $0.0000036498 | $3.64             | <font color="green">-1_961</font> |
| 2   | setLargeNullRecord     | 8_699_686    | 4_069_874 | $0.0000054116 | $5.41             | <font color="red">+6_304</font>   |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 8_979_163    | 4_181_665 | $0.0000055602 | $5.56             |
| 1   | setSmallNullRecord     | 5_389_277    | 2_745_710 | $0.0000036509 | $3.65             |
| 2   | setLargeNullRecord     | 8_693_382    | 4_067_352 | $0.0000054082 | $5.40             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
