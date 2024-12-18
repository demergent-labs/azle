# Benchmarks for management_canister

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                                  |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------------- |
| 0   | executeCreateCanister     | 13_947_861   | 6_169_144  | $0.0000082029 | $8.20             | <font color="green">-9_853</font>       |
| 1   | executeUpdateSettings     | 15_222_316   | 6_678_926  | $0.0000088808 | $8.88             | <font color="green">-35_464</font>      |
| 2   | getCanisterStatus         | 3_486_537    | 1_984_614  | $0.0000026389 | $2.63             | <font color="green">-86_267</font>      |
| 3   | executeInstallCode        | 28_298_385   | 11_909_354 | $0.0000158355 | $15.83            | <font color="green">-234_335_029</font> |
| 4   | executeUninstallCode      | 4_076_784    | 2_220_713  | $0.0000029528 | $2.95             | <font color="green">-11_564</font>      |
| 5   | getCanisterStatus         | 3_488_988    | 1_985_595  | $0.0000026402 | $2.64             | <font color="green">-35_280</font>      |
| 6   | executeUploadChunk        | 17_929_255   | 7_761_702  | $0.0000103205 | $10.32            | <font color="green">-234_413_737</font> |
| 7   | getStoredChunks           | 2_814_032    | 1_715_612  | $0.0000022812 | $2.28             | <font color="green">-18_542</font>      |
| 8   | getStoredChunks           | 2_809_325    | 1_713_730  | $0.0000022787 | $2.27             | <font color="green">-27_033</font>      |
| 9   | executeInstallChunkedCode | 19_216_994   | 8_276_797  | $0.0000110054 | $11.00            | <font color="green">-143_937</font>     |
| 10  | executeUninstallCode      | 4_075_405    | 2_220_162  | $0.0000029521 | $2.95             | <font color="green">-21_194</font>      |
| 11  | executeClearChunkStore    | 2_813_213    | 1_715_285  | $0.0000022808 | $2.28             | <font color="green">-20_441</font>      |
| 12  | getStoredChunks           | 2_819_284    | 1_717_713  | $0.0000022840 | $2.28             | <font color="green">-12_990</font>      |
| 13  | getCanisterStatus         | 3_489_815    | 1_985_926  | $0.0000026406 | $2.64             | <font color="green">-23_005</font>      |
| 14  | executeDepositCycles      | 2_822_956    | 1_719_182  | $0.0000022859 | $2.28             | <font color="green">-17_219</font>      |
| 15  | getCanisterStatus         | 3_481_301    | 1_982_520  | $0.0000026361 | $2.63             | <font color="green">-42_380</font>      |
| 16  | executeUninstallCode      | 4_077_967    | 2_221_186  | $0.0000029534 | $2.95             | <font color="green">-16_477</font>      |
| 17  | getCanisterStatus         | 3_487_473    | 1_984_989  | $0.0000026394 | $2.63             | <font color="green">-31_776</font>      |
| 18  | executeStopCanister       | 2_816_849    | 1_716_739  | $0.0000022827 | $2.28             | <font color="green">-22_847</font>      |
| 19  | getCanisterStatus         | 3_488_166    | 1_985_266  | $0.0000026397 | $2.63             | <font color="green">-36_242</font>      |
| 20  | getCanisterStatus         | 3_491_029    | 1_986_411  | $0.0000026413 | $2.64             | <font color="green">-37_975</font>      |
| 21  | executeStartCanister      | 2_812_061    | 1_714_824  | $0.0000022802 | $2.28             | <font color="green">-21_964</font>      |
| 22  | getCanisterStatus         | 3_486_633    | 1_984_653  | $0.0000026389 | $2.63             | <font color="green">-38_641</font>      |
| 23  | getCanisterStatus         | 3_487_502    | 1_985_000  | $0.0000026394 | $2.63             | <font color="green">-39_489</font>      |
| 24  | getCanisterInfo           | 6_211_909    | 3_074_763  | $0.0000040884 | $4.08             | <font color="green">-47_182</font>      |
| 25  | executeStopCanister       | 2_810_388    | 1_714_155  | $0.0000022793 | $2.27             | <font color="green">-30_083</font>      |
| 26  | executeDeleteCanister     | 2_811_614    | 1_714_645  | $0.0000022799 | $2.27             | <font color="green">-28_556</font>      |
| 27  | getRawRand                | 1_279_642    | 1_101_856  | $0.0000014651 | $1.46             | <font color="green">-12_232</font>      |

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
