# Benchmarks for management_canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | executeCreateCanister     | 15_919_417   | 6_957_766  | $0.0000092515 | $9.25             | <font color="green">-32_044</font> |
| 1   | executeUpdateSettings     | 17_233_040   | 7_483_216  | $0.0000099502 | $9.95             | <font color="green">-23_113</font> |
| 2   | getCanisterStatus         | 3_742_968    | 2_087_187  | $0.0000027753 | $2.77             | <font color="green">-17_786</font> |
| 3   | executeInstallCode        | 29_128_120   | 12_241_248 | $0.0000162768 | $16.27            | <font color="green">-3_469</font>  |
| 4   | executeUninstallCode      | 4_396_470    | 2_348_588  | $0.0000031228 | $3.12             | <font color="green">-9_813</font>  |
| 5   | getCanisterStatus         | 3_739_416    | 2_085_766  | $0.0000027734 | $2.77             | <font color="green">-10_814</font> |
| 6   | executeUploadChunk        | 17_920_388   | 7_758_155  | $0.0000103158 | $10.31            | <font color="green">-2_143</font>  |
| 7   | getStoredChunks           | 3_051_526    | 1_810_610  | $0.0000024075 | $2.40             | <font color="red">+5_474</font>    |
| 8   | getStoredChunks           | 3_051_851    | 1_810_740  | $0.0000024077 | $2.40             | <font color="red">+80</font>       |
| 9   | executeInstallChunkedCode | 20_709_108   | 8_873_643  | $0.0000117990 | $11.79            | <font color="red">+539</font>      |
| 10  | executeUninstallCode      | 4_400_312    | 2_350_124  | $0.0000031249 | $3.12             | <font color="green">-295</font>    |
| 11  | executeClearChunkStore    | 3_046_023    | 1_808_409  | $0.0000024046 | $2.40             | <font color="green">-4_263</font>  |
| 12  | getStoredChunks           | 3_048_580    | 1_809_432  | $0.0000024059 | $2.40             | <font color="green">-1_781</font>  |
| 13  | getCanisterStatus         | 3_737_619    | 2_085_047  | $0.0000027724 | $2.77             | <font color="green">-7_817</font>  |
| 14  | executeDepositCycles      | 3_053_530    | 1_811_412  | $0.0000024086 | $2.40             | <font color="green">-900</font>    |
| 15  | getCanisterStatus         | 3_741_398    | 2_086_559  | $0.0000027744 | $2.77             | <font color="green">-1_330</font>  |
| 16  | executeUninstallCode      | 4_392_768    | 2_347_107  | $0.0000031209 | $3.12             | <font color="green">-1_678</font>  |
| 17  | getCanisterStatus         | 3_740_482    | 2_086_192  | $0.0000027739 | $2.77             | <font color="green">-3_731</font>  |
| 18  | executeStopCanister       | 3_059_065    | 1_813_626  | $0.0000024115 | $2.41             | <font color="red">+14_285</font>   |
| 19  | getCanisterStatus         | 3_757_444    | 2_092_977  | $0.0000027830 | $2.78             | <font color="red">+17_508</font>   |
| 20  | getCanisterStatus         | 3_753_407    | 2_091_362  | $0.0000027808 | $2.78             | <font color="red">+10_308</font>   |
| 21  | executeStartCanister      | 3_061_476    | 1_814_590  | $0.0000024128 | $2.41             | <font color="red">+13_101</font>   |
| 22  | getCanisterStatus         | 3_749_063    | 2_089_625  | $0.0000027785 | $2.77             | <font color="red">+7_152</font>    |
| 23  | getCanisterStatus         | 3_741_655    | 2_086_662  | $0.0000027746 | $2.77             | <font color="red">+3_510</font>    |
| 24  | getCanisterInfo           | 6_627_303    | 3_240_921  | $0.0000043094 | $4.30             | <font color="green">-1_823</font>  |
| 25  | executeStopCanister       | 3_059_638    | 1_813_855  | $0.0000024118 | $2.41             | <font color="red">+14_208</font>   |
| 26  | executeDeleteCanister     | 3_053_165    | 1_811_266  | $0.0000024084 | $2.40             | <font color="red">+4_960</font>    |
| 27  | getRawRand                | 907_241      | 952_896    | $0.0000012670 | $1.26             | <font color="green">-349</font>    |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 15_951_461   | 6_970_584  | $0.0000092686 | $9.26             |
| 1   | executeUpdateSettings     | 17_256_153   | 7_492_461  | $0.0000099625 | $9.96             |
| 2   | getCanisterStatus         | 3_760_754    | 2_094_301  | $0.0000027847 | $2.78             |
| 3   | executeInstallCode        | 29_131_589   | 12_242_635 | $0.0000162787 | $16.27            |
| 4   | executeUninstallCode      | 4_406_283    | 2_352_513  | $0.0000031281 | $3.12             |
| 5   | getCanisterStatus         | 3_750_230    | 2_090_092  | $0.0000027791 | $2.77             |
| 6   | executeUploadChunk        | 17_922_531   | 7_759_012  | $0.0000103169 | $10.31            |
| 7   | getStoredChunks           | 3_046_052    | 1_808_420  | $0.0000024046 | $2.40             |
| 8   | getStoredChunks           | 3_051_771    | 1_810_708  | $0.0000024076 | $2.40             |
| 9   | executeInstallChunkedCode | 20_708_569   | 8_873_427  | $0.0000117987 | $11.79            |
| 10  | executeUninstallCode      | 4_400_607    | 2_350_242  | $0.0000031250 | $3.12             |
| 11  | executeClearChunkStore    | 3_050_286    | 1_810_114  | $0.0000024069 | $2.40             |
| 12  | getStoredChunks           | 3_050_361    | 1_810_144  | $0.0000024069 | $2.40             |
| 13  | getCanisterStatus         | 3_745_436    | 2_088_174  | $0.0000027766 | $2.77             |
| 14  | executeDepositCycles      | 3_054_430    | 1_811_772  | $0.0000024091 | $2.40             |
| 15  | getCanisterStatus         | 3_742_728    | 2_087_091  | $0.0000027751 | $2.77             |
| 16  | executeUninstallCode      | 4_394_446    | 2_347_778  | $0.0000031218 | $3.12             |
| 17  | getCanisterStatus         | 3_744_213    | 2_087_685  | $0.0000027759 | $2.77             |
| 18  | executeStopCanister       | 3_044_780    | 1_807_912  | $0.0000024039 | $2.40             |
| 19  | getCanisterStatus         | 3_739_936    | 2_085_974  | $0.0000027737 | $2.77             |
| 20  | getCanisterStatus         | 3_743_099    | 2_087_239  | $0.0000027753 | $2.77             |
| 21  | executeStartCanister      | 3_048_375    | 1_809_350  | $0.0000024058 | $2.40             |
| 22  | getCanisterStatus         | 3_741_911    | 2_086_764  | $0.0000027747 | $2.77             |
| 23  | getCanisterStatus         | 3_738_145    | 2_085_258  | $0.0000027727 | $2.77             |
| 24  | getCanisterInfo           | 6_629_126    | 3_241_650  | $0.0000043103 | $4.31             |
| 25  | executeStopCanister       | 3_045_430    | 1_808_172  | $0.0000024043 | $2.40             |
| 26  | executeDeleteCanister     | 3_048_205    | 1_809_282  | $0.0000024057 | $2.40             |
| 27  | getRawRand                | 907_590      | 953_036    | $0.0000012672 | $1.26             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
