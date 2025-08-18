# Benchmarks for timers

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | setTimers | 9_579_303 | 14_579_303 | $0.0000199736 | $19.97 | <font color="green">-335_697</font> |
| 1 | clearTimer | 1_252_426 | 6_252_426 | $0.0000085658 | $8.56 | <font color="green">-9_829</font> |
| 2 | clearTimer | 1_248_734 | 6_248_734 | $0.0000085608 | $8.56 | <font color="green">-14_110</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | setTimers | 9_915_000 | 14_915_000 | $0.0000204336 | $20.43 |
| 1 | clearTimer | 1_262_255 | 6_262_255 | $0.0000085793 | $8.57 |
| 2 | clearTimer | 1_262_844 | 6_262_844 | $0.0000085801 | $8.58 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).