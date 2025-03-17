⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for hidden_methods

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | updateUndefined   | 1_669_679    | 1_257_871 | $0.0000016726 | $1.67             | <font color="green">-496</font> |
| 1   | updateHiddenFalse | 1_562_846    | 1_215_138 | $0.0000016157 | $1.61             | <font color="green">-256</font> |
| 2   | updateHiddenTrue  | 1_553_047    | 1_211_218 | $0.0000016105 | $1.61             | <font color="red">+3_303</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | updateUndefined   | 1_670_175    | 1_258_070 | $0.0000016728 | $1.67             |
| 1   | updateHiddenFalse | 1_563_102    | 1_215_240 | $0.0000016159 | $1.61             |
| 2   | updateHiddenTrue  | 1_549_744    | 1_209_897 | $0.0000016088 | $1.60             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
