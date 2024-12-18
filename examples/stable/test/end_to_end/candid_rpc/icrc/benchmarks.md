# Benchmarks for proxy

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | icrc1_transfer      | 14_698_021   | 6_469_208 | $0.0000086019 | $8.60             | <font color="green">-111_654</font> |
| 1   | icrc2_approve       | 17_931_717   | 7_762_686 | $0.0000103218 | $10.32            | <font color="green">-334_821</font> |
| 2   | icrc2_transfer_from | 16_916_059   | 7_356_423 | $0.0000097816 | $9.78             | <font color="green">-140_114</font> |
| 3   | icrc2_allowance     | 9_788_410    | 4_505_364 | $0.0000059906 | $5.99             | <font color="green">-81_728</font>  |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 14_809_675   | 6_513_870 | $0.0000086613 | $8.66             |
| 1   | icrc2_approve       | 18_266_538   | 7_896_615 | $0.0000104999 | $10.49            |
| 2   | icrc2_transfer_from | 17_056_173   | 7_412_469 | $0.0000098561 | $9.85             |
| 3   | icrc2_allowance     | 9_870_138    | 4_538_055 | $0.0000060341 | $6.03             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
