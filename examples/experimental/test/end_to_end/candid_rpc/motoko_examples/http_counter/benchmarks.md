# Benchmarks for http_counter

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 4_851_397_755 | 3_541_149_102 | $0.0047085597 | $4_708.55         | <font color="green">-240_414</font> |
| 1   | http_request_update | 36_623_050    | 15_239_220    | $0.0000202631 | $20.26            | <font color="red">+32_284</font>    |
| 2   | http_request_update | 36_568_371    | 15_217_348    | $0.0000202341 | $20.23            | <font color="green">-30_797</font>  |
| 3   | http_request_update | 36_800_727    | 15_310_290    | $0.0000203576 | $20.35            | <font color="green">-18_385</font>  |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 4_851_638_169 | 3_541_245_267 | $0.0047086876 | $4_708.68         |
| 1   | http_request_update | 36_590_766    | 15_226_306    | $0.0000202460 | $20.24            |
| 2   | http_request_update | 36_599_168    | 15_229_667    | $0.0000202504 | $20.25            |
| 3   | http_request_update | 36_819_112    | 15_317_644    | $0.0000203674 | $20.36            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
