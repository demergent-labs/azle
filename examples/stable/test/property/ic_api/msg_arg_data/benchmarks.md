# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | postUpgrade | 1_052_660_650 | 1_057_660_650 | $0.0014489951 | $1_448.99 | <font color="red">+56_838_657</font> |
| 1 | getUpdateMsgArgData | 4_986_661 | 9_986_661 | $0.0000136817 | $13.68 | <font color="red">+2_655_685</font> |
| 2 | getUpdateMsgArgData | 4_845_822 | 9_845_822 | $0.0000134888 | $13.48 | <font color="red">+3_007_073</font> |
| 3 | getUpdateMsgArgData | 4_825_829 | 9_825_829 | $0.0000134614 | $13.46 | <font color="red">+2_997_684</font> |
| 4 | getUpdateMsgArgData | 4_888_691 | 9_888_691 | $0.0000135475 | $13.54 | <font color="red">+3_057_242</font> |
| 5 | getUpdateMsgArgData | 4_660_499 | 9_660_499 | $0.0000132349 | $13.23 | <font color="red">+2_835_024</font> |
| 6 | getUpdateMsgArgData | 4_505_528 | 9_505_528 | $0.0000130226 | $13.02 | <font color="red">+2_681_572</font> |
| 7 | getUpdateMsgArgData | 4_680_144 | 9_680_144 | $0.0000132618 | $13.26 | <font color="red">+2_847_836</font> |
| 8 | getUpdateMsgArgData | 4_682_765 | 9_682_765 | $0.0000132654 | $13.26 | <font color="red">+2_846_375</font> |
| 9 | getUpdateMsgArgData | 4_663_080 | 9_663_080 | $0.0000132384 | $13.23 | <font color="red">+2_832_631</font> |
| 10 | getUpdateMsgArgData | 4_686_672 | 9_686_672 | $0.0000132707 | $13.27 | <font color="red">+2_855_736</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | postUpgrade | 995_821_993 | 1_000_821_993 | $0.0013711261 | $1_371.12 |
| 1 | getUpdateMsgArgData | 2_330_976 | 7_330_976 | $0.0000100434 | $10.04 |
| 2 | getUpdateMsgArgData | 1_838_749 | 6_838_749 | $0.0000093691 | $9.36 |
| 3 | getUpdateMsgArgData | 1_828_145 | 6_828_145 | $0.0000093546 | $9.35 |
| 4 | getUpdateMsgArgData | 1_831_449 | 6_831_449 | $0.0000093591 | $9.35 |
| 5 | getUpdateMsgArgData | 1_825_475 | 6_825_475 | $0.0000093509 | $9.35 |
| 6 | getUpdateMsgArgData | 1_823_956 | 6_823_956 | $0.0000093488 | $9.34 |
| 7 | getUpdateMsgArgData | 1_832_308 | 6_832_308 | $0.0000093603 | $9.36 |
| 8 | getUpdateMsgArgData | 1_836_390 | 6_836_390 | $0.0000093659 | $9.36 |
| 9 | getUpdateMsgArgData | 1_830_449 | 6_830_449 | $0.0000093577 | $9.35 |
| 10 | getUpdateMsgArgData | 1_830_936 | 6_830_936 | $0.0000093584 | $9.35 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).