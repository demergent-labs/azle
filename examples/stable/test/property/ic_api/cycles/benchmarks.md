⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for cycles

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | receiveAllCycles              | 10_159_108   | 4_653_643 | $0.0000061878 | $6.18             | <font color="green">-2_953</font>   |
| 1   | receiveVariableCycles         | 10_338_132   | 4_725_252 | $0.0000062830 | $6.28             | <font color="red">+12_050</font>    |
| 2   | receiveNoCycles               | 10_061_664   | 4_614_665 | $0.0000061360 | $6.13             | <font color="green">-47_872</font>  |
| 3   | receiveCyclesByChunk          | 10_385_202   | 4_744_080 | $0.0000063081 | $6.30             | <font color="green">-324_706</font> |
| 4   | assertMsgCyclesAcceptTypes    | 1_345_942    | 1_128_376 | $0.0000015004 | $1.50             | <font color="green">-126</font>     |
| 5   | assertMsgCyclesAvailableTypes | 1_118_779    | 1_037_511 | $0.0000013795 | $1.37             | <font color="green">-3_329</font>   |
| 6   | assertMsgCyclesAcceptTypes    | 1_346_442    | 1_128_576 | $0.0000015006 | $1.50             | <font color="red">+452</font>       |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveAllCycles              | 10_162_061   | 4_654_824 | $0.0000061894 | $6.18             |
| 1   | receiveVariableCycles         | 10_326_082   | 4_720_432 | $0.0000062766 | $6.27             |
| 2   | receiveNoCycles               | 10_109_536   | 4_633_814 | $0.0000061614 | $6.16             |
| 3   | receiveCyclesByChunk          | 10_709_908   | 4_873_963 | $0.0000064808 | $6.48             |
| 4   | assertMsgCyclesAcceptTypes    | 1_346_068    | 1_128_427 | $0.0000015004 | $1.50             |
| 5   | assertMsgCyclesAvailableTypes | 1_122_108    | 1_038_843 | $0.0000013813 | $1.38             |
| 6   | assertMsgCyclesAcceptTypes    | 1_345_990    | 1_128_396 | $0.0000015004 | $1.50             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | sendAllCycles                 | 1_629_215    | 1_241_686 | $0.0000016510 | $1.65             | <font color="red">+47_698</font> |
| 1   | sendVariableCycles            | 2_884_439    | 1_743_775 | $0.0000023186 | $2.31             | <font color="red">+49_225</font> |
| 2   | sendNoCycles                  | 1_558_610    | 1_213_444 | $0.0000016135 | $1.61             | <font color="red">+42_613</font> |
| 3   | sendCyclesByChunk             | 2_885_399    | 1_744_159 | $0.0000023192 | $2.31             | <font color="red">+47_204</font> |
| 4   | assertMsgCyclesAcceptTypes    | 2_653_627    | 1_651_450 | $0.0000021959 | $2.19             | <font color="red">+50_839</font> |
| 5   | assertMsgCyclesAvailableTypes | 1_334_296    | 1_123_718 | $0.0000014942 | $1.49             | <font color="red">+51_569</font> |
| 6   | assertMsgCyclesRefundedTypes  | 2_651_253    | 1_650_501 | $0.0000021946 | $2.19             | <font color="red">+51_477</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendAllCycles                 | 1_581_517    | 1_222_606 | $0.0000016257 | $1.62             |
| 1   | sendVariableCycles            | 2_835_214    | 1_724_085 | $0.0000022925 | $2.29             |
| 2   | sendNoCycles                  | 1_515_997    | 1_196_398 | $0.0000015908 | $1.59             |
| 3   | sendCyclesByChunk             | 2_838_195    | 1_725_278 | $0.0000022941 | $2.29             |
| 4   | assertMsgCyclesAcceptTypes    | 2_602_788    | 1_631_115 | $0.0000021688 | $2.16             |
| 5   | assertMsgCyclesAvailableTypes | 1_282_727    | 1_103_090 | $0.0000014667 | $1.46             |
| 6   | assertMsgCyclesRefundedTypes  | 2_599_776    | 1_629_910 | $0.0000021672 | $2.16             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
