# Benchmarks for canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | canisterNestedReturnType  | 6_899_381    | 3_349_752 | $0.0000044541 | $4.45             | <font color="red">+807</font>      |
| 1   | canisterList              | 7_974_356    | 3_779_742 | $0.0000050258 | $5.02             | <font color="green">-15_374</font> |
| 2   | canisterCrossCanisterCall | 11_960_094   | 5_374_037 | $0.0000071457 | $7.14             | <font color="green">-1_042</font>  |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | canisterNestedReturnType  | 6_898_574    | 3_349_429 | $0.0000044536 | $4.45             |
| 1   | canisterList              | 7_989_730    | 3_785_892 | $0.0000050340 | $5.03             |
| 2   | canisterCrossCanisterCall | 11_961_136   | 5_374_454 | $0.0000071463 | $7.14             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
