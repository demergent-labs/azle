# Benchmarks for caller

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | getRejectCodeCanisterThrowError | 1_360_135 | 6_360_135 | $0.0000087134 | $8.71 | <font color="green">-4_263</font> |
| 1 | getRejectCodeCanisterReject | 1_281_698 | 6_281_698 | $0.0000086059 | $8.60 | <font color="green">-6_599</font> |
| 2 | getRejectNoError | 1_275_156 | 6_275_156 | $0.0000085970 | $8.59 | <font color="green">-8_464</font> |
| 3 | assertTypes | 1_268_206 | 6_268_206 | $0.0000085874 | $8.58 | <font color="green">-3_691</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | getRejectCodeCanisterThrowError | 1_364_398 | 6_364_398 | $0.0000087192 | $8.71 |
| 1 | getRejectCodeCanisterReject | 1_288_297 | 6_288_297 | $0.0000086150 | $8.61 |
| 2 | getRejectNoError | 1_283_620 | 6_283_620 | $0.0000086086 | $8.60 |
| 3 | assertTypes | 1_271_897 | 6_271_897 | $0.0000085925 | $8.59 |

# Benchmarks for rejector

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