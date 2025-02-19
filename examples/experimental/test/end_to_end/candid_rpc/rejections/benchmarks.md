# Benchmarks for rejections

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                                    |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | getRejectCodeNoError            | 10_354_492   | 4_731_796 | $0.0000062917 | $6.29             | <font color="green">-5_500_337_756</font> |
| 1   | getRejectCodeDestinationInvalid | 9_470_905    | 4_378_362 | $0.0000058218 | $5.82             | <font color="green">-932_423</font>       |
| 2   | getRejectCodeCanisterReject     | 10_680_957   | 4_862_382 | $0.0000064654 | $6.46             | <font color="red">+1_129_408</font>       |
| 3   | getRejectCodeCanisterError      | 10_157_821   | 4_653_128 | $0.0000061871 | $6.18             | <font color="green">-624_706</font>       |
| 4   | getRejectMessage                | 11_371_327   | 5_138_530 | $0.0000068325 | $6.83             | <font color="red">+1_103_342</font>       |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name                        | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                               | 5_510_692_248 | 4_204_866_899 | $0.0055910854 | $5_591.08         |
| 1   | getRejectionCodeNoError            | 10_403_328    | 4_751_331     | $0.0000063177 | $6.31             |
| 2   | getRejectionCodeDestinationInvalid | 9_551_549     | 4_410_619     | $0.0000058647 | $5.86             |
| 3   | getRejectionCodeCanisterReject     | 10_782_527    | 4_903_010     | $0.0000065194 | $6.51             |
| 4   | getRejectionCodeCanisterError      | 10_267_985    | 4_697_194     | $0.0000062457 | $6.24             |
| 5   | getRejectionMessage                | 11_552_354    | 5_210_941     | $0.0000069288 | $6.92             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
