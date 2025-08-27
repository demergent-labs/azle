# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getBalance               | 8_737_588    | 13_737_588 | $0.0000188205 | $18.82            | <font color="green">-400_053</font> |
| 1   | getUtxos                 | 10_735_262   | 15_735_262 | $0.0000215573 | $21.55            | <font color="green">-505_117</font> |
| 2   | getCurrentFeePercentiles | 5_112_609    | 10_112_609 | $0.0000138543 | $13.85            | <font color="green">-287_537</font> |
| 3   | sendTransaction          | 6_653_757    | 11_653_757 | $0.0000159656 | $15.96            | <font color="green">-389_406</font> |
| 4   | getCurrentFeePercentiles | 5_109_357    | 10_109_357 | $0.0000138498 | $13.84            | <font color="green">-292_847</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance               | 9_137_641    | 14_137_641 | $0.0000193686 | $19.36            |
| 1   | getUtxos                 | 11_240_379   | 16_240_379 | $0.0000222493 | $22.24            |
| 2   | getCurrentFeePercentiles | 5_400_146    | 10_400_146 | $0.0000142482 | $14.24            |
| 3   | sendTransaction          | 7_043_163    | 12_043_163 | $0.0000164991 | $16.49            |
| 4   | getCurrentFeePercentiles | 5_402_204    | 10_402_204 | $0.0000142510 | $14.25            |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
