# Benchmarks for api

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 12_761_009_088 | 9_904_993_635 | $0.0131703729 | $13_170.37        | <font color="red">+146_769_772</font> |
| 1   | http_request_update | 45_093_110     | 18_627_244    | $0.0000247681 | $24.76            | <font color="red">+29_957</font>      |
| 2   | http_request_update | 45_012_308     | 18_594_923    | $0.0000247251 | $24.72            | <font color="red">+73_829</font>      |
| 3   | http_request_update | 45_152_226     | 18_650_890    | $0.0000247995 | $24.79            | <font color="red">+66_960</font>      |
| 4   | http_request_update | 44_122_503     | 18_239_001    | $0.0000242519 | $24.25            | <font color="red">+49_051</font>      |
| 5   | http_request_update | 53_834_387     | 22_123_754    | $0.0000294173 | $29.41            | <font color="red">+32_296</font>      |
| 6   | http_request_update | 45_792_909     | 18_907_163    | $0.0000251403 | $25.14            | <font color="red">+114_206</font>     |
| 7   | http_request_update | 45_687_232     | 18_864_892    | $0.0000250841 | $25.08            | <font color="red">+48_890</font>      |
| 8   | http_request_update | 45_884_024     | 18_943_609    | $0.0000251887 | $25.18            | <font color="red">+43_248</font>      |
| 9   | http_request_update | 44_819_623     | 18_517_849    | $0.0000246226 | $24.62            | <font color="red">+66_815</font>      |
| 10  | http_request_update | 48_132_012     | 19_842_804    | $0.0000263844 | $26.38            | <font color="green">-6_111</font>     |
| 11  | http_request_update | 45_601_066     | 18_830_426    | $0.0000250383 | $25.03            | <font color="red">+55_625</font>      |
| 12  | http_request_update | 45_500_939     | 18_790_375    | $0.0000249850 | $24.98            | <font color="red">+46_466</font>      |
| 13  | http_request_update | 45_691_031     | 18_866_412    | $0.0000250861 | $25.08            | <font color="red">+25_620</font>      |
| 14  | http_request_update | 44_653_446     | 18_451_378    | $0.0000245342 | $24.53            | <font color="red">+43_866</font>      |
| 15  | http_request_update | 47_994_891     | 19_787_956    | $0.0000263115 | $26.31            | <font color="red">+18_842</font>      |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 12_614_239_316 | 9_846_285_726 | $0.0130923107 | $13_092.31        |
| 1   | http_request_update | 45_063_153     | 18_615_261    | $0.0000247522 | $24.75            |
| 2   | http_request_update | 44_938_479     | 18_565_391    | $0.0000246858 | $24.68            |
| 3   | http_request_update | 45_085_266     | 18_624_106    | $0.0000247639 | $24.76            |
| 4   | http_request_update | 44_073_452     | 18_219_380    | $0.0000242258 | $24.22            |
| 5   | http_request_update | 53_802_091     | 22_110_836    | $0.0000294001 | $29.40            |
| 6   | http_request_update | 45_678_703     | 18_861_481    | $0.0000250795 | $25.07            |
| 7   | http_request_update | 45_638_342     | 18_845_336    | $0.0000250581 | $25.05            |
| 8   | http_request_update | 45_840_776     | 18_926_310    | $0.0000251657 | $25.16            |
| 9   | http_request_update | 44_752_808     | 18_491_123    | $0.0000245871 | $24.58            |
| 10  | http_request_update | 48_138_123     | 19_845_249    | $0.0000263876 | $26.38            |
| 11  | http_request_update | 45_545_441     | 18_808_176    | $0.0000250087 | $25.00            |
| 12  | http_request_update | 45_454_473     | 18_771_789    | $0.0000249603 | $24.96            |
| 13  | http_request_update | 45_665_411     | 18_856_164    | $0.0000250725 | $25.07            |
| 14  | http_request_update | 44_609_580     | 18_433_832    | $0.0000245109 | $24.51            |
| 15  | http_request_update | 47_976_049     | 19_780_419    | $0.0000263014 | $26.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
