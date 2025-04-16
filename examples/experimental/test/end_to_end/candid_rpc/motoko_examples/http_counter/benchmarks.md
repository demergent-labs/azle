# Benchmarks for http_counter

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 4_899_116_338 | 3_560_236_535 | $0.0047339397 | $4_733.93         | <font color="red">+42_618_961</font> |
| 1   | http_request_update | 36_621_066    | 15_238_426    | $0.0000202621 | $20.26            | <font color="green">-9_099</font>    |
| 2   | http_request_update | 36_592_656    | 15_227_062    | $0.0000202470 | $20.24            | <font color="green">-13_182</font>   |
| 3   | http_request_update | 36_799_703    | 15_309_881    | $0.0000203571 | $20.35            | <font color="green">-4_592</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 4_856_497_377 | 3_543_188_950 | $0.0047112721 | $4_711.27         |
| 1   | http_request_update | 36_630_165    | 15_242_066    | $0.0000202669 | $20.26            |
| 2   | http_request_update | 36_605_838    | 15_232_335    | $0.0000202540 | $20.25            |
| 3   | http_request_update | 36_804_295    | 15_311_718    | $0.0000203595 | $20.35            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
