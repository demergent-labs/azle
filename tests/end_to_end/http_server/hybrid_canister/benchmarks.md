# Benchmarks for server

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 8_137_163_402 | 6_455_455_360 | $0.0085836253 | $8_583.62         | <font color="red">+1_933_799</font> |
| 1   | http_request_update | 44_775_015    | 18_500_006    | $0.0000245989 | $24.59            | <font color="green">-8_560</font>   |
| 2   | candidUpdate        | 1_431_369     | 1_162_547     | $0.0000015458 | $1.54             | <font color="red">+4_304</font>     |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_135_229_603 | 6_454_681_841 | $0.0085825968 | $8_582.59         |
| 1   | http_request_update | 44_783_575    | 18_503_430    | $0.0000246035 | $24.60            |
| 2   | candidUpdate        | 1_427_065     | 1_160_826     | $0.0000015435 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade         | 8_159_515_965 | 6_464_396_386 | $0.0085955139 | $8_595.51         | <font color="red">+12_703_314</font> |
| 1   | http_request_update | 45_186_161    | 18_664_464    | $0.0000248176 | $24.81            | <font color="red">+82_085</font>     |
| 2   | candidUpdate        | 1_798_485     | 1_309_394     | $0.0000017411 | $1.74             | <font color="red">+5_003</font>      |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_146_812_651 | 6_459_315_060 | $0.0085887575 | $8_588.75         |
| 1   | http_request_update | 45_104_076    | 18_631_630    | $0.0000247739 | $24.77            |
| 2   | candidUpdate        | 1_793_482     | 1_307_392     | $0.0000017384 | $1.73             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 8_138_621_277 | 6_456_038_510 | $0.0085844007 | $8_584.40         | <font color="red">+2_427_375</font> |
| 1   | http_request_update | 44_836_966    | 18_524_786    | $0.0000246319 | $24.63            | <font color="red">+35_214</font>    |
| 2   | candidUpdate        | 1_451_736     | 1_170_694     | $0.0000015566 | $1.55             | <font color="green">-1_780</font>   |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_136_193_902 | 6_455_067_560 | $0.0085831097 | $8_583.10         |
| 1   | http_request_update | 44_801_752    | 18_510_700    | $0.0000246131 | $24.61            |
| 2   | candidUpdate        | 1_453_516     | 1_171_406     | $0.0000015576 | $1.55             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade         | 8_161_332_296 | 6_465_122_918 | $0.0085964800 | $8_596.47         | <font color="red">+13_854_462</font> |
| 1   | http_request_update | 45_255_023    | 18_692_009    | $0.0000248542 | $24.85            | <font color="red">+112_656</font>    |
| 2   | candidUpdate        | 1_825_353     | 1_320_141     | $0.0000017554 | $1.75             | <font color="red">+3_742</font>      |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_147_477_834 | 6_459_581_133 | $0.0085891112 | $8_589.11         |
| 1   | http_request_update | 45_142_367    | 18_646_946    | $0.0000247943 | $24.79            |
| 2   | candidUpdate        | 1_821_611     | 1_318_644     | $0.0000017534 | $1.75             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
