# Benchmarks for api

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 12_625_340_541 | 9_850_726_216 | $0.0130982151 | $13_098.21        | <font color="red">+11_101_225</font> |
| 1   | http_request_update | 45_119_610     | 18_637_844    | $0.0000247822 | $24.78            | <font color="red">+56_457</font>     |
| 2   | http_request_update | 44_978_237     | 18_581_294    | $0.0000247070 | $24.70            | <font color="red">+39_758</font>     |
| 3   | http_request_update | 45_147_193     | 18_648_877    | $0.0000247969 | $24.79            | <font color="red">+61_927</font>     |
| 4   | http_request_update | 44_085_321     | 18_224_128    | $0.0000242321 | $24.23            | <font color="red">+11_869</font>     |
| 5   | http_request_update | 53_829_661     | 22_121_864    | $0.0000294148 | $29.41            | <font color="red">+27_570</font>     |
| 6   | http_request_update | 45_743_414     | 18_887_365    | $0.0000251140 | $25.11            | <font color="red">+64_711</font>     |
| 7   | http_request_update | 45_679_795     | 18_861_918    | $0.0000250801 | $25.08            | <font color="red">+41_453</font>     |
| 8   | http_request_update | 45_869_429     | 18_937_771    | $0.0000251810 | $25.18            | <font color="red">+28_653</font>     |
| 9   | http_request_update | 44_801_342     | 18_510_536    | $0.0000246129 | $24.61            | <font color="red">+48_534</font>     |
| 10  | http_request_update | 48_134_822     | 19_843_928    | $0.0000263859 | $26.38            | <font color="green">-3_301</font>    |
| 11  | http_request_update | 45_580_748     | 18_822_299    | $0.0000250274 | $25.02            | <font color="red">+35_307</font>     |
| 12  | http_request_update | 45_488_287     | 18_785_314    | $0.0000249783 | $24.97            | <font color="red">+33_814</font>     |
| 13  | http_request_update | 45_736_311     | 18_884_524    | $0.0000251102 | $25.11            | <font color="red">+70_900</font>     |
| 14  | http_request_update | 44_666_833     | 18_456_733    | $0.0000245414 | $24.54            | <font color="red">+57_253</font>     |
| 15  | http_request_update | 47_989_697     | 19_785_878    | $0.0000263087 | $26.30            | <font color="red">+13_648</font>     |

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
