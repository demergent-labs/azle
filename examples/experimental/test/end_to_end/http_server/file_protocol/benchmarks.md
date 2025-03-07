# Benchmarks for backend

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 7_518_094_745 | 5_807_827_898 | $0.0077224945 | $7_722.49         | <font color="red">+85_504</font>   |
| 1   | http_request_update | 57_140_351    | 23_446_140    | $0.0000311756 | $31.17            | <font color="green">-11_916</font> |
| 2   | http_request_update | 50_771_714    | 20_898_685    | $0.0000277884 | $27.78            | <font color="red">+25_237</font>   |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_518_009_241 | 5_807_793_696 | $0.0077224490 | $7_722.44         |
| 1   | http_request_update | 57_152_267    | 23_450_906    | $0.0000311820 | $31.18            |
| 2   | http_request_update | 50_746_477    | 20_888_590    | $0.0000277749 | $27.77            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
