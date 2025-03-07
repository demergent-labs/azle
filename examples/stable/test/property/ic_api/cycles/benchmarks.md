# Benchmarks for cycles

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | receiveAllCycles              | 10_162_061   | 4_654_824 | $0.0000061894 | $6.18             | <font color="red">+51_424</font>   |
| 1   | receiveVariableCycles         | 10_326_082   | 4_720_432 | $0.0000062766 | $6.27             | <font color="green">-17_407</font> |
| 2   | receiveNoCycles               | 10_109_536   | 4_633_814 | $0.0000061614 | $6.16             | <font color="red">+11_228</font>   |
| 3   | receiveCyclesByChunk          | 10_709_908   | 4_873_963 | $0.0000064808 | $6.48             | <font color="red">+317_778</font>  |
| 4   | assertMsgCyclesAcceptTypes    | 1_346_068    | 1_128_427 | $0.0000015004 | $1.50             | <font color="red">+1_370</font>    |
| 5   | assertMsgCyclesAvailableTypes | 1_122_108    | 1_038_843 | $0.0000013813 | $1.38             | <font color="red">+2_437</font>    |
| 6   | assertMsgCyclesAcceptTypes    | 1_345_990    | 1_128_396 | $0.0000015004 | $1.50             | <font color="green">-682</font>    |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveAllCycles              | 10_110_637   | 4_634_254 | $0.0000061620 | $6.16             |
| 1   | receiveVariableCycles         | 10_343_489   | 4_727_395 | $0.0000062859 | $6.28             |
| 2   | receiveNoCycles               | 10_098_308   | 4_629_323 | $0.0000061555 | $6.15             |
| 3   | receiveCyclesByChunk          | 10_392_130   | 4_746_852 | $0.0000063117 | $6.31             |
| 4   | assertMsgCyclesAcceptTypes    | 1_344_698    | 1_127_879 | $0.0000014997 | $1.49             |
| 5   | assertMsgCyclesAvailableTypes | 1_119_671    | 1_037_868 | $0.0000013800 | $1.38             |
| 6   | assertMsgCyclesAcceptTypes    | 1_346_672    | 1_128_668 | $0.0000015008 | $1.50             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | sendAllCycles                 | 1_581_517    | 1_222_606 | $0.0000016257 | $1.62             | <font color="red">+6_162</font>    |
| 1   | sendVariableCycles            | 2_835_214    | 1_724_085 | $0.0000022925 | $2.29             | <font color="green">-28_017</font> |
| 2   | sendNoCycles                  | 1_515_997    | 1_196_398 | $0.0000015908 | $1.59             | <font color="green">-511</font>    |
| 3   | sendCyclesByChunk             | 2_838_195    | 1_725_278 | $0.0000022941 | $2.29             | <font color="green">-1_485</font>  |
| 4   | assertMsgCyclesAcceptTypes    | 2_602_788    | 1_631_115 | $0.0000021688 | $2.16             | <font color="red">+3_280</font>    |
| 5   | assertMsgCyclesAvailableTypes | 1_282_727    | 1_103_090 | $0.0000014667 | $1.46             | <font color="green">-4_834</font>  |
| 6   | assertMsgCyclesRefundedTypes  | 2_599_776    | 1_629_910 | $0.0000021672 | $2.16             | <font color="red">+1_225</font>    |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendAllCycles                 | 1_575_355    | 1_220_142 | $0.0000016224 | $1.62             |
| 1   | sendVariableCycles            | 2_863_231    | 1_735_292 | $0.0000023074 | $2.30             |
| 2   | sendNoCycles                  | 1_516_508    | 1_196_603 | $0.0000015911 | $1.59             |
| 3   | sendCyclesByChunk             | 2_839_680    | 1_725_872 | $0.0000022948 | $2.29             |
| 4   | assertMsgCyclesAcceptTypes    | 2_599_508    | 1_629_803 | $0.0000021671 | $2.16             |
| 5   | assertMsgCyclesAvailableTypes | 1_287_561    | 1_105_024 | $0.0000014693 | $1.46             |
| 6   | assertMsgCyclesRefundedTypes  | 2_598_551    | 1_629_420 | $0.0000021666 | $2.16             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
