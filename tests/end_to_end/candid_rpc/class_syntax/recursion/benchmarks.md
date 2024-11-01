# Benchmarks for recursion

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | testRecServiceCall | 6_229_321    | 3_081_728 | $0.0000040977 | $4.09             | <font color="red">+51_966</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | testRecServiceCall | 6_177_355    | 3_060_942 | $0.0000040700 | $4.07             |

# Benchmarks for recursive_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init        | 1_337_859_120 | 935_733_648 | $0.0012442170 | $1_244.21         | <font color="red">+317_679_006</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init        | 1_020_180_114 | 808_662_045 | $0.0010752537 | $1_075.25         |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
