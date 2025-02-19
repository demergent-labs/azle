# Benchmarks for express

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 7_535_279_987 | 5_814_701_994 | $0.0077316348 | $7_731.63         | <font color="green">-755_805_595</font> |
| 1   | http_request_update | 53_687_957    | 22_065_182    | $0.0000293394 | $29.33            | <font color="green">-656_378</font>     |
| 2   | http_request_update | 47_285_015    | 19_504_006    | $0.0000259339 | $25.93            | <font color="green">-625_502</font>     |
| 3   | http_request_update | 44_281_721    | 18_302_688    | $0.0000243365 | $24.33            | <font color="green">-590_983</font>     |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_291_085_582 | 6_517_024_232 | $0.0086654916 | $8_665.49         |
| 1   | http_request_update | 54_344_335    | 22_327_734    | $0.0000296885 | $29.68            |
| 2   | http_request_update | 47_910_517    | 19_754_206    | $0.0000262666 | $26.26            |
| 3   | http_request_update | 44_872_704    | 18_539_081    | $0.0000246509 | $24.65            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
