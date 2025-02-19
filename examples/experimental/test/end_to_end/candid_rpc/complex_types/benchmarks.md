# Benchmarks for complex_types

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser     | 80_749_730   | 32_889_892 | $0.0000437327 | $43.73            | <font color="red">+74_853</font>   |
| 1   | createThread   | 164_438_664  | 66_365_465 | $0.0000882442 | $88.24            | <font color="red">+224_460</font>  |
| 2   | createPost     | 86_853_520   | 35_331_408 | $0.0000469791 | $46.97            | <font color="green">-49_880</font> |
| 3   | createReaction | 173_145_950  | 69_848_380 | $0.0000928753 | $92.87            | <font color="red">+115_812</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 80_674_877   | 32_859_950 | $0.0000436929 | $43.69            |
| 1   | createThread   | 164_214_204  | 66_275_681 | $0.0000881248 | $88.12            |
| 2   | createPost     | 86_903_400   | 35_351_360 | $0.0000470056 | $47.00            |
| 3   | createReaction | 173_030_138  | 69_802_055 | $0.0000928137 | $92.81            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
