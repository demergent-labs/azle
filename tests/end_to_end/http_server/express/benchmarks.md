# Benchmarks for express

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_154_564_112 | 6_462_415_644 | $0.0085928802 | $8_592.88         |
| 1   | http_request_update | 54_145_872    | 22_248_348    | $0.0000295830 | $29.58            |
| 2   | http_request_update | 47_707_547    | 19_673_018    | $0.0000261586 | $26.15            |
| 3   | http_request_update | 47_920_138    | 19_758_055    | $0.0000262717 | $26.27            |
| 4   | http_request_update | 44_751_348    | 18_490_539    | $0.0000245863 | $24.58            |

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
