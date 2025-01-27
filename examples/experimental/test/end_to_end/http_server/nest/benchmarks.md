# Benchmarks for api

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 12_791_870_016 | 9_917_338_006 | $0.0131867868 | $13_186.78        | <font color="red">+174_973_270</font> |
| 1   | http_request_update | 45_173_715     | 18_659_486    | $0.0000248110 | $24.81            | <font color="red">+82_395</font>      |
| 2   | http_request_update | 45_053_178     | 18_611_271    | $0.0000247468 | $24.74            | <font color="red">+65_425</font>      |
| 3   | http_request_update | 44_144_524     | 18_247_809    | $0.0000242636 | $24.26            | <font color="green">-970_124</font>   |
| 4   | http_request_update | 53_894_452     | 22_147_780    | $0.0000294492 | $29.44            | <font color="red">+9_881_600</font>   |
| 5   | http_request_update | 45_825_490     | 18_920_196    | $0.0000251576 | $25.15            | <font color="green">-7_975_076</font> |
| 6   | http_request_update | 45_733_243     | 18_883_297    | $0.0000251086 | $25.10            | <font color="red">+39_236</font>      |
| 7   | http_request_update | 44_858_320     | 18_533_328    | $0.0000246432 | $24.64            | <font color="green">-799_464</font>   |
| 8   | http_request_update | 48_189_678     | 19_865_871    | $0.0000264151 | $26.41            | <font color="red">+2_288_858</font>   |
| 9   | http_request_update | 45_636_565     | 18_844_626    | $0.0000250571 | $25.05            | <font color="red">+827_318</font>     |
| 10  | http_request_update | 45_557_827     | 18_813_130    | $0.0000250153 | $25.01            | <font color="green">-2_557_846</font> |
| 11  | http_request_update | 44_661_999     | 18_454_799    | $0.0000245388 | $24.53            | <font color="green">-911_039</font>   |
| 12  | http_request_update | 48_042_327     | 19_806_930    | $0.0000263367 | $26.33            | <font color="red">+2_564_428</font>   |

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
