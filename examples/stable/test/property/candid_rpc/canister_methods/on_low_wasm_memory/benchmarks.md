# Benchmarks for canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | --------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addRandomBytes  | 1_206_245    | 1_072_498 | $0.0000014261 | $1.42             |
| 1   | addRandomBytes  | 1_136_095    | 1_044_438 | $0.0000013888 | $1.38             |
| 2   | addRandomBytes  | 1_137_376    | 1_044_950 | $0.0000013894 | $1.38             |
| 3   | addRandomBytes  | 1_141_370    | 1_046_548 | $0.0000013916 | $1.39             |
| 4   | addRandomBytes  | 1_139_106    | 1_045_642 | $0.0000013904 | $1.39             |
| 5   | addRandomBytes  | 1_138_581    | 1_045_432 | $0.0000013901 | $1.39             |
| 6   | addRandomBytes  | 1_139_888    | 1_045_955 | $0.0000013908 | $1.39             |
| 7   | onLowWasmMemory | 100_506      | 630_202   | $0.0000008380 | $0.83             |

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
