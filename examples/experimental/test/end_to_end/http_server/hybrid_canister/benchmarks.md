# Benchmarks for server

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_744_671_598 | 5_898_458_639 | $0.0078430035 | $7_843.00         | <font color="red">+224_065_378</font> |
| 1   | http_request_update | 44_454_677    | 18_371_870    | $0.0000244285 | $24.42            | <font color="red">+149_692</font>     |
| 2   | candidUpdate        | 1_436_014     | 1_164_405     | $0.0000015483 | $1.54             | <font color="red">+4_394</font>       |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_520_606_220 | 5_808_832_488 | $0.0077238303 | $7_723.83         |
| 1   | http_request_update | 44_304_985    | 18_311_994    | $0.0000243489 | $24.34            |
| 2   | candidUpdate        | 1_431_620     | 1_162_648     | $0.0000015459 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 7_768_414_563 | 5_907_955_825 | $0.0078556316 | $7_855.63         | <font color="red">+222_975_132</font> |
| 1   | http_request_update | 44_942_212    | 18_566_884    | $0.0000246878 | $24.68            | <font color="red">+234_430</font>     |
| 2   | candidUpdate        | 1_798_377     | 1_309_350     | $0.0000017410 | $1.74             | <font color="green">-6_629</font>     |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_545_439_431 | 5_818_765_772 | $0.0077370383 | $7_737.03         |
| 1   | http_request_update | 44_707_782    | 18_473_112    | $0.0000245631 | $24.56            |
| 2   | candidUpdate        | 1_805_006     | 1_312_002     | $0.0000017445 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_746_716_425 | 5_899_276_570 | $0.0078440911 | $7_844.09         | <font color="red">+222_659_383</font> |
| 1   | http_request_update | 44_438_252    | 18_365_300    | $0.0000244198 | $24.41            | <font color="red">+102_607</font>     |
| 2   | candidUpdate        | 1_459_542     | 1_173_816     | $0.0000015608 | $1.56             | <font color="green">-179</font>       |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_524_057_042 | 5_810_212_816 | $0.0077256657 | $7_725.66         |
| 1   | http_request_update | 44_335_645    | 18_324_258    | $0.0000243652 | $24.36            |
| 2   | candidUpdate        | 1_459_721     | 1_173_888     | $0.0000015609 | $1.56             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 7_769_902_357 | 5_908_550_942 | $0.0078564229 | $7_856.42         | <font color="red">+222_498_402</font> |
| 1   | http_request_update | 44_997_104    | 18_588_841    | $0.0000247170 | $24.71            | <font color="red">+289_472</font>     |
| 2   | candidUpdate        | 1_826_626     | 1_320_650     | $0.0000017560 | $1.75             | <font color="green">-655</font>       |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_547_403_955 | 5_819_551_582 | $0.0077380832 | $7_738.08         |
| 1   | http_request_update | 44_707_632    | 18_473_052    | $0.0000245631 | $24.56            |
| 2   | candidUpdate        | 1_827_281     | 1_320_912     | $0.0000017564 | $1.75             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
