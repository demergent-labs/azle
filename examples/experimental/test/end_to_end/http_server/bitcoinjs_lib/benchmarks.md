# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 48_827_453_700 | 38_731_571_480 | $0.0515002086 | $51_500.20        | <font color="green">-815_448_678</font> |
| 1   | http_request_update | 54_914_269     | 22_555_707     | $0.0000299916 | $29.99            | <font color="green">-582_154</font>     |
| 2   | http_request_update | 932_780_369    | 373_702_147    | $0.0004969005 | $496.90           | <font color="green">-6_568_116</font>   |
| 3   | http_request_update | 6_794_708_342  | 5_118_473_336  | $0.0068058804 | $6_805.88         | <font color="green">-23_967_630</font>  |
| 4   | http_request_update | 6_643_958_567  | 5_058_173_426  | $0.0067257015 | $6_725.70         | <font color="green">-21_484_242</font>  |
| 5   | http_request_update | 12_391_329_738 | 9_757_121_895  | $0.0129737523 | $12_973.75        | <font color="red">+627_284</font>       |
| 6   | http_request_update | 932_475_425    | 373_580_170    | $0.0004967383 | $496.73           | <font color="green">-6_885_339</font>   |
| 7   | http_request_update | 3_341_925_048  | 2_537_360_019  | $0.0033738515 | $3_373.85         | <font color="green">-74_001</font>      |
| 8   | http_request_update | 11_328_506_505 | 8_931_992_602  | $0.0118766026 | $11_876.60        | <font color="green">-284_402</font>     |
| 9   | http_request_update | 11_336_074_551 | 8_935_019_820  | $0.0118806278 | $11_880.62        | <font color="red">+1_245_128</font>     |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 49_642_902_378 | 39_457_750_951 | $0.0524657877 | $52_465.78        |
| 1   | http_request_update | 55_496_423     | 22_788_569     | $0.0000303013 | $30.30            |
| 2   | http_request_update | 939_348_485    | 376_329_394    | $0.0005003939 | $500.39           |
| 3   | http_request_update | 6_818_675_972  | 5_128_060_388  | $0.0068186281 | $6_818.62         |
| 4   | http_request_update | 6_665_442_809  | 5_066_767_123  | $0.0067371282 | $6_737.12         |
| 5   | http_request_update | 12_390_702_454 | 9_756_870_981  | $0.0129734186 | $12_973.41        |
| 6   | http_request_update | 939_360_764    | 376_334_305    | $0.0005004004 | $500.40           |
| 7   | http_request_update | 3_341_999_049  | 2_537_389_619  | $0.0033738909 | $3_373.89         |
| 8   | http_request_update | 11_328_790_907 | 8_932_106_362  | $0.0118767539 | $11_876.75        |
| 9   | http_request_update | 11_334_829_423 | 8_934_521_769  | $0.0118799656 | $11_879.96        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
