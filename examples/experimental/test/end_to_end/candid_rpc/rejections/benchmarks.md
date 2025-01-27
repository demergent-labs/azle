# Benchmarks for rejections

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                        | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                               | 5_524_710_468 | 4_210_474_187 | $0.0055985412 | $5_598.54         |
| 1   | getRejectionCodeNoError            | 10_398_573    | 4_749_429     | $0.0000063152 | $6.31             |
| 2   | getRejectionCodeDestinationInvalid | 9_543_781     | 4_407_512     | $0.0000058605 | $5.86             |
| 3   | getRejectionCodeCanisterReject     | 10_752_182    | 4_890_872     | $0.0000065032 | $6.50             |
| 4   | getRejectionCodeCanisterError      | 10_237_563    | 4_685_025     | $0.0000062295 | $6.22             |
| 5   | getRejectionMessage                | 11_513_465    | 5_195_386     | $0.0000069081 | $6.90             |

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
