# Benchmarks for server

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 7_521_017_137 | 5_808_996_854 | $0.0077240488 | $7_724.04         | <font color="green">-754_832_955</font> |
| 1   | http_request_update | 44_369_040    | 18_337_616    | $0.0000243830 | $24.38            | <font color="green">-566_607</font>     |
| 2   | candidUpdate        | 1_434_176     | 1_163_670     | $0.0000015473 | $1.54             | <font color="green">-2_831</font>       |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_275_850_092 | 6_510_930_036 | $0.0086573883 | $8_657.38         |
| 1   | http_request_update | 44_935_647    | 18_564_258    | $0.0000246843 | $24.68            |
| 2   | candidUpdate        | 1_437_007     | 1_164_802     | $0.0000015488 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade         | 7_544_386_593 | 5_818_344_637 | $0.0077364783 | $7_736.47         | <font color="green">-754_983_619</font> |
| 1   | http_request_update | 44_762_923    | 18_495_169    | $0.0000245925 | $24.59            | <font color="green">-577_964</font>     |
| 2   | candidUpdate        | 1_805_626     | 1_312_250     | $0.0000017449 | $1.74             | <font color="red">+2_328</font>         |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_299_370_212 | 6_520_338_084 | $0.0086698979 | $8_669.89         |
| 1   | http_request_update | 45_340_887    | 18_726_354    | $0.0000248999 | $24.89            |
| 2   | candidUpdate        | 1_803_298     | 1_311_319     | $0.0000017436 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 7_523_081_329 | 5_809_822_531 | $0.0077251467 | $7_725.14         | <font color="green">-754_980_536</font> |
| 1   | http_request_update | 44_401_503    | 18_350_601    | $0.0000244002 | $24.40            | <font color="green">-570_486</font>     |
| 2   | candidUpdate        | 1_463_854     | 1_175_541     | $0.0000015631 | $1.56             | <font color="red">+1_708</font>         |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_278_061_865 | 6_511_814_746 | $0.0086585647 | $8_658.56         |
| 1   | http_request_update | 44_971_989    | 18_578_795    | $0.0000247037 | $24.70            |
| 2   | candidUpdate        | 1_462_146     | 1_174_858     | $0.0000015622 | $1.56             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade         | 7_545_695_967 | 5_818_868_386 | $0.0077371747 | $7_737.17         | <font color="green">-755_704_709</font> |
| 1   | http_request_update | 44_809_649    | 18_513_859    | $0.0000246173 | $24.61            | <font color="green">-544_323</font>     |
| 2   | candidUpdate        | 1_826_849     | 1_320_739     | $0.0000017561 | $1.75             | <font color="red">+5_903</font>         |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_301_400_676 | 6_521_150_270 | $0.0086709779 | $8_670.97         |
| 1   | http_request_update | 45_353_972    | 18_731_588    | $0.0000249068 | $24.90            |
| 2   | candidUpdate        | 1_820_946     | 1_318_378     | $0.0000017530 | $1.75             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
