# Benchmarks for cycles

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | receiveAllCycles              | 10_110_688   | 4_634_275 | $0.0000061621 | $6.16             | <font color="green">-90_872</font> |
| 1   | receiveVariableCycles         | 10_259_359   | 4_693_743 | $0.0000062411 | $6.24             | <font color="green">-45_277</font> |
| 2   | receiveNoCycles               | 10_097_125   | 4_628_850 | $0.0000061548 | $6.15             | <font color="green">-9_440</font>  |
| 3   | receiveCyclesByChunk          | 10_548_493   | 4_809_397 | $0.0000063949 | $6.39             | <font color="green">-4_784</font>  |
| 4   | assertMsgCyclesAcceptTypes    | 1_343_919    | 1_127_567 | $0.0000014993 | $1.49             | <font color="green">-10_799</font> |
| 5   | assertMsgCyclesAvailableTypes | 1_120_138    | 1_038_055 | $0.0000013803 | $1.38             | <font color="green">-9_267</font>  |
| 6   | assertMsgCyclesAcceptTypes    | 1_345_614    | 1_128_245 | $0.0000015002 | $1.50             | <font color="green">-11_218</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveAllCycles              | 10_201_560   | 4_670_624 | $0.0000062104 | $6.21             |
| 1   | receiveVariableCycles         | 10_304_636   | 4_711_854 | $0.0000062652 | $6.26             |
| 2   | receiveNoCycles               | 10_106_565   | 4_632_626 | $0.0000061599 | $6.15             |
| 3   | receiveCyclesByChunk          | 10_553_277   | 4_811_310 | $0.0000063975 | $6.39             |
| 4   | assertMsgCyclesAcceptTypes    | 1_354_718    | 1_131_887 | $0.0000015050 | $1.50             |
| 5   | assertMsgCyclesAvailableTypes | 1_129_405    | 1_041_762 | $0.0000013852 | $1.38             |
| 6   | assertMsgCyclesAcceptTypes    | 1_356_832    | 1_132_732 | $0.0000015062 | $1.50             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | sendAllCycles                 | 1_575_322    | 1_220_128 | $0.0000016224 | $1.62             | <font color="green">-10_740</font> |
| 1   | sendVariableCycles            | 2_856_756    | 1_732_702 | $0.0000023039 | $2.30             | <font color="green">-16_615</font> |
| 2   | sendNoCycles                  | 1_517_984    | 1_197_193 | $0.0000015919 | $1.59             | <font color="green">-2_906</font>  |
| 3   | sendCyclesByChunk             | 2_836_281    | 1_724_512 | $0.0000022930 | $2.29             | <font color="green">-12_667</font> |
| 4   | assertMsgCyclesAcceptTypes    | 2_596_544    | 1_628_617 | $0.0000021655 | $2.16             | <font color="green">-18_098</font> |
| 5   | assertMsgCyclesAvailableTypes | 1_285_535    | 1_104_214 | $0.0000014682 | $1.46             | <font color="green">-7_085</font>  |
| 6   | assertMsgCyclesRefundedTypes  | 2_596_491    | 1_628_596 | $0.0000021655 | $2.16             | <font color="green">-16_539</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendAllCycles                 | 1_586_062    | 1_224_424 | $0.0000016281 | $1.62             |
| 1   | sendVariableCycles            | 2_873_371    | 1_739_348 | $0.0000023128 | $2.31             |
| 2   | sendNoCycles                  | 1_520_890    | 1_198_356 | $0.0000015934 | $1.59             |
| 3   | sendCyclesByChunk             | 2_848_948    | 1_729_579 | $0.0000022998 | $2.29             |
| 4   | assertMsgCyclesAcceptTypes    | 2_614_642    | 1_635_856 | $0.0000021751 | $2.17             |
| 5   | assertMsgCyclesAvailableTypes | 1_292_620    | 1_107_048 | $0.0000014720 | $1.47             |
| 6   | assertMsgCyclesRefundedTypes  | 2_613_030    | 1_635_212 | $0.0000021743 | $2.17             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
