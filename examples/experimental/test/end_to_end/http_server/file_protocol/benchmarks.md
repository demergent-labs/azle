# Benchmarks for backend

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_518_008_140 | 5_807_793_256 | $0.0077224485 | $7_722.44         | <font color="green">-3_744_064</font> |
| 1   | http_request_update | 57_137_382    | 23_444_952    | $0.0000311740 | $31.17            | <font color="green">-97_083</font>    |
| 2   | http_request_update | 50_762_104    | 20_894_841    | $0.0000277832 | $27.78            | <font color="green">-118_737</font>   |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_521_752_204 | 5_809_290_881 | $0.0077244398 | $7_724.43         |
| 1   | http_request_update | 57_234_465    | 23_483_786    | $0.0000312257 | $31.22            |
| 2   | http_request_update | 50_880_841    | 20_942_336    | $0.0000278464 | $27.84            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
