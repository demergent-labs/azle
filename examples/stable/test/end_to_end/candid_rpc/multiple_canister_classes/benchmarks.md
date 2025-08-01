⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for multiple_canister_classes

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | methods2Text | 1_514_956    | 1_195_982 | $0.0000015903 | $1.59             |
| 1   | methods2Nat  | 1_182_409    | 1_062_963 | $0.0000014134 | $1.41             |
| 2   | methods3Text | 1_470_842    | 1_178_336 | $0.0000015668 | $1.56             |
| 3   | methods3Nat  | 1_181_469    | 1_062_587 | $0.0000014129 | $1.41             |
| 4   | methods5Text | 1_472_700    | 1_179_080 | $0.0000015678 | $1.56             |
| 5   | methods5Nat  | 1_179_704    | 1_061_881 | $0.0000014120 | $1.41             |

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
