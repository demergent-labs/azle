# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | insertSmallRecord | 18_909_392_701 | 18_914_392_701 | $0.0259127180 | $25_912.71 | <font color="green">-262_895_680</font> |
| 1 | insertMediumRecord | 17_727_450_870 | 17_732_450_870 | $0.0242934577 | $24_293.45 | <font color="green">-170_479_926</font> |
| 2 | insertLargeRecord | 20_549_435_569 | 20_554_435_569 | $0.0281595767 | $28_159.57 | <font color="green">-70_972_491</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | insertSmallRecord | 19_172_288_381 | 19_177_288_381 | $0.0262728851 | $26_272.88 |
| 1 | insertMediumRecord | 17_897_930_796 | 17_902_930_796 | $0.0245270152 | $24_527.01 |
| 2 | insertLargeRecord | 20_620_408_060 | 20_625_408_060 | $0.0282568090 | $28_256.80 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).