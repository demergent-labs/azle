# Benchmarks for timers

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setTimers   | 9_906_585    | 4_552_634 | $0.0000060535 | $6.05             | <font color="green">-23_055</font> |
| 1   | clearTimer  | 1_252_407    | 1_090_962 | $0.0000014506 | $1.45             | <font color="green">-7_400</font>  |
| 2   | clearTimer  | 1_256_273    | 1_092_509 | $0.0000014527 | $1.45             | <font color="green">-3_709</font>  |

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
