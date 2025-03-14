⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for server

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_520_606_220 | 5_808_832_488 | $0.0077238303 | $7_723.83         | <font color="red">+3_583_567</font> |
| 1   | http_request_update | 44_304_985    | 18_311_994    | $0.0000243489 | $24.34            | <font color="green">-2_386</font>   |
| 2   | candidUpdate        | 1_431_620     | 1_162_648     | $0.0000015459 | $1.54             | <font color="green">-3_312</font>   |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_517_022_653 | 5_807_399_061 | $0.0077219243 | $7_721.92         |
| 1   | http_request_update | 44_307_371    | 18_312_948    | $0.0000243502 | $24.35            |
| 2   | candidUpdate        | 1_434_932     | 1_163_972     | $0.0000015477 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 7_545_439_431 | 5_818_765_772 | $0.0077370383 | $7_737.03         | <font color="red">+5_101_554</font> |
| 1   | http_request_update | 44_707_782    | 18_473_112    | $0.0000245631 | $24.56            | <font color="green">-3_413</font>   |
| 2   | candidUpdate        | 1_805_006     | 1_312_002     | $0.0000017445 | $1.74             | <font color="green">-112</font>     |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_540_337_877 | 5_816_725_150 | $0.0077343249 | $7_734.32         |
| 1   | http_request_update | 44_711_195    | 18_474_478    | $0.0000245650 | $24.56            |
| 2   | candidUpdate        | 1_805_118     | 1_312_047     | $0.0000017446 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_524_057_042 | 5_810_212_816 | $0.0077256657 | $7_725.66         | <font color="red">+5_045_062</font> |
| 1   | http_request_update | 44_335_645    | 18_324_258    | $0.0000243652 | $24.36            | <font color="green">-47_232</font>  |
| 2   | candidUpdate        | 1_459_721     | 1_173_888     | $0.0000015609 | $1.56             | <font color="green">-4_844</font>   |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_519_011_980 | 5_808_194_792 | $0.0077229824 | $7_722.98         |
| 1   | http_request_update | 44_382_877    | 18_343_150    | $0.0000243903 | $24.39            |
| 2   | candidUpdate        | 1_464_565     | 1_175_826     | $0.0000015635 | $1.56             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 7_547_403_955 | 5_819_551_582 | $0.0077380832 | $7_738.08         | <font color="red">+4_895_399</font> |
| 1   | http_request_update | 44_707_632    | 18_473_052    | $0.0000245631 | $24.56            | <font color="green">-29_714</font>  |
| 2   | candidUpdate        | 1_827_281     | 1_320_912     | $0.0000017564 | $1.75             | <font color="green">-2_474</font>   |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_542_508_556 | 5_817_593_422 | $0.0077354794 | $7_735.47         |
| 1   | http_request_update | 44_737_346    | 18_484_938    | $0.0000245789 | $24.57            |
| 2   | candidUpdate        | 1_829_755     | 1_321_902     | $0.0000017577 | $1.75             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
