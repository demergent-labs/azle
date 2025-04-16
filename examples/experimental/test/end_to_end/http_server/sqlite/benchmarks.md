# Benchmarks for sqlite

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade         | 11_991_226_844 | 9_197_080_737 | $0.0122290823 | $12_229.08        | <font color="red">+72_680_898</font> |
| 1   | http_request_update | 148_009_992    | 59_793_996    | $0.0000795063 | $79.50            | <font color="red">+407_241</font>    |
| 2   | http_request_update | 75_238_373     | 30_685_349    | $0.0000408014 | $40.80            | <font color="red">+508_878</font>    |
| 3   | http_request_update | 144_291_763    | 58_306_705    | $0.0000775287 | $77.52            | <font color="red">+589_981</font>    |
| 4   | http_request_update | 83_347_960     | 33_929_184    | $0.0000451146 | $45.11            | <font color="red">+321_583</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 11_918_545_946 | 9_168_008_378 | $0.0121904257 | $12_190.42        |
| 1   | http_request_update | 147_602_751    | 59_631_100    | $0.0000792897 | $79.28            |
| 2   | http_request_update | 74_729_495     | 30_481_798    | $0.0000405307 | $40.53            |
| 3   | http_request_update | 143_701_782    | 58_070_712    | $0.0000772149 | $77.21            |
| 4   | http_request_update | 83_026_377     | 33_800_550    | $0.0000449436 | $44.94            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
