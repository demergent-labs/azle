# Benchmarks for counter

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                     |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | -------------------------- |
| 0   | incrementCount | 1_599_898    | 1_229_959 | $0.0000016354 | $1.63             | <font color="red">0</font> |
| 1   | incrementCount | 1_552_755    | 1_211_102 | $0.0000016104 | $1.61             | <font color="red">0</font> |
| 2   | incrementCount | 1_552_555    | 1_211_022 | $0.0000016103 | $1.61             | <font color="red">0</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | incrementCount | 1_599_898    | 1_229_959 | $0.0000016354 | $1.63             |
| 1   | incrementCount | 1_552_755    | 1_211_102 | $0.0000016104 | $1.61             |
| 2   | incrementCount | 1_552_555    | 1_211_022 | $0.0000016103 | $1.61             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
