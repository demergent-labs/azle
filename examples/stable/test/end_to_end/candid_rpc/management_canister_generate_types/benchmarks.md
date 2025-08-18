# Benchmarks for management_canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | executeCreateCanister | 15_294_902 | 20_294_902 | $0.0000278040 | $27.80 | <font color="green">-609_263</font> |
| 1 | executeUpdateSettings | 16_440_753 | 21_440_753 | $0.0000293738 | $29.37 | <font color="green">-757_822</font> |
| 2 | getCanisterStatus | 3_606_547 | 8_606_547 | $0.0000117910 | $11.79 | <font color="green">-107_918</font> |
| 3 | executeInstallCode | 28_885_282 | 33_885_282 | $0.0000464228 | $46.42 | <font color="green">-372_536</font> |
| 4 | executeUninstallCode | 4_193_877 | 9_193_877 | $0.0000125956 | $12.59 | <font color="green">-182_284</font> |
| 5 | getCanisterStatus | 3_604_450 | 8_604_450 | $0.0000117881 | $11.78 | <font color="green">-108_702</font> |
| 6 | executeUploadChunk | 18_191_732 | 23_191_732 | $0.0000317727 | $31.77 | <font color="red">+130_334</font> |
| 7 | getStoredChunks | 2_900_478 | 7_900_478 | $0.0000108237 | $10.82 | <font color="green">-127_209</font> |
| 8 | getStoredChunks | 2_902_778 | 7_902_778 | $0.0000108268 | $10.82 | <font color="green">-119_536</font> |
| 9 | executeInstallChunkedCode | 19_798_635 | 24_798_635 | $0.0000339741 | $33.97 | <font color="green">-870_069</font> |
| 10 | executeUninstallCode | 4_182_868 | 9_182_868 | $0.0000125805 | $12.58 | <font color="green">-192_074</font> |
| 11 | executeClearChunkStore | 2_893_771 | 7_893_771 | $0.0000108145 | $10.81 | <font color="green">-126_727</font> |
| 12 | getStoredChunks | 2_899_380 | 7_899_380 | $0.0000108222 | $10.82 | <font color="green">-128_345</font> |
| 13 | getCanisterStatus | 3_595_676 | 8_595_676 | $0.0000117761 | $11.77 | <font color="green">-122_149</font> |
| 14 | executeDepositCycles | 2_908_937 | 7_908_937 | $0.0000108352 | $10.83 | <font color="green">-122_893</font> |
| 15 | getCanisterStatus | 3_594_447 | 8_594_447 | $0.0000117744 | $11.77 | <font color="green">-118_915</font> |
| 16 | executeUninstallCode | 4_194_876 | 9_194_876 | $0.0000125970 | $12.59 | <font color="green">-188_823</font> |
| 17 | getCanisterStatus | 3_596_872 | 8_596_872 | $0.0000117777 | $11.77 | <font color="green">-119_189</font> |
| 18 | executeStopCanister | 2_904_683 | 7_904_683 | $0.0000108294 | $10.82 | <font color="green">-113_039</font> |
| 19 | getCanisterStatus | 3_594_198 | 8_594_198 | $0.0000117741 | $11.77 | <font color="green">-124_670</font> |
| 20 | getCanisterStatus | 3_594_660 | 8_594_660 | $0.0000117747 | $11.77 | <font color="green">-129_793</font> |
| 21 | executeStartCanister | 2_902_779 | 7_902_779 | $0.0000108268 | $10.82 | <font color="green">-113_654</font> |
| 22 | getCanisterStatus | 3_599_435 | 8_599_435 | $0.0000117812 | $11.78 | <font color="green">-119_038</font> |
| 23 | getCanisterStatus | 3_587_507 | 8_587_507 | $0.0000117649 | $11.76 | <font color="green">-129_243</font> |
| 24 | getCanisterInfo | 6_409_822 | 11_409_822 | $0.0000156315 | $15.63 | <font color="green">-198_585</font> |
| 25 | executeStopCanister | 2_899_781 | 7_899_781 | $0.0000108227 | $10.82 | <font color="green">-116_539</font> |
| 26 | executeDeleteCanister | 2_893_201 | 7_893_201 | $0.0000108137 | $10.81 | <font color="green">-121_318</font> |
| 27 | getRawRand | 894_839 | 5_894_839 | $0.0000080759 | $8.07 | <font color="red">+8_967</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | executeCreateCanister | 15_904_165 | 20_904_165 | $0.0000286387 | $28.63 |
| 1 | executeUpdateSettings | 17_198_575 | 22_198_575 | $0.0000304120 | $30.41 |
| 2 | getCanisterStatus | 3_714_465 | 8_714_465 | $0.0000119388 | $11.93 |
| 3 | executeInstallCode | 29_257_818 | 34_257_818 | $0.0000469332 | $46.93 |
| 4 | executeUninstallCode | 4_376_161 | 9_376_161 | $0.0000128453 | $12.84 |
| 5 | getCanisterStatus | 3_713_152 | 8_713_152 | $0.0000119370 | $11.93 |
| 6 | executeUploadChunk | 18_061_398 | 23_061_398 | $0.0000315941 | $31.59 |
| 7 | getStoredChunks | 3_027_687 | 8_027_687 | $0.0000109979 | $10.99 |
| 8 | getStoredChunks | 3_022_314 | 8_022_314 | $0.0000109906 | $10.99 |
| 9 | executeInstallChunkedCode | 20_668_704 | 25_668_704 | $0.0000351661 | $35.16 |
| 10 | executeUninstallCode | 4_374_942 | 9_374_942 | $0.0000128437 | $12.84 |
| 11 | executeClearChunkStore | 3_020_498 | 8_020_498 | $0.0000109881 | $10.98 |
| 12 | getStoredChunks | 3_027_725 | 8_027_725 | $0.0000109980 | $10.99 |
| 13 | getCanisterStatus | 3_717_825 | 8_717_825 | $0.0000119434 | $11.94 |
| 14 | executeDepositCycles | 3_031_830 | 8_031_830 | $0.0000110036 | $11.00 |
| 15 | getCanisterStatus | 3_713_362 | 8_713_362 | $0.0000119373 | $11.93 |
| 16 | executeUninstallCode | 4_383_699 | 9_383_699 | $0.0000128557 | $12.85 |
| 17 | getCanisterStatus | 3_716_061 | 8_716_061 | $0.0000119410 | $11.94 |
| 18 | executeStopCanister | 3_017_722 | 8_017_722 | $0.0000109843 | $10.98 |
| 19 | getCanisterStatus | 3_718_868 | 8_718_868 | $0.0000119448 | $11.94 |
| 20 | getCanisterStatus | 3_724_453 | 8_724_453 | $0.0000119525 | $11.95 |
| 21 | executeStartCanister | 3_016_433 | 8_016_433 | $0.0000109825 | $10.98 |
| 22 | getCanisterStatus | 3_718_473 | 8_718_473 | $0.0000119443 | $11.94 |
| 23 | getCanisterStatus | 3_716_750 | 8_716_750 | $0.0000119419 | $11.94 |
| 24 | getCanisterInfo | 6_608_407 | 11_608_407 | $0.0000159035 | $15.90 |
| 25 | executeStopCanister | 3_016_320 | 8_016_320 | $0.0000109824 | $10.98 |
| 26 | executeDeleteCanister | 3_014_519 | 8_014_519 | $0.0000109799 | $10.97 |
| 27 | getRawRand | 885_872 | 5_885_872 | $0.0000080636 | $8.06 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).