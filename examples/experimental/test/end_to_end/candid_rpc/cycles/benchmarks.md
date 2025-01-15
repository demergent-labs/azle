# Benchmarks for cycles

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_137_258    | 1_044_903 | $0.0000013894 | $1.38             |
| 1   | receiveCycles | 1_231_075    | 1_082_430 | $0.0000014393 | $1.43             |
| 2   | receiveCycles | 1_231_487    | 1_082_594 | $0.0000014395 | $1.43             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init             | 5_467_867_868 | 4_187_737_147 | $0.0055683085 | $5_568.30         |
| 1   | sendCycles       | 10_725_972    | 4_880_388     | $0.0000064893 | $6.48             |
| 2   | sendCyclesNotify | 1_419_057     | 1_157_622     | $0.0000015393 | $1.53             |

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
