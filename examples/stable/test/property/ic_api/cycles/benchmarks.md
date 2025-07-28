⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for cycles

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                                |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------------- |
| 0   | receiveAllCycles              | 8_632_854    | 4_043_141 | $0.0000053760 | $5.37             | <font color="green">-1_526_254</font> |
| 1   | receiveVariableCycles         | 8_581_479    | 4_022_591 | $0.0000053487 | $5.34             | <font color="green">-1_756_653</font> |
| 2   | receiveNoCycles               | 8_570_555    | 4_018_222 | $0.0000053429 | $5.34             | <font color="green">-1_491_109</font> |
| 3   | receiveCyclesByChunk          | 8_983_576    | 4_183_430 | $0.0000055626 | $5.56             | <font color="green">-1_401_626</font> |
| 4   | assertMsgCyclesAcceptTypes    | 1_254_979    | 1_091_991 | $0.0000014520 | $1.45             | <font color="green">-90_963</font>    |
| 5   | assertMsgCyclesAvailableTypes | 1_146_178    | 1_048_471 | $0.0000013941 | $1.39             | <font color="red">+27_399</font>      |
| 6   | assertMsgCyclesAcceptTypes    | 1_255_707    | 1_092_282 | $0.0000014524 | $1.45             | <font color="green">-90_735</font>    |

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

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | sendAllCycles                 | 1_501_562    | 1_190_624 | $0.0000015831 | $1.58             | <font color="green">-127_653</font> |
| 1   | sendVariableCycles            | 2_241_600    | 1_486_640 | $0.0000019767 | $1.97             | <font color="green">-642_839</font> |
| 2   | sendNoCycles                  | 1_429_297    | 1_161_718 | $0.0000015447 | $1.54             | <font color="green">-129_313</font> |
| 3   | sendCyclesByChunk             | 2_698_049    | 1_669_219 | $0.0000022195 | $2.21             | <font color="green">-187_350</font> |
| 4   | assertMsgCyclesAcceptTypes    | 2_096_691    | 1_428_676 | $0.0000018997 | $1.89             | <font color="green">-556_936</font> |
| 5   | assertMsgCyclesAvailableTypes | 1_259_309    | 1_093_723 | $0.0000014543 | $1.45             | <font color="green">-74_987</font>  |
| 6   | assertMsgCyclesRefundedTypes  | 2_096_401    | 1_428_560 | $0.0000018995 | $1.89             | <font color="green">-554_852</font> |

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
