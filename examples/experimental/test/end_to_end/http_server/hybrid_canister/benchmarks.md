# Benchmarks for server

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_516_878_687 | 5_807_341_474 | $0.0077218477 | $7_721.84         | <font color="green">-354_311</font> |
| 1   | http_request_update | 44_331_642    | 18_322_656    | $0.0000243631 | $24.36            | <font color="green">-11_178</font>  |
| 2   | candidUpdate        | 1_433_049     | 1_163_219     | $0.0000015467 | $1.54             | <font color="green">-1_337</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_517_232_998 | 5_807_483_199 | $0.0077220362 | $7_722.03         |
| 1   | http_request_update | 44_342_820    | 18_327_128    | $0.0000243690 | $24.36            |
| 2   | candidUpdate        | 1_434_386     | 1_163_754     | $0.0000015474 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------- |
| 0   | postUpgrade         | 7_540_630_298 | 5_816_842_119 | $0.0077344805 | $7_734.48         | <font color="red">+37_062</font>  |
| 1   | http_request_update | 44_701_203    | 18_470_481    | $0.0000245596 | $24.55            | <font color="green">-8_373</font> |
| 2   | candidUpdate        | 1_803_067     | 1_311_226     | $0.0000017435 | $1.74             | <font color="red">+2_767</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_540_593_236 | 5_816_827_294 | $0.0077344607 | $7_734.46         |
| 1   | http_request_update | 44_709_576    | 18_473_830    | $0.0000245641 | $24.56            |
| 2   | candidUpdate        | 1_800_300     | 1_310_120     | $0.0000017420 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 7_519_541_726 | 5_808_406_690 | $0.0077232641 | $7_723.26         | <font color="red">+154_334</font>  |
| 1   | http_request_update | 44_321_933    | 18_318_773    | $0.0000243579 | $24.35            | <font color="green">-38_398</font> |
| 2   | candidUpdate        | 1_460_694     | 1_174_277     | $0.0000015614 | $1.56             | <font color="green">-2_902</font>  |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_519_387_392 | 5_808_344_956 | $0.0077231820 | $7_723.18         |
| 1   | http_request_update | 44_360_331    | 18_334_132    | $0.0000243783 | $24.37            |
| 2   | candidUpdate        | 1_463_596     | 1_175_438     | $0.0000015629 | $1.56             |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 7_542_420_698 | 5_817_558_279 | $0.0077354327 | $7_735.43         | <font color="green">-176_960</font> |
| 1   | http_request_update | 44_759_436    | 18_493_774    | $0.0000245906 | $24.59            | <font color="green">-158</font>     |
| 2   | candidUpdate        | 1_827_458     | 1_320_983     | $0.0000017565 | $1.75             | <font color="green">-1_438</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_542_597_658 | 5_817_629_063 | $0.0077355268 | $7_735.52         |
| 1   | http_request_update | 44_759_594    | 18_493_837    | $0.0000245907 | $24.59            |
| 2   | candidUpdate        | 1_828_896     | 1_321_558     | $0.0000017572 | $1.75             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
