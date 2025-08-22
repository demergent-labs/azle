# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | getAccountBalance | 5_021_435 | 10_021_435 | $0.0000137294 | $13.72 | <font color="green">-206_837</font> |
| 1 | getTransferFee | 2_149_987 | 7_149_987 | $0.0000097955 | $9.79 | <font color="green">-142_680</font> |
| 2 | executeTransfer | 13_535_373 | 18_535_373 | $0.0000253935 | $25.39 | <font color="green">-565_610</font> |
| 3 | executeTransfer | 13_511_028 | 18_511_028 | $0.0000253601 | $25.36 | <font color="green">-617_003</font> |
| 4 | getBlocks | 5_840_427 | 10_840_427 | $0.0000148514 | $14.85 | <font color="green">-229_579</font> |
| 5 | getSymbol | 1_197_560 | 6_197_560 | $0.0000084907 | $8.49 | <font color="green">-64_504</font> |
| 6 | getName | 1_197_449 | 6_197_449 | $0.0000084905 | $8.49 | <font color="green">-65_045</font> |
| 7 | getDecimals | 1_192_789 | 6_192_789 | $0.0000084841 | $8.48 | <font color="green">-65_631</font> |
| 8 | getArchives | 1_192_592 | 6_192_592 | $0.0000084839 | $8.48 | <font color="green">-65_441</font> |
| 9 | executeTransfer | 13_493_598 | 18_493_598 | $0.0000253362 | $25.33 | <font color="green">-594_174</font> |
| 10 | getAccountBalance | 4_918_725 | 9_918_725 | $0.0000135887 | $13.58 | <font color="green">-222_501</font> |
| 11 | executeTransfer | 13_488_141 | 18_488_141 | $0.0000253288 | $25.32 | <font color="green">-588_553</font> |
| 12 | executeTransfer | 13_507_857 | 18_507_857 | $0.0000253558 | $25.35 | <font color="green">-597_725</font> |
| 13 | executeTransfer | 14_291_794 | 19_291_794 | $0.0000264298 | $26.42 | <font color="green">-627_553</font> |
| 14 | executeTransfer | 14_315_597 | 19_315_597 | $0.0000264624 | $26.46 | <font color="green">-598_396</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | getAccountBalance | 5_228_272 | 10_228_272 | $0.0000140127 | $14.01 |
| 1 | getTransferFee | 2_292_667 | 7_292_667 | $0.0000099910 | $9.99 |
| 2 | executeTransfer | 14_100_983 | 19_100_983 | $0.0000261683 | $26.16 |
| 3 | executeTransfer | 14_128_031 | 19_128_031 | $0.0000262054 | $26.20 |
| 4 | getBlocks | 6_070_006 | 11_070_006 | $0.0000151659 | $15.16 |
| 5 | getSymbol | 1_262_064 | 6_262_064 | $0.0000085790 | $8.57 |
| 6 | getName | 1_262_494 | 6_262_494 | $0.0000085796 | $8.57 |
| 7 | getDecimals | 1_258_420 | 6_258_420 | $0.0000085740 | $8.57 |
| 8 | getArchives | 1_258_033 | 6_258_033 | $0.0000085735 | $8.57 |
| 9 | executeTransfer | 14_087_772 | 19_087_772 | $0.0000261502 | $26.15 |
| 10 | getAccountBalance | 5_141_226 | 10_141_226 | $0.0000138935 | $13.89 |
| 11 | executeTransfer | 14_076_694 | 19_076_694 | $0.0000261351 | $26.13 |
| 12 | executeTransfer | 14_105_582 | 19_105_582 | $0.0000261746 | $26.17 |
| 13 | executeTransfer | 14_919_347 | 19_919_347 | $0.0000272895 | $27.28 |
| 14 | executeTransfer | 14_913_993 | 19_913_993 | $0.0000272822 | $27.28 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).