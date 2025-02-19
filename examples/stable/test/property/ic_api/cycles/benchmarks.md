# Benchmarks for cycles

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | receiveAllCycles              | 10_201_560   | 4_670_624 | $0.0000062104 | $6.21             | <font color="red">+96_143</font>    |
| 1   | receiveVariableCycles         | 10_304_636   | 4_711_854 | $0.0000062652 | $6.26             | <font color="red">+4_615</font>     |
| 2   | receiveNoCycles               | 10_106_565   | 4_632_626 | $0.0000061599 | $6.15             | <font color="red">+52_958</font>    |
| 3   | receiveCyclesByChunk          | 10_553_277   | 4_811_310 | $0.0000063975 | $6.39             | <font color="green">-149_438</font> |
| 4   | assertMsgCyclesAcceptTypes    | 1_354_718    | 1_131_887 | $0.0000015050 | $1.50             | <font color="green">-9_863</font>   |
| 5   | assertMsgCyclesAvailableTypes | 1_129_405    | 1_041_762 | $0.0000013852 | $1.38             | <font color="green">-9_006</font>   |
| 6   | assertMsgCyclesAcceptTypes    | 1_356_832    | 1_132_732 | $0.0000015062 | $1.50             | <font color="green">-8_957</font>   |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveAllCycles              | 10_105_417   | 4_632_166 | $0.0000061593 | $6.15             |
| 1   | receiveVariableCycles         | 10_300_021   | 4_710_008 | $0.0000062628 | $6.26             |
| 2   | receiveNoCycles               | 10_053_607   | 4_611_442 | $0.0000061317 | $6.13             |
| 3   | receiveCyclesByChunk          | 10_702_715   | 4_871_086 | $0.0000064769 | $6.47             |
| 4   | assertMsgCyclesAcceptTypes    | 1_364_581    | 1_135_832 | $0.0000015103 | $1.51             |
| 5   | assertMsgCyclesAvailableTypes | 1_138_411    | 1_045_364 | $0.0000013900 | $1.38             |
| 6   | assertMsgCyclesAcceptTypes    | 1_365_789    | 1_136_315 | $0.0000015109 | $1.51             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | sendAllCycles                 | 1_586_062    | 1_224_424 | $0.0000016281 | $1.62             | <font color="green">-517_411</font> |
| 1   | sendVariableCycles            | 2_873_371    | 1_739_348 | $0.0000023128 | $2.31             | <font color="green">-34_031</font>  |
| 2   | sendNoCycles                  | 1_520_890    | 1_198_356 | $0.0000015934 | $1.59             | <font color="green">-519_503</font> |
| 3   | sendCyclesByChunk             | 2_848_948    | 1_729_579 | $0.0000022998 | $2.29             | <font color="green">-29_079</font>  |
| 4   | assertMsgCyclesAcceptTypes    | 2_614_642    | 1_635_856 | $0.0000021751 | $2.17             | <font color="green">-22_690</font>  |
| 5   | assertMsgCyclesAvailableTypes | 1_292_620    | 1_107_048 | $0.0000014720 | $1.47             | <font color="green">-509_534</font> |
| 6   | assertMsgCyclesRefundedTypes  | 2_613_030    | 1_635_212 | $0.0000021743 | $2.17             | <font color="green">-24_163</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendAllCycles                 | 2_103_473    | 1_431_389 | $0.0000019033 | $1.90             |
| 1   | sendVariableCycles            | 2_907_402    | 1_752_960 | $0.0000023309 | $2.33             |
| 2   | sendNoCycles                  | 2_040_393    | 1_406_157 | $0.0000018697 | $1.86             |
| 3   | sendCyclesByChunk             | 2_878_027    | 1_741_210 | $0.0000023152 | $2.31             |
| 4   | assertMsgCyclesAcceptTypes    | 2_637_332    | 1_644_932 | $0.0000021872 | $2.18             |
| 5   | assertMsgCyclesAvailableTypes | 1_802_154    | 1_310_861 | $0.0000017430 | $1.74             |
| 6   | assertMsgCyclesRefundedTypes  | 2_637_193    | 1_644_877 | $0.0000021871 | $2.18             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
