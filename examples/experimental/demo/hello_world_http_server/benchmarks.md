# Benchmarks for backend

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------- |
| 0   | init                | 7_516_737_828 | 5_807_285_131 | $0.0077217728 | $7_721.77         | <font color="red">+47_334</font>  |
| 1   | http_request_update | 53_320_981    | 21_918_392    | $0.0000291442 | $29.14            | <font color="green">-9_374</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_516_690_494 | 5_807_266_197 | $0.0077217476 | $7_721.74         |
| 1   | http_request_update | 53_330_355    | 21_922_142    | $0.0000291492 | $29.14            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
