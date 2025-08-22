# Benchmarks for multiple_canister_classes

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | methods2Text | 1_473_303 | 6_473_303 | $0.0000088684 | $8.86 | <font color="green">-41_653</font> |
| 1 | methods3Text | 1_428_045 | 6_428_045 | $0.0000088064 | $8.80 | <font color="red">+245_636</font> |
| 2 | methods5Text | 1_426_319 | 6_426_319 | $0.0000088041 | $8.80 | <font color="green">-44_523</font> |
| 3 | methods2Nat | 1_153_223 | 6_153_223 | $0.0000084299 | $8.42 | <font color="green">-28_246</font> |
| 4 | methods3Nat | 1_149_493 | 6_149_493 | $0.0000084248 | $8.42 | <font color="green">-323_207</font> |
| 5 | methods5Nat | 1_150_427 | 6_150_427 | $0.0000084261 | $8.42 | <font color="green">-29_277</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | methods2Text | 1_514_956 | 6_514_956 | $0.0000089255 | $8.92 |
| 1 | methods2Nat | 1_182_409 | 6_182_409 | $0.0000084699 | $8.46 |
| 2 | methods3Text | 1_470_842 | 6_470_842 | $0.0000088651 | $8.86 |
| 3 | methods3Nat | 1_181_469 | 6_181_469 | $0.0000084686 | $8.46 |
| 4 | methods5Text | 1_472_700 | 6_472_700 | $0.0000088676 | $8.86 |
| 5 | methods5Nat | 1_179_704 | 6_179_704 | $0.0000084662 | $8.46 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).