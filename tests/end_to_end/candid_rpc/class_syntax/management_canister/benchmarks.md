# Benchmarks for management_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name               | Instructions | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ------------------------- | ------------ | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | executeCreateCanister     | 13_957_668   | 6_173_067   | $0.0000082081 | $8.20             | <font color="green">-262_101</font>   |
| 1   | executeUpdateSettings     | 15_257_688   | 6_693_075   | $0.0000088996 | $8.89             | <font color="green">-186_646</font>   |
| 2   | getCanisterStatus         | 3_572_873    | 2_019_149   | $0.0000026848 | $2.68             | <font color="red">+6_662</font>       |
| 3   | executeInstallCode        | 262_633_306  | 105_643_322 | $0.0001404708 | $140.47           | <font color="red">+233_501_883</font> |
| 4   | executeUninstallCode      | 4_088_279    | 2_225_311   | $0.0000029589 | $2.95             | <font color="green">-117_645</font>   |
| 5   | getCanisterStatus         | 3_524_100    | 1_999_640   | $0.0000026589 | $2.65             | <font color="green">-43_043</font>    |
| 6   | executeUploadChunk        | 252_342_824  | 101_527_129 | $0.0001349976 | $134.99           | <font color="red">+233_935_537</font> |
| 7   | getStoredChunks           | 2_832_634    | 1_723_053   | $0.0000022911 | $2.29             | <font color="green">-64_990</font>    |
| 8   | getStoredChunks           | 2_836_381    | 1_724_552   | $0.0000022931 | $2.29             | <font color="green">-60_619</font>    |
| 9   | executeInstallChunkedCode | 19_361_046   | 8_334_418   | $0.0000110820 | $11.08            | <font color="green">-398_684</font>   |
| 10  | executeUninstallCode      | 4_096_599    | 2_228_639   | $0.0000029634 | $2.96             | <font color="green">-103_783</font>   |
| 11  | executeClearChunkStore    | 2_833_631    | 1_723_452   | $0.0000022916 | $2.29             | <font color="green">-66_368</font>    |
| 12  | getStoredChunks           | 2_832_350    | 1_722_940   | $0.0000022909 | $2.29             | <font color="green">-67_876</font>    |
| 13  | getCanisterStatus         | 3_512_919    | 1_995_167   | $0.0000026529 | $2.65             | <font color="green">-51_046</font>    |
| 14  | executeDepositCycles      | 2_840_129    | 1_726_051   | $0.0000022951 | $2.29             | <font color="green">-60_637</font>    |
| 15  | getCanisterStatus         | 3_523_681    | 1_999_472   | $0.0000026586 | $2.65             | <font color="green">-35_581</font>    |
| 16  | executeUninstallCode      | 4_094_444    | 2_227_777   | $0.0000029622 | $2.96             | <font color="green">-93_039</font>    |
| 17  | getCanisterStatus         | 3_519_157    | 1_997_662   | $0.0000026562 | $2.65             | <font color="green">-36_577</font>    |
| 18  | executeStopCanister       | 2_839_650    | 1_725_860   | $0.0000022948 | $2.29             | <font color="green">-50_257</font>    |
| 19  | getCanisterStatus         | 3_524_339    | 1_999_735   | $0.0000026590 | $2.65             | <font color="green">-33_500</font>    |
| 20  | getCanisterStatus         | 3_529_050    | 2_001_620   | $0.0000026615 | $2.66             | <font color="green">-35_651</font>    |
| 21  | executeStartCanister      | 2_834_018    | 1_723_607   | $0.0000022918 | $2.29             | <font color="green">-53_908</font>    |
| 22  | getCanisterStatus         | 3_525_228    | 2_000_091   | $0.0000026595 | $2.65             | <font color="green">-25_007</font>    |
| 23  | getCanisterStatus         | 3_526_968    | 2_000_787   | $0.0000026604 | $2.66             | <font color="green">-23_738</font>    |
| 24  | getCanisterInfo           | 6_258_953    | 3_093_581   | $0.0000041134 | $4.11             | <font color="green">-41_708</font>    |
| 25  | executeStopCanister       | 2_840_563    | 1_726_225   | $0.0000022953 | $2.29             | <font color="green">-34_676</font>    |
| 26  | executeDeleteCanister     | 2_840_269    | 1_726_107   | $0.0000022952 | $2.29             | <font color="green">-37_463</font>    |
| 27  | getRawRand                | 1_291_775    | 1_106_710   | $0.0000014716 | $1.47             | <font color="red">+3_996</font>       |

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
