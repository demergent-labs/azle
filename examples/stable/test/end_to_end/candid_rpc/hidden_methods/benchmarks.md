# Benchmarks for hidden_methods

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | updateUndefined   | 1_629_832    | 6_629_832 | $0.0000090829 | $9.08             | <font color="green">-33_519</font> |
| 1   | updateHiddenFalse | 1_523_982    | 6_523_982 | $0.0000089379 | $8.93             | <font color="green">-44_928</font> |
| 2   | updateHiddenTrue  | 1_511_397    | 6_511_397 | $0.0000089206 | $8.92             | <font color="green">-45_619</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | updateUndefined   | 1_663_351    | 6_663_351 | $0.0000091288 | $9.12             |
| 1   | updateHiddenFalse | 1_568_910    | 6_568_910 | $0.0000089994 | $8.99             |
| 2   | updateHiddenTrue  | 1_557_016    | 6_557_016 | $0.0000089831 | $8.98             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
