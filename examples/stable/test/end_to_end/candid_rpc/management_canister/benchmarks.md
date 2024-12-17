# Benchmarks for management_canister

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                                  |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------------- |
| 0   | executeCreateCanister     | 13_947_647   | 6_169_058  | $0.0000082028 | $8.20             | <font color="green">-10_067</font>      |
| 1   | executeUpdateSettings     | 15_222_270   | 6_678_908  | $0.0000088807 | $8.88             | <font color="green">-35_510</font>      |
| 2   | getCanisterStatus         | 3_486_544    | 1_984_617  | $0.0000026389 | $2.63             | <font color="green">-86_260</font>      |
| 3   | executeInstallCode        | 28_298_362   | 11_909_344 | $0.0000158355 | $15.83            | <font color="green">-234_335_052</font> |
| 4   | executeUninstallCode      | 4_076_743    | 2_220_697  | $0.0000029528 | $2.95             | <font color="green">-11_605</font>      |
| 5   | getCanisterStatus         | 3_488_965    | 1_985_586  | $0.0000026402 | $2.64             | <font color="green">-35_303</font>      |
| 6   | executeUploadChunk        | 17_929_278   | 7_761_711  | $0.0000103205 | $10.32            | <font color="green">-234_413_714</font> |
| 7   | getStoredChunks           | 2_814_101    | 1_715_640  | $0.0000022812 | $2.28             | <font color="green">-18_473</font>      |
| 8   | getStoredChunks           | 2_809_355    | 1_713_742  | $0.0000022787 | $2.27             | <font color="green">-27_003</font>      |
| 9   | executeInstallChunkedCode | 19_216_948   | 8_276_779  | $0.0000110054 | $11.00            | <font color="green">-143_983</font>     |
| 10  | executeUninstallCode      | 4_075_352    | 2_220_140  | $0.0000029521 | $2.95             | <font color="green">-21_247</font>      |
| 11  | executeClearChunkStore    | 2_813_282    | 1_715_312  | $0.0000022808 | $2.28             | <font color="green">-20_372</font>      |
| 12  | getStoredChunks           | 2_819_314    | 1_717_725  | $0.0000022840 | $2.28             | <font color="green">-12_960</font>      |
| 13  | getCanisterStatus         | 3_489_792    | 1_985_916  | $0.0000026406 | $2.64             | <font color="green">-23_028</font>      |
| 14  | executeDepositCycles      | 2_823_055    | 1_719_222  | $0.0000022860 | $2.28             | <font color="green">-17_120</font>      |
| 15  | getCanisterStatus         | 3_481_331    | 1_982_532  | $0.0000026361 | $2.63             | <font color="green">-42_350</font>      |
| 16  | executeUninstallCode      | 4_077_990    | 2_221_196  | $0.0000029535 | $2.95             | <font color="green">-16_454</font>      |
| 17  | getCanisterStatus         | 3_487_450    | 1_984_980  | $0.0000026394 | $2.63             | <font color="green">-31_799</font>      |
| 18  | executeStopCanister       | 2_816_879    | 1_716_751  | $0.0000022827 | $2.28             | <font color="green">-22_817</font>      |
| 19  | getCanisterStatus         | 3_488_189    | 1_985_275  | $0.0000026398 | $2.63             | <font color="green">-36_219</font>      |
| 20  | getCanisterStatus         | 3_491_006    | 1_986_402  | $0.0000026413 | $2.64             | <font color="green">-37_998</font>      |
| 21  | executeStartCanister      | 2_812_031    | 1_714_812  | $0.0000022801 | $2.28             | <font color="green">-21_994</font>      |
| 22  | getCanisterStatus         | 3_486_709    | 1_984_683  | $0.0000026390 | $2.63             | <font color="green">-38_565</font>      |
| 23  | getCanisterStatus         | 3_487_472    | 1_984_988  | $0.0000026394 | $2.63             | <font color="green">-39_519</font>      |
| 24  | getCanisterInfo           | 6_211_856    | 3_074_742  | $0.0000040884 | $4.08             | <font color="green">-47_235</font>      |
| 25  | executeStopCanister       | 2_810_243    | 1_714_097  | $0.0000022792 | $2.27             | <font color="green">-30_228</font>      |
| 26  | executeDeleteCanister     | 2_811_683    | 1_714_673  | $0.0000022799 | $2.27             | <font color="green">-28_487</font>      |
| 27  | getRawRand                | 1_279_619    | 1_101_847  | $0.0000014651 | $1.46             | <font color="green">-12_255</font>      |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name               | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 13_957_714   | 6_173_085   | $0.0000082082 | $8.20             |
| 1   | executeUpdateSettings     | 15_257_780   | 6_693_112   | $0.0000088996 | $8.89             |
| 2   | getCanisterStatus         | 3_572_804    | 2_019_121   | $0.0000026848 | $2.68             |
| 3   | executeInstallCode        | 262_633_414  | 105_643_365 | $0.0001404708 | $140.47           |
| 4   | executeUninstallCode      | 4_088_348    | 2_225_339   | $0.0000029590 | $2.95             |
| 5   | getCanisterStatus         | 3_524_268    | 1_999_707   | $0.0000026590 | $2.65             |
| 6   | executeUploadChunk        | 252_342_992  | 101_527_196 | $0.0001349977 | $134.99           |
| 7   | getStoredChunks           | 2_832_574    | 1_723_029   | $0.0000022911 | $2.29             |
| 8   | getStoredChunks           | 2_836_358    | 1_724_543   | $0.0000022931 | $2.29             |
| 9   | executeInstallChunkedCode | 19_360_931   | 8_334_372   | $0.0000110820 | $11.08            |
| 10  | executeUninstallCode      | 4_096_599    | 2_228_639   | $0.0000029634 | $2.96             |
| 11  | executeClearChunkStore    | 2_833_654    | 1_723_461   | $0.0000022916 | $2.29             |
| 12  | getStoredChunks           | 2_832_274    | 1_722_909   | $0.0000022909 | $2.29             |
| 13  | getCanisterStatus         | 3_512_820    | 1_995_128   | $0.0000026529 | $2.65             |
| 14  | executeDepositCycles      | 2_840_175    | 1_726_070   | $0.0000022951 | $2.29             |
| 15  | getCanisterStatus         | 3_523_681    | 1_999_472   | $0.0000026586 | $2.65             |
| 16  | executeUninstallCode      | 4_094_444    | 2_227_777   | $0.0000029622 | $2.96             |
| 17  | getCanisterStatus         | 3_519_249    | 1_997_699   | $0.0000026563 | $2.65             |
| 18  | executeStopCanister       | 2_839_696    | 1_725_878   | $0.0000022948 | $2.29             |
| 19  | getCanisterStatus         | 3_524_408    | 1_999_763   | $0.0000026590 | $2.65             |
| 20  | getCanisterStatus         | 3_529_004    | 2_001_601   | $0.0000026615 | $2.66             |
| 21  | executeStartCanister      | 2_834_025    | 1_723_610   | $0.0000022918 | $2.29             |
| 22  | getCanisterStatus         | 3_525_274    | 2_000_109   | $0.0000026595 | $2.65             |
| 23  | getCanisterStatus         | 3_526_991    | 2_000_796   | $0.0000026604 | $2.66             |
| 24  | getCanisterInfo           | 6_259_091    | 3_093_636   | $0.0000041135 | $4.11             |
| 25  | executeStopCanister       | 2_840_471    | 1_726_188   | $0.0000022953 | $2.29             |
| 26  | executeDeleteCanister     | 2_840_170    | 1_726_068   | $0.0000022951 | $2.29             |
| 27  | getRawRand                | 1_291_874    | 1_106_749   | $0.0000014716 | $1.47             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
