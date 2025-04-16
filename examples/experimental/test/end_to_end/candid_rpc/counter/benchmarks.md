# Benchmarks for counter

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | incrementCount | 1_484_916    | 1_183_966 | $0.0000015743 | $1.57             | <font color="red">+8_366</font> |
| 1   | incrementCount | 1_460_865    | 1_174_346 | $0.0000015615 | $1.56             | <font color="red">+7_542</font> |
| 2   | incrementCount | 1_463_231    | 1_175_292 | $0.0000015628 | $1.56             | <font color="red">+9_067</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | incrementCount | 1_476_550    | 1_180_620 | $0.0000015698 | $1.56             |
| 1   | incrementCount | 1_453_323    | 1_171_329 | $0.0000015575 | $1.55             |
| 2   | incrementCount | 1_454_164    | 1_171_665 | $0.0000015579 | $1.55             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
