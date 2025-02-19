# Benchmarks for management_canister

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | executeCreateCanister     | 16_004_888   | 6_991_955  | $0.0000092970 | $9.29             | <font color="green">-93_547</font>  |
| 1   | executeUpdateSettings     | 17_326_456   | 7_520_582  | $0.0000099999 | $9.99             | <font color="green">-112_180</font> |
| 2   | getCanisterStatus         | 3_766_228    | 2_096_491  | $0.0000027876 | $2.78             | <font color="green">-42_328</font>  |
| 3   | executeInstallCode        | 29_201_313   | 12_270_525 | $0.0000163157 | $16.31            | <font color="green">-436_211</font> |
| 4   | executeUninstallCode      | 4_417_219    | 2_356_887  | $0.0000031339 | $3.13             | <font color="green">-34_816</font>  |
| 5   | getCanisterStatus         | 3_754_312    | 2_091_724  | $0.0000027813 | $2.78             | <font color="green">-57_519</font>  |
| 6   | executeUploadChunk        | 17_948_361   | 7_769_344  | $0.0000103307 | $10.33            | <font color="green">-381_297</font> |
| 7   | getStoredChunks           | 3_068_003    | 1_817_201  | $0.0000024163 | $2.41             | <font color="green">-18_140</font>  |
| 8   | getStoredChunks           | 3_062_252    | 1_814_900  | $0.0000024132 | $2.41             | <font color="green">-21_203</font>  |
| 9   | executeInstallChunkedCode | 20_784_971   | 8_903_988  | $0.0000118394 | $11.83            | <font color="green">-214_374</font> |
| 10  | executeUninstallCode      | 4_421_477    | 2_358_590  | $0.0000031361 | $3.13             | <font color="green">-30_077</font>  |
| 11  | executeClearChunkStore    | 3_062_757    | 1_815_102  | $0.0000024135 | $2.41             | <font color="green">-25_665</font>  |
| 12  | getStoredChunks           | 3_070_171    | 1_818_068  | $0.0000024174 | $2.41             | <font color="green">-13_069</font>  |
| 13  | getCanisterStatus         | 3_758_125    | 2_093_250  | $0.0000027833 | $2.78             | <font color="green">-50_277</font>  |
| 14  | executeDepositCycles      | 3_081_387    | 1_822_554  | $0.0000024234 | $2.42             | <font color="green">-11_313</font>  |
| 15  | getCanisterStatus         | 3_755_176    | 2_092_070  | $0.0000027818 | $2.78             | <font color="green">-49_141</font>  |
| 16  | executeUninstallCode      | 4_413_813    | 2_355_525  | $0.0000031321 | $3.13             | <font color="green">-38_087</font>  |
| 17  | getCanisterStatus         | 3_750_581    | 2_090_232  | $0.0000027793 | $2.77             | <font color="green">-57_154</font>  |
| 18  | executeStopCanister       | 3_062_029    | 1_814_811  | $0.0000024131 | $2.41             | <font color="green">-32_948</font>  |
| 19  | getCanisterStatus         | 3_757_584    | 2_093_033  | $0.0000027830 | $2.78             | <font color="green">-52_277</font>  |
| 20  | getCanisterStatus         | 3_771_373    | 2_098_549  | $0.0000027904 | $2.79             | <font color="green">-31_692</font>  |
| 21  | executeStartCanister      | 3_058_524    | 1_813_409  | $0.0000024112 | $2.41             | <font color="green">-24_340</font>  |
| 22  | getCanisterStatus         | 3_753_656    | 2_091_462  | $0.0000027810 | $2.78             | <font color="green">-50_073</font>  |
| 23  | getCanisterStatus         | 3_752_188    | 2_090_875  | $0.0000027802 | $2.78             | <font color="green">-54_342</font>  |
| 24  | getCanisterInfo           | 6_650_594    | 3_250_237  | $0.0000043217 | $4.32             | <font color="green">-90_802</font>  |
| 25  | executeStopCanister       | 3_056_493    | 1_812_597  | $0.0000024102 | $2.41             | <font color="green">-25_694</font>  |
| 26  | executeDeleteCanister     | 3_055_635    | 1_812_254  | $0.0000024097 | $2.40             | <font color="green">-24_591</font>  |
| 27  | getRawRand                | 914_337      | 955_734    | $0.0000012708 | $1.27             | <font color="green">-506_105</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 16_098_435   | 7_029_374  | $0.0000093467 | $9.34             |
| 1   | executeUpdateSettings     | 17_438_636   | 7_565_454  | $0.0000100596 | $10.05            |
| 2   | getCanisterStatus         | 3_808_556    | 2_113_422  | $0.0000028102 | $2.81             |
| 3   | executeInstallCode        | 29_637_524   | 12_445_009 | $0.0000165478 | $16.54            |
| 4   | executeUninstallCode      | 4_452_035    | 2_370_814  | $0.0000031524 | $3.15             |
| 5   | getCanisterStatus         | 3_811_831    | 2_114_732  | $0.0000028119 | $2.81             |
| 6   | executeUploadChunk        | 18_329_658   | 7_921_863  | $0.0000105335 | $10.53            |
| 7   | getStoredChunks           | 3_086_143    | 1_824_457  | $0.0000024259 | $2.42             |
| 8   | getStoredChunks           | 3_083_455    | 1_823_382  | $0.0000024245 | $2.42             |
| 9   | executeInstallChunkedCode | 20_999_345   | 8_989_738  | $0.0000119534 | $11.95            |
| 10  | executeUninstallCode      | 4_451_554    | 2_370_621  | $0.0000031521 | $3.15             |
| 11  | executeClearChunkStore    | 3_088_422    | 1_825_368  | $0.0000024271 | $2.42             |
| 12  | getStoredChunks           | 3_083_240    | 1_823_296  | $0.0000024244 | $2.42             |
| 13  | getCanisterStatus         | 3_808_402    | 2_113_360  | $0.0000028101 | $2.81             |
| 14  | executeDepositCycles      | 3_092_700    | 1_827_080  | $0.0000024294 | $2.42             |
| 15  | getCanisterStatus         | 3_804_317    | 2_111_726  | $0.0000028079 | $2.80             |
| 16  | executeUninstallCode      | 4_451_900    | 2_370_760  | $0.0000031523 | $3.15             |
| 17  | getCanisterStatus         | 3_807_735    | 2_113_094  | $0.0000028097 | $2.80             |
| 18  | executeStopCanister       | 3_094_977    | 1_827_990  | $0.0000024306 | $2.43             |
| 19  | getCanisterStatus         | 3_809_861    | 2_113_944  | $0.0000028108 | $2.81             |
| 20  | getCanisterStatus         | 3_803_065    | 2_111_226  | $0.0000028072 | $2.80             |
| 21  | executeStartCanister      | 3_082_864    | 1_823_145  | $0.0000024242 | $2.42             |
| 22  | getCanisterStatus         | 3_803_729    | 2_111_491  | $0.0000028076 | $2.80             |
| 23  | getCanisterStatus         | 3_806_530    | 2_112_612  | $0.0000028091 | $2.80             |
| 24  | getCanisterInfo           | 6_741_396    | 3_286_558  | $0.0000043700 | $4.37             |
| 25  | executeStopCanister       | 3_082_187    | 1_822_874  | $0.0000024238 | $2.42             |
| 26  | executeDeleteCanister     | 3_080_226    | 1_822_090  | $0.0000024228 | $2.42             |
| 27  | getRawRand                | 1_420_442    | 1_158_176  | $0.0000015400 | $1.53             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
