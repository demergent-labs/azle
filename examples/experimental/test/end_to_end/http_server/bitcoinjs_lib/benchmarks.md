# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 48_116_950_344 | 38_447_370_137 | $0.0511223147 | $51_122.31        | <font color="green">-712_993_443</font> |
| 1   | http_request_update | 54_994_000     | 22_587_600     | $0.0000300341 | $30.03            | <font color="red">+174_470</font>       |
| 2   | http_request_update | 939_108_541    | 376_233_416    | $0.0005002663 | $500.26           | <font color="red">+2_495_010</font>     |
| 3   | http_request_update | 6_820_814_529  | 5_128_915_811  | $0.0068197655 | $6_819.76         | <font color="red">+8_827_403</font>     |
| 4   | http_request_update | 6_667_579_774  | 5_067_621_909  | $0.0067382648 | $6_738.26         | <font color="red">+8_524_910</font>     |
| 5   | http_request_update | 12_391_067_956 | 9_757_017_182  | $0.0129736130 | $12_973.61        | <font color="red">+123_240</font>       |
| 6   | http_request_update | 939_212_882    | 376_275_152    | $0.0005003218 | $500.32           | <font color="red">+2_571_706</font>     |
| 7   | http_request_update | 3_341_415_599  | 2_537_156_239  | $0.0033735805 | $3_373.58         | <font color="red">+278_584</font>       |
| 8   | http_request_update | 11_327_721_920 | 8_931_678_768  | $0.0118761853 | $11_876.18        | <font color="green">-240_656</font>     |
| 9   | http_request_update | 11_334_413_166 | 8_934_355_266  | $0.0118797442 | $11_879.74        | <font color="red">+31_890</font>        |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 48_829_943_787 | 38_732_567_514 | $0.0515015330 | $51_501.53        |
| 1   | http_request_update | 54_819_530     | 22_517_812     | $0.0000299413 | $29.94            |
| 2   | http_request_update | 936_613_531    | 375_235_412    | $0.0004989393 | $498.93           |
| 3   | http_request_update | 6_811_987_126  | 5_125_384_850  | $0.0068150705 | $6_815.07         |
| 4   | http_request_update | 6_659_054_864  | 5_064_211_945  | $0.0067337307 | $6_733.73         |
| 5   | http_request_update | 12_390_944_716 | 9_756_967_886  | $0.0129735475 | $12_973.54        |
| 6   | http_request_update | 936_641_176    | 375_246_470    | $0.0004989540 | $498.95           |
| 7   | http_request_update | 3_341_137_015  | 2_537_044_806  | $0.0033734324 | $3_373.43         |
| 8   | http_request_update | 11_327_962_576 | 8_931_775_030  | $0.0118763133 | $11_876.31        |
| 9   | http_request_update | 11_334_381_276 | 8_934_342_510  | $0.0118797272 | $11_879.72        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
