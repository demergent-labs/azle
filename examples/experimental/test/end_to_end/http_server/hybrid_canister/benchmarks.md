# Benchmarks for server

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_576_244_651 | 5_831_087_860 | $0.0077534226 | $7_753.42         | <font color="red">+59_221_998</font> |
| 1   | http_request_update | 44_432_270    | 18_362_908    | $0.0000244166 | $24.41            | <font color="red">+124_899</font>    |
| 2   | candidUpdate        | 1_431_318     | 1_162_527     | $0.0000015458 | $1.54             | <font color="green">-3_614</font>    |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_517_022_653 | 5_807_399_061 | $0.0077219243 | $7_721.92         |
| 1   | http_request_update | 44_307_371    | 18_312_948    | $0.0000243502 | $24.35            |
| 2   | candidUpdate        | 1_434_932     | 1_163_972     | $0.0000015477 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade         | 7_599_485_638 | 5_840_384_255 | $0.0077657837 | $7_765.78         | <font color="red">+59_147_761</font> |
| 1   | http_request_update | 44_930_136    | 18_562_054    | $0.0000246814 | $24.68            | <font color="red">+218_941</font>    |
| 2   | candidUpdate        | 1_798_919     | 1_309_567     | $0.0000017413 | $1.74             | <font color="green">-6_199</font>    |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_540_337_877 | 5_816_725_150 | $0.0077343249 | $7_734.32         |
| 1   | http_request_update | 44_711_195    | 18_474_478    | $0.0000245650 | $24.56            |
| 2   | candidUpdate        | 1_805_118     | 1_312_047     | $0.0000017446 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_578_068_352 | 5_831_817_340 | $0.0077543926 | $7_754.39         | <font color="red">+59_056_372</font> |
| 1   | http_request_update | 44_466_750    | 18_376_700    | $0.0000244349 | $24.43            | <font color="red">+83_873</font>     |
| 2   | candidUpdate        | 1_458_820     | 1_173_528     | $0.0000015604 | $1.56             | <font color="green">-5_745</font>    |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_519_011_980 | 5_808_194_792 | $0.0077229824 | $7_722.98         |
| 1   | http_request_update | 44_382_877    | 18_343_150    | $0.0000243903 | $24.39            |
| 2   | candidUpdate        | 1_464_565     | 1_175_826     | $0.0000015635 | $1.56             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade         | 7_601_138_452 | 5_841_045_380 | $0.0077666628 | $7_766.66         | <font color="red">+58_629_896</font> |
| 1   | http_request_update | 44_941_009    | 18_566_403    | $0.0000246872 | $24.68            | <font color="red">+203_663</font>    |
| 2   | candidUpdate        | 1_817_862     | 1_317_144     | $0.0000017514 | $1.75             | <font color="green">-11_893</font>   |

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
