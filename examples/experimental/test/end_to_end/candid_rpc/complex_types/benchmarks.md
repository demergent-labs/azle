# Benchmarks for complex_types

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | createUser     | 80_438_549   | 32_765_419 | $0.0000435672 | $43.56            | <font color="green">-311_181</font> |
| 1   | createThread   | 163_622_398  | 66_038_959 | $0.0000878100 | $87.81            | <font color="green">-816_266</font> |
| 2   | createPost     | 86_406_564   | 35_152_625 | $0.0000467414 | $46.74            | <font color="green">-446_956</font> |
| 3   | createReaction | 172_386_982  | 69_544_792 | $0.0000924716 | $92.47            | <font color="green">-758_968</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 80_749_730   | 32_889_892 | $0.0000437327 | $43.73            |
| 1   | createThread   | 164_438_664  | 66_365_465 | $0.0000882442 | $88.24            |
| 2   | createPost     | 86_853_520   | 35_331_408 | $0.0000469791 | $46.97            |
| 3   | createReaction | 173_145_950  | 69_848_380 | $0.0000928753 | $92.87            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
