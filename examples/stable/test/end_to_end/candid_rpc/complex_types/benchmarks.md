# Benchmarks for complex_types

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                                |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------- |
| 0   | createUser     | 18_718_271   | 23_718_271 | $0.0000324940 | $32.49            | <font color="green">-931_887</font>   |
| 1   | createThread   | 19_893_170   | 24_893_170 | $0.0000341036 | $34.10            | <font color="green">-979_731</font>   |
| 2   | createPost     | 22_349_868   | 27_349_868 | $0.0000374693 | $37.46            | <font color="green">-1_062_134</font> |
| 3   | createReaction | 25_327_203   | 30_327_203 | $0.0000415483 | $41.54            | <font color="green">-1_155_871</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 19_650_158   | 24_650_158 | $0.0000337707 | $33.77            |
| 1   | createThread   | 20_872_901   | 25_872_901 | $0.0000354459 | $35.44            |
| 2   | createPost     | 23_412_002   | 28_412_002 | $0.0000389244 | $38.92            |
| 3   | createReaction | 26_483_074   | 31_483_074 | $0.0000431318 | $43.13            |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
