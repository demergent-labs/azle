# Benchmarks for complex_types

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 80_623_973   | 32_839_589 | $0.0000436658 | $43.66            |
| 1   | createThread   | 164_122_122  | 66_238_848 | $0.0000880758 | $88.07            |
| 2   | createPost     | 86_819_347   | 35_317_738 | $0.0000469609 | $46.96            |
| 3   | createReaction | 172_941_971  | 69_766_788 | $0.0000927668 | $92.76            |

## Baseline benchmarks Azle version: 0.24.2-rc.60

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
