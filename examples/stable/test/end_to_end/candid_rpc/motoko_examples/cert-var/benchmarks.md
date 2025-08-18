# Benchmarks for cert-var

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | set | 2_006_587 | 7_006_587 | $0.0000095990 | $9.59 | <font color="green">-74_749</font> |
| 1 | inc | 2_229_906 | 7_229_906 | $0.0000099050 | $9.90 | <font color="green">-84_116</font> |
| 2 | set | 1_980_436 | 6_980_436 | $0.0000095632 | $9.56 | <font color="green">-75_409</font> |
| 3 | inc | 2_226_168 | 7_226_168 | $0.0000098999 | $9.89 | <font color="green">-89_521</font> |
| 4 | set | 1_981_187 | 6_981_187 | $0.0000095642 | $9.56 | <font color="green">-71_010</font> |
| 5 | inc | 2_230_850 | 7_230_850 | $0.0000099063 | $9.90 | <font color="green">-83_884</font> |
| 6 | set | 1_978_959 | 6_978_959 | $0.0000095612 | $9.56 | <font color="green">-72_622</font> |
| 7 | inc | 2_229_400 | 7_229_400 | $0.0000099043 | $9.90 | <font color="green">-81_343</font> |
| 8 | set | 1_979_467 | 6_979_467 | $0.0000095619 | $9.56 | <font color="green">-74_572</font> |
| 9 | inc | 2_227_074 | 7_227_074 | $0.0000099011 | $9.90 | <font color="green">-87_509</font> |
| 10 | set | 1_979_799 | 6_979_799 | $0.0000095623 | $9.56 | <font color="green">-75_787</font> |
| 11 | inc | 2_225_058 | 7_225_058 | $0.0000098983 | $9.89 | <font color="green">-89_135</font> |
| 12 | set | 2_020_415 | 7_020_415 | $0.0000096180 | $9.61 | <font color="green">-68_940</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | set | 2_081_336 | 7_081_336 | $0.0000097014 | $9.70 |
| 1 | inc | 2_314_022 | 7_314_022 | $0.0000100202 | $10.02 |
| 2 | set | 2_055_845 | 7_055_845 | $0.0000096665 | $9.66 |
| 3 | inc | 2_315_689 | 7_315_689 | $0.0000100225 | $10.02 |
| 4 | set | 2_052_197 | 7_052_197 | $0.0000096615 | $9.66 |
| 5 | inc | 2_314_734 | 7_314_734 | $0.0000100212 | $10.02 |
| 6 | set | 2_051_581 | 7_051_581 | $0.0000096607 | $9.66 |
| 7 | inc | 2_310_743 | 7_310_743 | $0.0000100157 | $10.01 |
| 8 | set | 2_054_039 | 7_054_039 | $0.0000096640 | $9.66 |
| 9 | inc | 2_314_583 | 7_314_583 | $0.0000100210 | $10.02 |
| 10 | set | 2_055_586 | 7_055_586 | $0.0000096662 | $9.66 |
| 11 | inc | 2_314_193 | 7_314_193 | $0.0000100204 | $10.02 |
| 12 | set | 2_089_355 | 7_089_355 | $0.0000097124 | $9.71 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).