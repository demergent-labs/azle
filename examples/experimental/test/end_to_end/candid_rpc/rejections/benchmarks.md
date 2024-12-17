# Benchmarks for rejections

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name                        | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                               | 5_521_474_842 | 4_209_179_936 | $0.0055968203 | $5_596.82         |
| 1   | getRejectionCodeNoError            | 10_972_118    | 4_978_847     | $0.0000066202 | $6.62             |
| 2   | getRejectionCodeDestinationInvalid | 10_131_951    | 4_642_780     | $0.0000061734 | $6.17             |
| 3   | getRejectionCodeCanisterReject     | 11_350_624    | 5_130_249     | $0.0000068215 | $6.82             |
| 4   | getRejectionCodeCanisterError      | 10_814_834    | 4_915_933     | $0.0000065366 | $6.53             |
| 5   | getRejectionMessage                | 12_088_560    | 5_425_424     | $0.0000072140 | $7.21             |

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
