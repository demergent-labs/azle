# Benchmarks for calc

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | add | 1_320_015 | 6_320_015 | $0.0000086584 | $8.65 | <font color="green">-39_573</font> |
| 1 | sub | 1_274_265 | 6_274_265 | $0.0000085957 | $8.59 | <font color="green">-42_721</font> |
| 2 | mul | 1_284_157 | 6_284_157 | $0.0000086093 | $8.60 | <font color="green">-34_128</font> |
| 3 | div | 1_594_471 | 6_594_471 | $0.0000090344 | $9.03 | <font color="green">-70_740</font> |
| 4 | clearall | 927_853 | 5_927_853 | $0.0000081212 | $8.12 | <font color="green">-17_373</font> |
| 5 | add | 1_273_466 | 6_273_466 | $0.0000085946 | $8.59 | <font color="green">-40_147</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | add | 1_359_588 | 6_359_588 | $0.0000087126 | $8.71 |
| 1 | sub | 1_316_986 | 6_316_986 | $0.0000086543 | $8.65 |
| 2 | mul | 1_318_285 | 6_318_285 | $0.0000086561 | $8.65 |
| 3 | div | 1_665_211 | 6_665_211 | $0.0000091313 | $9.13 |
| 4 | clearall | 945_226 | 5_945_226 | $0.0000081450 | $8.14 |
| 5 | add | 1_313_613 | 6_313_613 | $0.0000086496 | $8.64 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).