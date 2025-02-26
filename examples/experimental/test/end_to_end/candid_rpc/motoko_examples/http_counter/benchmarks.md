# Benchmarks for http_counter

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 4_851_638_169 | 3_541_245_267 | $0.0047086876 | $4_708.68         | <font color="green">-1_607_493</font> |
| 1   | http_request_update | 36_590_766    | 15_226_306    | $0.0000202460 | $20.24            | <font color="green">-157_763</font>   |
| 2   | http_request_update | 36_599_168    | 15_229_667    | $0.0000202504 | $20.25            | <font color="green">-112_363</font>   |
| 3   | http_request_update | 36_819_112    | 15_317_644    | $0.0000203674 | $20.36            | <font color="green">-121_664</font>   |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 4_853_245_662 | 3_541_888_264 | $0.0047095426 | $4_709.54         |
| 1   | http_request_update | 36_748_529    | 15_289_411    | $0.0000203299 | $20.32            |
| 2   | http_request_update | 36_711_531    | 15_274_612    | $0.0000203102 | $20.31            |
| 3   | http_request_update | 36_940_776    | 15_366_310    | $0.0000204321 | $20.43            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
