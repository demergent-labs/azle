# Benchmarks for proxy

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | icrc1_transfer      | 15_523_992   | 6_799_596 | $0.0000090412 | $9.04             | <font color="green">-243_773</font> |
| 1   | icrc2_approve       | 19_135_742   | 8_244_296 | $0.0000109622 | $10.96            | <font color="green">-256_532</font> |
| 2   | icrc2_transfer_from | 18_072_224   | 7_818_889 | $0.0000103965 | $10.39            | <font color="green">-279_769</font> |
| 3   | icrc2_allowance     | 10_478_888   | 4_781_555 | $0.0000063579 | $6.35             | <font color="green">-168_135</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 15_767_765   | 6_897_106 | $0.0000091709 | $9.17             |
| 1   | icrc2_approve       | 19_392_274   | 8_346_909 | $0.0000110986 | $11.09            |
| 2   | icrc2_transfer_from | 18_351_993   | 7_930_797 | $0.0000105453 | $10.54            |
| 3   | icrc2_allowance     | 10_647_023   | 4_848_809 | $0.0000064473 | $6.44             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
