# Benchmarks for rejections

## Current benchmarks Azle version: 0.24.2-rc.92

| Id  | Method Name                        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectionCodeNoError            | 1_722_222    | 1_278_888 | $0.0000017005 | $1.70             |
| 1   | getRejectionCodeDestinationInvalid | 1_638_577    | 1_245_430 | $0.0000016560 | $1.65             |
| 2   | getRejectionCodeCanisterReject     | 2_055_591    | 1_412_236 | $0.0000018778 | $1.87             |
| 3   | getRejectionCodeCanisterError      | 1_643_572    | 1_247_428 | $0.0000016587 | $1.65             |
| 4   | getRejectionMessage                | 2_789_914    | 1_705_965 | $0.0000022684 | $2.26             |

## Baseline benchmarks Azle version: 0.24.2-rc.92

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
