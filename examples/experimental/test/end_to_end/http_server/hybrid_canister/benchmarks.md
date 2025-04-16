# Benchmarks for server

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_578_104_933 | 5_831_831_973 | $0.0077544120 | $7_754.41         | <font color="red">+57_498_713</font> |
| 1   | http_request_update | 44_504_108    | 18_391_643    | $0.0000244548 | $24.45            | <font color="red">+199_123</font>    |
| 2   | candidUpdate        | 1_432_341     | 1_162_936     | $0.0000015463 | $1.54             | <font color="red">+721</font>        |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_520_606_220 | 5_808_832_488 | $0.0077238303 | $7_723.83         |
| 1   | http_request_update | 44_304_985    | 18_311_994    | $0.0000243489 | $24.34            |
| 2   | candidUpdate        | 1_431_620     | 1_162_648     | $0.0000015459 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade         | 7_601_537_785 | 5_841_205_114 | $0.0077668752 | $7_766.87         | <font color="red">+56_098_354</font> |
| 1   | http_request_update | 45_008_571    | 18_593_428    | $0.0000247231 | $24.72            | <font color="red">+300_789</font>    |
| 2   | candidUpdate        | 1_800_603     | 1_310_241     | $0.0000017422 | $1.74             | <font color="green">-4_403</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_545_439_431 | 5_818_765_772 | $0.0077370383 | $7_737.03         |
| 1   | http_request_update | 44_707_782    | 18_473_112    | $0.0000245631 | $24.56            |
| 2   | candidUpdate        | 1_805_006     | 1_312_002     | $0.0000017445 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_579_715_445 | 5_832_476_178 | $0.0077552686 | $7_755.26         | <font color="red">+55_658_403</font> |
| 1   | http_request_update | 44_526_899    | 18_400_759    | $0.0000244669 | $24.46            | <font color="red">+191_254</font>    |
| 2   | candidUpdate        | 1_464_623     | 1_175_849     | $0.0000015635 | $1.56             | <font color="red">+4_902</font>      |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_524_057_042 | 5_810_212_816 | $0.0077256657 | $7_725.66         |
| 1   | http_request_update | 44_335_645    | 18_324_258    | $0.0000243652 | $24.36            |
| 2   | candidUpdate        | 1_459_721     | 1_173_888     | $0.0000015609 | $1.56             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade         | 7_602_862_735 | 5_841_735_094 | $0.0077675799 | $7_767.57         | <font color="red">+55_458_780</font> |
| 1   | http_request_update | 45_018_442    | 18_597_376    | $0.0000247284 | $24.72            | <font color="red">+310_810</font>    |
| 2   | candidUpdate        | 1_829_705     | 1_321_882     | $0.0000017577 | $1.75             | <font color="red">+2_424</font>      |

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
