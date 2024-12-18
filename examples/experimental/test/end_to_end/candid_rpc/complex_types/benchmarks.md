# Benchmarks for complex_types

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser     | 80_708_323   | 32_873_329 | $0.0000437107 | $43.71            | <font color="red">+11_518</font>   |
| 1   | createThread   | 164_418_950  | 66_357_580 | $0.0000882337 | $88.23            | <font color="red">+124_468</font>  |
| 2   | createPost     | 86_819_021   | 35_317_608 | $0.0000469608 | $46.96            | <font color="green">-30_200</font> |
| 3   | createReaction | 173_118_785  | 69_837_514 | $0.0000928608 | $92.86            | <font color="green">-33_108</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 80_696_805   | 32_868_722 | $0.0000437046 | $43.70            |
| 1   | createThread   | 164_294_482  | 66_307_792 | $0.0000881675 | $88.16            |
| 2   | createPost     | 86_849_221   | 35_329_688 | $0.0000469768 | $46.97            |
| 3   | createReaction | 173_151_893  | 69_850_757 | $0.0000928785 | $92.87            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
