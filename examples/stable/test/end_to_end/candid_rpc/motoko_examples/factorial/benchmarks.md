# Benchmarks for factorial

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | fac | 1_306_321 | 6_306_321 | $0.0000086397 | $8.63 | <font color="green">-26_493</font> |
| 1 | fac | 1_283_253 | 6_283_253 | $0.0000086081 | $8.60 | <font color="green">-32_583</font> |
| 2 | fac | 1_735_543 | 6_735_543 | $0.0000092277 | $9.22 | <font color="green">-62_792</font> |
| 3 | fac | 2_952_103 | 7_952_103 | $0.0000108944 | $10.89 | <font color="green">-140_944</font> |
| 4 | fac | 5_431_166 | 10_431_166 | $0.0000142907 | $14.29 | <font color="green">-277_293</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | fac | 1_332_814 | 6_332_814 | $0.0000086760 | $8.67 |
| 1 | fac | 1_315_836 | 6_315_836 | $0.0000086527 | $8.65 |
| 2 | fac | 1_798_335 | 6_798_335 | $0.0000093137 | $9.31 |
| 3 | fac | 3_093_047 | 8_093_047 | $0.0000110875 | $11.08 |
| 4 | fac | 5_708_459 | 10_708_459 | $0.0000146706 | $14.67 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).