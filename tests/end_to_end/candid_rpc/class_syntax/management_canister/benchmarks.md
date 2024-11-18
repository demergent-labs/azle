# Benchmarks for management_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name               | Instructions | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ------------------------- | ------------ | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | executeCreateCanister     | 13_913_213   | 6_155_285   | $0.0000081845 | $8.18             | <font color="green">-306_556</font>   |
| 1   | executeUpdateSettings     | 15_224_599   | 6_679_839   | $0.0000088820 | $8.88             | <font color="green">-219_735</font>   |
| 2   | getCanisterStatus         | 3_562_908    | 2_015_163   | $0.0000026795 | $2.67             | <font color="green">-3_303</font>     |
| 3   | executeInstallCode        | 262_719_595  | 105_677_838 | $0.0001405167 | $140.51           | <font color="red">+233_588_172</font> |
| 4   | executeUninstallCode      | 4_112_669    | 2_235_067   | $0.0000029719 | $2.97             | <font color="green">-93_255</font>    |
| 5   | getCanisterStatus         | 3_529_782    | 2_001_912   | $0.0000026619 | $2.66             | <font color="green">-37_361</font>    |
| 6   | executeUploadChunk        | 252_359_619  | 101_533_847 | $0.0001350065 | $135.00           | <font color="red">+233_952_332</font> |
| 7   | getStoredChunks           | 2_845_729    | 1_728_291   | $0.0000022981 | $2.29             | <font color="green">-51_895</font>    |
| 8   | getStoredChunks           | 2_844_579    | 1_727_831   | $0.0000022974 | $2.29             | <font color="green">-52_421</font>    |
| 9   | executeInstallChunkedCode | 19_400_836   | 8_350_334   | $0.0000111032 | $11.10            | <font color="green">-358_894</font>   |
| 10  | executeUninstallCode      | 4_109_890    | 2_233_956   | $0.0000029704 | $2.97             | <font color="green">-90_492</font>    |
| 11  | executeClearChunkStore    | 2_843_142    | 1_727_256   | $0.0000022967 | $2.29             | <font color="green">-56_857</font>    |
| 12  | getStoredChunks           | 2_849_691    | 1_729_876   | $0.0000023002 | $2.30             | <font color="green">-50_535</font>    |
| 13  | getCanisterStatus         | 3_529_272    | 2_001_708   | $0.0000026616 | $2.66             | <font color="green">-34_693</font>    |
| 14  | executeDepositCycles      | 2_848_881    | 1_729_552   | $0.0000022997 | $2.29             | <font color="green">-51_885</font>    |
| 15  | getCanisterStatus         | 3_530_726    | 2_002_290   | $0.0000026624 | $2.66             | <font color="green">-28_536</font>    |
| 16  | executeUninstallCode      | 4_108_662    | 2_233_464   | $0.0000029698 | $2.96             | <font color="green">-78_821</font>    |
| 17  | getCanisterStatus         | 3_528_743    | 2_001_497   | $0.0000026613 | $2.66             | <font color="green">-26_991</font>    |
| 18  | executeStopCanister       | 2_846_575    | 1_728_630   | $0.0000022985 | $2.29             | <font color="green">-43_332</font>    |
| 19  | getCanisterStatus         | 3_536_529    | 2_004_611   | $0.0000026655 | $2.66             | <font color="green">-21_310</font>    |
| 20  | getCanisterStatus         | 3_532_149    | 2_002_859   | $0.0000026631 | $2.66             | <font color="green">-32_552</font>    |
| 21  | executeStartCanister      | 2_840_781    | 1_726_312   | $0.0000022954 | $2.29             | <font color="green">-47_145</font>    |
| 22  | getCanisterStatus         | 3_532_209    | 2_002_883   | $0.0000026632 | $2.66             | <font color="green">-18_026</font>    |
| 23  | getCanisterStatus         | 3_532_230    | 2_002_892   | $0.0000026632 | $2.66             | <font color="green">-18_476</font>    |
| 24  | getCanisterInfo           | 6_278_072    | 3_101_228   | $0.0000041236 | $4.12             | <font color="green">-22_589</font>    |
| 25  | executeStopCanister       | 2_839_355    | 1_725_742   | $0.0000022947 | $2.29             | <font color="green">-35_884</font>    |
| 26  | executeDeleteCanister     | 2_843_074    | 1_727_229   | $0.0000022966 | $2.29             | <font color="green">-34_658</font>    |
| 27  | getRawRand                | 1_293_045    | 1_107_218   | $0.0000014722 | $1.47             | <font color="red">+5_266</font>       |

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
