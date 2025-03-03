# Benchmarks for counter

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | incrementCount | 1_480_767    | 1_182_306 | $0.0000015721 | $1.57             | <font color="red">+1_702</font>   |
| 1   | incrementCount | 1_457_685    | 1_173_074 | $0.0000015598 | $1.55             | <font color="red">+381</font>     |
| 2   | incrementCount | 1_460_026    | 1_174_010 | $0.0000015610 | $1.56             | <font color="green">-1_457</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | incrementCount | 1_479_065    | 1_181_626 | $0.0000015712 | $1.57             |
| 1   | incrementCount | 1_457_304    | 1_172_921 | $0.0000015596 | $1.55             |
| 2   | incrementCount | 1_461_483    | 1_174_593 | $0.0000015618 | $1.56             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
