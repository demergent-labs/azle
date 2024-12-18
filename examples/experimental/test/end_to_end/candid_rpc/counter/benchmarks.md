# Benchmarks for counter

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | incrementCount | 1_468_851    | 1_177_540 | $0.0000015657 | $1.56             | <font color="green">-10_617</font> |
| 1   | incrementCount | 1_455_275    | 1_172_110 | $0.0000015585 | $1.55             | <font color="green">-205</font>    |
| 2   | incrementCount | 1_457_670    | 1_173_068 | $0.0000015598 | $1.55             | <font color="green">-1_629</font>  |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | incrementCount | 1_479_468    | 1_181_787 | $0.0000015714 | $1.57             |
| 1   | incrementCount | 1_455_480    | 1_172_192 | $0.0000015586 | $1.55             |
| 2   | incrementCount | 1_459_299    | 1_173_719 | $0.0000015607 | $1.56             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
