# Benchmarks for event_loop

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | testOrdering0 | 3_710_842 | 8_710_842 | $0.0000119339 | $11.93 | <font color="green">-85_398</font> |
| 1 | testOrdering2 | 3_646_130 | 8_646_130 | $0.0000118452 | $11.84 | <font color="green">-101_145</font> |
| 2 | testOrdering4 | 3_687_032 | 8_687_032 | $0.0000119012 | $11.90 | <font color="green">-103_511</font> |
| 3 | testOrdering6 | 673_183 | 5_673_183 | $0.0000077723 | $7.77 | <font color="green">-46_757</font> |
| 4 | testOrdering8 | 3_555_410 | 8_555_410 | $0.0000117209 | $11.72 | <font color="green">-94_194</font> |
| 5 | testOrdering10 | 724_864 | 5_724_864 | $0.0000078431 | $7.84 | <font color="green">-39_471</font> |
| 6 | testOrdering12 | 3_647_536 | 8_647_536 | $0.0000118471 | $11.84 | <font color="green">-98_403</font> |
| 7 | testOrdering13 | 589_724 | 5_589_724 | $0.0000076579 | $7.65 | <font color="green">-38_490</font> |
| 8 | testOrdering14 | 590_655 | 5_590_655 | $0.0000076592 | $7.65 | <font color="green">-36_732</font> |
| 9 | testOrdering15 | 592_262 | 5_592_262 | $0.0000076614 | $7.66 | <font color="green">-37_877</font> |
| 10 | testOrdering16 | 590_444 | 5_590_444 | $0.0000076589 | $7.65 | <font color="green">-37_796</font> |
| 11 | testOrdering17 | 620_666 | 5_620_666 | $0.0000077003 | $7.70 | <font color="green">-35_913</font> |
| 12 | testOrdering18 | 595_092 | 5_595_092 | $0.0000076653 | $7.66 | <font color="green">-33_513</font> |
| 13 | testOrdering19 | 699_844 | 5_699_844 | $0.0000078088 | $7.80 | <font color="green">-38_715</font> |
| 14 | testOrdering20 | 636_980 | 5_636_980 | $0.0000077227 | $7.72 | <font color="green">-35_509</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | testOrdering0 | 3_796_240 | 8_796_240 | $0.0000120508 | $12.05 |
| 1 | testOrdering2 | 3_747_275 | 8_747_275 | $0.0000119838 | $11.98 |
| 2 | testOrdering4 | 3_790_543 | 8_790_543 | $0.0000120430 | $12.04 |
| 3 | testOrdering6 | 719_940 | 5_719_940 | $0.0000078363 | $7.83 |
| 4 | testOrdering8 | 3_649_604 | 8_649_604 | $0.0000118500 | $11.84 |
| 5 | testOrdering10 | 764_335 | 5_764_335 | $0.0000078971 | $7.89 |
| 6 | testOrdering12 | 3_745_939 | 8_745_939 | $0.0000119819 | $11.98 |
| 7 | testOrdering13 | 628_214 | 5_628_214 | $0.0000077107 | $7.71 |
| 8 | testOrdering14 | 627_387 | 5_627_387 | $0.0000077095 | $7.70 |
| 9 | testOrdering15 | 630_139 | 5_630_139 | $0.0000077133 | $7.71 |
| 10 | testOrdering16 | 628_240 | 5_628_240 | $0.0000077107 | $7.71 |
| 11 | testOrdering17 | 656_579 | 5_656_579 | $0.0000077495 | $7.74 |
| 12 | testOrdering18 | 628_605 | 5_628_605 | $0.0000077112 | $7.71 |
| 13 | testOrdering19 | 738_559 | 5_738_559 | $0.0000078618 | $7.86 |
| 14 | testOrdering20 | 672_489 | 5_672_489 | $0.0000077713 | $7.77 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).