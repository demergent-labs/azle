# Benchmarks for null_example

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setPartiallyNullRecord | 6_027_439    | 3_000_975 | $0.0000039903 | $3.99             | <font color="green">-63_336</font> |
| 1   | setSmallNullRecord     | 4_373_239    | 2_339_295 | $0.0000031105 | $3.11             | <font color="green">-41_074</font> |
| 2   | setLargeNullRecord     | 5_704_050    | 2_871_620 | $0.0000038183 | $3.81             | <font color="green">-55_296</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 6_090_775    | 3_026_310 | $0.0000040240 | $4.02             |
| 1   | setSmallNullRecord     | 4_414_313    | 2_355_725 | $0.0000031323 | $3.13             |
| 2   | setLargeNullRecord     | 5_759_346    | 2_893_738 | $0.0000038477 | $3.84             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
