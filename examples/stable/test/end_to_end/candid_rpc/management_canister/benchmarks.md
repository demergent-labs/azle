# Benchmarks for management_canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | executeCreateCanister | 15_218_928 | 20_218_928 | $0.0000276999 | $27.69 | <font color="green">-690_260</font> |
| 1 | executeUpdateSettings | 16_367_466 | 21_367_466 | $0.0000292734 | $29.27 | <font color="green">-823_671</font> |
| 2 | getCanisterStatus | 3_543_641 | 8_543_641 | $0.0000117048 | $11.70 | <font color="green">-176_274</font> |
| 3 | executeInstallCode | 28_824_712 | 33_824_712 | $0.0000463399 | $46.33 | <font color="green">-437_855</font> |
| 4 | executeUninstallCode | 4_130_785 | 9_130_785 | $0.0000125092 | $12.50 | <font color="green">-248_745</font> |
| 5 | getCanisterStatus | 3_533_822 | 8_533_822 | $0.0000116913 | $11.69 | <font color="green">-189_289</font> |
| 6 | executeUploadChunk | 18_129_466 | 23_129_466 | $0.0000316874 | $31.68 | <font color="red">+74_329</font> |
| 7 | getStoredChunks | 2_838_558 | 7_838_558 | $0.0000107388 | $10.73 | <font color="green">-189_147</font> |
| 8 | getStoredChunks | 2_837_906 | 7_837_906 | $0.0000107379 | $10.73 | <font color="green">-186_312</font> |
| 9 | executeInstallChunkedCode | 19_733_222 | 24_733_222 | $0.0000338845 | $33.88 | <font color="green">-934_467</font> |
| 10 | executeUninstallCode | 4_127_535 | 9_127_535 | $0.0000125047 | $12.50 | <font color="green">-248_729</font> |
| 11 | executeClearChunkStore | 2_842_215 | 7_842_215 | $0.0000107438 | $10.74 | <font color="green">-182_566</font> |
| 12 | getStoredChunks | 2_841_372 | 7_841_372 | $0.0000107427 | $10.74 | <font color="green">-181_343</font> |
| 13 | getCanisterStatus | 3_533_867 | 8_533_867 | $0.0000116914 | $11.69 | <font color="green">-190_447</font> |
| 14 | executeDepositCycles | 2_848_120 | 7_848_120 | $0.0000107519 | $10.75 | <font color="green">-189_316</font> |
| 15 | getCanisterStatus | 3_541_138 | 8_541_138 | $0.0000117014 | $11.70 | <font color="green">-179_249</font> |
| 16 | executeUninstallCode | 4_132_233 | 9_132_233 | $0.0000125112 | $12.51 | <font color="green">-246_493</font> |
| 17 | getCanisterStatus | 3_528_336 | 8_528_336 | $0.0000116838 | $11.68 | <font color="green">-187_912</font> |
| 18 | executeStopCanister | 2_834_901 | 7_834_901 | $0.0000107338 | $10.73 | <font color="green">-187_385</font> |
| 19 | getCanisterStatus | 3_535_490 | 8_535_490 | $0.0000116936 | $11.69 | <font color="green">-184_709</font> |
| 20 | getCanisterStatus | 3_536_782 | 8_536_782 | $0.0000116954 | $11.69 | <font color="green">-176_929</font> |
| 21 | executeStartCanister | 2_832_949 | 7_832_949 | $0.0000107311 | $10.73 | <font color="green">-186_827</font> |
| 22 | getCanisterStatus | 3_535_658 | 8_535_658 | $0.0000116939 | $11.69 | <font color="green">-181_066</font> |
| 23 | getCanisterStatus | 3_529_101 | 8_529_101 | $0.0000116849 | $11.68 | <font color="green">-181_028</font> |
| 24 | getCanisterInfo | 6_358_019 | 11_358_019 | $0.0000155605 | $15.56 | <font color="green">-242_594</font> |
| 25 | executeStopCanister | 2_834_041 | 7_834_041 | $0.0000107326 | $10.73 | <font color="green">-186_106</font> |
| 26 | executeDeleteCanister | 2_834_297 | 7_834_297 | $0.0000107330 | $10.73 | <font color="green">-180_126</font> |
| 27 | getRawRand | 832_924 | 5_832_924 | $0.0000079911 | $7.99 | <font color="green">-51_160</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | executeCreateCanister | 15_909_188 | 20_909_188 | $0.0000286456 | $28.64 |
| 1 | executeUpdateSettings | 17_191_137 | 22_191_137 | $0.0000304019 | $30.40 |
| 2 | getCanisterStatus | 3_719_915 | 8_719_915 | $0.0000119463 | $11.94 |
| 3 | executeInstallCode | 29_262_567 | 34_262_567 | $0.0000469397 | $46.93 |
| 4 | executeUninstallCode | 4_379_530 | 9_379_530 | $0.0000128500 | $12.84 |
| 5 | getCanisterStatus | 3_723_111 | 8_723_111 | $0.0000119507 | $11.95 |
| 6 | executeUploadChunk | 18_055_137 | 23_055_137 | $0.0000315855 | $31.58 |
| 7 | getStoredChunks | 3_027_705 | 8_027_705 | $0.0000109980 | $10.99 |
| 8 | getStoredChunks | 3_024_218 | 8_024_218 | $0.0000109932 | $10.99 |
| 9 | executeInstallChunkedCode | 20_667_689 | 25_667_689 | $0.0000351647 | $35.16 |
| 10 | executeUninstallCode | 4_376_264 | 9_376_264 | $0.0000128455 | $12.84 |
| 11 | executeClearChunkStore | 3_024_781 | 8_024_781 | $0.0000109939 | $10.99 |
| 12 | getStoredChunks | 3_022_715 | 8_022_715 | $0.0000109911 | $10.99 |
| 13 | getCanisterStatus | 3_724_314 | 8_724_314 | $0.0000119523 | $11.95 |
| 14 | executeDepositCycles | 3_037_436 | 8_037_436 | $0.0000110113 | $11.01 |
| 15 | getCanisterStatus | 3_720_387 | 8_720_387 | $0.0000119469 | $11.94 |
| 16 | executeUninstallCode | 4_378_726 | 9_378_726 | $0.0000128489 | $12.84 |
| 17 | getCanisterStatus | 3_716_248 | 8_716_248 | $0.0000119413 | $11.94 |
| 18 | executeStopCanister | 3_022_286 | 8_022_286 | $0.0000109905 | $10.99 |
| 19 | getCanisterStatus | 3_720_199 | 8_720_199 | $0.0000119467 | $11.94 |
| 20 | getCanisterStatus | 3_713_711 | 8_713_711 | $0.0000119378 | $11.93 |
| 21 | executeStartCanister | 3_019_776 | 8_019_776 | $0.0000109871 | $10.98 |
| 22 | getCanisterStatus | 3_716_724 | 8_716_724 | $0.0000119419 | $11.94 |
| 23 | getCanisterStatus | 3_710_129 | 8_710_129 | $0.0000119329 | $11.93 |
| 24 | getCanisterInfo | 6_600_613 | 11_600_613 | $0.0000158928 | $15.89 |
| 25 | executeStopCanister | 3_020_147 | 8_020_147 | $0.0000109876 | $10.98 |
| 26 | executeDeleteCanister | 3_014_423 | 8_014_423 | $0.0000109798 | $10.97 |
| 27 | getRawRand | 884_084 | 5_884_084 | $0.0000080612 | $8.06 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).