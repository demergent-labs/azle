# Benchmarks for management_canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | executeCreateCanister | 15_301_528 | 20_301_528 | $0.0000278131 | $27.81 | <font color="green">-607_660</font> |
| 1 | executeUpdateSettings | 16_427_014 | 21_427_014 | $0.0000293550 | $29.35 | <font color="green">-764_123</font> |
| 2 | getCanisterStatus | 3_603_437 | 8_603_437 | $0.0000117867 | $11.78 | <font color="green">-116_478</font> |
| 3 | executeInstallCode | 28_895_806 | 33_895_806 | $0.0000464373 | $46.43 | <font color="green">-366_761</font> |
| 4 | executeUninstallCode | 4_190_649 | 9_190_649 | $0.0000125912 | $12.59 | <font color="green">-188_881</font> |
| 5 | getCanisterStatus | 3_598_536 | 8_598_536 | $0.0000117800 | $11.77 | <font color="green">-124_575</font> |
| 6 | executeUploadChunk | 18_182_830 | 23_182_830 | $0.0000317605 | $31.76 | <font color="red">+127_693</font> |
| 7 | getStoredChunks | 2_901_755 | 7_901_755 | $0.0000108254 | $10.82 | <font color="green">-125_950</font> |
| 8 | getStoredChunks | 2_898_493 | 7_898_493 | $0.0000108209 | $10.82 | <font color="green">-125_725</font> |
| 9 | executeInstallChunkedCode | 19_805_276 | 24_805_276 | $0.0000339832 | $33.98 | <font color="green">-862_413</font> |
| 10 | executeUninstallCode | 4_176_876 | 9_176_876 | $0.0000125723 | $12.57 | <font color="green">-199_388</font> |
| 11 | executeClearChunkStore | 2_898_225 | 7_898_225 | $0.0000108206 | $10.82 | <font color="green">-126_556</font> |
| 12 | getStoredChunks | 2_904_214 | 7_904_214 | $0.0000108288 | $10.82 | <font color="green">-118_501</font> |
| 13 | getCanisterStatus | 3_596_249 | 8_596_249 | $0.0000117769 | $11.77 | <font color="green">-128_065</font> |
| 14 | executeDepositCycles | 2_913_269 | 7_913_269 | $0.0000108412 | $10.84 | <font color="green">-124_167</font> |
| 15 | getCanisterStatus | 3_597_106 | 8_597_106 | $0.0000117780 | $11.77 | <font color="green">-123_281</font> |
| 16 | executeUninstallCode | 4_194_891 | 9_194_891 | $0.0000125970 | $12.59 | <font color="green">-183_835</font> |
| 17 | getCanisterStatus | 3_597_834 | 8_597_834 | $0.0000117790 | $11.77 | <font color="green">-118_414</font> |
| 18 | executeStopCanister | 2_900_658 | 7_900_658 | $0.0000108239 | $10.82 | <font color="green">-121_628</font> |
| 19 | getCanisterStatus | 3_597_488 | 8_597_488 | $0.0000117786 | $11.77 | <font color="green">-122_711</font> |
| 20 | getCanisterStatus | 3_597_983 | 8_597_983 | $0.0000117792 | $11.77 | <font color="green">-115_728</font> |
| 21 | executeStartCanister | 2_892_663 | 7_892_663 | $0.0000108129 | $10.81 | <font color="green">-127_113</font> |
| 22 | getCanisterStatus | 3_597_579 | 8_597_579 | $0.0000117787 | $11.77 | <font color="green">-119_145</font> |
| 23 | getCanisterStatus | 3_589_245 | 8_589_245 | $0.0000117673 | $11.76 | <font color="green">-120_884</font> |
| 24 | getCanisterInfo | 6_406_782 | 11_406_782 | $0.0000156273 | $15.62 | <font color="green">-193_831</font> |
| 25 | executeStopCanister | 2_895_684 | 7_895_684 | $0.0000108171 | $10.81 | <font color="green">-124_463</font> |
| 26 | executeDeleteCanister | 2_889_596 | 7_889_596 | $0.0000108087 | $10.80 | <font color="green">-124_827</font> |
| 27 | getRawRand | 892_123 | 5_892_123 | $0.0000080722 | $8.07 | <font color="red">+8_039</font> |

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