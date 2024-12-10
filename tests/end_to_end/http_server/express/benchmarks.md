# Benchmarks for express

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_163_623_941 | 6_466_039_576 | $0.0085976988 | $8_597.69         |
| 1   | http_request_update | 54_172_271    | 22_258_908    | $0.0000295970 | $29.59            |
| 2   | http_request_update | 47_752_009    | 19_690_803    | $0.0000261823 | $26.18            |
| 3   | http_request_update | 47_960_896    | 19_774_358    | $0.0000262934 | $26.29            |
| 4   | http_request_update | 44_782_862    | 18_503_144    | $0.0000246031 | $24.60            |

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
