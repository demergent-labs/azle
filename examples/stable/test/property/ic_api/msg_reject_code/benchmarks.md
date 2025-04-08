# Benchmarks for caller

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeCanisterThrowError | 1_429_817    | 1_161_926 | $0.0000015450 | $1.54             |
| 1   | getRejectCodeCanisterReject     | 1_359_800    | 1_133_920 | $0.0000015077 | $1.50             |
| 2   | getRejectNoError                | 1_361_120    | 1_134_448 | $0.0000015084 | $1.50             |
| 3   | assertTypes                     | 1_348_790    | 1_129_516 | $0.0000015019 | $1.50             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for rejector

## Current benchmarks Azle version: 0.30.0

No benchmarks reported

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
