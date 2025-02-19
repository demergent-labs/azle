# Benchmarks for timers

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setTimers   | 10_730_465   | 4_882_186 | $0.0000064917 | $6.49             | <font color="green">-48_689</font> |
| 1   | clearTimer  | 1_257_789    | 1_093_115 | $0.0000014535 | $1.45             | <font color="green">-22_446</font> |
| 2   | clearTimer  | 1_260_969    | 1_094_387 | $0.0000014552 | $1.45             | <font color="green">-16_440</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setTimers   | 10_779_154   | 4_901_661 | $0.0000065176 | $6.51             |
| 1   | clearTimer  | 1_280_235    | 1_102_094 | $0.0000014654 | $1.46             |
| 2   | clearTimer  | 1_277_409    | 1_100_963 | $0.0000014639 | $1.46             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
