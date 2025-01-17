# Benchmarks for recursion

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | testRecServiceCall | 6_594_931    | 3_227_972 | $0.0000042921 | $4.29             | <font color="red">+365_663</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | testRecServiceCall | 6_229_268    | 3_081_707 | $0.0000040977 | $4.09             |

# Benchmarks for recursive_canister

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                  |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init        | 1_006_996_746 | 803_388_698 | $0.0010682419 | $1_068.24         | <font color="green">-330_862_374</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init        | 1_337_859_120 | 935_733_648 | $0.0012442170 | $1_244.21         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
