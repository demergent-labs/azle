# Benchmarks for counter

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | incrementCount | 1_481_192    | 1_182_476 | $0.0000015723 | $1.57             | <font color="red">+12_690</font> |
| 1   | incrementCount | 1_459_534    | 1_173_813 | $0.0000015608 | $1.56             | <font color="red">+1_448</font>  |
| 2   | incrementCount | 1_460_446    | 1_174_178 | $0.0000015613 | $1.56             | <font color="red">+3_810</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | incrementCount | 1_468_502    | 1_177_400 | $0.0000015656 | $1.56             |
| 1   | incrementCount | 1_458_086    | 1_173_234 | $0.0000015600 | $1.56             |
| 2   | incrementCount | 1_456_636    | 1_172_654 | $0.0000015592 | $1.55             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
