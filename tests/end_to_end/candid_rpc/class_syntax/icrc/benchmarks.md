# Benchmarks for proxy

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | icrc1_transfer      | 14_809_530   | 6_513_812 | $0.0000086612 | $8.66             | <font color="green">-23_418</font>  |
| 1   | icrc2_approve       | 18_266_531   | 7_896_612 | $0.0000104999 | $10.49            | <font color="red">+66_752</font>    |
| 2   | icrc2_transfer_from | 17_056_127   | 7_412_450 | $0.0000098561 | $9.85             | <font color="green">-200_400</font> |
| 3   | icrc2_allowance     | 9_870_115    | 4_538_046 | $0.0000060341 | $6.03             | <font color="green">-156_074</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 14_832_948   | 6_523_179 | $0.0000086737 | $8.67             |
| 1   | icrc2_approve       | 18_199_779   | 7_869_911 | $0.0000104644 | $10.46            |
| 2   | icrc2_transfer_from | 17_256_527   | 7_492_610 | $0.0000099627 | $9.96             |
| 3   | icrc2_allowance     | 10_026_189   | 4_600_475 | $0.0000061171 | $6.11             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
