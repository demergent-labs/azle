# Benchmarks for server

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                     |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | -------------------------- |
| 0   | init                | 8_135_030_419 | 6_454_602_167 | $0.0085824909 | $8582.4909        | <font color="red">0</font> |
| 1   | http_request_update | 44_761_508    | 18_494_603    | $0.0000245917 | $24.5917          | <font color="red">0</font> |
| 2   | candidUpdate        | 1_426_413     | 1_160_565     | $0.0000015432 | $1.5432           | <font color="red">0</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_135_030_419 | 6_454_602_167 | $0.0085824909 | $8582.4909        |
| 1   | http_request_update | 44_761_508    | 18_494_603    | $0.0000245917 | $24.5917          |
| 2   | candidUpdate        | 1_426_413     | 1_160_565     | $0.0000015432 | $1.5432           |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                     |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | -------------------------- |
| 0   | postUpgrade         | 8_147_052_903 | 6_459_411_161 | $0.0085888852 | $8588.8852        | <font color="red">0</font> |
| 1   | http_request_update | 45_136_919    | 18_644_767    | $0.0000247914 | $24.7914          | <font color="red">0</font> |
| 2   | candidUpdate        | 1_799_989     | 1_309_995     | $0.0000017419 | $1.7419           | <font color="red">0</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_147_052_903 | 6_459_411_161 | $0.0085888852 | $8588.8852        |
| 1   | http_request_update | 45_136_919    | 18_644_767    | $0.0000247914 | $24.7914          |
| 2   | candidUpdate        | 1_799_989     | 1_309_995     | $0.0000017419 | $1.7419           |

# Benchmarks for canister

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                     |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | -------------------------- |
| 0   | init                | 8_136_155_991 | 6_455_052_396 | $0.0085830895 | $8583.0895        | <font color="red">0</font> |
| 1   | http_request_update | 44_775_155    | 18_500_062    | $0.0000245990 | $24.5990          | <font color="red">0</font> |
| 2   | http_request_update | 44_708_712    | 18_473_484    | $0.0000245636 | $24.5636          | <font color="red">0</font> |
| 3   | candidUpdate        | 1_453_654     | 1_171_461     | $0.0000015577 | $1.5577           | <font color="red">0</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_136_155_991 | 6_455_052_396 | $0.0085830895 | $8583.0895        |
| 1   | http_request_update | 44_775_155    | 18_500_062    | $0.0000245990 | $24.5990          |
| 2   | http_request_update | 44_708_712    | 18_473_484    | $0.0000245636 | $24.5636          |
| 3   | candidUpdate        | 1_453_654     | 1_171_461     | $0.0000015577 | $1.5577           |

# Benchmarks for canister_init_and_post_upgrade

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                     |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | -------------------------- |
| 0   | postUpgrade         | 8_147_479_160 | 6_459_581_664 | $0.0085891120 | $8589.1120        | <font color="red">0</font> |
| 1   | http_request_update | 45_174_549    | 18_659_819    | $0.0000248114 | $24.8114          | <font color="red">0</font> |
| 2   | candidUpdate        | 1_814_907     | 1_315_962     | $0.0000017498 | $1.7498           | <font color="red">0</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 8_147_479_160 | 6_459_581_664 | $0.0085891120 | $8589.1120        |
| 1   | http_request_update | 45_174_549    | 18_659_819    | $0.0000248114 | $24.8114          |
| 2   | candidUpdate        | 1_814_907     | 1_315_962     | $0.0000017498 | $1.7498           |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base*fee + (per_instruction_fee * number*of_instructions) + (additional_fee_per_billion * floor(number_of_instructions / 1_billion))
-   Base fee: 590_000 cycles
-   Per instruction fee: 0.4 cycles
-   Additional fee: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
