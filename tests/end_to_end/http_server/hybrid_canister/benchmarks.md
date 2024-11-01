# Benchmarks for server

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------- |
| 0   | init                | 8_135_229_603 | 6_454_681_841 | $0.0085825968 | $8_582.59         | <font color="red">+199_184</font> |
| 1   | http_request_update | 44_783_575    | 18_503_430    | $0.0000246035 | $24.60            | <font color="red">+22_067</font>  |
| 2   | candidUpdate        | 1_427_065     | 1_160_826     | $0.0000015435 | $1.54             | <font color="red">+652</font>     |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_135_030_419 | 6_454_602_167 | $0.0085824909 | $8_582.49         |
| 1   | http_request_update | 44_761_508    | 18_494_603    | $0.0000245917 | $24.59            |
| 2   | candidUpdate        | 1_426_413     | 1_160_565     | $0.0000015432 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 8_146_812_651 | 6_459_315_060 | $0.0085887575 | $8_588.75         | <font color="green">-240_252</font> |
| 1   | http_request_update | 45_104_076    | 18_631_630    | $0.0000247739 | $24.77            | <font color="green">-32_843</font>  |
| 2   | candidUpdate        | 1_793_482     | 1_307_392     | $0.0000017384 | $1.73             | <font color="green">-6_507</font>   |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_147_052_903 | 6_459_411_161 | $0.0085888852 | $8_588.88         |
| 1   | http_request_update | 45_136_919    | 18_644_767    | $0.0000247914 | $24.79            |
| 2   | candidUpdate        | 1_799_989     | 1_309_995     | $0.0000017419 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | init                | 8_136_193_902 | 6_455_067_560 | $0.0085831097 | $8_583.10         | <font color="red">+37_911</font>       |
| 1   | http_request_update | 44_801_752    | 18_510_700    | $0.0000246131 | $24.61            | <font color="red">+26_597</font>       |
| 2   | candidUpdate        | 1_453_516     | 1_171_406     | $0.0000015576 | $1.55             | <font color="green">-43_255_196</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_136_155_991 | 6_455_052_396 | $0.0085830895 | $8_583.08         |
| 1   | http_request_update | 44_775_155    | 18_500_062    | $0.0000245990 | $24.59            |
| 2   | http_request_update | 44_708_712    | 18_473_484    | $0.0000245636 | $24.56            |
| 3   | candidUpdate        | 1_453_654     | 1_171_461     | $0.0000015577 | $1.55             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | postUpgrade         | 8_147_477_834 | 6_459_581_133 | $0.0085891112 | $8_589.11         | <font color="green">-1_326</font>  |
| 1   | http_request_update | 45_142_367    | 18_646_946    | $0.0000247943 | $24.79            | <font color="green">-32_182</font> |
| 2   | candidUpdate        | 1_821_611     | 1_318_644     | $0.0000017534 | $1.75             | <font color="red">+6_704</font>    |

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
