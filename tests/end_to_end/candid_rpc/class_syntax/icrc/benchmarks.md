# Benchmarks for proxy

## Current benchmarks Azle version: 0.24.2-rc.61

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 14_797_959   | 6_509_183 | $0.0000086551 | $8.65             |
| 1   | icrc2_approve       | 18_187_790   | 7_865_116 | $0.0000104580 | $10.45            |
| 2   | icrc2_transfer_from | 17_236_550   | 7_484_620 | $0.0000099521 | $9.95             |
| 3   | icrc2_allowance     | 10_012_341   | 4_594_936 | $0.0000061097 | $6.10             |

## Baseline benchmarks Azle version: 0.24.2-rc.61

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
