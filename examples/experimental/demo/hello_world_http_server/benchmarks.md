⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for backend

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_522_070_511 | 5_809_418_204 | $0.0077246091 | $7_724.60         | <font color="red">+5_303_575</font> |
| 1   | http_request_update | 53_315_260    | 21_916_104    | $0.0000291412 | $29.14            | <font color="red">+5_535</font>     |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_516_766_936 | 5_807_296_774 | $0.0077217883 | $7_721.78         |
| 1   | http_request_update | 53_309_725    | 21_913_890    | $0.0000291382 | $29.13            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
