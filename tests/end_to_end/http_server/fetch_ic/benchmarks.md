# Benchmarks for backend

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_147_326_344 | 6_459_520_537 | $0.0085890307 | $8_589.03         |
| 1   | http_request_update | 56_012_992    | 22_995_196    | $0.0000305760 | $30.57            |
| 2   | http_request_update | 49_523_867    | 20_399_546    | $0.0000271247 | $27.12            |
| 3   | http_request_update | 49_803_629    | 20_511_451    | $0.0000272735 | $27.27            |
| 4   | http_request_update | 49_580_235    | 20_422_094    | $0.0000271546 | $27.15            |
| 5   | http_request_update | 49_815_295    | 20_516_118    | $0.0000272797 | $27.27            |
| 6   | http_request_update | 47_506_971    | 19_592_788    | $0.0000260519 | $26.05            |
| 7   | http_request_update | 37_945_104    | 15_768_041    | $0.0000209663 | $20.96            |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
