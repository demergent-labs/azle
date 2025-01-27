# Benchmarks for management_canister

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                                  |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------------- |
| 0   | executeCreateCanister     | 16_104_767   | 7_031_906  | $0.0000093501 | $9.35             | <font color="red">+2_147_053</font>     |
| 1   | executeUpdateSettings     | 17_412_563   | 7_555_025  | $0.0000100457 | $10.04            | <font color="red">+2_154_783</font>     |
| 2   | getCanisterStatus         | 3_816_648    | 2_116_659  | $0.0000028145 | $2.81             | <font color="red">+243_844</font>       |
| 3   | executeInstallCode        | 29_675_026   | 12_460_010 | $0.0000165677 | $16.56            | <font color="green">-232_958_388</font> |
| 4   | executeUninstallCode      | 4_447_556    | 2_369_022  | $0.0000031500 | $3.15             | <font color="red">+359_208</font>       |
| 5   | getCanisterStatus         | 3_812_527    | 2_115_010  | $0.0000028123 | $2.81             | <font color="red">+288_259</font>       |
| 6   | executeUploadChunk        | 18_336_506   | 7_924_602  | $0.0000105371 | $10.53            | <font color="green">-234_006_486</font> |
| 7   | getStoredChunks           | 3_089_786    | 1_825_914  | $0.0000024279 | $2.42             | <font color="red">+257_212</font>       |
| 8   | getStoredChunks           | 3_087_688    | 1_825_075  | $0.0000024267 | $2.42             | <font color="red">+251_330</font>       |
| 9   | executeInstallChunkedCode | 21_000_030   | 8_990_012  | $0.0000119537 | $11.95            | <font color="red">+1_639_099</font>     |
| 10  | executeUninstallCode      | 4_453_373    | 2_371_349  | $0.0000031531 | $3.15             | <font color="red">+356_774</font>       |
| 11  | executeClearChunkStore    | 3_094_546    | 1_827_818  | $0.0000024304 | $2.43             | <font color="red">+260_892</font>       |
| 12  | getStoredChunks           | 3_093_295    | 1_827_318  | $0.0000024297 | $2.42             | <font color="red">+261_021</font>       |
| 13  | getCanisterStatus         | 3_810_935    | 2_114_374  | $0.0000028114 | $2.81             | <font color="red">+298_115</font>       |
| 14  | executeDepositCycles      | 3_090_662    | 1_826_264  | $0.0000024283 | $2.42             | <font color="red">+250_487</font>       |
| 15  | getCanisterStatus         | 3_809_728    | 2_113_891  | $0.0000028108 | $2.81             | <font color="red">+286_047</font>       |
| 16  | executeUninstallCode      | 4_444_117    | 2_367_646  | $0.0000031482 | $3.14             | <font color="red">+349_673</font>       |
| 17  | getCanisterStatus         | 3_809_396    | 2_113_758  | $0.0000028106 | $2.81             | <font color="red">+290_147</font>       |
| 18  | executeStopCanister       | 3_086_532    | 1_824_612  | $0.0000024261 | $2.42             | <font color="red">+246_836</font>       |
| 19  | getCanisterStatus         | 3_815_782    | 2_116_312  | $0.0000028140 | $2.81             | <font color="red">+291_374</font>       |
| 20  | getCanisterStatus         | 3_815_248    | 2_116_099  | $0.0000028137 | $2.81             | <font color="red">+286_244</font>       |
| 21  | executeStartCanister      | 3_074_759    | 1_819_903  | $0.0000024199 | $2.41             | <font color="red">+240_734</font>       |
| 22  | getCanisterStatus         | 3_799_322    | 2_109_728  | $0.0000028052 | $2.80             | <font color="red">+274_048</font>       |
| 23  | getCanisterStatus         | 3_812_061    | 2_114_824  | $0.0000028120 | $2.81             | <font color="red">+285_070</font>       |
| 24  | getCanisterInfo           | 6_763_456    | 3_295_382  | $0.0000043818 | $4.38             | <font color="red">+504_365</font>       |
| 25  | executeStopCanister       | 3_085_802    | 1_824_320  | $0.0000024257 | $2.42             | <font color="red">+245_331</font>       |
| 26  | executeDeleteCanister     | 3_084_786    | 1_823_914  | $0.0000024252 | $2.42             | <font color="red">+244_616</font>       |
| 27  | getRawRand                | 1_416_635    | 1_156_654  | $0.0000015380 | $1.53             | <font color="red">+124_761</font>       |

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
