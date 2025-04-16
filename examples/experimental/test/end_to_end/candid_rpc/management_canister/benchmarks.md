# Benchmarks for management_canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                                |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------- |
| 0   | executeCreateCanister     | 164_937_393  | 66_564_957 | $0.0000885094 | $88.50            | <font color="red">+149_703_175</font> |
| 1   | executeUpdateSettings     | 166_345_036  | 67_128_014 | $0.0000892581 | $89.25            | <font color="red">+149_851_646</font> |
| 2   | getCanisterStatus         | 153_410_886  | 61_954_354 | $0.0000823788 | $82.37            | <font color="red">+149_645_493</font> |
| 3   | executeInstallCode        | 178_783_603  | 72_103_441 | $0.0000958738 | $95.87            | <font color="red">+149_825_540</font> |
| 4   | executeUninstallCode      | 154_105_250  | 62_232_100 | $0.0000827482 | $82.74            | <font color="red">+149_800_650</font> |
| 5   | getCanisterStatus         | 153_358_270  | 61_933_308 | $0.0000823509 | $82.35            | <font color="red">+149_592_184</font> |
| 6   | executeUploadChunk        | 168_006_922  | 67_792_768 | $0.0000901420 | $90.14            | <font color="red">+149_782_067</font> |
| 7   | getStoredChunks           | 152_503_983  | 61_591_593 | $0.0000818965 | $81.89            | <font color="red">+149_481_586</font> |
| 8   | getStoredChunks           | 152_639_615  | 61_645_846 | $0.0000819686 | $81.96            | <font color="red">+149_629_378</font> |
| 9   | executeInstallChunkedCode | 170_620_401  | 68_838_160 | $0.0000915320 | $91.53            | <font color="red">+150_402_085</font> |
| 10  | executeUninstallCode      | 154_110_887  | 62_234_354 | $0.0000827512 | $82.75            | <font color="red">+149_806_650</font> |
| 11  | executeClearChunkStore    | 152_921_766  | 61_758_706 | $0.0000821187 | $82.11            | <font color="red">+149_898_199</font> |
| 12  | getStoredChunks           | 152_623_513  | 61_639_405 | $0.0000819601 | $81.96            | <font color="red">+149_607_217</font> |
| 13  | getCanisterStatus         | 153_519_711  | 61_997_884 | $0.0000824367 | $82.43            | <font color="red">+149_752_403</font> |
| 14  | executeDepositCycles      | 152_497_023  | 61_588_809 | $0.0000818928 | $81.89            | <font color="red">+149_475_369</font> |
| 15  | getCanisterStatus         | 153_511_178  | 61_994_471 | $0.0000824322 | $82.43            | <font color="red">+149_740_846</font> |
| 16  | executeUninstallCode      | 154_010_377  | 62_194_150 | $0.0000826977 | $82.69            | <font color="red">+149_709_152</font> |
| 17  | getCanisterStatus         | 153_475_879  | 61_980_351 | $0.0000824134 | $82.41            | <font color="red">+149_708_540</font> |
| 18  | executeStopCanister       | 152_700_009  | 61_670_003 | $0.0000820008 | $82.00            | <font color="red">+149_681_645</font> |
| 19  | getCanisterStatus         | 153_436_785  | 61_964_714 | $0.0000823926 | $82.39            | <font color="red">+149_666_138</font> |
| 20  | getCanisterStatus         | 153_525_913  | 62_000_365 | $0.0000824400 | $82.44            | <font color="red">+149_750_489</font> |
| 21  | executeStartCanister      | 152_632_791  | 61_643_116 | $0.0000819650 | $81.96            | <font color="red">+149_618_322</font> |
| 22  | getCanisterStatus         | 153_622_188  | 62_038_875 | $0.0000824912 | $82.49            | <font color="red">+149_852_312</font> |
| 23  | getCanisterStatus         | 153_463_572  | 61_975_428 | $0.0000824069 | $82.40            | <font color="red">+149_691_148</font> |
| 24  | getCanisterInfo           | 156_797_343  | 63_308_937 | $0.0000841800 | $84.17            | <font color="red">+149_479_445</font> |
| 25  | executeStopCanister       | 152_636_046  | 61_644_418 | $0.0000819667 | $81.96            | <font color="red">+149_619_355</font> |
| 26  | executeDeleteCanister     | 152_861_128  | 61_734_451 | $0.0000820864 | $82.08            | <font color="red">+149_839_917</font> |
| 27  | getRawRand                | 150_563_762  | 60_815_504 | $0.0000808646 | $80.86            | <font color="red">+149_612_483</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 15_234_218   | 6_683_687  | $0.0000088871 | $8.88             |
| 1   | executeUpdateSettings     | 16_493_390   | 7_187_356  | $0.0000095568 | $9.55             |
| 2   | getCanisterStatus         | 3_765_393    | 2_096_157  | $0.0000027872 | $2.78             |
| 3   | executeInstallCode        | 28_958_063   | 12_173_225 | $0.0000161864 | $16.18            |
| 4   | executeUninstallCode      | 4_304_600    | 2_311_840  | $0.0000030740 | $3.07             |
| 5   | getCanisterStatus         | 3_766_086    | 2_096_434  | $0.0000027876 | $2.78             |
| 6   | executeUploadChunk        | 18_224_855   | 7_879_942  | $0.0000104777 | $10.47            |
| 7   | getStoredChunks           | 3_022_397    | 1_798_958  | $0.0000023920 | $2.39             |
| 8   | getStoredChunks           | 3_010_237    | 1_794_094  | $0.0000023856 | $2.38             |
| 9   | executeInstallChunkedCode | 20_218_316   | 8_677_326  | $0.0000115380 | $11.53            |
| 10  | executeUninstallCode      | 4_304_237    | 2_311_694  | $0.0000030738 | $3.07             |
| 11  | executeClearChunkStore    | 3_023_567    | 1_799_426  | $0.0000023926 | $2.39             |
| 12  | getStoredChunks           | 3_016_296    | 1_796_518  | $0.0000023888 | $2.38             |
| 13  | getCanisterStatus         | 3_767_308    | 2_096_923  | $0.0000027882 | $2.78             |
| 14  | executeDepositCycles      | 3_021_654    | 1_798_661  | $0.0000023916 | $2.39             |
| 15  | getCanisterStatus         | 3_770_332    | 2_098_132  | $0.0000027898 | $2.78             |
| 16  | executeUninstallCode      | 4_301_225    | 2_310_490  | $0.0000030722 | $3.07             |
| 17  | getCanisterStatus         | 3_767_339    | 2_096_935  | $0.0000027882 | $2.78             |
| 18  | executeStopCanister       | 3_018_364    | 1_797_345  | $0.0000023899 | $2.38             |
| 19  | getCanisterStatus         | 3_770_647    | 2_098_258  | $0.0000027900 | $2.78             |
| 20  | getCanisterStatus         | 3_775_424    | 2_100_169  | $0.0000027925 | $2.79             |
| 21  | executeStartCanister      | 3_014_469    | 1_795_787  | $0.0000023878 | $2.38             |
| 22  | getCanisterStatus         | 3_769_876    | 2_097_950  | $0.0000027896 | $2.78             |
| 23  | getCanisterStatus         | 3_772_424    | 2_098_969  | $0.0000027909 | $2.79             |
| 24  | getCanisterInfo           | 7_317_898    | 3_517_159  | $0.0000046767 | $4.67             |
| 25  | executeStopCanister       | 3_016_691    | 1_796_676  | $0.0000023890 | $2.38             |
| 26  | executeDeleteCanister     | 3_021_211    | 1_798_484  | $0.0000023914 | $2.39             |
| 27  | getRawRand                | 951_279      | 970_511    | $0.0000012905 | $1.29             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
