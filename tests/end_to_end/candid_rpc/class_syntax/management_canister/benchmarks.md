# Benchmarks for management_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name               | Instructions | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ------------------------- | ------------ | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | executeCreateCanister     | 13_957_714   | 6_173_085   | $0.0000082082 | $8.20             | <font color="green">-262_055</font>   |
| 1   | executeUpdateSettings     | 15_257_780   | 6_693_112   | $0.0000088996 | $8.89             | <font color="green">-186_554</font>   |
| 2   | getCanisterStatus         | 3_572_804    | 2_019_121   | $0.0000026848 | $2.68             | <font color="red">+6_593</font>       |
| 3   | executeInstallCode        | 262_633_414  | 105_643_365 | $0.0001404708 | $140.47           | <font color="red">+233_501_991</font> |
| 4   | executeUninstallCode      | 4_088_348    | 2_225_339   | $0.0000029590 | $2.95             | <font color="green">-117_576</font>   |
| 5   | getCanisterStatus         | 3_524_268    | 1_999_707   | $0.0000026590 | $2.65             | <font color="green">-42_875</font>    |
| 6   | executeUploadChunk        | 252_342_992  | 101_527_196 | $0.0001349977 | $134.99           | <font color="red">+233_935_705</font> |
| 7   | getStoredChunks           | 2_832_574    | 1_723_029   | $0.0000022911 | $2.29             | <font color="green">-65_050</font>    |
| 8   | getStoredChunks           | 2_836_358    | 1_724_543   | $0.0000022931 | $2.29             | <font color="green">-60_642</font>    |
| 9   | executeInstallChunkedCode | 19_360_931   | 8_334_372   | $0.0000110820 | $11.08            | <font color="green">-398_799</font>   |
| 10  | executeUninstallCode      | 4_096_599    | 2_228_639   | $0.0000029634 | $2.96             | <font color="green">-103_783</font>   |
| 11  | executeClearChunkStore    | 2_833_654    | 1_723_461   | $0.0000022916 | $2.29             | <font color="green">-66_345</font>    |
| 12  | getStoredChunks           | 2_832_274    | 1_722_909   | $0.0000022909 | $2.29             | <font color="green">-67_952</font>    |
| 13  | getCanisterStatus         | 3_512_820    | 1_995_128   | $0.0000026529 | $2.65             | <font color="green">-51_145</font>    |
| 14  | executeDepositCycles      | 2_840_175    | 1_726_070   | $0.0000022951 | $2.29             | <font color="green">-60_591</font>    |
| 15  | getCanisterStatus         | 3_523_681    | 1_999_472   | $0.0000026586 | $2.65             | <font color="green">-35_581</font>    |
| 16  | executeUninstallCode      | 4_094_444    | 2_227_777   | $0.0000029622 | $2.96             | <font color="green">-93_039</font>    |
| 17  | getCanisterStatus         | 3_519_249    | 1_997_699   | $0.0000026563 | $2.65             | <font color="green">-36_485</font>    |
| 18  | executeStopCanister       | 2_839_696    | 1_725_878   | $0.0000022948 | $2.29             | <font color="green">-50_211</font>    |
| 19  | getCanisterStatus         | 3_524_408    | 1_999_763   | $0.0000026590 | $2.65             | <font color="green">-33_431</font>    |
| 20  | getCanisterStatus         | 3_529_004    | 2_001_601   | $0.0000026615 | $2.66             | <font color="green">-35_697</font>    |
| 21  | executeStartCanister      | 2_834_025    | 1_723_610   | $0.0000022918 | $2.29             | <font color="green">-53_901</font>    |
| 22  | getCanisterStatus         | 3_525_274    | 2_000_109   | $0.0000026595 | $2.65             | <font color="green">-24_961</font>    |
| 23  | getCanisterStatus         | 3_526_991    | 2_000_796   | $0.0000026604 | $2.66             | <font color="green">-23_715</font>    |
| 24  | getCanisterInfo           | 6_259_091    | 3_093_636   | $0.0000041135 | $4.11             | <font color="green">-41_570</font>    |
| 25  | executeStopCanister       | 2_840_471    | 1_726_188   | $0.0000022953 | $2.29             | <font color="green">-34_768</font>    |
| 26  | executeDeleteCanister     | 2_840_170    | 1_726_068   | $0.0000022951 | $2.29             | <font color="green">-37_562</font>    |
| 27  | getRawRand                | 1_291_874    | 1_106_749   | $0.0000014716 | $1.47             | <font color="red">+4_095</font>       |

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
