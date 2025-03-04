# Benchmarks for timers

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | setTimers   | 9_748_416    | 4_489_366 | $0.0000059694 | $5.96             | <font color="red">0</font>        |
| 1   | clearTimer  | 1_243_840    | 1_087_536 | $0.0000014461 | $1.44             | <font color="red">+1_721</font>   |
| 2   | clearTimer  | 1_243_915    | 1_087_566 | $0.0000014461 | $1.44             | <font color="green">-1_421</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setTimers   | 9_748_416    | 4_489_366 | $0.0000059694 | $5.96             |
| 1   | clearTimer  | 1_242_119    | 1_086_847 | $0.0000014451 | $1.44             |
| 2   | clearTimer  | 1_245_336    | 1_088_134 | $0.0000014469 | $1.44             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
