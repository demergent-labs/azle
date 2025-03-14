⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | init                | 48_829_943_787 | 38_732_567_514 | $0.0515015330 | $51_501.53        | <font color="red">+3_431_054</font>    |
| 1   | http_request_update | 54_819_530     | 22_517_812     | $0.0000299413 | $29.94            | <font color="green">-59_996</font>     |
| 2   | http_request_update | 936_613_531    | 375_235_412    | $0.0004989393 | $498.93           | <font color="green">-2_922_456</font>  |
| 3   | http_request_update | 6_811_987_126  | 5_125_384_850  | $0.0068150705 | $6_815.07         | <font color="green">-11_156_888</font> |
| 4   | http_request_update | 6_659_054_864  | 5_064_211_945  | $0.0067337307 | $6_733.73         | <font color="green">-9_948_256</font>  |
| 5   | http_request_update | 12_390_944_716 | 9_756_967_886  | $0.0129735475 | $12_973.54        | <font color="red">+203_847</font>      |
| 6   | http_request_update | 936_641_176    | 375_246_470    | $0.0004989540 | $498.95           | <font color="green">-2_883_817</font>  |
| 7   | http_request_update | 3_341_137_015  | 2_537_044_806  | $0.0033734324 | $3_373.43         | <font color="red">+244_744</font>      |
| 8   | http_request_update | 11_327_962_576 | 8_931_775_030  | $0.0118763133 | $11_876.31        | <font color="red">+253_556</font>      |
| 9   | http_request_update | 11_334_381_276 | 8_934_342_510  | $0.0118797272 | $11_879.72        | <font color="red">+257_270</font>      |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 48_826_512_733 | 38_731_195_093 | $0.0514997082 | $51_499.70        |
| 1   | http_request_update | 54_879_526     | 22_541_810     | $0.0000299732 | $29.97            |
| 2   | http_request_update | 939_535_987    | 376_404_394    | $0.0005004936 | $500.49           |
| 3   | http_request_update | 6_823_144_014  | 5_129_847_605  | $0.0068210045 | $6_821.00         |
| 4   | http_request_update | 6_669_003_120  | 5_068_191_248  | $0.0067390219 | $6_739.02         |
| 5   | http_request_update | 12_390_740_869 | 9_756_886_347  | $0.0129734391 | $12_973.43        |
| 6   | http_request_update | 939_524_993    | 376_399_997    | $0.0005004878 | $500.48           |
| 7   | http_request_update | 3_340_892_271  | 2_536_946_908  | $0.0033733022 | $3_373.30         |
| 8   | http_request_update | 11_327_709_020 | 8_931_673_608  | $0.0118761784 | $11_876.17        |
| 9   | http_request_update | 11_334_124_006 | 8_934_239_602  | $0.0118795904 | $11_879.59        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
