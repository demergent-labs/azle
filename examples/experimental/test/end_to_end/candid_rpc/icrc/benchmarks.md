⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for proxy

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles     | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------------- |
| 0   | icrc1_transfer      | 20_570_020   | 8_818_008  | $0.0000117250 | $11.72            | <font color="green">-74_614_579</font> |
| 1   | icrc2_approve       | 28_303_780   | 11_911_512 | $0.0000158384 | $15.83            | <font color="green">-74_470_345</font> |
| 2   | icrc2_transfer_from | 25_305_202   | 10_712_080 | $0.0000142435 | $14.24            | <font color="green">-75_099_634</font> |
| 3   | icrc2_allowance     | 11_983_896   | 5_383_558  | $0.0000071584 | $7.15             | <font color="green">-74_692_601</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 95_184_599   | 38_663_839 | $0.0000514101 | $51.41            |
| 1   | icrc2_approve       | 102_774_125  | 41_699_650 | $0.0000554468 | $55.44            |
| 2   | icrc2_transfer_from | 100_404_836  | 40_751_934 | $0.0000541866 | $54.18            |
| 3   | icrc2_allowance     | 86_676_497   | 35_260_598 | $0.0000468850 | $46.88            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
