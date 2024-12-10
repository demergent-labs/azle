# Benchmarks for backend

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_153_480_084 | 6_461_982_033 | $0.0085923036 | $8_592.30         |
| 1   | http_request_update | 56_109_196    | 23_033_678    | $0.0000306272 | $30.62            |
| 2   | http_request_update | 49_539_045    | 20_405_618    | $0.0000271327 | $27.13            |
| 3   | http_request_update | 49_909_375    | 20_553_750    | $0.0000273297 | $27.32            |
| 4   | http_request_update | 49_619_345    | 20_437_738    | $0.0000271754 | $27.17            |
| 5   | http_request_update | 49_803_616    | 20_511_446    | $0.0000272735 | $27.27            |
| 6   | http_request_update | 47_552_828    | 19_611_131    | $0.0000260763 | $26.07            |
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
