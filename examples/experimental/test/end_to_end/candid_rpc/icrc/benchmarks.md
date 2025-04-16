# Benchmarks for proxy

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions | Cycles     | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------ |
| 0   | icrc1_transfer      | 95_147_875   | 38_649_150 | $0.0000513906 | $51.39            | <font color="red">+74_577_855</font> |
| 1   | icrc2_approve       | 102_769_207  | 41_697_682 | $0.0000554442 | $55.44            | <font color="red">+74_465_427</font> |
| 2   | icrc2_transfer_from | 100_406_877  | 40_752_750 | $0.0000541877 | $54.18            | <font color="red">+75_101_675</font> |
| 3   | icrc2_allowance     | 86_654_515   | 35_251_806 | $0.0000468733 | $46.87            | <font color="red">+74_670_619</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 20_570_020   | 8_818_008  | $0.0000117250 | $11.72            |
| 1   | icrc2_approve       | 28_303_780   | 11_911_512 | $0.0000158384 | $15.83            |
| 2   | icrc2_transfer_from | 25_305_202   | 10_712_080 | $0.0000142435 | $14.24            |
| 3   | icrc2_allowance     | 11_983_896   | 5_383_558  | $0.0000071584 | $7.15             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
