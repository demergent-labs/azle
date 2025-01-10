# Benchmarks for api

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 12_790_956_575 | 9_916_972_630 | $0.0131863010 | $13_186.30        | <font color="red">+174_059_829</font> |
| 1   | http_request_update | 45_209_982     | 18_673_992    | $0.0000248302 | $24.83            | <font color="red">+118_662</font>     |
| 2   | http_request_update | 45_057_062     | 18_612_824    | $0.0000247489 | $24.74            | <font color="red">+69_309</font>      |
| 3   | http_request_update | 44_114_029     | 18_235_611    | $0.0000242473 | $24.24            | <font color="green">-1_000_619</font> |
| 4   | http_request_update | 53_914_083     | 22_155_633    | $0.0000294597 | $29.45            | <font color="red">+9_901_231</font>   |
| 5   | http_request_update | 45_802_766     | 18_911_106    | $0.0000251455 | $25.14            | <font color="green">-7_997_800</font> |
| 6   | http_request_update | 45_720_298     | 18_878_119    | $0.0000251017 | $25.10            | <font color="red">+26_291</font>      |
| 7   | http_request_update | 44_861_906     | 18_534_762    | $0.0000246451 | $24.64            | <font color="green">-795_878</font>   |
| 8   | http_request_update | 48_211_932     | 19_874_772    | $0.0000264269 | $26.42            | <font color="red">+2_311_112</font>   |
| 9   | http_request_update | 45_671_777     | 18_858_710    | $0.0000250759 | $25.07            | <font color="red">+862_530</font>     |
| 10  | http_request_update | 45_596_309     | 18_828_523    | $0.0000250357 | $25.03            | <font color="green">-2_519_364</font> |
| 11  | http_request_update | 44_705_431     | 18_472_172    | $0.0000245619 | $24.56            | <font color="green">-867_607</font>   |
| 12  | http_request_update | 48_060_180     | 19_814_072    | $0.0000263462 | $26.34            | <font color="red">+2_582_281</font>   |

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
