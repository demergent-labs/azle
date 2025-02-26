# Benchmarks for express

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_531_110_334 | 5_813_034_133 | $0.0077294171 | $7_729.41         | <font color="green">-4_169_653</font> |
| 1   | http_request_update | 53_650_447    | 22_050_178    | $0.0000293195 | $29.31            | <font color="green">-37_510</font>    |
| 2   | http_request_update | 47_179_323    | 19_461_729    | $0.0000258777 | $25.87            | <font color="green">-105_692</font>   |
| 3   | http_request_update | 44_225_437    | 18_280_174    | $0.0000243066 | $24.30            | <font color="green">-56_284</font>    |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_535_279_987 | 5_814_701_994 | $0.0077316348 | $7_731.63         |
| 1   | http_request_update | 53_687_957    | 22_065_182    | $0.0000293394 | $29.33            |
| 2   | http_request_update | 47_285_015    | 19_504_006    | $0.0000259339 | $25.93            |
| 3   | http_request_update | 44_281_721    | 18_302_688    | $0.0000243365 | $24.33            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
