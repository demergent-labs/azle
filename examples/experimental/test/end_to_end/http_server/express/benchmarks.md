# Benchmarks for express

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_530_901_711 | 5_812_950_684 | $0.0077293061 | $7_729.30         | <font color="green">-283_043</font> |
| 1   | http_request_update | 53_678_364    | 22_061_345    | $0.0000293343 | $29.33            | <font color="red">+43_216</font>    |
| 2   | http_request_update | 47_222_227    | 19_478_890    | $0.0000259005 | $25.90            | <font color="red">+10_507</font>    |
| 3   | http_request_update | 44_227_782    | 18_281_112    | $0.0000243078 | $24.30            | <font color="green">-3_423</font>   |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_531_184_754 | 5_813_063_901 | $0.0077294567 | $7_729.45         |
| 1   | http_request_update | 53_635_148    | 22_044_059    | $0.0000293113 | $29.31            |
| 2   | http_request_update | 47_211_720    | 19_474_688    | $0.0000258949 | $25.89            |
| 3   | http_request_update | 44_231_205    | 18_282_482    | $0.0000243097 | $24.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
