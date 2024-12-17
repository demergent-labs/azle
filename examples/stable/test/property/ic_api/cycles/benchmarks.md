# Benchmarks for cycles

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveAllCycles              | 9_404_159    | 4_351_663 | $0.0000057863 | $5.78             |
| 1   | receiveVariableCycles         | 9_600_146    | 4_430_058 | $0.0000058905 | $5.89             |
| 2   | receiveNoCycles               | 9_452_379    | 4_370_951 | $0.0000058119 | $5.81             |
| 3   | receiveCyclesByChunk          | 10_061_939   | 4_614_775 | $0.0000061361 | $6.13             |
| 4   | assertMsgCyclesAcceptTypes    | 1_280_854    | 1_102_341 | $0.0000014657 | $1.46             |
| 5   | assertMsgCyclesAvailableTypes | 1_061_183    | 1_014_473 | $0.0000013489 | $1.34             |
| 6   | assertMsgCyclesAcceptTypes    | 1_281_086    | 1_102_434 | $0.0000014659 | $1.46             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name                   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendAllCycles                 | 1_903_084    | 1_351_233 | $0.0000017967 | $1.79             |
| 1   | sendVariableCycles            | 2_686_481    | 1_664_592 | $0.0000022134 | $2.21             |
| 2   | sendNoCycles                  | 1_864_152    | 1_335_660 | $0.0000017760 | $1.77             |
| 3   | sendCyclesByChunk             | 2_668_849    | 1_657_539 | $0.0000022040 | $2.20             |
| 4   | assertMsgCyclesAcceptTypes    | 2_434_131    | 1_563_652 | $0.0000020791 | $2.07             |
| 5   | assertMsgCyclesAvailableTypes | 1_634_586    | 1_243_834 | $0.0000016539 | $1.65             |
| 6   | assertMsgCyclesRefundedTypes  | 2_435_093    | 1_564_037 | $0.0000020797 | $2.07             |

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
