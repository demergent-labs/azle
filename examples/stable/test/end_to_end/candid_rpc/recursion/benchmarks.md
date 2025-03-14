⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for recursion

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | testRecServiceCall | 6_515_107    | 3_196_042 | $0.0000042497 | $4.24             | <font color="red">+45_750</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | testRecServiceCall | 6_469_357    | 3_177_742 | $0.0000042253 | $4.22             |

# Benchmarks for recursive_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init        | 989_597_239  | 396_428_895 | $0.0005271196 | $527.11           | <font color="red">+2_703_397</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | init        | 986_893_842  | 395_347_536 | $0.0005256818 | $525.68           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
