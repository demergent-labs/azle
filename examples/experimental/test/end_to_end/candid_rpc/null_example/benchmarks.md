# Benchmarks for null_example

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setPartiallyNullRecord | 8_976_268    | 4_180_507 | $0.0000055587 | $5.55             | <font color="green">-10_723</font> |
| 1   | setSmallNullRecord     | 5_386_314    | 2_744_525 | $0.0000036493 | $3.64             | <font color="green">-15_840</font> |
| 2   | setLargeNullRecord     | 8_705_047    | 4_072_018 | $0.0000054144 | $5.41             | <font color="green">-13_083</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 8_986_991    | 4_184_796 | $0.0000055644 | $5.56             |
| 1   | setSmallNullRecord     | 5_402_154    | 2_750_861 | $0.0000036577 | $3.65             |
| 2   | setLargeNullRecord     | 8_718_130    | 4_077_252 | $0.0000054214 | $5.42             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
