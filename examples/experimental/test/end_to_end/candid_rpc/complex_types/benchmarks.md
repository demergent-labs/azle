# Benchmarks for complex_types

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | createUser     | 80_814_541   | 32_915_816 | $0.0000437672 | $43.76            | <font color="red">+117_736</font> |
| 1   | createThread   | 164_546_882  | 66_408_752 | $0.0000883017 | $88.30            | <font color="red">+252_400</font> |
| 2   | createPost     | 86_981_964   | 35_382_785 | $0.0000470474 | $47.04            | <font color="red">+132_743</font> |
| 3   | createReaction | 173_330_313  | 69_922_125 | $0.0000929734 | $92.97            | <font color="red">+178_420</font> |

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
