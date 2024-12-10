# Benchmarks for backend

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_153_480_084 | 6_461_982_033 | $0.0085923036 | $8_592.30         |
| 1   | http_request_update | 56_090_815    | 23_026_326    | $0.0000306174 | $30.61            |
| 2   | http_request_update | 49_551_096    | 20_410_438    | $0.0000271391 | $27.13            |
| 3   | http_request_update | 49_880_948    | 20_542_379    | $0.0000273146 | $27.31            |
| 4   | http_request_update | 49_606_457    | 20_432_582    | $0.0000271686 | $27.16            |
| 5   | http_request_update | 49_797_061    | 20_508_824    | $0.0000272700 | $27.26            |
| 6   | http_request_update | 47_538_677    | 19_605_470    | $0.0000260688 | $26.06            |
| 7   | http_request_update | 38_015_290    | 15_796_116    | $0.0000210036 | $21.00            |

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
