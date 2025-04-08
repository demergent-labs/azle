# Benchmarks for canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name           | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | --------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | updateCyclesBurn      | 1_842_798    | 1_327_119 | $0.0000017646 | $1.76             |
| 1   | assertCyclesBurnTypes | 1_230_802    | 1_082_320 | $0.0000014391 | $1.43             |

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
