# Benchmarks for counter

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | set         | 1_063_354    | 6_063_354 | $0.0000083068 | $8.30             | <font color="green">-21_902</font> |
| 1   | inc         | 925_003      | 5_925_003 | $0.0000081173 | $8.11             | <font color="green">-23_145</font> |
| 2   | inc         | 925_523      | 5_925_523 | $0.0000081180 | $8.11             | <font color="green">-24_887</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 1_085_256    | 6_085_256 | $0.0000083368 | $8.33             |
| 1   | inc         | 948_148      | 5_948_148 | $0.0000081490 | $8.14             |
| 2   | inc         | 950_410      | 5_950_410 | $0.0000081521 | $8.15             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
