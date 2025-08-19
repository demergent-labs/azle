# Benchmarks for canister1

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | simpleUpdate | 1_331_261 | 6_331_261 | $0.0000086738 | $8.67 | <font color="green">-5_134</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | simpleUpdate | 1_336_395 | 6_336_395 | $0.0000086809 | $8.68 |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.33.0
No benchmarks reported

## Baseline benchmarks Azle version: 0.32.0
No benchmarks reported

# Benchmarks for canister3

## Current benchmarks Azle version: 0.33.0
No benchmarks reported

## Baseline benchmarks Azle version: 0.32.0
No benchmarks reported



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).