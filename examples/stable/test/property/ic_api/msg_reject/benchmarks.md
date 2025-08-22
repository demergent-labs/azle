# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | alwaysRejectUpdate | 745_332 | 5_745_332 | $0.0000078711 | $7.87 | <font color="green">-60_627</font> |
| 1 | evenOrRejectUpdate | 566_758 | 5_566_758 | $0.0000076265 | $7.62 | <font color="green">-831_667</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | alwaysRejectUpdate | 805_959 | 5_805_959 | $0.0000079542 | $7.95 |
| 1 | evenOrRejectUpdate | 1_398_425 | 6_398_425 | $0.0000087658 | $8.76 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).