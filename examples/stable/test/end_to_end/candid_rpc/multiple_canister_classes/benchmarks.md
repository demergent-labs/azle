# Benchmarks for multiple_canister_classes

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | methods2Text | 1_510_097    | 1_194_038 | $0.0000015877 | $1.58             |
| 1   | methods2Nat  | 1_177_530    | 1_061_012 | $0.0000014108 | $1.41             |
| 2   | methods3Text | 1_468_021    | 1_177_208 | $0.0000015653 | $1.56             |
| 3   | methods3Nat  | 1_174_914    | 1_059_965 | $0.0000014094 | $1.40             |
| 4   | methods5Text | 1_466_816    | 1_176_726 | $0.0000015647 | $1.56             |
| 5   | methods5Nat  | 1_180_437    | 1_062_174 | $0.0000014123 | $1.41             |

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
