# Benchmarks for persistent_storage

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade | 1_342_974_884 | 937_779_953 | $0.0012469379 | $1_246.93         | <font color="red">+318_032_114</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | postUpgrade | 1_024_942_770 | 810_567_108 | $0.0010777868 | $1_077.78         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
