# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | postUpgrade | 1_014_479_941 | 1_019_479_941 | $0.0013966875 | $1_396.68 | <font color="red">+12_340_684</font> |
| 1 | getUpdateCaller | 1_239_611 | 6_239_611 | $0.0000085483 | $8.54 | <font color="green">-49_561</font> |
| 2 | setInspectMessageCaller | 935_045 | 5_935_045 | $0.0000081310 | $8.13 | <font color="green">-24_041</font> |
| 3 | getUpdateCaller | 1_212_748 | 6_212_748 | $0.0000085115 | $8.51 | <font color="green">-48_485</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | postUpgrade | 1_002_139_257 | 1_007_139_257 | $0.0013797808 | $1_379.78 |
| 1 | getUpdateCaller | 1_289_172 | 6_289_172 | $0.0000086162 | $8.61 |
| 2 | setInspectMessageCaller | 959_086 | 5_959_086 | $0.0000081639 | $8.16 |
| 3 | getUpdateCaller | 1_261_233 | 6_261_233 | $0.0000085779 | $8.57 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).