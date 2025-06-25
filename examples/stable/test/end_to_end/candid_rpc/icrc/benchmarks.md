# Benchmarks for proxy

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | icrc1_transfer      | 15_461_749   | 6_774_699 | $0.0000090081 | $9.00             | <font color="green">-51_364</font> |
| 1   | icrc2_approve       | 19_053_461   | 8_211_384 | $0.0000109184 | $10.91            | <font color="green">-58_108</font> |
| 2   | icrc2_transfer_from | 17_984_773   | 7_783_909 | $0.0000103500 | $10.35            | <font color="green">-54_695</font> |
| 3   | icrc2_allowance     | 10_411_782   | 4_754_712 | $0.0000063222 | $6.32             | <font color="green">-61_061</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 15_513_113   | 6_795_245 | $0.0000090354 | $9.03             |
| 1   | icrc2_approve       | 19_111_569   | 8_234_627 | $0.0000109493 | $10.94            |
| 2   | icrc2_transfer_from | 18_039_468   | 7_805_787 | $0.0000103791 | $10.37            |
| 3   | icrc2_allowance     | 10_472_843   | 4_779_137 | $0.0000063547 | $6.35             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
