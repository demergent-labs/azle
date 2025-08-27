# Benchmarks for update

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name  | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------ | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | simpleUpdate | 1_404_057    | 6_404_057 | $0.0000087736 | $8.77             | <font color="green">-13_999</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | simpleUpdate | 1_418_056    | 6_418_056 | $0.0000087927 | $8.79             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
