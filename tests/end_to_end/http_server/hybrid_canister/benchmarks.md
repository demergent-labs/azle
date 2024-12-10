# Benchmarks for server

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 8_145_500_061 | 6_458_790_024 | $0.0085880593 | $8_588.05         | <font color="red">+10_270_458</font> |
| 1   | http_request_update | 44_837_188    | 18_524_875    | $0.0000246320 | $24.63            | <font color="red">+53_613</font>     |
| 2   | candidUpdate        | 1_427_684     | 1_161_073     | $0.0000015438 | $1.54             | <font color="red">+619</font>        |

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
| 0   | postUpgrade         | 8_168_712_546 | 6_468_075_018 | $0.0086004053 | $8_600.40         | <font color="red">+21_899_895</font> |
| 1   | http_request_update | 45_198_526    | 18_669_410    | $0.0000248242 | $24.82            | <font color="red">+94_450</font>     |
| 2   | candidUpdate        | 1_794_865     | 1_307_946     | $0.0000017391 | $1.73             | <font color="red">+1_383</font>      |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_146_812_651 | 6_459_315_060 | $0.0085887575 | $8_588.75         |
| 1   | http_request_update | 45_104_076    | 18_631_630    | $0.0000247739 | $24.77            |
| 2   | candidUpdate        | 1_793_482     | 1_307_392     | $0.0000017384 | $1.73             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 8_147_589_269 | 6_459_625_707 | $0.0085891705 | $8_589.17         | <font color="red">+11_395_367</font> |
| 1   | http_request_update | 44_884_412    | 18_543_764    | $0.0000246571 | $24.65            | <font color="red">+82_660</font>     |
| 2   | candidUpdate        | 1_456_998     | 1_172_799     | $0.0000015594 | $1.55             | <font color="red">+3_482</font>      |

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
| 0   | postUpgrade         | 8_170_848_825 | 6_468_929_530 | $0.0086015415 | $8_601.54         | <font color="red">+23_370_991</font> |
| 1   | http_request_update | 45_251_017    | 18_690_406    | $0.0000248521 | $24.85            | <font color="red">+108_650</font>    |
| 2   | candidUpdate        | 1_819_780     | 1_317_912     | $0.0000017524 | $1.75             | <font color="green">-1_831</font>    |

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
