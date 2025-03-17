⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for express

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_534_986_941 | 5_814_584_776 | $0.0077314789 | $7_731.47         | <font color="red">+4_085_230</font> |
| 1   | http_request_update | 53_627_375    | 22_040_950    | $0.0000293072 | $29.30            | <font color="green">-50_989</font>  |
| 2   | http_request_update | 47_159_155    | 19_453_662    | $0.0000258670 | $25.86            | <font color="green">-63_072</font>  |
| 3   | http_request_update | 44_190_864    | 18_266_345    | $0.0000242882 | $24.28            | <font color="green">-36_918</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_530_901_711 | 5_812_950_684 | $0.0077293061 | $7_729.30         |
| 1   | http_request_update | 53_678_364    | 22_061_345    | $0.0000293343 | $29.33            |
| 2   | http_request_update | 47_222_227    | 19_478_890    | $0.0000259005 | $25.90            |
| 3   | http_request_update | 44_227_782    | 18_281_112    | $0.0000243078 | $24.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
