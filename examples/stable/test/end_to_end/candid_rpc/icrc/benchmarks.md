# Benchmarks for proxy

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | icrc1_transfer      | 15_767_765   | 6_897_106 | $0.0000091709 | $9.17             | <font color="red">+958_090</font>   |
| 1   | icrc2_approve       | 19_392_274   | 8_346_909 | $0.0000110986 | $11.09            | <font color="red">+1_125_736</font> |
| 2   | icrc2_transfer_from | 18_351_993   | 7_930_797 | $0.0000105453 | $10.54            | <font color="red">+1_295_820</font> |
| 3   | icrc2_allowance     | 10_647_023   | 4_848_809 | $0.0000064473 | $6.44             | <font color="red">+776_885</font>   |

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
