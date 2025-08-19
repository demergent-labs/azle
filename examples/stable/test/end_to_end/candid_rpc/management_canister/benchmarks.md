# Benchmarks for management_canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | executeCreateCanister | 15_301_486 | 20_301_486 | $0.0000278130 | $27.81 | <font color="green">-607_702</font> |
| 1 | executeUpdateSettings | 16_427_070 | 21_427_070 | $0.0000293551 | $29.35 | <font color="green">-764_067</font> |
| 2 | getCanisterStatus | 3_603_486 | 8_603_486 | $0.0000117868 | $11.78 | <font color="green">-116_429</font> |
| 3 | executeInstallCode | 28_895_876 | 33_895_876 | $0.0000464374 | $46.43 | <font color="green">-366_691</font> |
| 4 | executeUninstallCode | 4_190_551 | 9_190_551 | $0.0000125911 | $12.59 | <font color="green">-188_979</font> |
| 5 | getCanisterStatus | 3_598_466 | 8_598_466 | $0.0000117799 | $11.77 | <font color="green">-124_645</font> |
| 6 | executeUploadChunk | 18_182_900 | 23_182_900 | $0.0000317606 | $31.76 | <font color="red">+127_763</font> |
| 7 | getStoredChunks | 2_901_895 | 7_901_895 | $0.0000108256 | $10.82 | <font color="green">-125_810</font> |
| 8 | getStoredChunks | 2_898_591 | 7_898_591 | $0.0000108211 | $10.82 | <font color="green">-125_627</font> |
| 9 | executeInstallChunkedCode | 19_805_206 | 24_805_206 | $0.0000339831 | $33.98 | <font color="green">-862_483</font> |
| 10 | executeUninstallCode | 4_176_806 | 9_176_806 | $0.0000125722 | $12.57 | <font color="green">-199_458</font> |
| 11 | executeClearChunkStore | 2_898_274 | 7_898_274 | $0.0000108206 | $10.82 | <font color="green">-126_507</font> |
| 12 | getStoredChunks | 2_904_263 | 7_904_263 | $0.0000108288 | $10.82 | <font color="green">-118_452</font> |
| 13 | getCanisterStatus | 3_596_249 | 8_596_249 | $0.0000117769 | $11.77 | <font color="green">-128_065</font> |
| 14 | executeDepositCycles | 2_913_241 | 7_913_241 | $0.0000108411 | $10.84 | <font color="green">-124_195</font> |
| 15 | getCanisterStatus | 3_597_099 | 8_597_099 | $0.0000117780 | $11.77 | <font color="green">-123_288</font> |
| 16 | executeUninstallCode | 4_194_933 | 9_194_933 | $0.0000125971 | $12.59 | <font color="green">-183_793</font> |
| 17 | getCanisterStatus | 3_597_876 | 8_597_876 | $0.0000117791 | $11.77 | <font color="green">-118_372</font> |
| 18 | executeStopCanister | 2_900_679 | 7_900_679 | $0.0000108239 | $10.82 | <font color="green">-121_607</font> |
| 19 | getCanisterStatus | 3_597_418 | 8_597_418 | $0.0000117785 | $11.77 | <font color="green">-122_781</font> |
| 20 | getCanisterStatus | 3_597_892 | 8_597_892 | $0.0000117791 | $11.77 | <font color="green">-115_819</font> |
| 21 | executeStartCanister | 2_892_642 | 7_892_642 | $0.0000108129 | $10.81 | <font color="green">-127_134</font> |
| 22 | getCanisterStatus | 3_597_600 | 8_597_600 | $0.0000117787 | $11.77 | <font color="green">-119_124</font> |
| 23 | getCanisterStatus | 3_589_294 | 8_589_294 | $0.0000117673 | $11.76 | <font color="green">-120_835</font> |
| 24 | getCanisterInfo | 6_406_824 | 11_406_824 | $0.0000156273 | $15.62 | <font color="green">-193_789</font> |
| 25 | executeStopCanister | 2_895_663 | 7_895_663 | $0.0000108171 | $10.81 | <font color="green">-124_484</font> |
| 26 | executeDeleteCanister | 2_889_645 | 7_889_645 | $0.0000108088 | $10.80 | <font color="green">-124_778</font> |
| 27 | getRawRand | 892_151 | 5_892_151 | $0.0000080722 | $8.07 | <font color="red">+8_067</font> |

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