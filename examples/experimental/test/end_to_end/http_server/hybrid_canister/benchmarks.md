# Benchmarks for server

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 8_253_880_972 | 6_502_142_388 | $0.0086457037 | $8_645.70         | <font color="red">+117_530_477</font> |
| 1   | http_request_update | 44_853_992    | 18_531_596    | $0.0000246409 | $24.64            | <font color="red">+73_655</font>      |
| 2   | candidUpdate        | 1_428_547     | 1_161_418     | $0.0000015443 | $1.54             | <font color="green">-2_127</font>     |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_136_350_495 | 6_455_130_198 | $0.0085831930 | $8_583.19         |
| 1   | http_request_update | 44_780_337    | 18_502_134    | $0.0000246017 | $24.60            |
| 2   | candidUpdate        | 1_430_674     | 1_162_269     | $0.0000015454 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 8_277_179_442 | 6_511_461_776 | $0.0086580954 | $8_658.09         | <font color="red">+117_667_450</font> |
| 1   | http_request_update | 45_247_688    | 18_689_075    | $0.0000248503 | $24.85            | <font color="red">+42_590</font>      |
| 2   | candidUpdate        | 1_802_972     | 1_311_188     | $0.0000017434 | $1.74             | <font color="red">+4_786</font>       |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_159_511_992 | 6_464_394_796 | $0.0085955118 | $8_595.51         |
| 1   | http_request_update | 45_205_098    | 18_672_039    | $0.0000248277 | $24.82            |
| 2   | candidUpdate        | 1_798_186     | 1_309_274     | $0.0000017409 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 8_256_047_969 | 6_503_009_187 | $0.0086468562 | $8_646.85         | <font color="red">+117_372_056</font> |
| 1   | http_request_update | 44_852_133    | 18_530_853    | $0.0000246399 | $24.63            | <font color="red">+65_097</font>      |
| 2   | candidUpdate        | 1_456_206     | 1_172_482     | $0.0000015590 | $1.55             | <font color="red">+2_905</font>       |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_138_675_913 | 6_456_060_365 | $0.0085844298 | $8_584.42         |
| 1   | http_request_update | 44_787_036    | 18_504_814    | $0.0000246053 | $24.60            |
| 2   | candidUpdate        | 1_453_301     | 1_171_320     | $0.0000015575 | $1.55             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 8_278_906_231 | 6_512_152_492 | $0.0086590138 | $8_659.01         | <font color="red">+117_491_678</font> |
| 1   | http_request_update | 45_281_074    | 18_702_429    | $0.0000248681 | $24.86            | <font color="red">+52_257</font>      |
| 2   | candidUpdate        | 1_820_952     | 1_318_380     | $0.0000017530 | $1.75             | <font color="green">-592</font>       |

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
