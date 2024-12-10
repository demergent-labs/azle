# Benchmarks for management_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | executeCreateCanister     | 13_945_972   | 6_168_388  | $0.0000082019 | $8.20             | <font color="green">-273_797</font> |
| 1   | executeUpdateSettings     | 15_232_495   | 6_682_998  | $0.0000088862 | $8.88             | <font color="green">-211_839</font> |
| 2   | getCanisterStatus         | 3_531_884    | 2_002_753  | $0.0000026630 | $2.66             | <font color="green">-34_327</font>  |
| 3   | executeInstallCode        | 28_293_335   | 11_907_334 | $0.0000158328 | $15.83            | <font color="green">-838_088</font> |
| 4   | executeUninstallCode      | 4_074_104    | 2_219_641  | $0.0000029514 | $2.95             | <font color="green">-131_820</font> |
| 5   | getCanisterStatus         | 3_482_061    | 1_982_824  | $0.0000026365 | $2.63             | <font color="green">-85_082</font>  |
| 6   | executeUploadChunk        | 17_922_318   | 7_758_927  | $0.0000103168 | $10.31            | <font color="green">-484_969</font> |
| 7   | getStoredChunks           | 2_811_557    | 1_714_622  | $0.0000022799 | $2.27             | <font color="green">-86_067</font>  |
| 8   | getStoredChunks           | 2_809_521    | 1_713_808  | $0.0000022788 | $2.27             | <font color="green">-87_479</font>  |
| 9   | executeInstallChunkedCode | 19_218_803   | 8_277_521  | $0.0000110064 | $11.00            | <font color="green">-540_927</font> |
| 10  | executeUninstallCode      | 4_078_539    | 2_221_415  | $0.0000029537 | $2.95             | <font color="green">-121_843</font> |
| 11  | executeClearChunkStore    | 2_814_829    | 1_715_931  | $0.0000022816 | $2.28             | <font color="green">-85_170</font>  |
| 12  | getStoredChunks           | 2_808_512    | 1_713_404  | $0.0000022783 | $2.27             | <font color="green">-91_714</font>  |
| 13  | getCanisterStatus         | 3_487_616    | 1_985_046  | $0.0000026395 | $2.63             | <font color="green">-76_349</font>  |
| 14  | executeDepositCycles      | 2_820_100    | 1_718_040  | $0.0000022844 | $2.28             | <font color="green">-80_666</font>  |
| 15  | getCanisterStatus         | 3_482_286    | 1_982_914  | $0.0000026366 | $2.63             | <font color="green">-76_976</font>  |
| 16  | executeUninstallCode      | 4_081_040    | 2_222_416  | $0.0000029551 | $2.95             | <font color="green">-106_443</font> |
| 17  | getCanisterStatus         | 3_480_713    | 1_982_285  | $0.0000026358 | $2.63             | <font color="green">-75_021</font>  |
| 18  | executeStopCanister       | 2_813_362    | 1_715_344  | $0.0000022808 | $2.28             | <font color="green">-76_545</font>  |
| 19  | getCanisterStatus         | 3_485_856    | 1_984_342  | $0.0000026385 | $2.63             | <font color="green">-71_983</font>  |
| 20  | getCanisterStatus         | 3_480_776    | 1_982_310  | $0.0000026358 | $2.63             | <font color="green">-83_925</font>  |
| 21  | executeStartCanister      | 2_805_766    | 1_712_306  | $0.0000022768 | $2.27             | <font color="green">-82_160</font>  |
| 22  | getCanisterStatus         | 3_488_509    | 1_985_403  | $0.0000026399 | $2.63             | <font color="green">-61_726</font>  |
| 23  | getCanisterStatus         | 3_483_983    | 1_983_593  | $0.0000026375 | $2.63             | <font color="green">-66_723</font>  |
| 24  | getCanisterInfo           | 6_201_970    | 3_070_788  | $0.0000040831 | $4.08             | <font color="green">-98_691</font>  |
| 25  | executeStopCanister       | 2_802_792    | 1_711_116  | $0.0000022752 | $2.27             | <font color="green">-72_447</font>  |
| 26  | executeDeleteCanister     | 2_810_114    | 1_714_045  | $0.0000022791 | $2.27             | <font color="green">-67_618</font>  |
| 27  | getRawRand                | 1_276_363    | 1_100_545  | $0.0000014634 | $1.46             | <font color="green">-11_416</font>  |

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
