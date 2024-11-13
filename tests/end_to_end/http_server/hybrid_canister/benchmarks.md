# Benchmarks for server

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 8_136_350_495 | 6_455_130_198 | $0.0085831930 | $8_583.19         | <font color="red">+1_120_892</font> |
| 1   | http_request_update | 44_780_337    | 18_502_134    | $0.0000246017 | $24.60            | <font color="green">-3_238</font>   |
| 2   | candidUpdate        | 1_430_674     | 1_162_269     | $0.0000015454 | $1.54             | <font color="red">+3_609</font>     |

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
| 0   | postUpgrade         | 8_159_511_992 | 6_464_394_796 | $0.0085955118 | $8_595.51         | <font color="red">+12_699_341</font> |
| 1   | http_request_update | 45_205_098    | 18_672_039    | $0.0000248277 | $24.82            | <font color="red">+101_022</font>    |
| 2   | candidUpdate        | 1_798_186     | 1_309_274     | $0.0000017409 | $1.74             | <font color="red">+4_704</font>      |

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
| 0   | init                | 8_138_675_913 | 6_456_060_365 | $0.0085844298 | $8_584.42         | <font color="red">+2_482_011</font> |
| 1   | http_request_update | 44_787_036    | 18_504_814    | $0.0000246053 | $24.60            | <font color="green">-14_716</font>  |
| 2   | candidUpdate        | 1_453_301     | 1_171_320     | $0.0000015575 | $1.55             | <font color="green">-215</font>     |

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
| 0   | postUpgrade         | 8_161_414_553 | 6_465_155_821 | $0.0085965237 | $8_596.52         | <font color="red">+13_936_719</font> |
| 1   | http_request_update | 45_228_817    | 18_681_526    | $0.0000248403 | $24.84            | <font color="red">+86_450</font>     |
| 2   | candidUpdate        | 1_821_544     | 1_318_617     | $0.0000017533 | $1.75             | <font color="green">-67</font>       |

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
