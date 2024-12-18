# Benchmarks for fs

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_260_982_418 | 6_504_982_967 | $0.0086494807 | $8_649.48         |
| 1   | http_request_update | 55_815_043    | 22_916_017    | $0.0000304707 | $30.47            |
| 2   | http_request_update | 49_985_649    | 20_584_259    | $0.0000273703 | $27.37            |
| 3   | http_request_update | 48_755_653    | 20_092_261    | $0.0000267161 | $26.71            |
| 4   | http_request_update | 48_034_938    | 19_803_975    | $0.0000263328 | $26.33            |
| 5   | http_request_update | 48_335_794    | 19_924_317    | $0.0000264928 | $26.49            |
| 6   | http_request_update | 47_876_564    | 19_740_625    | $0.0000262485 | $26.24            |
| 7   | http_request_update | 47_452_990    | 19_571_196    | $0.0000260232 | $26.02            |
| 8   | http_request_update | 46_810_022    | 19_314_008    | $0.0000256813 | $25.68            |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
