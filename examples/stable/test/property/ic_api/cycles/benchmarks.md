# Benchmarks for cycles

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | receiveAllCycles              | 10_167_053   | 4_656_821 | $0.0000061920 | $6.19             | <font color="red">+4_992</font>     |
| 1   | receiveVariableCycles         | 10_354_404   | 4_731_761 | $0.0000062917 | $6.29             | <font color="red">+28_322</font>    |
| 2   | receiveNoCycles               | 10_105_909   | 4_632_363 | $0.0000061595 | $6.15             | <font color="green">-3_627</font>   |
| 3   | receiveCyclesByChunk          | 10_561_794   | 4_814_717 | $0.0000064020 | $6.40             | <font color="green">-148_114</font> |
| 4   | assertMsgCyclesAcceptTypes    | 1_348_828    | 1_129_531 | $0.0000015019 | $1.50             | <font color="red">+2_760</font>     |
| 5   | assertMsgCyclesAvailableTypes | 1_121_981    | 1_038_792 | $0.0000013813 | $1.38             | <font color="green">-127</font>     |
| 6   | assertMsgCyclesAcceptTypes    | 1_350_574    | 1_130_229 | $0.0000015028 | $1.50             | <font color="red">+4_584</font>     |

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
| 0   | sendAllCycles                 | 1_629_104    | 1_241_641 | $0.0000016510 | $1.65             | <font color="red">+47_587</font> |
| 1   | sendVariableCycles            | 2_914_391    | 1_755_756 | $0.0000023346 | $2.33             | <font color="red">+79_177</font> |
| 2   | sendNoCycles                  | 1_566_361    | 1_216_544 | $0.0000016176 | $1.61             | <font color="red">+50_364</font> |
| 3   | sendCyclesByChunk             | 2_889_536    | 1_745_814 | $0.0000023214 | $2.32             | <font color="red">+51_341</font> |
| 4   | assertMsgCyclesAcceptTypes    | 2_651_215    | 1_650_486 | $0.0000021946 | $2.19             | <font color="red">+48_427</font> |
| 5   | assertMsgCyclesAvailableTypes | 1_335_455    | 1_124_182 | $0.0000014948 | $1.49             | <font color="red">+52_728</font> |
| 6   | assertMsgCyclesRefundedTypes  | 2_646_108    | 1_648_443 | $0.0000021919 | $2.19             | <font color="red">+46_332</font> |

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
