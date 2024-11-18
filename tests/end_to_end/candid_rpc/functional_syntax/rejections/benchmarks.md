# Benchmarks for rejections

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                        | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                               | 5_925_087_148 | 4_370_624_859 | $0.0058114888 | $5_811.48         |
| 1   | getRejectionCodeNoError            | 10_954_255    | 4_971_702     | $0.0000066107 | $6.61             |
| 2   | getRejectionCodeDestinationInvalid | 10_125_408    | 4_640_163     | $0.0000061699 | $6.16             |
| 3   | getRejectionCodeCanisterReject     | 11_333_959    | 5_123_583     | $0.0000068127 | $6.81             |
| 4   | getRejectionCodeCanisterError      | 10_795_504    | 4_908_201     | $0.0000065263 | $6.52             |
| 5   | getRejectionMessage                | 12_069_921    | 5_417_968     | $0.0000072041 | $7.20             |

## Baseline benchmarks Azle version: No previous benchmarks

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
