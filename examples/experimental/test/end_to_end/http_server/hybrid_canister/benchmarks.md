# Benchmarks for server

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 8_275_850_092 | 6_510_930_036 | $0.0086573883 | $8_657.38         | <font color="red">+139_499_597</font> |
| 1   | http_request_update | 44_935_647    | 18_564_258    | $0.0000246843 | $24.68            | <font color="red">+155_310</font>     |
| 2   | candidUpdate        | 1_437_007     | 1_164_802     | $0.0000015488 | $1.54             | <font color="red">+6_333</font>       |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_136_350_495 | 6_455_130_198 | $0.0085831930 | $8_583.19         |
| 1   | http_request_update | 44_780_337    | 18_502_134    | $0.0000246017 | $24.60            |
| 2   | candidUpdate        | 1_430_674     | 1_162_269     | $0.0000015454 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 8_299_370_212 | 6_520_338_084 | $0.0086698979 | $8_669.89         | <font color="red">+139_858_220</font> |
| 1   | http_request_update | 45_340_887    | 18_726_354    | $0.0000248999 | $24.89            | <font color="red">+135_789</font>     |
| 2   | candidUpdate        | 1_803_298     | 1_311_319     | $0.0000017436 | $1.74             | <font color="red">+5_112</font>       |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_159_511_992 | 6_464_394_796 | $0.0085955118 | $8_595.51         |
| 1   | http_request_update | 45_205_098    | 18_672_039    | $0.0000248277 | $24.82            |
| 2   | candidUpdate        | 1_798_186     | 1_309_274     | $0.0000017409 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 8_278_061_865 | 6_511_814_746 | $0.0086585647 | $8_658.56         | <font color="red">+139_385_952</font> |
| 1   | http_request_update | 44_971_989    | 18_578_795    | $0.0000247037 | $24.70            | <font color="red">+184_953</font>     |
| 2   | candidUpdate        | 1_462_146     | 1_174_858     | $0.0000015622 | $1.56             | <font color="red">+8_845</font>       |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_138_675_913 | 6_456_060_365 | $0.0085844298 | $8_584.42         |
| 1   | http_request_update | 44_787_036    | 18_504_814    | $0.0000246053 | $24.60            |
| 2   | candidUpdate        | 1_453_301     | 1_171_320     | $0.0000015575 | $1.55             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 8_301_400_676 | 6_521_150_270 | $0.0086709779 | $8_670.97         | <font color="red">+139_986_123</font> |
| 1   | http_request_update | 45_353_972    | 18_731_588    | $0.0000249068 | $24.90            | <font color="red">+125_155</font>     |
| 2   | candidUpdate        | 1_820_946     | 1_318_378     | $0.0000017530 | $1.75             | <font color="green">-598</font>       |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_161_414_553 | 6_465_155_821 | $0.0085965237 | $8_596.52         |
| 1   | http_request_update | 45_228_817    | 18_681_526    | $0.0000248403 | $24.84            |
| 2   | candidUpdate        | 1_821_544     | 1_318_617     | $0.0000017533 | $1.75             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
