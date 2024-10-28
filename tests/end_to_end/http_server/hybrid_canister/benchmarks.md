# Benchmarks for server

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 5_880_443_981 | 4_352_767_592 | $0.0057877445 | $5_787.74         | <font color="green">-2_254_586_438</font> |
| 1   | http_request_update | 44_767_644    | 18_497_057    | $0.0000245950 | $24.59            | <font color="red">+6_136</font>           |
| 2   | candidUpdate        | 1_432_266     | 1_162_906     | $0.0000015463 | $1.54             | <font color="red">+5_853</font>           |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_135_030_419 | 6_454_602_167 | $0.0085824909 | $8_582.49         |
| 1   | http_request_update | 44_761_508    | 18_494_603    | $0.0000245917 | $24.59            |
| 2   | candidUpdate        | 1_426_413     | 1_160_565     | $0.0000015432 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | postUpgrade         | 5_890_829_678 | 4_356_921_871 | $0.0057932683 | $5_793.26         | <font color="green">-2_256_223_225</font> |
| 1   | http_request_update | 45_114_548    | 18_635_819    | $0.0000247795 | $24.77            | <font color="green">-22_371</font>        |
| 2   | candidUpdate        | 1_798_502     | 1_309_400     | $0.0000017411 | $1.74             | <font color="green">-1_487</font>         |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_147_052_903 | 6_459_411_161 | $0.0085888852 | $8_588.88         |
| 1   | http_request_update | 45_136_919    | 18_644_767    | $0.0000247914 | $24.79            |
| 2   | candidUpdate        | 1_799_989     | 1_309_995     | $0.0000017419 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 5_881_222_863 | 4_353_079_145 | $0.0057881587 | $5_788.15         | <font color="green">-2_254_933_128</font> |
| 1   | http_request_update | 44_829_956    | 18_521_982    | $0.0000246281 | $24.62            | <font color="red">+54_801</font>          |
| 2   | candidUpdate        | 1_453_754     | 1_171_501     | $0.0000015577 | $1.55             | <font color="green">-43_254_958</font>    |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_136_155_991 | 6_455_052_396 | $0.0085830895 | $8_583.08         |
| 1   | http_request_update | 44_775_155    | 18_500_062    | $0.0000245990 | $24.59            |
| 2   | http_request_update | 44_708_712    | 18_473_484    | $0.0000245636 | $24.56            |
| 3   | candidUpdate        | 1_453_654     | 1_171_461     | $0.0000015577 | $1.55             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | postUpgrade         | 5_891_333_458 | 4_357_123_383 | $0.0057935362 | $5_793.53         | <font color="green">-2_256_145_702</font> |
| 1   | http_request_update | 45_121_741    | 18_638_696    | $0.0000247833 | $24.78            | <font color="green">-52_808</font>        |
| 2   | candidUpdate        | 1_827_503     | 1_321_001     | $0.0000017565 | $1.75             | <font color="red">+12_596</font>          |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_147_479_160 | 6_459_581_664 | $0.0085891120 | $8_589.11         |
| 1   | http_request_update | 45_174_549    | 18_659_819    | $0.0000248114 | $24.81            |
| 2   | candidUpdate        | 1_814_907     | 1_315_962     | $0.0000017498 | $1.74             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
