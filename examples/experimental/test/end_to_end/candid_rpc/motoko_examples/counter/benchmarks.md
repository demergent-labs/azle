# Benchmarks for counter

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls | Change                          |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- | ------------------------------- |
| 0   | set         | 998_544      | 989_417 | $0.0000013156 | $1.31             | <font color="red">+1_515</font> |
| 1   | inc         | 855_460      | 932_184 | $0.0000012395 | $1.23             | <font color="red">+639</font>   |
| 2   | inc         | 855_982      | 932_392 | $0.0000012398 | $1.23             | <font color="red">+1_075</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- |
| 0   | set         | 997_029      | 988_811 | $0.0000013148 | $1.31             |
| 1   | inc         | 854_821      | 931_928 | $0.0000012392 | $1.23             |
| 2   | inc         | 854_907      | 931_962 | $0.0000012392 | $1.23             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
