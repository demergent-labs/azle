⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for timers

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setTimers   | 9_915_000    | 4_556_000 | $0.0000060580 | $6.05             | <font color="green">-14_640</font> |
| 1   | clearTimer  | 1_262_255    | 1_094_902 | $0.0000014559 | $1.45             | <font color="red">+2_448</font>    |
| 2   | clearTimer  | 1_262_844    | 1_095_137 | $0.0000014562 | $1.45             | <font color="red">+2_862</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setTimers   | 9_929_640    | 4_561_856 | $0.0000060658 | $6.06             |
| 1   | clearTimer  | 1_259_807    | 1_093_922 | $0.0000014546 | $1.45             |
| 2   | clearTimer  | 1_259_982    | 1_093_992 | $0.0000014546 | $1.45             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
