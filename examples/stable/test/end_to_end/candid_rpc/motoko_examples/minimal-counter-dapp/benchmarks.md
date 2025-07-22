# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | count       | 1_235_284    | 1_084_113 | $0.0000014415 | $1.44             | <font color="red">+902</font>   |
| 1   | count       | 1_186_530    | 1_064_612 | $0.0000014156 | $1.41             | <font color="red">+7_393</font> |
| 2   | reset       | 1_185_936    | 1_064_374 | $0.0000014153 | $1.41             | <font color="red">+5_619</font> |
| 3   | count       | 1_193_285    | 1_067_314 | $0.0000014192 | $1.41             | <font color="red">+4_636</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_234_382    | 1_083_752 | $0.0000014410 | $1.44             |
| 1   | count       | 1_179_137    | 1_061_654 | $0.0000014116 | $1.41             |
| 2   | reset       | 1_180_317    | 1_062_126 | $0.0000014123 | $1.41             |
| 3   | count       | 1_188_649    | 1_065_459 | $0.0000014167 | $1.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
