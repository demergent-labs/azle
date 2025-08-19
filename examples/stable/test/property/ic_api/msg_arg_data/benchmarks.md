# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | postUpgrade | 1_008_662_861 | 1_013_662_861 | $0.0013887181 | $1_388.71 | <font color="red">+12_840_868</font> |
| 1 | getUpdateMsgArgData | 1_823_963 | 6_823_963 | $0.0000093488 | $9.34 | <font color="green">-507_013</font> |
| 2 | getUpdateMsgArgData | 1_754_800 | 6_754_800 | $0.0000092541 | $9.25 | <font color="green">-83_949</font> |
| 3 | getUpdateMsgArgData | 1_689_762 | 6_689_762 | $0.0000091650 | $9.16 | <font color="green">-138_383</font> |
| 4 | getUpdateMsgArgData | 1_823_863 | 6_823_863 | $0.0000093487 | $9.34 | <font color="green">-7_586</font> |
| 5 | getUpdateMsgArgData | 1_724_176 | 6_724_176 | $0.0000092121 | $9.21 | <font color="green">-101_299</font> |
| 6 | getUpdateMsgArgData | 1_796_388 | 6_796_388 | $0.0000093111 | $9.31 | <font color="green">-27_568</font> |
| 7 | getUpdateMsgArgData | 1_708_759 | 6_708_759 | $0.0000091910 | $9.19 | <font color="green">-123_549</font> |
| 8 | getUpdateMsgArgData | 1_784_601 | 6_784_601 | $0.0000092949 | $9.29 | <font color="green">-51_789</font> |
| 9 | getUpdateMsgArgData | 1_693_109 | 6_693_109 | $0.0000091696 | $9.16 | <font color="green">-137_340</font> |
| 10 | getUpdateMsgArgData | 1_767_174 | 6_767_174 | $0.0000092710 | $9.27 | <font color="green">-63_762</font> |

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