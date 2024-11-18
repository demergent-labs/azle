# Benchmarks for fs

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_143_931_648 | 6_458_162_659 | $0.0085872251 | $8_587.22         |
| 1   | http_request_update | 55_686_967    | 22_864_786    | $0.0000304026 | $30.40            |
| 2   | http_request_update | 49_876_088    | 20_540_435    | $0.0000273120 | $27.31            |
| 3   | http_request_update | 48_669_385    | 20_057_754    | $0.0000266702 | $26.67            |
| 4   | http_request_update | 47_905_958    | 19_752_383    | $0.0000262642 | $26.26            |
| 5   | http_request_update | 48_184_647    | 19_863_858    | $0.0000264124 | $26.41            |
| 6   | http_request_update | 47_764_861    | 19_695_944    | $0.0000261891 | $26.18            |
| 7   | http_request_update | 47_362_206    | 19_534_882    | $0.0000259749 | $25.97            |
| 8   | http_request_update | 46_744_338    | 19_287_735    | $0.0000256463 | $25.64            |

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
