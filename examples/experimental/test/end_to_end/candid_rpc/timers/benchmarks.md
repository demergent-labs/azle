# Benchmarks for timers

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | setTimers   | 16_039_236   | 7_005_694 | $0.0000093153 | $9.31             | <font color="red">+139_274</font> |
| 1   | clearTimer  | 1_188_955    | 1_065_582 | $0.0000014169 | $1.41             | <font color="green">-2_633</font> |
| 2   | clearTimer  | 1_189_892    | 1_065_956 | $0.0000014174 | $1.41             | <font color="green">-2_937</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setTimers   | 15_899_962   | 6_949_984 | $0.0000092412 | $9.24             |
| 1   | clearTimer  | 1_191_588    | 1_066_635 | $0.0000014183 | $1.41             |
| 2   | clearTimer  | 1_192_829    | 1_067_131 | $0.0000014189 | $1.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
