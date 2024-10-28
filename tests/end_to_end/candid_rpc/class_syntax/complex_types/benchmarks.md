# Benchmarks for complex_types

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 18_926_502   | 8_160_600  | $0.0000108509 | $10.85            |
| 1   | createThread   | 20_122_894   | 8_639_157  | $0.0000114872 | $11.48            |
| 2   | createPost     | 22_462_851   | 9_575_140  | $0.0000127318 | $12.73            |
| 3   | createReaction | 25_423_394   | 10_759_357 | $0.0000143064 | $14.30            |

## Baseline benchmarks Azle version: 0.24.2-rc.88

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
