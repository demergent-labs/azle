# Benchmarks for express

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_753_061_009 | 5_901_814_403 | $0.0078474656 | $7_847.46         | <font color="red">+218_074_068</font> |
| 1   | http_request_update | 53_672_790    | 22_059_116    | $0.0000293313 | $29.33            | <font color="red">+45_415</font>      |
| 2   | http_request_update | 47_224_684    | 19_479_873    | $0.0000259018 | $25.90            | <font color="red">+65_529</font>      |
| 3   | http_request_update | 44_336_265    | 18_324_506    | $0.0000243655 | $24.36            | <font color="red">+145_401</font>     |

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
