# Benchmarks for api

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 11_846_089_545 | 9_139_025_818 | $0.0121518885 | $12_151.88        | <font color="green">-944_867_030</font> |
| 1   | http_request_update | 44_664_554     | 18_455_821    | $0.0000245402 | $24.54            | <font color="green">-545_428</font>     |
| 2   | http_request_update | 44_470_346     | 18_378_138    | $0.0000244369 | $24.43            | <font color="green">-586_716</font>     |
| 3   | http_request_update | 43_535_693     | 18_004_277    | $0.0000239397 | $23.93            | <font color="green">-578_336</font>     |
| 4   | http_request_update | 53_288_990     | 21_905_596    | $0.0000291272 | $29.12            | <font color="green">-625_093</font>     |
| 5   | http_request_update | 45_171_325     | 18_658_530    | $0.0000248097 | $24.80            | <font color="green">-631_441</font>     |
| 6   | http_request_update | 45_091_083     | 18_626_433    | $0.0000247670 | $24.76            | <font color="green">-629_215</font>     |
| 7   | http_request_update | 44_238_746     | 18_285_498    | $0.0000243137 | $24.31            | <font color="green">-623_160</font>     |
| 8   | http_request_update | 47_529_412     | 19_601_764    | $0.0000260639 | $26.06            | <font color="green">-682_520</font>     |
| 9   | http_request_update | 44_950_843     | 18_570_337    | $0.0000246924 | $24.69            | <font color="green">-720_934</font>     |
| 10  | http_request_update | 44_865_341     | 18_536_136    | $0.0000246469 | $24.64            | <font color="green">-730_968</font>     |
| 11  | http_request_update | 44_025_496     | 18_200_198    | $0.0000242003 | $24.20            | <font color="green">-679_935</font>     |
| 12  | http_request_update | 47_325_628     | 19_520_251    | $0.0000259555 | $25.95            | <font color="green">-734_552</font>     |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 12_790_956_575 | 9_916_972_630 | $0.0131863010 | $13_186.30        |
| 1   | http_request_update | 45_209_982     | 18_673_992    | $0.0000248302 | $24.83            |
| 2   | http_request_update | 45_057_062     | 18_612_824    | $0.0000247489 | $24.74            |
| 3   | http_request_update | 44_114_029     | 18_235_611    | $0.0000242473 | $24.24            |
| 4   | http_request_update | 53_914_083     | 22_155_633    | $0.0000294597 | $29.45            |
| 5   | http_request_update | 45_802_766     | 18_911_106    | $0.0000251455 | $25.14            |
| 6   | http_request_update | 45_720_298     | 18_878_119    | $0.0000251017 | $25.10            |
| 7   | http_request_update | 44_861_906     | 18_534_762    | $0.0000246451 | $24.64            |
| 8   | http_request_update | 48_211_932     | 19_874_772    | $0.0000264269 | $26.42            |
| 9   | http_request_update | 45_671_777     | 18_858_710    | $0.0000250759 | $25.07            |
| 10  | http_request_update | 45_596_309     | 18_828_523    | $0.0000250357 | $25.03            |
| 11  | http_request_update | 44_705_431     | 18_472_172    | $0.0000245619 | $24.56            |
| 12  | http_request_update | 48_060_180     | 19_814_072    | $0.0000263462 | $26.34            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
