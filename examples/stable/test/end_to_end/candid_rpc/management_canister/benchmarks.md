# Benchmarks for management_canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | executeCreateCanister     | 15_923_872   | 6_959_548  | $0.0000092539 | $9.25             | <font color="green">-27_589</font> |
| 1   | executeUpdateSettings     | 17_237_415   | 7_484_966  | $0.0000099525 | $9.95             | <font color="green">-18_738</font> |
| 2   | getCanisterStatus         | 3_744_620    | 2_087_848  | $0.0000027761 | $2.77             | <font color="green">-16_134</font> |
| 3   | executeInstallCode        | 29_132_786   | 12_243_114 | $0.0000162793 | $16.27            | <font color="red">+1_197</font>    |
| 4   | executeUninstallCode      | 4_398_109    | 2_349_243  | $0.0000031237 | $3.12             | <font color="green">-8_174</font>  |
| 5   | getCanisterStatus         | 3_741_003    | 2_086_401  | $0.0000027742 | $2.77             | <font color="green">-9_227</font>  |
| 6   | executeUploadChunk        | 17_922_027   | 7_758_810  | $0.0000103167 | $10.31            | <font color="green">-504</font>    |
| 7   | getStoredChunks           | 3_052_888    | 1_811_155  | $0.0000024082 | $2.40             | <font color="red">+6_836</font>    |
| 8   | getStoredChunks           | 3_053_227    | 1_811_290  | $0.0000024084 | $2.40             | <font color="red">+1_456</font>    |
| 9   | executeInstallChunkedCode | 20_714_950   | 8_875_980  | $0.0000118021 | $11.80            | <font color="red">+6_381</font>    |
| 10  | executeUninstallCode      | 4_401_979    | 2_350_791  | $0.0000031258 | $3.12             | <font color="red">+1_372</font>    |
| 11  | executeClearChunkStore    | 3_047_406    | 1_808_962  | $0.0000024053 | $2.40             | <font color="green">-2_880</font>  |
| 12  | getStoredChunks           | 3_050_040    | 1_810_016  | $0.0000024067 | $2.40             | <font color="green">-321</font>    |
| 13  | getCanisterStatus         | 3_739_199    | 2_085_679  | $0.0000027733 | $2.77             | <font color="green">-6_237</font>  |
| 14  | executeDepositCycles      | 3_054_960    | 1_811_984  | $0.0000024093 | $2.40             | <font color="red">+530</font>      |
| 15  | getCanisterStatus         | 3_743_006    | 2_087_202  | $0.0000027753 | $2.77             | <font color="red">+278</font>      |
| 16  | executeUninstallCode      | 4_394_365    | 2_347_746  | $0.0000031217 | $3.12             | <font color="green">-81</font>     |
| 17  | getCanisterStatus         | 3_741_985    | 2_086_794  | $0.0000027747 | $2.77             | <font color="green">-2_228</font>  |
| 18  | executeStopCanister       | 3_060_502    | 1_814_200  | $0.0000024123 | $2.41             | <font color="red">+15_722</font>   |
| 19  | getCanisterStatus         | 3_758_982    | 2_093_592  | $0.0000027838 | $2.78             | <font color="red">+19_046</font>   |
| 20  | getCanisterStatus         | 3_754_966    | 2_091_986  | $0.0000027817 | $2.78             | <font color="red">+11_867</font>   |
| 21  | executeStartCanister      | 3_062_864    | 1_815_145  | $0.0000024135 | $2.41             | <font color="red">+14_489</font>   |
| 22  | getCanisterStatus         | 3_750_629    | 2_090_251  | $0.0000027793 | $2.77             | <font color="red">+8_718</font>    |
| 23  | getCanisterStatus         | 3_743_186    | 2_087_274  | $0.0000027754 | $2.77             | <font color="red">+5_041</font>    |
| 24  | getCanisterInfo           | 6_629_258    | 3_241_703  | $0.0000043104 | $4.31             | <font color="red">+132</font>      |
| 25  | executeStopCanister       | 3_061_164    | 1_814_465  | $0.0000024126 | $2.41             | <font color="red">+15_734</font>   |
| 26  | executeDeleteCanister     | 3_054_597    | 1_811_838  | $0.0000024091 | $2.40             | <font color="red">+6_392</font>    |
| 27  | getRawRand                | 907_816      | 953_126    | $0.0000012673 | $1.26             | <font color="red">+226</font>      |

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
