# Benchmarks for api

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 12_761_905_339 | 9_905_352_135 | $0.0131708496 | $13_170.84        | <font color="red">+145_008_593</font> |
| 1   | http_request_update | 45_121_303     | 18_638_521    | $0.0000247831 | $24.78            | <font color="red">+29_983</font>      |
| 2   | http_request_update | 44_949_874     | 18_569_949    | $0.0000246919 | $24.69            | <font color="green">-37_879</font>    |
| 3   | http_request_update | 45_124_796     | 18_639_918    | $0.0000247849 | $24.78            | <font color="red">+10_148</font>      |
| 4   | http_request_update | 44_117_720     | 18_237_088    | $0.0000242493 | $24.24            | <font color="red">+104_868</font>     |
| 5   | http_request_update | 53_832_650     | 22_123_060    | $0.0000294164 | $29.41            | <font color="red">+32_084</font>      |
| 6   | http_request_update | 45_759_730     | 18_893_892    | $0.0000251226 | $25.12            | <font color="red">+65_723</font>      |
| 7   | http_request_update | 45_674_501     | 18_859_800    | $0.0000250773 | $25.07            | <font color="red">+16_717</font>      |
| 8   | http_request_update | 45_884_545     | 18_943_818    | $0.0000251890 | $25.18            | <font color="green">-16_275</font>    |
| 9   | http_request_update | 44_813_518     | 18_515_407    | $0.0000246194 | $24.61            | <font color="red">+4_271</font>       |
| 10  | http_request_update | 48_174_164     | 19_859_665    | $0.0000264068 | $26.40            | <font color="red">+58_491</font>      |
| 11  | http_request_update | 45_609_691     | 18_833_876    | $0.0000250428 | $25.04            | <font color="red">+36_653</font>      |
| 12  | http_request_update | 45_485_624     | 18_784_249    | $0.0000249769 | $24.97            | <font color="red">+7_725</font>       |
| 13  | http_request_update | 45_740_742     | 18_886_296    | $0.0000251125 | $25.11            | <font color="red">+42_734</font>      |
| 14  | http_request_update | 44_680_525     | 18_462_210    | $0.0000245486 | $24.54            | <font color="red">+71_331</font>      |
| 15  | http_request_update | 48_013_907     | 19_795_562    | $0.0000263216 | $26.32            | <font color="red">+39_758</font>      |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 12_616_896_746 | 9_847_348_698 | $0.0130937241 | $13_093.72        |
| 1   | http_request_update | 45_091_320     | 18_626_528    | $0.0000247671 | $24.76            |
| 2   | http_request_update | 44_987_753     | 18_585_101    | $0.0000247121 | $24.71            |
| 3   | http_request_update | 45_114_648     | 18_635_859    | $0.0000247795 | $24.77            |
| 4   | http_request_update | 44_012_852     | 18_195_140    | $0.0000241935 | $24.19            |
| 5   | http_request_update | 53_800_566     | 22_110_226    | $0.0000293993 | $29.39            |
| 6   | http_request_update | 45_694_007     | 18_867_602    | $0.0000250877 | $25.08            |
| 7   | http_request_update | 45_657_784     | 18_853_113    | $0.0000250684 | $25.06            |
| 8   | http_request_update | 45_900_820     | 18_950_328    | $0.0000251977 | $25.19            |
| 9   | http_request_update | 44_809_247     | 18_513_698    | $0.0000246171 | $24.61            |
| 10  | http_request_update | 48_115_673     | 19_836_269    | $0.0000263757 | $26.37            |
| 11  | http_request_update | 45_573_038     | 18_819_215    | $0.0000250233 | $25.02            |
| 12  | http_request_update | 45_477_899     | 18_781_159    | $0.0000249727 | $24.97            |
| 13  | http_request_update | 45_698_008     | 18_869_203    | $0.0000250898 | $25.08            |
| 14  | http_request_update | 44_609_194     | 18_433_677    | $0.0000245107 | $24.51            |
| 15  | http_request_update | 47_974_149     | 19_779_659    | $0.0000263004 | $26.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
