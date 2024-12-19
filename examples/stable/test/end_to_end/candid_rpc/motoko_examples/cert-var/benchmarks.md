# Benchmarks for cert-var

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 1_962_282    | 1_374_912 | $0.0000018282 | $1.82             |
| 1   | inc         | 2_193_120    | 1_467_248 | $0.0000019510 | $1.95             |
| 2   | set         | 1_945_627    | 1_368_250 | $0.0000018193 | $1.81             |
| 3   | inc         | 2_193_119    | 1_467_247 | $0.0000019510 | $1.95             |
| 4   | set         | 1_945_627    | 1_368_250 | $0.0000018193 | $1.81             |
| 5   | inc         | 2_193_119    | 1_467_247 | $0.0000019510 | $1.95             |
| 6   | set         | 1_945_652    | 1_368_260 | $0.0000018193 | $1.81             |
| 7   | inc         | 2_193_119    | 1_467_247 | $0.0000019510 | $1.95             |
| 8   | set         | 1_945_627    | 1_368_250 | $0.0000018193 | $1.81             |
| 9   | inc         | 2_193_120    | 1_467_248 | $0.0000019510 | $1.95             |
| 10  | set         | 1_945_627    | 1_368_250 | $0.0000018193 | $1.81             |
| 11  | inc         | 2_193_119    | 1_467_247 | $0.0000019510 | $1.95             |
| 12  | set         | 1_984_861    | 1_383_944 | $0.0000018402 | $1.84             |

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
