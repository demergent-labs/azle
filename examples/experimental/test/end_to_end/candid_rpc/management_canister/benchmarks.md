⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for management_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                                  |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------------- |
| 0   | executeCreateCanister     | 15_234_218   | 6_683_687  | $0.0000088871 | $8.88             | <font color="green">-149_766_241</font> |
| 1   | executeUpdateSettings     | 16_493_390   | 7_187_356  | $0.0000095568 | $9.55             | <font color="green">-149_959_410</font> |
| 2   | getCanisterStatus         | 3_765_393    | 2_096_157  | $0.0000027872 | $2.78             | <font color="green">-149_796_836</font> |
| 3   | executeInstallCode        | 28_958_063   | 12_173_225 | $0.0000161864 | $16.18            | <font color="green">-149_823_532</font> |
| 4   | executeUninstallCode      | 4_304_600    | 2_311_840  | $0.0000030740 | $3.07             | <font color="green">-149_713_805</font> |
| 5   | getCanisterStatus         | 3_766_086    | 2_096_434  | $0.0000027876 | $2.78             | <font color="green">-149_686_120</font> |
| 6   | executeUploadChunk        | 18_224_855   | 7_879_942  | $0.0000104777 | $10.47            | <font color="green">-149_789_653</font> |
| 7   | getStoredChunks           | 3_022_397    | 1_798_958  | $0.0000023920 | $2.39             | <font color="green">-149_768_071</font> |
| 8   | getStoredChunks           | 3_010_237    | 1_794_094  | $0.0000023856 | $2.38             | <font color="green">-149_667_627</font> |
| 9   | executeInstallChunkedCode | 20_218_316   | 8_677_326  | $0.0000115380 | $11.53            | <font color="green">-150_282_556</font> |
| 10  | executeUninstallCode      | 4_304_237    | 2_311_694  | $0.0000030738 | $3.07             | <font color="green">-149_657_047</font> |
| 11  | executeClearChunkStore    | 3_023_567    | 1_799_426  | $0.0000023926 | $2.39             | <font color="green">-149_839_571</font> |
| 12  | getStoredChunks           | 3_016_296    | 1_796_518  | $0.0000023888 | $2.38             | <font color="green">-149_599_816</font> |
| 13  | getCanisterStatus         | 3_767_308    | 2_096_923  | $0.0000027882 | $2.78             | <font color="green">-149_754_751</font> |
| 14  | executeDepositCycles      | 3_021_654    | 1_798_661  | $0.0000023916 | $2.39             | <font color="green">-149_434_313</font> |
| 15  | getCanisterStatus         | 3_770_332    | 2_098_132  | $0.0000027898 | $2.78             | <font color="green">-149_751_749</font> |
| 16  | executeUninstallCode      | 4_301_225    | 2_310_490  | $0.0000030722 | $3.07             | <font color="green">-149_751_494</font> |
| 17  | getCanisterStatus         | 3_767_339    | 2_096_935  | $0.0000027882 | $2.78             | <font color="green">-149_666_684</font> |
| 18  | executeStopCanister       | 3_018_364    | 1_797_345  | $0.0000023899 | $2.38             | <font color="green">-149_569_908</font> |
| 19  | getCanisterStatus         | 3_770_647    | 2_098_258  | $0.0000027900 | $2.78             | <font color="green">-149_714_420</font> |
| 20  | getCanisterStatus         | 3_775_424    | 2_100_169  | $0.0000027925 | $2.79             | <font color="green">-149_868_179</font> |
| 21  | executeStartCanister      | 3_014_469    | 1_795_787  | $0.0000023878 | $2.38             | <font color="green">-149_762_410</font> |
| 22  | getCanisterStatus         | 3_769_876    | 2_097_950  | $0.0000027896 | $2.78             | <font color="green">-149_711_012</font> |
| 23  | getCanisterStatus         | 3_772_424    | 2_098_969  | $0.0000027909 | $2.79             | <font color="green">-149_707_449</font> |
| 24  | getCanisterInfo           | 7_317_898    | 3_517_159  | $0.0000046767 | $4.67             | <font color="green">-149_553_195</font> |
| 25  | executeStopCanister       | 3_016_691    | 1_796_676  | $0.0000023890 | $2.38             | <font color="green">-149_604_190</font> |
| 26  | executeDeleteCanister     | 3_021_211    | 1_798_484  | $0.0000023914 | $2.39             | <font color="green">-149_731_101</font> |
| 27  | getRawRand                | 951_279      | 970_511    | $0.0000012905 | $1.29             | <font color="green">-149_523_087</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 165_000_459  | 66_590_183 | $0.0000885430 | $88.54            |
| 1   | executeUpdateSettings     | 166_452_800  | 67_171_120 | $0.0000893154 | $89.31            |
| 2   | getCanisterStatus         | 153_562_229  | 62_014_891 | $0.0000824593 | $82.45            |
| 3   | executeInstallCode        | 178_781_595  | 72_102_638 | $0.0000958727 | $95.87            |
| 4   | executeUninstallCode      | 154_018_405  | 62_197_362 | $0.0000827020 | $82.70            |
| 5   | getCanisterStatus         | 153_452_206  | 61_970_882 | $0.0000824008 | $82.40            |
| 6   | executeUploadChunk        | 168_014_508  | 67_795_803 | $0.0000901460 | $90.14            |
| 7   | getStoredChunks           | 152_790_468  | 61_706_187 | $0.0000820489 | $82.04            |
| 8   | getStoredChunks           | 152_677_864  | 61_661_145 | $0.0000819890 | $81.98            |
| 9   | executeInstallChunkedCode | 170_500_872  | 68_790_348 | $0.0000914685 | $91.46            |
| 10  | executeUninstallCode      | 153_961_284  | 62_174_513 | $0.0000826716 | $82.67            |
| 11  | executeClearChunkStore    | 152_863_138  | 61_735_255 | $0.0000820875 | $82.08            |
| 12  | getStoredChunks           | 152_616_112  | 61_636_444 | $0.0000819561 | $81.95            |
| 13  | getCanisterStatus         | 153_522_059  | 61_998_823 | $0.0000824380 | $82.43            |
| 14  | executeDepositCycles      | 152_455_967  | 61_572_386 | $0.0000818710 | $81.87            |
| 15  | getCanisterStatus         | 153_522_081  | 61_998_832 | $0.0000824380 | $82.43            |
| 16  | executeUninstallCode      | 154_052_719  | 62_211_087 | $0.0000827202 | $82.72            |
| 17  | getCanisterStatus         | 153_434_023  | 61_963_609 | $0.0000823912 | $82.39            |
| 18  | executeStopCanister       | 152_588_272  | 61_625_308 | $0.0000819413 | $81.94            |
| 19  | getCanisterStatus         | 153_485_067  | 61_984_026 | $0.0000824183 | $82.41            |
| 20  | getCanisterStatus         | 153_643_603  | 62_047_441 | $0.0000825026 | $82.50            |
| 21  | executeStartCanister      | 152_776_879  | 61_700_751 | $0.0000820416 | $82.04            |
| 22  | getCanisterStatus         | 153_480_888  | 61_982_355 | $0.0000824161 | $82.41            |
| 23  | getCanisterStatus         | 153_479_873  | 61_981_949 | $0.0000824155 | $82.41            |
| 24  | getCanisterInfo           | 156_871_093  | 63_338_437 | $0.0000842192 | $84.21            |
| 25  | executeStopCanister       | 152_620_881  | 61_638_352 | $0.0000819587 | $81.95            |
| 26  | executeDeleteCanister     | 152_752_312  | 61_690_924 | $0.0000820286 | $82.02            |
| 27  | getRawRand                | 150_474_366  | 60_779_746 | $0.0000808170 | $80.81            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
