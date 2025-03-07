# Benchmarks for server

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 7_517_022_653 | 5_807_399_061 | $0.0077219243 | $7_721.92         | <font color="red">+143_966</font>  |
| 1   | http_request_update | 44_307_371    | 18_312_948    | $0.0000243502 | $24.35            | <font color="green">-24_271</font> |
| 2   | candidUpdate        | 1_434_932     | 1_163_972     | $0.0000015477 | $1.54             | <font color="red">+1_883</font>    |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_516_878_687 | 5_807_341_474 | $0.0077218477 | $7_721.84         |
| 1   | http_request_update | 44_331_642    | 18_322_656    | $0.0000243631 | $24.36            |
| 2   | candidUpdate        | 1_433_049     | 1_163_219     | $0.0000015467 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 7_540_337_877 | 5_816_725_150 | $0.0077343249 | $7_734.32         | <font color="green">-292_421</font> |
| 1   | http_request_update | 44_711_195    | 18_474_478    | $0.0000245650 | $24.56            | <font color="red">+9_992</font>     |
| 2   | candidUpdate        | 1_805_118     | 1_312_047     | $0.0000017446 | $1.74             | <font color="red">+2_051</font>     |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_540_630_298 | 5_816_842_119 | $0.0077344805 | $7_734.48         |
| 1   | http_request_update | 44_701_203    | 18_470_481    | $0.0000245596 | $24.55            |
| 2   | candidUpdate        | 1_803_067     | 1_311_226     | $0.0000017435 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_519_011_980 | 5_808_194_792 | $0.0077229824 | $7_722.98         | <font color="green">-529_746</font> |
| 1   | http_request_update | 44_382_877    | 18_343_150    | $0.0000243903 | $24.39            | <font color="red">+60_944</font>    |
| 2   | candidUpdate        | 1_464_565     | 1_175_826     | $0.0000015635 | $1.56             | <font color="red">+3_871</font>     |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_519_541_726 | 5_808_406_690 | $0.0077232641 | $7_723.26         |
| 1   | http_request_update | 44_321_933    | 18_318_773    | $0.0000243579 | $24.35            |
| 2   | candidUpdate        | 1_460_694     | 1_174_277     | $0.0000015614 | $1.56             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | postUpgrade         | 7_542_508_556 | 5_817_593_422 | $0.0077354794 | $7_735.47         | <font color="red">+87_858</font>   |
| 1   | http_request_update | 44_737_346    | 18_484_938    | $0.0000245789 | $24.57            | <font color="green">-22_090</font> |
| 2   | candidUpdate        | 1_829_755     | 1_321_902     | $0.0000017577 | $1.75             | <font color="red">+2_297</font>    |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_542_420_698 | 5_817_558_279 | $0.0077354327 | $7_735.43         |
| 1   | http_request_update | 44_759_436    | 18_493_774    | $0.0000245906 | $24.59            |
| 2   | candidUpdate        | 1_827_458     | 1_320_983     | $0.0000017565 | $1.75             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
