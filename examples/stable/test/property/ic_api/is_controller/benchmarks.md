# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | updateIsController | 1_289_742 | 6_289_742 | $0.0000086169 | $8.61 | <font color="green">-29_344</font> |
| 1 | updateIsController | 1_245_284 | 6_245_284 | $0.0000085560 | $8.55 | <font color="green">-31_863</font> |
| 2 | updateIsController | 1_245_298 | 6_245_298 | $0.0000085561 | $8.55 | <font color="green">-31_120</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | updateIsController | 1_319_086 | 6_319_086 | $0.0000086571 | $8.65 |
| 1 | updateIsController | 1_277_147 | 6_277_147 | $0.0000085997 | $8.59 |
| 2 | updateIsController | 1_276_418 | 6_276_418 | $0.0000085987 | $8.59 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).