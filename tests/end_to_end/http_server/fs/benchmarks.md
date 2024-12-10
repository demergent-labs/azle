# Benchmarks for fs

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_152_907_736 | 6_461_753_094 | $0.0085919992 | $8_591.99         |
| 1   | http_request_update | 55_716_027    | 22_876_410    | $0.0000304181 | $30.41            |
| 2   | http_request_update | 49_900_723    | 20_550_289    | $0.0000273251 | $27.32            |
| 3   | http_request_update | 48_700_431    | 20_070_172    | $0.0000266867 | $26.68            |
| 4   | http_request_update | 47_949_700    | 19_769_880    | $0.0000262874 | $26.28            |
| 5   | http_request_update | 48_226_026    | 19_880_410    | $0.0000264344 | $26.43            |
| 6   | http_request_update | 47_769_502    | 19_697_800    | $0.0000261916 | $26.19            |
| 7   | http_request_update | 47_369_601    | 19_537_840    | $0.0000259789 | $25.97            |
| 8   | http_request_update | 46_762_070    | 19_294_828    | $0.0000256558 | $25.65            |

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
