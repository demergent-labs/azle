# Benchmarks for counter

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- | --------------------------------- |
| 0   | set         | 989_845      | 985_938 | $0.0000013110 | $1.31             | <font color="green">-3_493</font> |
| 1   | inc         | 855_217      | 932_086 | $0.0000012394 | $1.23             | <font color="red">+5_638</font>   |
| 2   | inc         | 854_836      | 931_934 | $0.0000012392 | $1.23             | <font color="red">+4_003</font>   |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- |
| 0   | set         | 993_338      | 987_335 | $0.0000013128 | $1.31             |
| 1   | inc         | 849_579      | 929_831 | $0.0000012364 | $1.23             |
| 2   | inc         | 850_833      | 930_333 | $0.0000012370 | $1.23             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
