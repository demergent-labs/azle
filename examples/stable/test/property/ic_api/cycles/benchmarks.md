# Benchmarks for cycles

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | receiveAllCycles              | 10_110_637   | 4_634_254 | $0.0000061620 | $6.16             | <font color="green">-51</font>      |
| 1   | receiveVariableCycles         | 10_343_489   | 4_727_395 | $0.0000062859 | $6.28             | <font color="red">+84_130</font>    |
| 2   | receiveNoCycles               | 10_098_308   | 4_629_323 | $0.0000061555 | $6.15             | <font color="red">+1_183</font>     |
| 3   | receiveCyclesByChunk          | 10_392_130   | 4_746_852 | $0.0000063117 | $6.31             | <font color="green">-156_363</font> |
| 4   | assertMsgCyclesAcceptTypes    | 1_344_698    | 1_127_879 | $0.0000014997 | $1.49             | <font color="red">+779</font>       |
| 5   | assertMsgCyclesAvailableTypes | 1_119_671    | 1_037_868 | $0.0000013800 | $1.38             | <font color="green">-467</font>     |
| 6   | assertMsgCyclesAcceptTypes    | 1_346_672    | 1_128_668 | $0.0000015008 | $1.50             | <font color="red">+1_058</font>     |

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
| 0   | sendAllCycles                 | 1_575_355    | 1_220_142 | $0.0000016224 | $1.62             | <font color="red">+33</font>      |
| 1   | sendVariableCycles            | 2_863_231    | 1_735_292 | $0.0000023074 | $2.30             | <font color="red">+6_475</font>   |
| 2   | sendNoCycles                  | 1_516_508    | 1_196_603 | $0.0000015911 | $1.59             | <font color="green">-1_476</font> |
| 3   | sendCyclesByChunk             | 2_839_680    | 1_725_872 | $0.0000022948 | $2.29             | <font color="red">+3_399</font>   |
| 4   | assertMsgCyclesAcceptTypes    | 2_599_508    | 1_629_803 | $0.0000021671 | $2.16             | <font color="red">+2_964</font>   |
| 5   | assertMsgCyclesAvailableTypes | 1_287_561    | 1_105_024 | $0.0000014693 | $1.46             | <font color="red">+2_026</font>   |
| 6   | assertMsgCyclesRefundedTypes  | 2_598_551    | 1_629_420 | $0.0000021666 | $2.16             | <font color="red">+2_060</font>   |

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
