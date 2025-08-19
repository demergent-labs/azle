# Benchmarks for cycles

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | receiveCycles | 1_263_515 | 6_263_515 | $0.0000085810 | $8.58 | <font color="green">-33_569</font> |
| 1 | receiveCycles | 1_319_767 | 6_319_767 | $0.0000086581 | $8.65 | <font color="green">-42_259</font> |
| 2 | receiveCycles | 1_324_059 | 6_324_059 | $0.0000086640 | $8.66 | <font color="green">-36_436</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | receiveCycles | 1_297_084 | 6_297_084 | $0.0000086270 | $8.62 |
| 1 | receiveCycles | 1_362_026 | 6_362_026 | $0.0000087160 | $8.71 |
| 2 | receiveCycles | 1_360_495 | 6_360_495 | $0.0000087139 | $8.71 |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | sendCycles | 1_333_148 | 6_333_148 | $0.0000086764 | $8.67 | <font color="green">-7_925</font> |
| 1 | sendCyclesNotify | 1_635_797 | 6_635_797 | $0.0000090910 | $9.09 | <font color="green">-50_882</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | sendCycles | 1_341_073 | 6_341_073 | $0.0000086873 | $8.68 |
| 1 | sendCyclesNotify | 1_686_679 | 6_686_679 | $0.0000091608 | $9.16 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).