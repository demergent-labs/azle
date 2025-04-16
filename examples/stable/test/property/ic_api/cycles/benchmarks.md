# Benchmarks for cycles

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | receiveAllCycles              | 10_069_580   | 4_617_832 | $0.0000061402 | $6.14             | <font color="green">-89_528</font> |
| 1   | receiveVariableCycles         | 10_373_516   | 4_739_406 | $0.0000063018 | $6.30             | <font color="red">+35_384</font>   |
| 2   | receiveNoCycles               | 10_106_938   | 4_632_775 | $0.0000061601 | $6.16             | <font color="red">+45_274</font>   |
| 3   | receiveCyclesByChunk          | 10_380_455   | 4_742_182 | $0.0000063055 | $6.30             | <font color="green">-4_747</font>  |
| 4   | assertMsgCyclesAcceptTypes    | 1_343_356    | 1_127_342 | $0.0000014990 | $1.49             | <font color="green">-2_586</font>  |
| 5   | assertMsgCyclesAvailableTypes | 1_123_203    | 1_039_281 | $0.0000013819 | $1.38             | <font color="red">+4_424</font>    |
| 6   | assertMsgCyclesAcceptTypes    | 1_345_511    | 1_128_204 | $0.0000015001 | $1.50             | <font color="green">-931</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveAllCycles              | 10_159_108   | 4_653_643 | $0.0000061878 | $6.18             |
| 1   | receiveVariableCycles         | 10_338_132   | 4_725_252 | $0.0000062830 | $6.28             |
| 2   | receiveNoCycles               | 10_061_664   | 4_614_665 | $0.0000061360 | $6.13             |
| 3   | receiveCyclesByChunk          | 10_385_202   | 4_744_080 | $0.0000063081 | $6.30             |
| 4   | assertMsgCyclesAcceptTypes    | 1_345_942    | 1_128_376 | $0.0000015004 | $1.50             |
| 5   | assertMsgCyclesAvailableTypes | 1_118_779    | 1_037_511 | $0.0000013795 | $1.37             |
| 6   | assertMsgCyclesAcceptTypes    | 1_346_442    | 1_128_576 | $0.0000015006 | $1.50             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | sendAllCycles                 | 1_623_845    | 1_239_538 | $0.0000016482 | $1.64             | <font color="green">-5_370</font> |
| 1   | sendVariableCycles            | 2_912_515    | 1_755_006 | $0.0000023336 | $2.33             | <font color="red">+28_076</font>  |
| 2   | sendNoCycles                  | 1_564_003    | 1_215_601 | $0.0000016163 | $1.61             | <font color="red">+5_393</font>   |
| 3   | sendCyclesByChunk             | 2_891_821    | 1_746_728 | $0.0000023226 | $2.32             | <font color="red">+6_422</font>   |
| 4   | assertMsgCyclesAcceptTypes    | 2_648_124    | 1_649_249 | $0.0000021930 | $2.19             | <font color="green">-5_503</font> |
| 5   | assertMsgCyclesAvailableTypes | 1_332_769    | 1_123_107 | $0.0000014934 | $1.49             | <font color="green">-1_527</font> |
| 6   | assertMsgCyclesRefundedTypes  | 2_647_638    | 1_649_055 | $0.0000021927 | $2.19             | <font color="green">-3_615</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendAllCycles                 | 1_629_215    | 1_241_686 | $0.0000016510 | $1.65             |
| 1   | sendVariableCycles            | 2_884_439    | 1_743_775 | $0.0000023186 | $2.31             |
| 2   | sendNoCycles                  | 1_558_610    | 1_213_444 | $0.0000016135 | $1.61             |
| 3   | sendCyclesByChunk             | 2_885_399    | 1_744_159 | $0.0000023192 | $2.31             |
| 4   | assertMsgCyclesAcceptTypes    | 2_653_627    | 1_651_450 | $0.0000021959 | $2.19             |
| 5   | assertMsgCyclesAvailableTypes | 1_334_296    | 1_123_718 | $0.0000014942 | $1.49             |
| 6   | assertMsgCyclesRefundedTypes  | 2_651_253    | 1_650_501 | $0.0000021946 | $2.19             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
