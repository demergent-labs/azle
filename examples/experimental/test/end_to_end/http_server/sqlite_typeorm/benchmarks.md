# Benchmarks for sqlite_typeorm

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | postUpgrade         | 14_216_529_966 | 11_287_201_986 | $0.0150082539 | $15_008.25        | <font color="red">+131_798_204</font>  |
| 1   | http_request_update | 102_468_529    | 41_577_411     | $0.0000552842 | $55.28            | <font color="red">+146_306</font>      |
| 2   | http_request_update | 141_810_740    | 57_314_296     | $0.0000762091 | $76.20            | <font color="green">-46_189</font>     |
| 3   | http_request_update | 143_176_013    | 57_860_405     | $0.0000769352 | $76.93            | <font color="green">-27_271_892</font> |
| 4   | http_request_update | 67_046_180     | 27_408_472     | $0.0000364442 | $36.44            | <font color="red">+147_711</font>      |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 14_084_731_762 | 11_234_482_704 | $0.0149381546 | $14_938.15        |
| 1   | http_request_update | 102_322_223    | 41_518_889     | $0.0000552064 | $55.20            |
| 2   | http_request_update | 141_856_929    | 57_332_771     | $0.0000762337 | $76.23            |
| 3   | http_request_update | 170_447_905    | 68_769_162     | $0.0000914403 | $91.44            |
| 4   | http_request_update | 66_898_469     | 27_349_387     | $0.0000363657 | $36.36            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
