# Benchmarks for call_errors

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | test0 | 553_818_845 | 558_818_845 | $0.0007655818 | $765.58 | <font color="green">-16_891_293</font> |
| 1 | test1 | 888_258 | 5_888_258 | $0.0000080669 | $8.06 | <font color="red">+5_047</font> |
| 2 | test2 | 1_253_909 | 6_253_909 | $0.0000085679 | $8.56 | <font color="green">-752</font> |
| 3 | test3 | 8_429_807 | 13_429_807 | $0.0000183988 | $18.39 | <font color="green">-253_171</font> |
| 4 | test4 | 394_853_898 | 399_853_898 | $0.0005477998 | $547.79 | <font color="green">-16_633_437</font> |
| 5 | test5 | 8_273_763 | 13_273_763 | $0.0000181851 | $18.18 | <font color="green">-259_887</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | test0 | 570_710_138 | 575_710_138 | $0.0007887229 | $788.72 |
| 1 | test1 | 883_211 | 5_883_211 | $0.0000080600 | $8.05 |
| 2 | test2 | 1_254_661 | 6_254_661 | $0.0000085689 | $8.56 |
| 3 | test3 | 8_682_978 | 13_682_978 | $0.0000187457 | $18.74 |
| 4 | test4 | 411_487_335 | 416_487_335 | $0.0005705876 | $570.58 |
| 5 | test5 | 8_533_650 | 13_533_650 | $0.0000185411 | $18.54 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).