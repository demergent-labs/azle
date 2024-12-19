# Benchmarks for management_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | executeCreateCanister     | 13_947_769   | 6_169_107  | $0.0000082029 | $8.20             | <font color="green">-272_000</font> |
| 1   | executeUpdateSettings     | 15_222_286   | 6_678_914  | $0.0000088808 | $8.88             | <font color="green">-222_048</font> |
| 2   | getCanisterStatus         | 3_486_537    | 1_984_614  | $0.0000026389 | $2.63             | <font color="green">-79_674</font>  |
| 3   | executeInstallCode        | 28_298_454   | 11_909_381 | $0.0000158355 | $15.83            | <font color="green">-832_969</font> |
| 4   | executeUninstallCode      | 4_076_772    | 2_220_708  | $0.0000029528 | $2.95             | <font color="green">-129_152</font> |
| 5   | getCanisterStatus         | 3_489_080    | 1_985_632  | $0.0000026402 | $2.64             | <font color="green">-78_063</font>  |
| 6   | executeUploadChunk        | 17_929_209   | 7_761_683  | $0.0000103205 | $10.32            | <font color="green">-478_078</font> |
| 7   | getStoredChunks           | 2_813_933    | 1_715_573  | $0.0000022811 | $2.28             | <font color="green">-83_691</font>  |
| 8   | getStoredChunks           | 2_809_447    | 1_713_778  | $0.0000022788 | $2.27             | <font color="green">-87_553</font>  |
| 9   | executeInstallChunkedCode | 19_216_895   | 8_276_758  | $0.0000110054 | $11.00            | <font color="green">-542_835</font> |
| 10  | executeUninstallCode      | 4_075_382    | 2_220_152  | $0.0000029521 | $2.95             | <font color="green">-125_000</font> |
| 11  | executeClearChunkStore    | 2_813_213    | 1_715_285  | $0.0000022808 | $2.28             | <font color="green">-86_786</font>  |
| 12  | getStoredChunks           | 2_819_330    | 1_717_732  | $0.0000022840 | $2.28             | <font color="green">-80_896</font>  |
| 13  | getCanisterStatus         | 3_489_792    | 1_985_916  | $0.0000026406 | $2.64             | <font color="green">-74_173</font>  |
| 14  | executeDepositCycles      | 2_822_956    | 1_719_182  | $0.0000022859 | $2.28             | <font color="green">-77_810</font>  |
| 15  | getCanisterStatus         | 3_481_354    | 1_982_541  | $0.0000026361 | $2.63             | <font color="green">-77_908</font>  |
| 16  | executeUninstallCode      | 4_078_089    | 2_221_235  | $0.0000029535 | $2.95             | <font color="green">-109_394</font> |
| 17  | getCanisterStatus         | 3_487_496    | 1_984_998  | $0.0000026394 | $2.63             | <font color="green">-68_238</font>  |
| 18  | executeStopCanister       | 2_816_971    | 1_716_788  | $0.0000022828 | $2.28             | <font color="green">-72_936</font>  |
| 19  | getCanisterStatus         | 3_488_113    | 1_985_245  | $0.0000026397 | $2.63             | <font color="green">-69_726</font>  |
| 20  | getCanisterStatus         | 3_490_976    | 1_986_390  | $0.0000026412 | $2.64             | <font color="green">-73_725</font>  |
| 21  | executeStartCanister      | 2_812_008    | 1_714_803  | $0.0000022801 | $2.28             | <font color="green">-75_918</font>  |
| 22  | getCanisterStatus         | 3_486_663    | 1_984_665  | $0.0000026389 | $2.63             | <font color="green">-63_572</font>  |
| 23  | getCanisterStatus         | 3_487_495    | 1_984_998  | $0.0000026394 | $2.63             | <font color="green">-63_211</font>  |
| 24  | getCanisterInfo           | 6_211_833    | 3_074_733  | $0.0000040884 | $4.08             | <font color="green">-88_828</font>  |
| 25  | executeStopCanister       | 2_810_197    | 1_714_078  | $0.0000022792 | $2.27             | <font color="green">-65_042</font>  |
| 26  | executeDeleteCanister     | 2_811_653    | 1_714_661  | $0.0000022799 | $2.27             | <font color="green">-66_079</font>  |
| 27  | getRawRand                | 1_279_612    | 1_101_844  | $0.0000014651 | $1.46             | <font color="green">-8_167</font>   |

## Baseline benchmarks Azle version: 0.25.0-alpha

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

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
