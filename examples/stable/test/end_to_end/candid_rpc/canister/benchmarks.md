# Benchmarks for canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | canisterNestedReturnType  | 6_098_971    | 3_029_588 | $0.0000040284 | $4.02             | <font color="green">-123_495</font> |
| 1   | canisterList              | 6_679_170    | 3_261_668 | $0.0000043369 | $4.33             | <font color="green">-25_898</font>  |
| 2   | canisterCrossCanisterCall | 2_529_192    | 1_601_676 | $0.0000021297 | $2.12             | <font color="red">+3_446</font>     |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | canisterNestedReturnType  | 6_222_466    | 3_078_986 | $0.0000040940 | $4.09             |
| 1   | canisterList              | 6_705_068    | 3_272_027 | $0.0000043507 | $4.35             |
| 2   | canisterCrossCanisterCall | 2_525_746    | 1_600_298 | $0.0000021279 | $2.12             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
