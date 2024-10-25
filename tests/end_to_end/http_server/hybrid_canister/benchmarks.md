# Benchmarks for server

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 5_880_487_124 | 4_352_784_849 | $0.0057877674 | $5_787.76         | <font color="green">-2_254_543_295</font> |
| 1   | http_request_update | 44_794_901    | 18_507_960    | $0.0000246095 | $24.60            | <font color="red">+33_393</font>          |
| 2   | candidUpdate        | 1_430_071     | 1_162_028     | $0.0000015451 | $1.54             | <font color="red">+3_658</font>           |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_135_030_419 | 6_454_602_167 | $0.0085824909 | $8_582.49         |
| 1   | http_request_update | 44_761_508    | 18_494_603    | $0.0000245917 | $24.59            |
| 2   | candidUpdate        | 1_426_413     | 1_160_565     | $0.0000015432 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | postUpgrade         | 5_891_017_334 | 4_356_996_933 | $0.0057933681 | $5_793.36         | <font color="green">-2_256_035_569</font> |
| 1   | http_request_update | 45_100_899    | 18_630_359    | $0.0000247722 | $24.77            | <font color="green">-36_020</font>        |
| 2   | candidUpdate        | 1_796_331     | 1_308_532     | $0.0000017399 | $1.73             | <font color="green">-3_658</font>         |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_147_052_903 | 6_459_411_161 | $0.0085888852 | $8_588.88         |
| 1   | http_request_update | 45_136_919    | 18_644_767    | $0.0000247914 | $24.79            |
| 2   | candidUpdate        | 1_799_989     | 1_309_995     | $0.0000017419 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 5_881_185_874 | 4_353_064_349 | $0.0057881391 | $5_788.13         | <font color="green">-2_254_970_117</font> |
| 1   | http_request_update | 44_761_145    | 18_494_458    | $0.0000245915 | $24.59            | <font color="green">-14_010</font>        |
| 2   | candidUpdate        | 1_460_137     | 1_174_054     | $0.0000015611 | $1.56             | <font color="green">-43_248_575</font>    |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_136_155_991 | 6_455_052_396 | $0.0085830895 | $8_583.08         |
| 1   | http_request_update | 44_775_155    | 18_500_062    | $0.0000245990 | $24.59            |
| 2   | http_request_update | 44_708_712    | 18_473_484    | $0.0000245636 | $24.56            |
| 3   | candidUpdate        | 1_453_654     | 1_171_461     | $0.0000015577 | $1.55             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | postUpgrade         | 5_891_461_246 | 4_357_174_498 | $0.0057936042 | $5_793.60         | <font color="green">-2_256_017_914</font> |
| 1   | http_request_update | 45_170_133    | 18_658_053    | $0.0000248091 | $24.80            | <font color="green">-4_416</font>         |
| 2   | candidUpdate        | 1_825_399     | 1_320_159     | $0.0000017554 | $1.75             | <font color="red">+10_492</font>          |

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
