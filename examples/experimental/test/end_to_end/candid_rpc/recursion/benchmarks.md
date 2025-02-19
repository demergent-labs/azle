# Benchmarks for recursion

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | testRecServiceCall | 18_607_545   | 8_033_018 | $0.0000106813 | $10.68            | <font color="green">-70_581</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | testRecServiceCall | 18_678_126   | 8_061_250 | $0.0000107188 | $10.71            |

# Benchmarks for recursive_canister

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init        | 4_827_898_974 | 3_531_749_589 | $0.0046960615 | $4_696.06         | <font color="green">-643_170_287</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 5_471_069_261 | 4_189_017_704 | $0.0055700112 | $5_570.01         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
