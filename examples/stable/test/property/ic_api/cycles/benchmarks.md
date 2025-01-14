# Benchmarks for cycles

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveAllCycles              | 10_105_417   | 4_632_166 | $0.0000061593 | $6.15             |
| 1   | receiveVariableCycles         | 10_300_021   | 4_710_008 | $0.0000062628 | $6.26             |
| 2   | receiveNoCycles               | 10_053_607   | 4_611_442 | $0.0000061317 | $6.13             |
| 3   | receiveCyclesByChunk          | 10_702_715   | 4_871_086 | $0.0000064769 | $6.47             |
| 4   | assertMsgCyclesAcceptTypes    | 1_364_581    | 1_135_832 | $0.0000015103 | $1.51             |
| 5   | assertMsgCyclesAvailableTypes | 1_138_411    | 1_045_364 | $0.0000013900 | $1.38             |
| 6   | assertMsgCyclesAcceptTypes    | 1_365_789    | 1_136_315 | $0.0000015109 | $1.51             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendAllCycles                 | 2_103_473    | 1_431_389 | $0.0000019033 | $1.90             |
| 1   | sendVariableCycles            | 2_907_402    | 1_752_960 | $0.0000023309 | $2.33             |
| 2   | sendNoCycles                  | 2_040_393    | 1_406_157 | $0.0000018697 | $1.86             |
| 3   | sendCyclesByChunk             | 2_878_027    | 1_741_210 | $0.0000023152 | $2.31             |
| 4   | assertMsgCyclesAcceptTypes    | 2_637_332    | 1_644_932 | $0.0000021872 | $2.18             |
| 5   | assertMsgCyclesAvailableTypes | 1_802_154    | 1_310_861 | $0.0000017430 | $1.74             |
| 6   | assertMsgCyclesRefundedTypes  | 2_637_193    | 1_644_877 | $0.0000021871 | $2.18             |

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
