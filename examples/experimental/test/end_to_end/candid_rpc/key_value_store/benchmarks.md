# Benchmarks for key_value_store

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | set         | 1_422_219    | 1_158_887 | $0.0000015409 | $1.54             | <font color="red">+4_155</font> |
| 1   | set         | 1_393_256    | 1_147_302 | $0.0000015255 | $1.52             | <font color="red">+4_390</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 1_418_064    | 1_157_225 | $0.0000015387 | $1.53             |
| 1   | set         | 1_388_866    | 1_145_546 | $0.0000015232 | $1.52             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
