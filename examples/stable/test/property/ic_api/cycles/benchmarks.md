# Benchmarks for cycles

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | receiveAllCycles | 8_270_621 | 13_270_621 | $0.0000181808 | $18.18 | <font color="green">-362_233</font> |
| 1 | receiveVariableCycles | 8_475_435 | 13_475_435 | $0.0000184613 | $18.46 | <font color="green">-106_044</font> |
| 2 | receiveNoCycles | 8_200_531 | 13_200_531 | $0.0000180847 | $18.08 | <font color="green">-370_024</font> |
| 3 | receiveCyclesByChunk | 9_113_429 | 14_113_429 | $0.0000193354 | $19.33 | <font color="red">+129_853</font> |
| 4 | assertMsgCyclesAcceptTypes | 1_225_770 | 6_225_770 | $0.0000085293 | $8.52 | <font color="green">-29_209</font> |
| 5 | assertMsgCyclesAvailableTypes | 1_118_487 | 6_118_487 | $0.0000083823 | $8.38 | <font color="green">-27_691</font> |
| 6 | assertMsgCyclesAcceptTypes | 1_224_127 | 6_224_127 | $0.0000085271 | $8.52 | <font color="green">-31_580</font> |

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
| 0 | sendAllCycles | 1_494_710 | 6_494_710 | $0.0000088978 | $8.89 | <font color="green">-6_852</font> |
| 1 | sendVariableCycles | 2_403_564 | 7_403_564 | $0.0000101429 | $10.14 | <font color="red">+161_964</font> |
| 2 | sendNoCycles | 1_426_587 | 6_426_587 | $0.0000088044 | $8.80 | <font color="green">-2_710</font> |
| 3 | sendCyclesByChunk | 2_705_185 | 7_705_185 | $0.0000105561 | $10.55 | <font color="red">+7_136</font> |
| 4 | assertMsgCyclesAcceptTypes | 2_036_128 | 7_036_128 | $0.0000096395 | $9.63 | <font color="green">-60_563</font> |
| 5 | assertMsgCyclesAvailableTypes | 1_251_876 | 6_251_876 | $0.0000085651 | $8.56 | <font color="green">-7_433</font> |
| 6 | assertMsgCyclesRefundedTypes | 2_034_156 | 7_034_156 | $0.0000096368 | $9.63 | <font color="green">-62_245</font> |

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