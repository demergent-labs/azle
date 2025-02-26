# Benchmarks for management_canister

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | executeCreateCanister     | 15_951_461   | 6_970_584  | $0.0000092686 | $9.26             | <font color="green">-53_427</font> |
| 1   | executeUpdateSettings     | 17_256_153   | 7_492_461  | $0.0000099625 | $9.96             | <font color="green">-70_303</font> |
| 2   | getCanisterStatus         | 3_760_754    | 2_094_301  | $0.0000027847 | $2.78             | <font color="green">-5_474</font>  |
| 3   | executeInstallCode        | 29_131_589   | 12_242_635 | $0.0000162787 | $16.27            | <font color="green">-69_724</font> |
| 4   | executeUninstallCode      | 4_406_283    | 2_352_513  | $0.0000031281 | $3.12             | <font color="green">-10_936</font> |
| 5   | getCanisterStatus         | 3_750_230    | 2_090_092  | $0.0000027791 | $2.77             | <font color="green">-4_082</font>  |
| 6   | executeUploadChunk        | 17_922_531   | 7_759_012  | $0.0000103169 | $10.31            | <font color="green">-25_830</font> |
| 7   | getStoredChunks           | 3_046_052    | 1_808_420  | $0.0000024046 | $2.40             | <font color="green">-21_951</font> |
| 8   | getStoredChunks           | 3_051_771    | 1_810_708  | $0.0000024076 | $2.40             | <font color="green">-10_481</font> |
| 9   | executeInstallChunkedCode | 20_708_569   | 8_873_427  | $0.0000117987 | $11.79            | <font color="green">-76_402</font> |
| 10  | executeUninstallCode      | 4_400_607    | 2_350_242  | $0.0000031250 | $3.12             | <font color="green">-20_870</font> |
| 11  | executeClearChunkStore    | 3_050_286    | 1_810_114  | $0.0000024069 | $2.40             | <font color="green">-12_471</font> |
| 12  | getStoredChunks           | 3_050_361    | 1_810_144  | $0.0000024069 | $2.40             | <font color="green">-19_810</font> |
| 13  | getCanisterStatus         | 3_745_436    | 2_088_174  | $0.0000027766 | $2.77             | <font color="green">-12_689</font> |
| 14  | executeDepositCycles      | 3_054_430    | 1_811_772  | $0.0000024091 | $2.40             | <font color="green">-26_957</font> |
| 15  | getCanisterStatus         | 3_742_728    | 2_087_091  | $0.0000027751 | $2.77             | <font color="green">-12_448</font> |
| 16  | executeUninstallCode      | 4_394_446    | 2_347_778  | $0.0000031218 | $3.12             | <font color="green">-19_367</font> |
| 17  | getCanisterStatus         | 3_744_213    | 2_087_685  | $0.0000027759 | $2.77             | <font color="green">-6_368</font>  |
| 18  | executeStopCanister       | 3_044_780    | 1_807_912  | $0.0000024039 | $2.40             | <font color="green">-17_249</font> |
| 19  | getCanisterStatus         | 3_739_936    | 2_085_974  | $0.0000027737 | $2.77             | <font color="green">-17_648</font> |
| 20  | getCanisterStatus         | 3_743_099    | 2_087_239  | $0.0000027753 | $2.77             | <font color="green">-28_274</font> |
| 21  | executeStartCanister      | 3_048_375    | 1_809_350  | $0.0000024058 | $2.40             | <font color="green">-10_149</font> |
| 22  | getCanisterStatus         | 3_741_911    | 2_086_764  | $0.0000027747 | $2.77             | <font color="green">-11_745</font> |
| 23  | getCanisterStatus         | 3_738_145    | 2_085_258  | $0.0000027727 | $2.77             | <font color="green">-14_043</font> |
| 24  | getCanisterInfo           | 6_629_126    | 3_241_650  | $0.0000043103 | $4.31             | <font color="green">-21_468</font> |
| 25  | executeStopCanister       | 3_045_430    | 1_808_172  | $0.0000024043 | $2.40             | <font color="green">-11_063</font> |
| 26  | executeDeleteCanister     | 3_048_205    | 1_809_282  | $0.0000024057 | $2.40             | <font color="green">-7_430</font>  |
| 27  | getRawRand                | 907_590      | 953_036    | $0.0000012672 | $1.26             | <font color="green">-6_747</font>  |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 16_004_888   | 6_991_955  | $0.0000092970 | $9.29             |
| 1   | executeUpdateSettings     | 17_326_456   | 7_520_582  | $0.0000099999 | $9.99             |
| 2   | getCanisterStatus         | 3_766_228    | 2_096_491  | $0.0000027876 | $2.78             |
| 3   | executeInstallCode        | 29_201_313   | 12_270_525 | $0.0000163157 | $16.31            |
| 4   | executeUninstallCode      | 4_417_219    | 2_356_887  | $0.0000031339 | $3.13             |
| 5   | getCanisterStatus         | 3_754_312    | 2_091_724  | $0.0000027813 | $2.78             |
| 6   | executeUploadChunk        | 17_948_361   | 7_769_344  | $0.0000103307 | $10.33            |
| 7   | getStoredChunks           | 3_068_003    | 1_817_201  | $0.0000024163 | $2.41             |
| 8   | getStoredChunks           | 3_062_252    | 1_814_900  | $0.0000024132 | $2.41             |
| 9   | executeInstallChunkedCode | 20_784_971   | 8_903_988  | $0.0000118394 | $11.83            |
| 10  | executeUninstallCode      | 4_421_477    | 2_358_590  | $0.0000031361 | $3.13             |
| 11  | executeClearChunkStore    | 3_062_757    | 1_815_102  | $0.0000024135 | $2.41             |
| 12  | getStoredChunks           | 3_070_171    | 1_818_068  | $0.0000024174 | $2.41             |
| 13  | getCanisterStatus         | 3_758_125    | 2_093_250  | $0.0000027833 | $2.78             |
| 14  | executeDepositCycles      | 3_081_387    | 1_822_554  | $0.0000024234 | $2.42             |
| 15  | getCanisterStatus         | 3_755_176    | 2_092_070  | $0.0000027818 | $2.78             |
| 16  | executeUninstallCode      | 4_413_813    | 2_355_525  | $0.0000031321 | $3.13             |
| 17  | getCanisterStatus         | 3_750_581    | 2_090_232  | $0.0000027793 | $2.77             |
| 18  | executeStopCanister       | 3_062_029    | 1_814_811  | $0.0000024131 | $2.41             |
| 19  | getCanisterStatus         | 3_757_584    | 2_093_033  | $0.0000027830 | $2.78             |
| 20  | getCanisterStatus         | 3_771_373    | 2_098_549  | $0.0000027904 | $2.79             |
| 21  | executeStartCanister      | 3_058_524    | 1_813_409  | $0.0000024112 | $2.41             |
| 22  | getCanisterStatus         | 3_753_656    | 2_091_462  | $0.0000027810 | $2.78             |
| 23  | getCanisterStatus         | 3_752_188    | 2_090_875  | $0.0000027802 | $2.78             |
| 24  | getCanisterInfo           | 6_650_594    | 3_250_237  | $0.0000043217 | $4.32             |
| 25  | executeStopCanister       | 3_056_493    | 1_812_597  | $0.0000024102 | $2.41             |
| 26  | executeDeleteCanister     | 3_055_635    | 1_812_254  | $0.0000024097 | $2.40             |
| 27  | getRawRand                | 914_337      | 955_734    | $0.0000012708 | $1.27             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
