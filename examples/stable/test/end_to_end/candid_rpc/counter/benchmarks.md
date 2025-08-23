# Benchmarks for counter

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | incrementCount | 1_562_301    | 6_562_301 | $0.0000089904 | $8.99             | <font color="green">-40_050</font> |
| 1   | incrementCount | 1_514_212    | 6_514_212 | $0.0000089245 | $8.92             | <font color="green">-36_505</font> |
| 2   | incrementCount | 1_510_646    | 6_510_646 | $0.0000089196 | $8.91             | <font color="green">-43_107</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | incrementCount | 1_602_351    | 6_602_351 | $0.0000090452 | $9.04             |
| 1   | incrementCount | 1_550_717    | 6_550_717 | $0.0000089745 | $8.97             |
| 2   | incrementCount | 1_553_753    | 6_553_753 | $0.0000089786 | $8.97             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
