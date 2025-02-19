# Benchmarks for sqlite_typeorm

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade         | 13_384_901_069 | 10_554_550_427 | $0.0140340691 | $14_034.06        | <font color="green">-831_628_897</font> |
| 1   | http_request_update | 101_967_119    | 41_376_847     | $0.0000550176 | $55.01            | <font color="green">-501_410</font>     |
| 2   | http_request_update | 141_412_784    | 57_155_113     | $0.0000759974 | $75.99            | <font color="green">-397_956</font>     |
| 3   | http_request_update | 142_419_107    | 57_557_642     | $0.0000765327 | $76.53            | <font color="green">-756_906</font>     |
| 4   | http_request_update | 66_382_554     | 27_143_021     | $0.0000360913 | $36.09            | <font color="green">-663_626</font>     |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 14_216_529_966 | 11_287_201_986 | $0.0150082539 | $15_008.25        |
| 1   | http_request_update | 102_468_529    | 41_577_411     | $0.0000552842 | $55.28            |
| 2   | http_request_update | 141_810_740    | 57_314_296     | $0.0000762091 | $76.20            |
| 3   | http_request_update | 143_176_013    | 57_860_405     | $0.0000769352 | $76.93            |
| 4   | http_request_update | 67_046_180     | 27_408_472     | $0.0000364442 | $36.44            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
