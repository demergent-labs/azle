# Benchmarks for timers

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | setTimers   | 15_918_659   | 6_957_463 | $0.0000092511 | $9.25             | <font color="red">+28_328</font> |
| 1   | clearTimer  | 1_187_028    | 1_064_811 | $0.0000014158 | $1.41             | <font color="red">+5_849</font>  |
| 2   | clearTimer  | 1_186_074    | 1_064_429 | $0.0000014153 | $1.41             | <font color="red">+4_342</font>  |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setTimers   | 15_890_331   | 6_946_132 | $0.0000092361 | $9.23             |
| 1   | clearTimer  | 1_181_179    | 1_062_471 | $0.0000014127 | $1.41             |
| 2   | clearTimer  | 1_181_732    | 1_062_692 | $0.0000014130 | $1.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
