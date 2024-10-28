# Benchmarks for proxy

## Current benchmarks Azle version: 0.24.2-rc.87

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 14_806_091   | 6_512_436 | $0.0000086594 | $8.65             |
| 1   | icrc2_approve       | 18_208_652   | 7_873_460 | $0.0000104691 | $10.46            |
| 2   | icrc2_transfer_from | 17_236_409   | 7_484_563 | $0.0000099520 | $9.95             |
| 3   | icrc2_allowance     | 10_026_747   | 4_600_698 | $0.0000061174 | $6.11             |

## Baseline benchmarks Azle version: 0.24.2-rc.87

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
