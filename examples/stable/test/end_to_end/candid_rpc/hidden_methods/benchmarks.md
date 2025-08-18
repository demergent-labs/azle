⚠️ **WARNING: Benchmark process failed for version 0.33.0**

# Benchmarks for hidden_methods

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | updateUndefined   | 1_663_351    | 1_255_340 | $0.0000016692 | $1.66             | <font color="green">-6_328</font> |
| 1   | updateHiddenFalse | 1_568_910    | 1_217_564 | $0.0000016190 | $1.61             | <font color="red">+6_064</font>   |
| 2   | updateHiddenTrue  | 1_557_016    | 1_212_806 | $0.0000016126 | $1.61             | <font color="red">+3_969</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | updateUndefined   | 1_669_679    | 1_257_871 | $0.0000016726 | $1.67             |
| 1   | updateHiddenFalse | 1_562_846    | 1_215_138 | $0.0000016157 | $1.61             |
| 2   | updateHiddenTrue  | 1_553_047    | 1_211_218 | $0.0000016105 | $1.61             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
