# Benchmarks for complex_types

## Current benchmarks Azle version: 0.24.2-rc.85

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 80_730_471   | 32_882_188 | $0.0000437225 | $43.72            |
| 1   | createThread   | 164_278_690  | 66_301_476 | $0.0000881591 | $88.15            |
| 2   | createPost     | 86_670_724   | 35_258_289 | $0.0000468819 | $46.88            |
| 3   | createReaction | 172_916_099  | 69_756_439 | $0.0000927530 | $92.75            |

## Baseline benchmarks Azle version: 0.24.2-rc.85

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
