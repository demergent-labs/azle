# Benchmarks for proxy

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | icrc1_transfer      | 15_504_669   | 6_791_867 | $0.0000090309 | $9.03             | <font color="red">+38_489</font> |
| 1   | icrc2_approve       | 19_094_665   | 8_227_866 | $0.0000109403 | $10.94            | <font color="red">+38_197</font> |
| 2   | icrc2_transfer_from | 18_061_778   | 7_814_711 | $0.0000103910 | $10.39            | <font color="red">+52_874</font> |
| 3   | icrc2_allowance     | 10_484_162   | 4_783_664 | $0.0000063607 | $6.36             | <font color="red">+49_421</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 15_466_180   | 6_776_472 | $0.0000090105 | $9.01             |
| 1   | icrc2_approve       | 19_056_468   | 8_212_587 | $0.0000109200 | $10.92            |
| 2   | icrc2_transfer_from | 18_008_904   | 7_793_561 | $0.0000103629 | $10.36            |
| 3   | icrc2_allowance     | 10_434_741   | 4_763_896 | $0.0000063344 | $6.33             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
