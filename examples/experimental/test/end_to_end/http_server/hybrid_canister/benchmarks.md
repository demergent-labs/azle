# Benchmarks for server

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 8_253_880_972 | 6_502_142_388 | $0.0086457037 | $8_645.70         | <font color="red">+118_651_369</font> |
| 1   | http_request_update | 44_853_992    | 18_531_596    | $0.0000246409 | $24.64            | <font color="red">+70_417</font>      |
| 2   | candidUpdate        | 1_428_547     | 1_161_418     | $0.0000015443 | $1.54             | <font color="red">+1_482</font>       |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_135_229_603 | 6_454_681_841 | $0.0085825968 | $8_582.59         |
| 1   | http_request_update | 44_783_575    | 18_503_430    | $0.0000246035 | $24.60            |
| 2   | candidUpdate        | 1_427_065     | 1_160_826     | $0.0000015435 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 8_277_179_442 | 6_511_461_776 | $0.0086580954 | $8_658.09         | <font color="red">+130_366_791</font> |
| 1   | http_request_update | 45_247_688    | 18_689_075    | $0.0000248503 | $24.85            | <font color="red">+143_612</font>     |
| 2   | candidUpdate        | 1_802_972     | 1_311_188     | $0.0000017434 | $1.74             | <font color="red">+9_490</font>       |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_146_812_651 | 6_459_315_060 | $0.0085887575 | $8_588.75         |
| 1   | http_request_update | 45_104_076    | 18_631_630    | $0.0000247739 | $24.77            |
| 2   | candidUpdate        | 1_793_482     | 1_307_392     | $0.0000017384 | $1.73             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 8_256_047_969 | 6_503_009_187 | $0.0086468562 | $8_646.85         | <font color="red">+119_854_067</font> |
| 1   | http_request_update | 44_852_133    | 18_530_853    | $0.0000246399 | $24.63            | <font color="red">+50_381</font>      |
| 2   | candidUpdate        | 1_456_206     | 1_172_482     | $0.0000015590 | $1.55             | <font color="red">+2_690</font>       |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_136_193_902 | 6_455_067_560 | $0.0085831097 | $8_583.10         |
| 1   | http_request_update | 44_801_752    | 18_510_700    | $0.0000246131 | $24.61            |
| 2   | candidUpdate        | 1_453_516     | 1_171_406     | $0.0000015576 | $1.55             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 8_278_906_231 | 6_512_152_492 | $0.0086590138 | $8_659.01         | <font color="red">+131_428_397</font> |
| 1   | http_request_update | 45_281_074    | 18_702_429    | $0.0000248681 | $24.86            | <font color="red">+138_707</font>     |
| 2   | candidUpdate        | 1_820_952     | 1_318_380     | $0.0000017530 | $1.75             | <font color="green">-659</font>       |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_147_477_834 | 6_459_581_133 | $0.0085891112 | $8_589.11         |
| 1   | http_request_update | 45_142_367    | 18_646_946    | $0.0000247943 | $24.79            |
| 2   | candidUpdate        | 1_821_611     | 1_318_644     | $0.0000017534 | $1.75             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
