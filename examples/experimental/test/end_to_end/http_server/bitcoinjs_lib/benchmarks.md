# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | init                | 48_901_374_019 | 38_761_139_607 | $0.0515395245 | $51_539.52        | <font color="red">+71_430_232</font>   |
| 1   | http_request_update | 55_058_526     | 22_613_410     | $0.0000300684 | $30.06            | <font color="red">+238_996</font>      |
| 2   | http_request_update | 932_854_767    | 373_731_906    | $0.0004969401 | $496.94           | <font color="green">-3_758_764</font>  |
| 3   | http_request_update | 6_794_540_798  | 5_118_406_319  | $0.0068057913 | $6_805.79         | <font color="green">-17_446_328</font> |
| 4   | http_request_update | 6_642_448_290  | 5_057_569_316  | $0.0067248982 | $6_724.89         | <font color="green">-16_606_574</font> |
| 5   | http_request_update | 12_390_261_444 | 9_756_694_577  | $0.0129731841 | $12_973.18        | <font color="green">-683_272</font>    |
| 6   | http_request_update | 932_710_739    | 373_674_295    | $0.0004968635 | $496.86           | <font color="green">-3_930_437</font>  |
| 7   | http_request_update | 3_341_825_013  | 2_537_320_005  | $0.0033737983 | $3_373.79         | <font color="red">+687_998</font>      |
| 8   | http_request_update | 11_328_623_618 | 8_932_039_447  | $0.0118766649 | $11_876.66        | <font color="red">+661_042</font>      |
| 9   | http_request_update | 11_334_893_025 | 8_934_547_210  | $0.0118799994 | $11_879.99        | <font color="red">+511_749</font>      |

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
