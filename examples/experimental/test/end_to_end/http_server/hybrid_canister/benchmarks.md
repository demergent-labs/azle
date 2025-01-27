# Benchmarks for server

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 8_282_550_587 | 6_513_610_234 | $0.0086609521 | $8_660.95         | <font color="red">+146_200_092</font> |
| 1   | http_request_update | 44_923_564    | 18_559_425    | $0.0000246779 | $24.67            | <font color="red">+143_227</font>     |
| 2   | candidUpdate        | 1_431_517     | 1_162_606     | $0.0000015459 | $1.54             | <font color="red">+843</font>         |

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
| 0   | postUpgrade         | 8_306_802_100 | 6_523_310_840 | $0.0086738507 | $8_673.85         | <font color="red">+147_290_108</font> |
| 1   | http_request_update | 45_309_961    | 18_713_984    | $0.0000248834 | $24.88            | <font color="red">+104_863</font>     |
| 2   | candidUpdate        | 1_801_225     | 1_310_490     | $0.0000017425 | $1.74             | <font color="red">+3_039</font>       |

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
| 0   | init                | 8_284_986_699 | 6_514_584_679 | $0.0086622478 | $8_662.24         | <font color="red">+146_310_786</font> |
| 1   | http_request_update | 44_903_728    | 18_551_491    | $0.0000246674 | $24.66            | <font color="red">+116_692</font>     |
| 2   | candidUpdate        | 1_457_906     | 1_173_162     | $0.0000015599 | $1.55             | <font color="red">+4_605</font>       |

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
| 0   | postUpgrade         | 8_308_775_044 | 6_524_100_017 | $0.0086749001 | $8_674.90         | <font color="red">+147_360_491</font> |
| 1   | http_request_update | 45_324_822    | 18_719_928    | $0.0000248913 | $24.89            | <font color="red">+96_005</font>      |
| 2   | candidUpdate        | 1_824_244     | 1_319_697     | $0.0000017548 | $1.75             | <font color="red">+2_700</font>       |

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
