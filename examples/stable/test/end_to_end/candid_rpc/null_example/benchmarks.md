# Benchmarks for null_example

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setPartiallyNullRecord | 5_994_495    | 2_987_798 | $0.0000039728 | $3.97             | <font color="green">-32_944</font> |
| 1   | setSmallNullRecord     | 4_348_018    | 2_329_207 | $0.0000030971 | $3.09             | <font color="green">-25_221</font> |
| 2   | setLargeNullRecord     | 5_662_936    | 2_855_174 | $0.0000037964 | $3.79             | <font color="green">-41_114</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 6_027_439    | 3_000_975 | $0.0000039903 | $3.99             |
| 1   | setSmallNullRecord     | 4_373_239    | 2_339_295 | $0.0000031105 | $3.11             |
| 2   | setLargeNullRecord     | 5_704_050    | 2_871_620 | $0.0000038183 | $3.81             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
