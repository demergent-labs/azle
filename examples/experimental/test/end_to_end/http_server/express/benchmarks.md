# Benchmarks for express

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 7_531_184_754 | 5_813_063_901 | $0.0077294567 | $7_729.45         | <font color="red">+74_420</font>   |
| 1   | http_request_update | 53_635_148    | 22_044_059    | $0.0000293113 | $29.31            | <font color="green">-15_299</font> |
| 2   | http_request_update | 47_211_720    | 19_474_688    | $0.0000258949 | $25.89            | <font color="red">+32_397</font>   |
| 3   | http_request_update | 44_231_205    | 18_282_482    | $0.0000243097 | $24.30            | <font color="red">+5_768</font>    |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_531_110_334 | 5_813_034_133 | $0.0077294171 | $7_729.41         |
| 1   | http_request_update | 53_650_447    | 22_050_178    | $0.0000293195 | $29.31            |
| 2   | http_request_update | 47_179_323    | 19_461_729    | $0.0000258777 | $25.87            |
| 3   | http_request_update | 44_225_437    | 18_280_174    | $0.0000243066 | $24.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
