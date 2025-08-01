# Benchmarks for recursion

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | testRecServiceCall | 6_450_124    | 3_170_049 | $0.0000042151 | $4.21             | <font color="green">-64_983</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | testRecServiceCall | 6_515_107    | 3_196_042 | $0.0000042497 | $4.24             |

# Benchmarks for recursive_canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init        | 992_956_062  | 397_772_424 | $0.0005289061 | $528.90           | <font color="red">+3_358_823</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | init        | 989_597_239  | 396_428_895 | $0.0005271196 | $527.11           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
