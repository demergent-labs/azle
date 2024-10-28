# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_122_797_598 | 849_709_039 | $0.0011298326 | $1_129.83         |
| 1   | ethGetBalance       | 27_926_835    | 11_760_734  | $0.0000156379 | $15.63            |
| 2   | ethGetBalance       | 27_906_733    | 11_752_693  | $0.0000156272 | $15.62            |
| 3   | ethGetBalance       | 27_908_801    | 11_753_520  | $0.0000156283 | $15.62            |
| 4   | ethGetBlockByNumber | 26_807_060    | 11_312_824  | $0.0000150423 | $15.04            |
| 5   | ethGetBlockByNumber | 26_798_489    | 11_309_395  | $0.0000150378 | $15.03            |
| 6   | ethGetBlockByNumber | 26_805_143    | 11_312_057  | $0.0000150413 | $15.04            |

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
