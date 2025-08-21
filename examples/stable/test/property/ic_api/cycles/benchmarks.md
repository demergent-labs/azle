# Benchmarks for cycles

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | receiveAllCycles | 8_270_704 | 13_270_704 | $0.0000181809 | $18.18 | <font color="green">-362_150</font> |
| 1 | receiveVariableCycles | 8_129_828 | 13_129_828 | $0.0000179879 | $17.98 | <font color="green">-451_651</font> |
| 2 | receiveNoCycles | 8_136_259 | 13_136_259 | $0.0000179967 | $17.99 | <font color="green">-434_296</font> |
| 3 | receiveCyclesByChunk | 8_637_440 | 13_637_440 | $0.0000186833 | $18.68 | <font color="green">-346_136</font> |
| 4 | assertMsgCyclesAcceptTypes | 1_226_993 | 6_226_993 | $0.0000085310 | $8.53 | <font color="green">-27_986</font> |
| 5 | assertMsgCyclesAvailableTypes | 1_121_188 | 6_121_188 | $0.0000083860 | $8.38 | <font color="green">-24_990</font> |
| 6 | assertMsgCyclesAcceptTypes | 1_229_442 | 6_229_442 | $0.0000085343 | $8.53 | <font color="green">-26_265</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | receiveAllCycles | 8_632_854 | 13_632_854 | $0.0000186770 | $18.67 |
| 1 | receiveVariableCycles | 8_581_479 | 13_581_479 | $0.0000186066 | $18.60 |
| 2 | receiveNoCycles | 8_570_555 | 13_570_555 | $0.0000185917 | $18.59 |
| 3 | receiveCyclesByChunk | 8_983_576 | 13_983_576 | $0.0000191575 | $19.15 |
| 4 | assertMsgCyclesAcceptTypes | 1_254_979 | 6_254_979 | $0.0000085693 | $8.56 |
| 5 | assertMsgCyclesAvailableTypes | 1_146_178 | 6_146_178 | $0.0000084203 | $8.42 |
| 6 | assertMsgCyclesAcceptTypes | 1_255_707 | 6_255_707 | $0.0000085703 | $8.57 |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | sendAllCycles | 1_427_037 | 6_427_037 | $0.0000088050 | $8.80 | <font color="green">-74_525</font> |
| 1 | sendVariableCycles | 2_276_494 | 7_276_494 | $0.0000099688 | $9.96 | <font color="red">+34_894</font> |
| 2 | sendNoCycles | 1_340_765 | 6_340_765 | $0.0000086868 | $8.68 | <font color="green">-88_532</font> |
| 3 | sendCyclesByChunk | 2_642_979 | 7_642_979 | $0.0000104709 | $10.47 | <font color="green">-55_070</font> |
| 4 | assertMsgCyclesAcceptTypes | 1_975_762 | 6_975_762 | $0.0000095568 | $9.55 | <font color="green">-120_929</font> |
| 5 | assertMsgCyclesAvailableTypes | 1_194_169 | 6_194_169 | $0.0000084860 | $8.48 | <font color="green">-65_140</font> |
| 6 | assertMsgCyclesRefundedTypes | 1_974_762 | 6_974_762 | $0.0000095554 | $9.55 | <font color="green">-121_639</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | sendAllCycles | 1_501_562 | 6_501_562 | $0.0000089071 | $8.90 |
| 1 | sendVariableCycles | 2_241_600 | 7_241_600 | $0.0000099210 | $9.92 |
| 2 | sendNoCycles | 1_429_297 | 6_429_297 | $0.0000088081 | $8.80 |
| 3 | sendCyclesByChunk | 2_698_049 | 7_698_049 | $0.0000105463 | $10.54 |
| 4 | assertMsgCyclesAcceptTypes | 2_096_691 | 7_096_691 | $0.0000097225 | $9.72 |
| 5 | assertMsgCyclesAvailableTypes | 1_259_309 | 6_259_309 | $0.0000085753 | $8.57 |
| 6 | assertMsgCyclesRefundedTypes | 2_096_401 | 7_096_401 | $0.0000097221 | $9.72 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).