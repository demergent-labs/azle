# Benchmarks for api

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 12_761_819_061 | 9_905_317_624 | $0.0131708037 | $13_170.80        | <font color="red">+144_922_315</font> |
| 1   | http_request_update | 45_106_088     | 18_632_435    | $0.0000247750 | $24.77            | <font color="red">+14_768</font>      |
| 2   | http_request_update | 44_963_402     | 18_575_360    | $0.0000246991 | $24.69            | <font color="green">-24_351</font>    |
| 3   | http_request_update | 45_148_527     | 18_649_410    | $0.0000247976 | $24.79            | <font color="red">+33_879</font>      |
| 4   | http_request_update | 44_065_427     | 18_216_170    | $0.0000242215 | $24.22            | <font color="red">+52_575</font>      |
| 5   | http_request_update | 53_869_242     | 22_137_696    | $0.0000294358 | $29.43            | <font color="red">+68_676</font>      |
| 6   | http_request_update | 45_751_125     | 18_890_450    | $0.0000251181 | $25.11            | <font color="red">+57_118</font>      |
| 7   | http_request_update | 45_628_726     | 18_841_490    | $0.0000250530 | $25.05            | <font color="green">-29_058</font>    |
| 8   | http_request_update | 45_870_877     | 18_938_350    | $0.0000251818 | $25.18            | <font color="green">-29_943</font>    |
| 9   | http_request_update | 44_777_813     | 18_501_125    | $0.0000246004 | $24.60            | <font color="green">-31_434</font>    |
| 10  | http_request_update | 48_164_746     | 19_855_898    | $0.0000264018 | $26.40            | <font color="red">+49_073</font>      |
| 11  | http_request_update | 45_572_038     | 18_818_815    | $0.0000250228 | $25.02            | <font color="green">-1_000</font>     |
| 12  | http_request_update | 45_536_180     | 18_804_472    | $0.0000250037 | $25.00            | <font color="red">+58_281</font>      |
| 13  | http_request_update | 45_707_707     | 18_873_082    | $0.0000250950 | $25.09            | <font color="red">+9_699</font>       |
| 14  | http_request_update | 44_627_611     | 18_441_044    | $0.0000245205 | $24.52            | <font color="red">+18_417</font>      |
| 15  | http_request_update | 48_005_144     | 19_792_057    | $0.0000263169 | $26.31            | <font color="red">+30_995</font>      |

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
