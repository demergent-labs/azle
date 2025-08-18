# Benchmarks for cycles

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | receiveAllCycles | 7_993_441 | 12_993_441 | $0.0000178010 | $17.80 | <font color="green">-639_413</font> |
| 1 | receiveVariableCycles | 8_390_048 | 13_390_048 | $0.0000183444 | $18.34 | <font color="green">-191_431</font> |
| 2 | receiveNoCycles | 8_213_673 | 13_213_673 | $0.0000181027 | $18.10 | <font color="green">-356_882</font> |
| 3 | receiveCyclesByChunk | 8_328_016 | 13_328_016 | $0.0000182594 | $18.25 | <font color="green">-655_560</font> |
| 4 | assertMsgCyclesAcceptTypes | 1_224_966 | 6_224_966 | $0.0000085282 | $8.52 | <font color="green">-30_013</font> |
| 5 | assertMsgCyclesAvailableTypes | 1_118_471 | 6_118_471 | $0.0000083823 | $8.38 | <font color="green">-27_707</font> |
| 6 | assertMsgCyclesAcceptTypes | 1_226_749 | 6_226_749 | $0.0000085306 | $8.53 | <font color="green">-28_958</font> |

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
| 0 | sendAllCycles | 1_430_529 | 6_430_529 | $0.0000088098 | $8.80 | <font color="green">-71_033</font> |
| 1 | sendVariableCycles | 2_398_596 | 7_398_596 | $0.0000101361 | $10.13 | <font color="red">+156_996</font> |
| 2 | sendNoCycles | 1_425_351 | 6_425_351 | $0.0000088027 | $8.80 | <font color="green">-3_946</font> |
| 3 | sendCyclesByChunk | 2_632_680 | 7_632_680 | $0.0000104568 | $10.45 | <font color="green">-65_369</font> |
| 4 | assertMsgCyclesAcceptTypes | 2_036_731 | 7_036_731 | $0.0000096403 | $9.64 | <font color="green">-59_960</font> |
| 5 | assertMsgCyclesAvailableTypes | 1_253_134 | 6_253_134 | $0.0000085668 | $8.56 | <font color="green">-6_175</font> |
| 6 | assertMsgCyclesRefundedTypes | 2_033_836 | 7_033_836 | $0.0000096364 | $9.63 | <font color="green">-62_565</font> |

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