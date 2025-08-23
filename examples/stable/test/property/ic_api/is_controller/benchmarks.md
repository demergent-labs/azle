# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | updateIsController | 1_296_646    | 6_296_646 | $0.0000086264 | $8.62             | <font color="green">-22_440</font> |
| 1   | updateIsController | 1_249_185    | 6_249_185 | $0.0000085614 | $8.56             | <font color="green">-27_962</font> |
| 2   | updateIsController | 1_247_086    | 6_247_086 | $0.0000085585 | $8.55             | <font color="green">-29_332</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | updateIsController | 1_319_086    | 6_319_086 | $0.0000086571 | $8.65             |
| 1   | updateIsController | 1_277_147    | 6_277_147 | $0.0000085997 | $8.59             |
| 2   | updateIsController | 1_276_418    | 6_276_418 | $0.0000085987 | $8.59             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
