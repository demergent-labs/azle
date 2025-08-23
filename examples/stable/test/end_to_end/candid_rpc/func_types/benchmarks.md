# Benchmarks for func_types

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name                      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | -------------------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                             | 1_029_442_125 | 1_034_442_125 | $0.0014171857 | $1_417.18         | <font color="red">+9_519_949</font> |
| 1   | getNotifierFromNotifiersCanister | 1_214_854     | 6_214_854     | $0.0000085143 | $8.51             | <font color="green">-71_606</font>  |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name                      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | -------------------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                             | 1_019_922_176 | 1_024_922_176 | $0.0014041434 | $1_404.14         |
| 1   | getNotifierFromNotifiersCanister | 1_286_460     | 6_286_460     | $0.0000086125 | $8.61             |

# Benchmarks for notifiers

## Current benchmarks Azle version: 0.33.0

No benchmarks reported

## Baseline benchmarks Azle version: 0.32.0

No benchmarks reported

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
