# Benchmarks for canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | canisterNestedReturnType  | 6_902_203    | 3_350_881 | $0.0000044556 | $4.45             | <font color="red">+7_064</font>     |
| 1   | canisterList              | 7_989_008    | 3_785_603 | $0.0000050336 | $5.03             | <font color="green">-9_712</font>   |
| 2   | canisterCrossCanisterCall | 11_967_030   | 5_376_812 | $0.0000071494 | $7.14             | <font color="red">+8_545_426</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | canisterNestedReturnType  | 6_895_139    | 3_348_055 | $0.0000044518 | $4.45             |
| 1   | canisterList              | 7_998_720    | 3_789_488 | $0.0000050388 | $5.03             |
| 2   | canisterCrossCanisterCall | 3_421_604    | 1_958_641 | $0.0000026043 | $2.60             |

# Benchmarks for some_canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | update1     | 1_483_046    | 1_183_218 | $0.0000015733 | $1.57             | <font color="red">+3_488</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | update1     | 1_479_558    | 1_181_823 | $0.0000015714 | $1.57             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
