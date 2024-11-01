# Benchmarks for api

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 12_616_892_004 | 9_847_346_801 | $0.0130937216 | $13_093.72        | <font color="red">+2_652_688</font> |
| 1   | http_request_update | 45_091_320     | 18_626_528    | $0.0000247671 | $24.76            | <font color="red">+28_167</font>    |
| 2   | http_request_update | 44_987_753     | 18_585_101    | $0.0000247121 | $24.71            | <font color="red">+49_274</font>    |
| 3   | http_request_update | 45_114_648     | 18_635_859    | $0.0000247795 | $24.77            | <font color="red">+29_382</font>    |
| 4   | http_request_update | 44_012_852     | 18_195_140    | $0.0000241935 | $24.19            | <font color="green">-60_600</font>  |
| 5   | http_request_update | 53_800_566     | 22_110_226    | $0.0000293993 | $29.39            | <font color="green">-1_525</font>   |
| 6   | http_request_update | 45_694_007     | 18_867_602    | $0.0000250877 | $25.08            | <font color="red">+15_304</font>    |
| 7   | http_request_update | 45_657_784     | 18_853_113    | $0.0000250684 | $25.06            | <font color="red">+19_442</font>    |
| 8   | http_request_update | 45_900_820     | 18_950_328    | $0.0000251977 | $25.19            | <font color="red">+60_044</font>    |
| 9   | http_request_update | 44_809_247     | 18_513_698    | $0.0000246171 | $24.61            | <font color="red">+56_439</font>    |
| 10  | http_request_update | 48_115_673     | 19_836_269    | $0.0000263757 | $26.37            | <font color="green">-22_450</font>  |
| 11  | http_request_update | 45_573_038     | 18_819_215    | $0.0000250233 | $25.02            | <font color="red">+27_597</font>    |
| 12  | http_request_update | 45_477_899     | 18_781_159    | $0.0000249727 | $24.97            | <font color="red">+23_426</font>    |
| 13  | http_request_update | 45_698_008     | 18_869_203    | $0.0000250898 | $25.08            | <font color="red">+32_597</font>    |
| 14  | http_request_update | 44_609_194     | 18_433_677    | $0.0000245107 | $24.51            | <font color="green">-386</font>     |
| 15  | http_request_update | 47_974_149     | 19_779_659    | $0.0000263004 | $26.30            | <font color="green">-1_900</font>   |

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
