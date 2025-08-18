# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | updateCyclesBurn | 1_813_469 | 6_813_469 | $0.0000093345 | $9.33 | <font color="red">+446_438</font> |
| 1 | assertCyclesBurnTypes | 1_225_583 | 6_225_583 | $0.0000085290 | $8.52 | <font color="green">-33_741</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | updateCyclesBurn | 1_367_031 | 6_367_031 | $0.0000087228 | $8.72 |
| 1 | assertCyclesBurnTypes | 1_259_324 | 6_259_324 | $0.0000085753 | $8.57 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).