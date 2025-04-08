# Benchmarks for backend

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_576_068_366 | 5_831_017_346 | $0.0077533288 | $7_753.32         | <font color="red">+57_973_621</font> |
| 1   | http_request_update | 57_122_173    | 23_438_869    | $0.0000311660 | $31.16            | <font color="green">-18_178</font>   |
| 2   | http_request_update | 50_729_449    | 20_881_779    | $0.0000277659 | $27.76            | <font color="green">-42_265</font>   |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_518_094_745 | 5_807_827_898 | $0.0077224945 | $7_722.49         |
| 1   | http_request_update | 57_140_351    | 23_446_140    | $0.0000311756 | $31.17            |
| 2   | http_request_update | 50_771_714    | 20_898_685    | $0.0000277884 | $27.78            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
