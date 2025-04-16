# Benchmarks for express

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_586_066_711 | 5_835_016_684 | $0.0077586466 | $7_758.64         | <font color="red">+51_079_770</font> |
| 1   | http_request_update | 53_776_813    | 22_100_725    | $0.0000293867 | $29.38            | <font color="red">+149_438</font>    |
| 2   | http_request_update | 47_305_312    | 19_512_124    | $0.0000259447 | $25.94            | <font color="red">+146_157</font>    |
| 3   | http_request_update | 44_420_248    | 18_358_099    | $0.0000244102 | $24.41            | <font color="red">+229_384</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_534_986_941 | 5_814_584_776 | $0.0077314789 | $7_731.47         |
| 1   | http_request_update | 53_627_375    | 22_040_950    | $0.0000293072 | $29.30            |
| 2   | http_request_update | 47_159_155    | 19_453_662    | $0.0000258670 | $25.86            |
| 3   | http_request_update | 44_190_864    | 18_266_345    | $0.0000242882 | $24.28            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
