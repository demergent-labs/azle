# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | measureSum | 967_754 | 5_967_754 | $0.0000081758 | $8.17 | <font color="red">+29_037</font> |
| 1 | measureSumTimer | 1_227_384 | 6_227_384 | $0.0000085315 | $8.53 | <font color="green">-21_012</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | measureSum | 938_717 | 5_938_717 | $0.0000081360 | $8.13 |
| 1 | measureSumTimer | 1_248_396 | 6_248_396 | $0.0000085603 | $8.56 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).