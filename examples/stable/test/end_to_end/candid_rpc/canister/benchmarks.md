# Benchmarks for canister

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | canisterNestedReturnType  | 6_098_971    | 3_029_588 | $0.0000040284 | $4.02             | <font color="green">-19_747</font> |
| 1   | canisterList              | 6_679_170    | 3_261_668 | $0.0000043369 | $4.33             | <font color="green">-93_761</font> |
| 2   | canisterCrossCanisterCall | 2_529_146    | 1_601_658 | $0.0000021297 | $2.12             | <font color="green">-69_871</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | canisterNestedReturnType  | 6_118_718    | 3_037_487 | $0.0000040389 | $4.03             |
| 1   | canisterList              | 6_772_931    | 3_299_172 | $0.0000043868 | $4.38             |
| 2   | canisterCrossCanisterCall | 2_599_017    | 1_629_606 | $0.0000021668 | $2.16             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
