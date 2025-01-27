# Benchmarks for cycles

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveAllCycles              | 10_090_454   | 4_626_181 | $0.0000061513 | $6.15             |
| 1   | receiveVariableCycles         | 10_274_407   | 4_699_762 | $0.0000062491 | $6.24             |
| 2   | receiveNoCycles               | 10_050_449   | 4_610_179 | $0.0000061300 | $6.13             |
| 3   | receiveCyclesByChunk          | 10_648_980   | 4_849_592 | $0.0000064484 | $6.44             |
| 4   | assertMsgCyclesAcceptTypes    | 1_365_967    | 1_136_386 | $0.0000015110 | $1.51             |
| 5   | assertMsgCyclesAvailableTypes | 1_140_643    | 1_046_257 | $0.0000013912 | $1.39             |
| 6   | assertMsgCyclesAcceptTypes    | 1_370_921    | 1_138_368 | $0.0000015137 | $1.51             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendAllCycles                 | 2_098_824    | 1_429_529 | $0.0000019008 | $1.90             |
| 1   | sendVariableCycles            | 2_901_276    | 1_750_510 | $0.0000023276 | $2.32             |
| 2   | sendNoCycles                  | 2_042_537    | 1_407_014 | $0.0000018709 | $1.87             |
| 3   | sendCyclesByChunk             | 2_885_617    | 1_744_246 | $0.0000023193 | $2.31             |
| 4   | assertMsgCyclesAcceptTypes    | 2_633_571    | 1_643_428 | $0.0000021852 | $2.18             |
| 5   | assertMsgCyclesAvailableTypes | 1_802_863    | 1_311_145 | $0.0000017434 | $1.74             |
| 6   | assertMsgCyclesRefundedTypes  | 2_637_423    | 1_644_969 | $0.0000021873 | $2.18             |

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
