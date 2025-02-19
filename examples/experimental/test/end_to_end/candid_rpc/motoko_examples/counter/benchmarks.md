# Benchmarks for counter

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- | -------------------------------- |
| 0   | set         | 1_000_686    | 990_274 | $0.0000013167 | $1.31             | <font color="red">+10_822</font> |
| 1   | inc         | 856_277      | 932_510 | $0.0000012399 | $1.23             | <font color="red">+2_839</font>  |
| 2   | inc         | 856_277      | 932_510 | $0.0000012399 | $1.23             | <font color="red">+1_980</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- |
| 0   | set         | 989_864      | 985_945 | $0.0000013110 | $1.31             |
| 1   | inc         | 853_438      | 931_375 | $0.0000012384 | $1.23             |
| 2   | inc         | 854_297      | 931_718 | $0.0000012389 | $1.23             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
