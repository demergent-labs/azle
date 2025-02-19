# Benchmarks for counter

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | set         | 1_092_109    | 1_026_843 | $0.0000013654 | $1.36             | <font color="red">+4_548</font>   |
| 1   | inc         | 950_173      | 970_069   | $0.0000012899 | $1.28             | <font color="green">-7_999</font> |
| 2   | inc         | 951_023      | 970_409   | $0.0000012903 | $1.29             | <font color="green">-9_447</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 1_087_561    | 1_025_024 | $0.0000013629 | $1.36             |
| 1   | inc         | 958_172      | 973_268   | $0.0000012941 | $1.29             |
| 2   | inc         | 960_470      | 974_188   | $0.0000012953 | $1.29             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
