# Benchmarks for null_example

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setPartiallyNullRecord | 8_965_712    | 4_176_284 | $0.0000055531 | $5.55             | <font color="green">-31_617</font> |
| 1   | setSmallNullRecord     | 5_381_365    | 2_742_546 | $0.0000036467 | $3.64             | <font color="green">-5_951</font>  |
| 2   | setLargeNullRecord     | 8_682_925    | 4_063_170 | $0.0000054027 | $5.40             | <font color="green">-16_761</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 8_997_329    | 4_188_931 | $0.0000055699 | $5.56             |
| 1   | setSmallNullRecord     | 5_387_316    | 2_744_926 | $0.0000036498 | $3.64             |
| 2   | setLargeNullRecord     | 8_699_686    | 4_069_874 | $0.0000054116 | $5.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
