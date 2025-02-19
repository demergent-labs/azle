# Benchmarks for http_counter

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 4_853_245_662 | 3_541_888_264 | $0.0047095426 | $4_709.54         | <font color="green">-641_474_168</font> |
| 1   | http_request_update | 36_748_529    | 15_289_411    | $0.0000203299 | $20.32            | <font color="red">+69_598</font>        |
| 2   | http_request_update | 36_711_531    | 15_274_612    | $0.0000203102 | $20.31            | <font color="red">+4_972</font>         |
| 3   | http_request_update | 36_940_776    | 15_366_310    | $0.0000204321 | $20.43            | <font color="red">+68_285</font>        |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_494_719_830 | 4_198_477_932 | $0.0055825902 | $5_582.59         |
| 1   | http_request_update | 36_678_931    | 15_261_572    | $0.0000202929 | $20.29            |
| 2   | http_request_update | 36_706_559    | 15_272_623    | $0.0000203075 | $20.30            |
| 3   | http_request_update | 36_872_491    | 15_338_996    | $0.0000203958 | $20.39            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
