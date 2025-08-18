# Benchmarks for null_example

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | setPartiallyNullRecord | 5_817_872 | 10_817_872 | $0.0000148205 | $14.82 | <font color="green">-183_533</font> |
| 1 | setSmallNullRecord | 4_229_074 | 9_229_074 | $0.0000126438 | $12.64 | <font color="green">-132_728</font> |
| 2 | setLargeNullRecord | 5_507_188 | 10_507_188 | $0.0000143948 | $14.39 | <font color="green">-166_446</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | setPartiallyNullRecord | 6_001_405 | 11_001_405 | $0.0000150719 | $15.07 |
| 1 | setSmallNullRecord | 4_361_802 | 9_361_802 | $0.0000128257 | $12.82 |
| 2 | setLargeNullRecord | 5_673_634 | 10_673_634 | $0.0000146229 | $14.62 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).