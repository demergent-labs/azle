# Benchmarks for server

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_516_705_460 | 5_807_272_184 | $0.0077217556 | $7_721.75         | <font color="green">-527_538</font> |
| 1   | http_request_update | 44_350_010    | 18_330_004    | $0.0000243729 | $24.37            | <font color="red">+7_190</font>     |
| 2   | candidUpdate        | 1_434_655     | 1_163_862     | $0.0000015476 | $1.54             | <font color="red">+269</font>       |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_517_232_998 | 5_807_483_199 | $0.0077220362 | $7_722.03         |
| 1   | http_request_update | 44_342_820    | 18_327_128    | $0.0000243690 | $24.36            |
| 2   | candidUpdate        | 1_434_386     | 1_163_754     | $0.0000015474 | $1.54             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 7_540_171_872 | 5_816_658_748 | $0.0077342366 | $7_734.23         | <font color="green">-421_364</font> |
| 1   | http_request_update | 44_736_663    | 18_484_665    | $0.0000245785 | $24.57            | <font color="red">+27_087</font>    |
| 2   | candidUpdate        | 1_803_933     | 1_311_573     | $0.0000017440 | $1.74             | <font color="red">+3_633</font>     |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_540_593_236 | 5_816_827_294 | $0.0077344607 | $7_734.46         |
| 1   | http_request_update | 44_709_576    | 18_473_830    | $0.0000245641 | $24.56            |
| 2   | candidUpdate        | 1_800_300     | 1_310_120     | $0.0000017420 | $1.74             |

# Benchmarks for canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_518_962_143 | 5_808_174_857 | $0.0077229559 | $7_722.95         | <font color="green">-425_249</font> |
| 1   | http_request_update | 44_357_349    | 18_332_939    | $0.0000243768 | $24.37            | <font color="green">-2_982</font>   |
| 2   | candidUpdate        | 1_460_984     | 1_174_393     | $0.0000015616 | $1.56             | <font color="green">-2_612</font>   |

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
| 0   | postUpgrade         | 7_542_045_719 | 5_817_408_287 | $0.0077352333 | $7_735.23         | <font color="green">-551_939</font> |
| 1   | http_request_update | 44_747_294    | 18_488_917    | $0.0000245842 | $24.58            | <font color="green">-12_300</font>  |
| 2   | candidUpdate        | 1_825_949     | 1_320_379     | $0.0000017557 | $1.75             | <font color="green">-2_947</font>   |

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
