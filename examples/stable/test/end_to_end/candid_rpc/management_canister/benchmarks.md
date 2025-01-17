# Benchmarks for management_canister

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                                  |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------------- |
| 0   | executeCreateCanister     | 16_098_435   | 7_029_374  | $0.0000093467 | $9.34             | <font color="red">+2_140_721</font>     |
| 1   | executeUpdateSettings     | 17_438_636   | 7_565_454  | $0.0000100596 | $10.05            | <font color="red">+2_180_856</font>     |
| 2   | getCanisterStatus         | 3_808_556    | 2_113_422  | $0.0000028102 | $2.81             | <font color="red">+235_752</font>       |
| 3   | executeInstallCode        | 29_637_524   | 12_445_009 | $0.0000165478 | $16.54            | <font color="green">-232_995_890</font> |
| 4   | executeUninstallCode      | 4_452_035    | 2_370_814  | $0.0000031524 | $3.15             | <font color="red">+363_687</font>       |
| 5   | getCanisterStatus         | 3_811_831    | 2_114_732  | $0.0000028119 | $2.81             | <font color="red">+287_563</font>       |
| 6   | executeUploadChunk        | 18_329_658   | 7_921_863  | $0.0000105335 | $10.53            | <font color="green">-234_013_334</font> |
| 7   | getStoredChunks           | 3_086_143    | 1_824_457  | $0.0000024259 | $2.42             | <font color="red">+253_569</font>       |
| 8   | getStoredChunks           | 3_083_455    | 1_823_382  | $0.0000024245 | $2.42             | <font color="red">+247_097</font>       |
| 9   | executeInstallChunkedCode | 20_999_345   | 8_989_738  | $0.0000119534 | $11.95            | <font color="red">+1_638_414</font>     |
| 10  | executeUninstallCode      | 4_451_554    | 2_370_621  | $0.0000031521 | $3.15             | <font color="red">+354_955</font>       |
| 11  | executeClearChunkStore    | 3_088_422    | 1_825_368  | $0.0000024271 | $2.42             | <font color="red">+254_768</font>       |
| 12  | getStoredChunks           | 3_083_240    | 1_823_296  | $0.0000024244 | $2.42             | <font color="red">+250_966</font>       |
| 13  | getCanisterStatus         | 3_808_402    | 2_113_360  | $0.0000028101 | $2.81             | <font color="red">+295_582</font>       |
| 14  | executeDepositCycles      | 3_092_700    | 1_827_080  | $0.0000024294 | $2.42             | <font color="red">+252_525</font>       |
| 15  | getCanisterStatus         | 3_804_317    | 2_111_726  | $0.0000028079 | $2.80             | <font color="red">+280_636</font>       |
| 16  | executeUninstallCode      | 4_451_900    | 2_370_760  | $0.0000031523 | $3.15             | <font color="red">+357_456</font>       |
| 17  | getCanisterStatus         | 3_807_735    | 2_113_094  | $0.0000028097 | $2.80             | <font color="red">+288_486</font>       |
| 18  | executeStopCanister       | 3_094_977    | 1_827_990  | $0.0000024306 | $2.43             | <font color="red">+255_281</font>       |
| 19  | getCanisterStatus         | 3_809_861    | 2_113_944  | $0.0000028108 | $2.81             | <font color="red">+285_453</font>       |
| 20  | getCanisterStatus         | 3_803_065    | 2_111_226  | $0.0000028072 | $2.80             | <font color="red">+274_061</font>       |
| 21  | executeStartCanister      | 3_082_864    | 1_823_145  | $0.0000024242 | $2.42             | <font color="red">+248_839</font>       |
| 22  | getCanisterStatus         | 3_803_729    | 2_111_491  | $0.0000028076 | $2.80             | <font color="red">+278_455</font>       |
| 23  | getCanisterStatus         | 3_806_530    | 2_112_612  | $0.0000028091 | $2.80             | <font color="red">+279_539</font>       |
| 24  | getCanisterInfo           | 6_741_396    | 3_286_558  | $0.0000043700 | $4.37             | <font color="red">+482_305</font>       |
| 25  | executeStopCanister       | 3_082_187    | 1_822_874  | $0.0000024238 | $2.42             | <font color="red">+241_716</font>       |
| 26  | executeDeleteCanister     | 3_080_226    | 1_822_090  | $0.0000024228 | $2.42             | <font color="red">+240_056</font>       |
| 27  | getRawRand                | 1_420_442    | 1_158_176  | $0.0000015400 | $1.53             | <font color="red">+128_568</font>       |

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
