# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | canisterNestedReturnType  | 6_192_542    | 11_192_542 | $0.0000153338 | $15.33            | <font color="green">-303_781</font> |
| 1   | canisterList              | 7_566_154    | 12_566_154 | $0.0000172156 | $17.21            | <font color="red">+592_901</font>   |
| 2   | canisterCrossCanisterCall | 2_499_621    | 7_499_621  | $0.0000102745 | $10.27            | <font color="red">+369_911</font>   |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | canisterNestedReturnType  | 6_496_323    | 11_496_323 | $0.0000157500 | $15.74            |
| 1   | canisterList              | 6_973_253    | 11_973_253 | $0.0000164034 | $16.40            |
| 2   | canisterCrossCanisterCall | 2_129_710    | 7_129_710  | $0.0000097677 | $9.76             |

# Benchmarks for some_canister

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | update1     | 1_586_178    | 6_586_178 | $0.0000090231 | $9.02             | <font color="green">-39_990</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | update1     | 1_626_168    | 6_626_168 | $0.0000090779 | $9.07             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
