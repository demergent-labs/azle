# Benchmarks for rejections

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                        | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                               | 5_510_692_248 | 4_204_866_899 | $0.0055910854 | $5_591.08         |
| 1   | getRejectionCodeNoError            | 10_403_328    | 4_751_331     | $0.0000063177 | $6.31             |
| 2   | getRejectionCodeDestinationInvalid | 9_551_549     | 4_410_619     | $0.0000058647 | $5.86             |
| 3   | getRejectionCodeCanisterReject     | 10_782_527    | 4_903_010     | $0.0000065194 | $6.51             |
| 4   | getRejectionCodeCanisterError      | 10_267_985    | 4_697_194     | $0.0000062457 | $6.24             |
| 5   | getRejectionMessage                | 11_552_354    | 5_210_941     | $0.0000069288 | $6.92             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
