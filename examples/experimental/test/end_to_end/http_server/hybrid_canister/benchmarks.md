# Benchmarks for server

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_517_232_998 | 5_807_483_199 | $0.0077220362 | $7_722.03         | <font color="green">-3_784_139</font> |
| 1   | http_request_update | 44_342_820    | 18_327_128    | $0.0000243690 | $24.36            | <font color="green">-26_220</font>    |
| 2   | candidUpdate        | 1_434_386     | 1_163_754     | $0.0000015474 | $1.54             | <font color="red">+210</font>         |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_521_017_137 | 5_808_996_854 | $0.0077240488 | $7_724.04         |
| 1   | http_request_update | 44_369_040    | 18_337_616    | $0.0000243830 | $24.38            |
| 2   | candidUpdate        | 1_434_176     | 1_163_670     | $0.0000015473 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 7_540_593_236 | 5_816_827_294 | $0.0077344607 | $7_734.46         | <font color="green">-3_793_357</font> |
| 1   | http_request_update | 44_709_576    | 18_473_830    | $0.0000245641 | $24.56            | <font color="green">-53_347</font>    |
| 2   | candidUpdate        | 1_800_300     | 1_310_120     | $0.0000017420 | $1.74             | <font color="green">-5_326</font>     |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_544_386_593 | 5_818_344_637 | $0.0077364783 | $7_736.47         |
| 1   | http_request_update | 44_762_923    | 18_495_169    | $0.0000245925 | $24.59            |
| 2   | candidUpdate        | 1_805_626     | 1_312_250     | $0.0000017449 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_519_387_392 | 5_808_344_956 | $0.0077231820 | $7_723.18         | <font color="green">-3_693_937</font> |
| 1   | http_request_update | 44_360_331    | 18_334_132    | $0.0000243783 | $24.37            | <font color="green">-41_172</font>    |
| 2   | candidUpdate        | 1_463_596     | 1_175_438     | $0.0000015629 | $1.56             | <font color="green">-258</font>       |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_523_081_329 | 5_809_822_531 | $0.0077251467 | $7_725.14         |
| 1   | http_request_update | 44_401_503    | 18_350_601    | $0.0000244002 | $24.40            |
| 2   | candidUpdate        | 1_463_854     | 1_175_541     | $0.0000015631 | $1.56             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 7_542_597_658 | 5_817_629_063 | $0.0077355268 | $7_735.52         | <font color="green">-3_098_309</font> |
| 1   | http_request_update | 44_759_594    | 18_493_837    | $0.0000245907 | $24.59            | <font color="green">-50_055</font>    |
| 2   | candidUpdate        | 1_828_896     | 1_321_558     | $0.0000017572 | $1.75             | <font color="red">+2_047</font>       |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_545_695_967 | 5_818_868_386 | $0.0077371747 | $7_737.17         |
| 1   | http_request_update | 44_809_649    | 18_513_859    | $0.0000246173 | $24.61            |
| 2   | candidUpdate        | 1_826_849     | 1_320_739     | $0.0000017561 | $1.75             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
