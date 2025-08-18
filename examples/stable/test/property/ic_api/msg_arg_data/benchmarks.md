# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | postUpgrade | 1_008_957_624 | 1_013_957_624 | $0.0013891219 | $1_389.12 | <font color="red">+13_135_631</font> |
| 1 | getUpdateMsgArgData | 1_800_191 | 6_800_191 | $0.0000093163 | $9.31 | <font color="green">-530_785</font> |
| 2 | getUpdateMsgArgData | 1_776_206 | 6_776_206 | $0.0000092834 | $9.28 | <font color="green">-62_543</font> |
| 3 | getUpdateMsgArgData | 1_768_306 | 6_768_306 | $0.0000092726 | $9.27 | <font color="green">-59_839</font> |
| 4 | getUpdateMsgArgData | 1_770_106 | 6_770_106 | $0.0000092750 | $9.27 | <font color="green">-61_343</font> |
| 5 | getUpdateMsgArgData | 1_769_739 | 6_769_739 | $0.0000092745 | $9.27 | <font color="green">-55_736</font> |
| 6 | getUpdateMsgArgData | 1_769_218 | 6_769_218 | $0.0000092738 | $9.27 | <font color="green">-54_738</font> |
| 7 | getUpdateMsgArgData | 1_773_052 | 6_773_052 | $0.0000092791 | $9.27 | <font color="green">-59_256</font> |
| 8 | getUpdateMsgArgData | 1_779_284 | 6_779_284 | $0.0000092876 | $9.28 | <font color="green">-57_106</font> |
| 9 | getUpdateMsgArgData | 1_768_726 | 6_768_726 | $0.0000092732 | $9.27 | <font color="green">-61_723</font> |
| 10 | getUpdateMsgArgData | 1_773_738 | 6_773_738 | $0.0000092800 | $9.28 | <font color="green">-57_198</font> |

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