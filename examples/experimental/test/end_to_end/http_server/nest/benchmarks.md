# Benchmarks for api

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 11_839_723_487 | 9_136_479_394 | $0.0121485026 | $12_148.50        | <font color="green">-6_366_058</font> |
| 1   | http_request_update | 44_484_707     | 18_383_882    | $0.0000244445 | $24.44            | <font color="green">-179_847</font>   |
| 2   | http_request_update | 44_368_025     | 18_337_210    | $0.0000243824 | $24.38            | <font color="green">-102_321</font>   |
| 3   | http_request_update | 43_429_603     | 17_961_841    | $0.0000238833 | $23.88            | <font color="green">-106_090</font>   |
| 4   | http_request_update | 53_145_547     | 21_848_218    | $0.0000290509 | $29.05            | <font color="green">-143_443</font>   |
| 5   | http_request_update | 45_088_468     | 18_625_387    | $0.0000247656 | $24.76            | <font color="green">-82_857</font>    |
| 6   | http_request_update | 44_989_171     | 18_585_668    | $0.0000247128 | $24.71            | <font color="green">-101_912</font>   |
| 7   | http_request_update | 44_143_406     | 18_247_362    | $0.0000242630 | $24.26            | <font color="green">-95_340</font>    |
| 8   | http_request_update | 47_412_096     | 19_554_838    | $0.0000260015 | $26.00            | <font color="green">-117_316</font>   |
| 9   | http_request_update | 44_825_483     | 18_520_193    | $0.0000246257 | $24.62            | <font color="green">-125_360</font>   |
| 10  | http_request_update | 44_726_887     | 18_480_754    | $0.0000245733 | $24.57            | <font color="green">-138_454</font>   |
| 11  | http_request_update | 43_907_789     | 18_153_115    | $0.0000241377 | $24.13            | <font color="green">-117_707</font>   |
| 12  | http_request_update | 47_206_620     | 19_472_648    | $0.0000258922 | $25.89            | <font color="green">-119_008</font>   |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 11_846_089_545 | 9_139_025_818 | $0.0121518885 | $12_151.88        |
| 1   | http_request_update | 44_664_554     | 18_455_821    | $0.0000245402 | $24.54            |
| 2   | http_request_update | 44_470_346     | 18_378_138    | $0.0000244369 | $24.43            |
| 3   | http_request_update | 43_535_693     | 18_004_277    | $0.0000239397 | $23.93            |
| 4   | http_request_update | 53_288_990     | 21_905_596    | $0.0000291272 | $29.12            |
| 5   | http_request_update | 45_171_325     | 18_658_530    | $0.0000248097 | $24.80            |
| 6   | http_request_update | 45_091_083     | 18_626_433    | $0.0000247670 | $24.76            |
| 7   | http_request_update | 44_238_746     | 18_285_498    | $0.0000243137 | $24.31            |
| 8   | http_request_update | 47_529_412     | 19_601_764    | $0.0000260639 | $26.06            |
| 9   | http_request_update | 44_950_843     | 18_570_337    | $0.0000246924 | $24.69            |
| 10  | http_request_update | 44_865_341     | 18_536_136    | $0.0000246469 | $24.64            |
| 11  | http_request_update | 44_025_496     | 18_200_198    | $0.0000242003 | $24.20            |
| 12  | http_request_update | 47_325_628     | 19_520_251    | $0.0000259555 | $25.95            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
