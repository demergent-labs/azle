# Benchmarks for management_canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | executeCreateCanister | 15_208_161 | 20_208_161 | $0.0000276852 | $27.68 | <font color="green">-696_004</font> |
| 1 | executeUpdateSettings | 16_361_067 | 21_361_067 | $0.0000292647 | $29.26 | <font color="green">-837_508</font> |
| 2 | getCanisterStatus | 3_540_228 | 8_540_228 | $0.0000117001 | $11.70 | <font color="green">-174_237</font> |
| 3 | executeInstallCode | 28_812_854 | 33_812_854 | $0.0000463236 | $46.32 | <font color="green">-444_964</font> |
| 4 | executeUninstallCode | 4_128_654 | 9_128_654 | $0.0000125063 | $12.50 | <font color="green">-247_507</font> |
| 5 | getCanisterStatus | 3_536_008 | 8_536_008 | $0.0000116943 | $11.69 | <font color="green">-177_144</font> |
| 6 | executeUploadChunk | 18_123_992 | 23_123_992 | $0.0000316799 | $31.67 | <font color="red">+62_594</font> |
| 7 | getStoredChunks | 2_836_194 | 7_836_194 | $0.0000107356 | $10.73 | <font color="green">-191_493</font> |
| 8 | getStoredChunks | 2_844_024 | 7_844_024 | $0.0000107463 | $10.74 | <font color="green">-178_290</font> |
| 9 | executeInstallChunkedCode | 19_727_081 | 24_727_081 | $0.0000338761 | $33.87 | <font color="green">-941_623</font> |
| 10 | executeUninstallCode | 4_117_915 | 9_117_915 | $0.0000124915 | $12.49 | <font color="green">-257_027</font> |
| 11 | executeClearChunkStore | 2_839_189 | 7_839_189 | $0.0000107397 | $10.73 | <font color="green">-181_309</font> |
| 12 | getStoredChunks | 2_838_584 | 7_838_584 | $0.0000107389 | $10.73 | <font color="green">-189_141</font> |
| 13 | getCanisterStatus | 3_524_765 | 8_524_765 | $0.0000116789 | $11.67 | <font color="green">-193_060</font> |
| 14 | executeDepositCycles | 2_844_571 | 7_844_571 | $0.0000107471 | $10.74 | <font color="green">-187_259</font> |
| 15 | getCanisterStatus | 3_536_736 | 8_536_736 | $0.0000116953 | $11.69 | <font color="green">-176_626</font> |
| 16 | executeUninstallCode | 4_126_258 | 9_126_258 | $0.0000125030 | $12.50 | <font color="green">-257_441</font> |
| 17 | getCanisterStatus | 3_533_252 | 8_533_252 | $0.0000116906 | $11.69 | <font color="green">-182_809</font> |
| 18 | executeStopCanister | 2_832_699 | 7_832_699 | $0.0000107308 | $10.73 | <font color="green">-185_023</font> |
| 19 | getCanisterStatus | 3_533_981 | 8_533_981 | $0.0000116916 | $11.69 | <font color="green">-184_887</font> |
| 20 | getCanisterStatus | 3_539_917 | 8_539_917 | $0.0000116997 | $11.69 | <font color="green">-184_536</font> |
| 21 | executeStartCanister | 2_833_832 | 7_833_832 | $0.0000107323 | $10.73 | <font color="green">-182_601</font> |
| 22 | getCanisterStatus | 3_533_707 | 8_533_707 | $0.0000116912 | $11.69 | <font color="green">-184_766</font> |
| 23 | getCanisterStatus | 3_529_755 | 8_529_755 | $0.0000116858 | $11.68 | <font color="green">-186_995</font> |
| 24 | getCanisterInfo | 6_354_569 | 11_354_569 | $0.0000155558 | $15.55 | <font color="green">-253_838</font> |
| 25 | executeStopCanister | 2_830_942 | 7_830_942 | $0.0000107284 | $10.72 | <font color="green">-185_378</font> |
| 26 | executeDeleteCanister | 2_833_688 | 7_833_688 | $0.0000107322 | $10.73 | <font color="green">-180_831</font> |
| 27 | getRawRand | 833_785 | 5_833_785 | $0.0000079923 | $7.99 | <font color="green">-52_087</font> |

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