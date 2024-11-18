# Benchmarks for management_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name               | Instructions | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ------------------------- | ------------ | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | executeCreateCanister     | 13_913_167   | 6_155_266   | $0.0000081845 | $8.18             | <font color="green">-306_602</font>   |
| 1   | executeUpdateSettings     | 15_224_599   | 6_679_839   | $0.0000088820 | $8.88             | <font color="green">-219_735</font>   |
| 2   | getCanisterStatus         | 3_562_839    | 2_015_135   | $0.0000026795 | $2.67             | <font color="green">-3_372</font>     |
| 3   | executeInstallCode        | 262_719_641  | 105_677_856 | $0.0001405167 | $140.51           | <font color="red">+233_588_218</font> |
| 4   | executeUninstallCode      | 4_112_593    | 2_235_037   | $0.0000029719 | $2.97             | <font color="green">-93_331</font>    |
| 5   | getCanisterStatus         | 3_529_851    | 2_001_940   | $0.0000026619 | $2.66             | <font color="green">-37_292</font>    |
| 6   | executeUploadChunk        | 252_359_451  | 101_533_780 | $0.0001350064 | $135.00           | <font color="red">+233_952_164</font> |
| 7   | getStoredChunks           | 2_845_729    | 1_728_291   | $0.0000022981 | $2.29             | <font color="green">-51_895</font>    |
| 8   | getStoredChunks           | 2_844_579    | 1_727_831   | $0.0000022974 | $2.29             | <font color="green">-52_421</font>    |
| 9   | executeInstallChunkedCode | 19_400_882   | 8_350_352   | $0.0000111032 | $11.10            | <font color="green">-358_848</font>   |
| 10  | executeUninstallCode      | 4_109_890    | 2_233_956   | $0.0000029704 | $2.97             | <font color="green">-90_492</font>    |
| 11  | executeClearChunkStore    | 2_843_073    | 1_727_229   | $0.0000022966 | $2.29             | <font color="green">-56_926</font>    |
| 12  | getStoredChunks           | 2_849_737    | 1_729_894   | $0.0000023002 | $2.30             | <font color="green">-50_489</font>    |
| 13  | getCanisterStatus         | 3_529_302    | 2_001_720   | $0.0000026616 | $2.66             | <font color="green">-34_663</font>    |
| 14  | executeDepositCycles      | 2_848_973    | 1_729_589   | $0.0000022998 | $2.29             | <font color="green">-51_793</font>    |
| 15  | getCanisterStatus         | 3_530_848    | 2_002_339   | $0.0000026625 | $2.66             | <font color="green">-28_414</font>    |
| 16  | executeUninstallCode      | 4_108_708    | 2_233_483   | $0.0000029698 | $2.96             | <font color="green">-78_775</font>    |
| 17  | getCanisterStatus         | 3_528_667    | 2_001_466   | $0.0000026613 | $2.66             | <font color="green">-27_067</font>    |
| 18  | executeStopCanister       | 2_846_552    | 1_728_620   | $0.0000022985 | $2.29             | <font color="green">-43_355</font>    |
| 19  | getCanisterStatus         | 3_536_552    | 2_004_620   | $0.0000026655 | $2.66             | <font color="green">-21_287</font>    |
| 20  | getCanisterStatus         | 3_532_057    | 2_002_822   | $0.0000026631 | $2.66             | <font color="green">-32_644</font>    |
| 21  | executeStartCanister      | 2_840_590    | 1_726_236   | $0.0000022953 | $2.29             | <font color="green">-47_336</font>    |
| 22  | getCanisterStatus         | 3_532_202    | 2_002_880   | $0.0000026632 | $2.66             | <font color="green">-18_033</font>    |
| 23  | getCanisterStatus         | 3_532_276    | 2_002_910   | $0.0000026632 | $2.66             | <font color="green">-18_430</font>    |
| 24  | getCanisterInfo           | 6_278_065    | 3_101_226   | $0.0000041236 | $4.12             | <font color="green">-22_596</font>    |
| 25  | executeStopCanister       | 2_839_493    | 1_725_797   | $0.0000022947 | $2.29             | <font color="green">-35_746</font>    |
| 26  | executeDeleteCanister     | 2_843_021    | 1_727_208   | $0.0000022966 | $2.29             | <font color="green">-34_711</font>    |
| 27  | getRawRand                | 1_293_068    | 1_107_227   | $0.0000014722 | $1.47             | <font color="red">+5_289</font>       |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 14_219_769   | 6_277_907  | $0.0000083475 | $8.34             |
| 1   | executeUpdateSettings     | 15_444_334   | 6_767_733  | $0.0000089989 | $8.99             |
| 2   | getCanisterStatus         | 3_566_211    | 2_016_484  | $0.0000026813 | $2.68             |
| 3   | executeInstallCode        | 29_131_423   | 12_242_569 | $0.0000162786 | $16.27            |
| 4   | executeUninstallCode      | 4_205_924    | 2_272_369  | $0.0000030215 | $3.02             |
| 5   | getCanisterStatus         | 3_567_143    | 2_016_857  | $0.0000026818 | $2.68             |
| 6   | executeUploadChunk        | 18_407_287   | 7_952_914  | $0.0000105748 | $10.57            |
| 7   | getStoredChunks           | 2_897_624    | 1_749_049  | $0.0000023257 | $2.32             |
| 8   | getStoredChunks           | 2_897_000    | 1_748_800  | $0.0000023253 | $2.32             |
| 9   | executeInstallChunkedCode | 19_759_730   | 8_493_892  | $0.0000112941 | $11.29            |
| 10  | executeUninstallCode      | 4_200_382    | 2_270_152  | $0.0000030186 | $3.01             |
| 11  | executeClearChunkStore    | 2_899_999    | 1_749_999  | $0.0000023269 | $2.32             |
| 12  | getStoredChunks           | 2_900_226    | 1_750_090  | $0.0000023270 | $2.32             |
| 13  | getCanisterStatus         | 3_563_965    | 2_015_586  | $0.0000026801 | $2.68             |
| 14  | executeDepositCycles      | 2_900_766    | 1_750_306  | $0.0000023273 | $2.32             |
| 15  | getCanisterStatus         | 3_559_262    | 2_013_704  | $0.0000026776 | $2.67             |
| 16  | executeUninstallCode      | 4_187_483    | 2_264_993  | $0.0000030117 | $3.01             |
| 17  | getCanisterStatus         | 3_555_734    | 2_012_293  | $0.0000026757 | $2.67             |
| 18  | executeStopCanister       | 2_889_907    | 1_745_962  | $0.0000023216 | $2.32             |
| 19  | getCanisterStatus         | 3_557_839    | 2_013_135  | $0.0000026768 | $2.67             |
| 20  | getCanisterStatus         | 3_564_701    | 2_015_880  | $0.0000026805 | $2.68             |
| 21  | executeStartCanister      | 2_887_926    | 1_745_170  | $0.0000023205 | $2.32             |
| 22  | getCanisterStatus         | 3_550_235    | 2_010_094  | $0.0000026728 | $2.67             |
| 23  | getCanisterStatus         | 3_550_706    | 2_010_282  | $0.0000026730 | $2.67             |
| 24  | getCanisterInfo           | 6_300_661    | 3_110_264  | $0.0000041356 | $4.13             |
| 25  | executeStopCanister       | 2_875_239    | 1_740_095  | $0.0000023138 | $2.31             |
| 26  | executeDeleteCanister     | 2_877_732    | 1_741_092  | $0.0000023151 | $2.31             |
| 27  | getRawRand                | 1_287_779    | 1_105_111  | $0.0000014694 | $1.46             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
