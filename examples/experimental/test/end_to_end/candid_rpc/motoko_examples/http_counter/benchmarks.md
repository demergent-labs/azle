# Benchmarks for http_counter

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 4_897_772_169 | 3_559_698_867 | $0.0047332248 | $4_733.22         | <font color="red">+45_952_260</font> |
| 1   | http_request_update | 36_651_277    | 15_250_510    | $0.0000202781 | $20.27            | <font color="red">+52_017</font>     |
| 2   | http_request_update | 36_622_560    | 15_239_024    | $0.0000202629 | $20.26            | <font color="red">+41_922</font>     |
| 3   | http_request_update | 36_820_254    | 15_318_101    | $0.0000203680 | $20.36            | <font color="red">+31_511</font>     |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 4_851_819_909 | 3_541_317_963 | $0.0047087843 | $4_708.78         |
| 1   | http_request_update | 36_599_260    | 15_229_704    | $0.0000202505 | $20.25            |
| 2   | http_request_update | 36_580_638    | 15_222_255    | $0.0000202406 | $20.24            |
| 3   | http_request_update | 36_788_743    | 15_305_497    | $0.0000203513 | $20.35            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
