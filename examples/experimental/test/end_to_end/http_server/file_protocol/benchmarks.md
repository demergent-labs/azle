# Benchmarks for backend

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 7_517_943_336 | 5_807_767_334 | $0.0077224140 | $7_722.41         | <font color="green">-64_804</font> |
| 1   | http_request_update | 57_146_168    | 23_448_467    | $0.0000311787 | $31.17            | <font color="red">+8_786</font>    |
| 2   | http_request_update | 50_774_412    | 20_899_764    | $0.0000277898 | $27.78            | <font color="red">+12_308</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_518_008_140 | 5_807_793_256 | $0.0077224485 | $7_722.44         |
| 1   | http_request_update | 57_137_382    | 23_444_952    | $0.0000311740 | $31.17            |
| 2   | http_request_update | 50_762_104    | 20_894_841    | $0.0000277832 | $27.78            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
