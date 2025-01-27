# Benchmarks for cycles

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_135_844    | 1_044_337 | $0.0000013886 | $1.38             |
| 1   | receiveCycles | 1_230_119    | 1_082_047 | $0.0000014388 | $1.43             |
| 2   | receiveCycles | 1_231_262    | 1_082_504 | $0.0000014394 | $1.43             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init             | 5_481_580_874 | 4_193_222_349 | $0.0055756020 | $5_575.60         |
| 1   | sendCycles       | 10_730_022    | 4_882_008     | $0.0000064915 | $6.49             |
| 2   | sendCyclesNotify | 1_422_011     | 1_158_804     | $0.0000015408 | $1.54             |

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
