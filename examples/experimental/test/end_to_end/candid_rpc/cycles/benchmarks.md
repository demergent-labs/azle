# Benchmarks for cycles

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_131_574    | 1_042_629 | $0.0000013864 | $1.38             |
| 1   | receiveCycles | 1_224_197    | 1_079_678 | $0.0000014356 | $1.43             |
| 2   | receiveCycles | 1_225_163    | 1_080_065 | $0.0000014361 | $1.43             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init             | 5_478_420_014 | 4_191_958_005 | $0.0055739208 | $5_573.92         |
| 1   | sendCycles       | 11_243_376    | 5_087_350     | $0.0000067645 | $6.76             |
| 2   | sendCyclesNotify | 1_415_066     | 1_156_026     | $0.0000015371 | $1.53             |

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
