# Benchmarks for api

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 12_613_260_892 | 9_845_894_356 | $0.0130917903 | $13_091.79        | <font color="green">-978_424</font> |
| 1   | http_request_update | 45_100_890     | 18_630_356    | $0.0000247722 | $24.77            | <font color="red">+37_737</font>    |
| 2   | http_request_update | 44_925_319     | 18_560_127    | $0.0000246788 | $24.67            | <font color="green">-13_160</font>  |
| 3   | http_request_update | 45_098_323     | 18_629_329    | $0.0000247709 | $24.77            | <font color="red">+13_057</font>    |
| 4   | http_request_update | 44_078_322     | 18_221_328    | $0.0000242284 | $24.22            | <font color="red">+4_870</font>     |
| 5   | http_request_update | 53_807_676     | 22_113_070    | $0.0000294031 | $29.40            | <font color="red">+5_585</font>     |
| 6   | http_request_update | 45_713_763     | 18_875_505    | $0.0000250982 | $25.09            | <font color="red">+35_060</font>    |
| 7   | http_request_update | 45_605_557     | 18_832_222    | $0.0000250406 | $25.04            | <font color="green">-32_785</font>  |
| 8   | http_request_update | 45_869_254     | 18_937_701    | $0.0000251809 | $25.18            | <font color="red">+28_478</font>    |
| 9   | http_request_update | 44_780_355     | 18_502_142    | $0.0000246017 | $24.60            | <font color="red">+27_547</font>    |
| 10  | http_request_update | 48_095_582     | 19_828_232    | $0.0000263650 | $26.36            | <font color="green">-42_541</font>  |
| 11  | http_request_update | 45_569_189     | 18_817_675    | $0.0000250213 | $25.02            | <font color="red">+23_748</font>    |
| 12  | http_request_update | 45_459_321     | 18_773_728    | $0.0000249629 | $24.96            | <font color="red">+4_848</font>     |
| 13  | http_request_update | 45_677_005     | 18_860_802    | $0.0000250786 | $25.07            | <font color="red">+11_594</font>    |
| 14  | http_request_update | 44_615_486     | 18_436_194    | $0.0000245141 | $24.51            | <font color="red">+5_906</font>     |
| 15  | http_request_update | 48_001_660     | 19_790_664    | $0.0000263151 | $26.31            | <font color="red">+25_611</font>    |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

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

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
