# Benchmarks for cycles

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveAllCycles              | 9_405_139    | 4_352_055 | $0.0000057868 | $5.78             |
| 1   | receiveVariableCycles         | 9_648_814    | 4_449_525 | $0.0000059164 | $5.91             |
| 2   | receiveNoCycles               | 9_449_659    | 4_369_863 | $0.0000058105 | $5.81             |
| 3   | receiveCyclesByChunk          | 9_945_748    | 4_568_299 | $0.0000060743 | $6.07             |
| 4   | assertMsgCyclesAcceptTypes    | 1_280_854    | 1_102_341 | $0.0000014657 | $1.46             |
| 5   | assertMsgCyclesAvailableTypes | 1_061_183    | 1_014_473 | $0.0000013489 | $1.34             |
| 6   | assertMsgCyclesAcceptTypes    | 1_281_086    | 1_102_434 | $0.0000014659 | $1.46             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendAllCycles                 | 1_903_107    | 1_351_242 | $0.0000017967 | $1.79             |
| 1   | sendVariableCycles            | 2_666_270    | 1_656_508 | $0.0000022026 | $2.20             |
| 2   | sendNoCycles                  | 1_864_150    | 1_335_660 | $0.0000017760 | $1.77             |
| 3   | sendCyclesByChunk             | 2_668_890    | 1_657_556 | $0.0000022040 | $2.20             |
| 4   | assertMsgCyclesAcceptTypes    | 2_434_184    | 1_563_673 | $0.0000020792 | $2.07             |
| 5   | assertMsgCyclesAvailableTypes | 1_634_632    | 1_243_852 | $0.0000016539 | $1.65             |
| 6   | assertMsgCyclesRefundedTypes  | 2_434_994    | 1_563_997 | $0.0000020796 | $2.07             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
