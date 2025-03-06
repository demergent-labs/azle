# Benchmarks for cycles

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | receiveAllCycles              | 10_155_411   | 4_652_164 | $0.0000061858 | $6.18             | <font color="red">+44_723</font>    |
| 1   | receiveVariableCycles         | 10_279_095   | 4_701_638 | $0.0000062516 | $6.25             | <font color="red">+19_736</font>    |
| 2   | receiveNoCycles               | 10_081_677   | 4_622_670 | $0.0000061466 | $6.14             | <font color="green">-15_448</font>  |
| 3   | receiveCyclesByChunk          | 10_386_263   | 4_744_505 | $0.0000063086 | $6.30             | <font color="green">-162_230</font> |
| 4   | assertMsgCyclesAcceptTypes    | 1_343_061    | 1_127_224 | $0.0000014988 | $1.49             | <font color="green">-858</font>     |
| 5   | assertMsgCyclesAvailableTypes | 1_122_756    | 1_039_102 | $0.0000013817 | $1.38             | <font color="red">+2_618</font>     |
| 6   | assertMsgCyclesAcceptTypes    | 1_344_690    | 1_127_876 | $0.0000014997 | $1.49             | <font color="green">-924</font>     |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveAllCycles              | 10_110_688   | 4_634_275 | $0.0000061621 | $6.16             |
| 1   | receiveVariableCycles         | 10_259_359   | 4_693_743 | $0.0000062411 | $6.24             |
| 2   | receiveNoCycles               | 10_097_125   | 4_628_850 | $0.0000061548 | $6.15             |
| 3   | receiveCyclesByChunk          | 10_548_493   | 4_809_397 | $0.0000063949 | $6.39             |
| 4   | assertMsgCyclesAcceptTypes    | 1_343_919    | 1_127_567 | $0.0000014993 | $1.49             |
| 5   | assertMsgCyclesAvailableTypes | 1_120_138    | 1_038_055 | $0.0000013803 | $1.38             |
| 6   | assertMsgCyclesAcceptTypes    | 1_345_614    | 1_128_245 | $0.0000015002 | $1.50             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | sendAllCycles                 | 1_579_295    | 1_221_718 | $0.0000016245 | $1.62             | <font color="red">+3_973</font>   |
| 1   | sendVariableCycles            | 2_859_170    | 1_733_668 | $0.0000023052 | $2.30             | <font color="red">+2_414</font>   |
| 2   | sendNoCycles                  | 1_518_494    | 1_197_397 | $0.0000015921 | $1.59             | <font color="red">+510</font>     |
| 3   | sendCyclesByChunk             | 2_828_701    | 1_721_480 | $0.0000022890 | $2.28             | <font color="green">-7_580</font> |
| 4   | assertMsgCyclesAcceptTypes    | 2_600_121    | 1_630_048 | $0.0000021674 | $2.16             | <font color="red">+3_577</font>   |
| 5   | assertMsgCyclesAvailableTypes | 1_284_502    | 1_103_800 | $0.0000014677 | $1.46             | <font color="green">-1_033</font> |
| 6   | assertMsgCyclesRefundedTypes  | 2_599_644    | 1_629_857 | $0.0000021672 | $2.16             | <font color="red">+3_153</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendAllCycles                 | 1_575_322    | 1_220_128 | $0.0000016224 | $1.62             |
| 1   | sendVariableCycles            | 2_856_756    | 1_732_702 | $0.0000023039 | $2.30             |
| 2   | sendNoCycles                  | 1_517_984    | 1_197_193 | $0.0000015919 | $1.59             |
| 3   | sendCyclesByChunk             | 2_836_281    | 1_724_512 | $0.0000022930 | $2.29             |
| 4   | assertMsgCyclesAcceptTypes    | 2_596_544    | 1_628_617 | $0.0000021655 | $2.16             |
| 5   | assertMsgCyclesAvailableTypes | 1_285_535    | 1_104_214 | $0.0000014682 | $1.46             |
| 6   | assertMsgCyclesRefundedTypes  | 2_596_491    | 1_628_596 | $0.0000021655 | $2.16             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
