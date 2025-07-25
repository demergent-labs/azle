⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for management_canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | executeCreateCanister     | 15_904_165   | 6_951_666  | $0.0000092434 | $9.24             | <font color="green">-98_405</font> |
| 1   | executeUpdateSettings     | 17_198_575   | 7_469_430  | $0.0000099319 | $9.93             | <font color="green">-85_020</font> |
| 2   | getCanisterStatus         | 3_714_465    | 2_075_786  | $0.0000027601 | $2.76             | <font color="green">-78_718</font> |
| 3   | executeInstallCode        | 29_257_818   | 12_293_127 | $0.0000163458 | $16.34            | <font color="red">+82_325</font>   |
| 4   | executeUninstallCode      | 4_376_161    | 2_340_464  | $0.0000031120 | $3.11             | <font color="green">-78_978</font> |
| 5   | getCanisterStatus         | 3_713_152    | 2_075_260  | $0.0000027594 | $2.75             | <font color="green">-74_885</font> |
| 6   | executeUploadChunk        | 18_061_398   | 7_814_559  | $0.0000103908 | $10.39            | <font color="red">+96_239</font>   |
| 7   | getStoredChunks           | 3_027_687    | 1_801_074  | $0.0000023948 | $2.39             | <font color="green">-72_582</font> |
| 8   | getStoredChunks           | 3_022_314    | 1_798_925  | $0.0000023920 | $2.39             | <font color="green">-81_187</font> |
| 9   | executeInstallChunkedCode | 20_668_704   | 8_857_481  | $0.0000117775 | $11.77            | <font color="green">-86_440</font> |
| 10  | executeUninstallCode      | 4_374_942    | 2_339_976  | $0.0000031114 | $3.11             | <font color="green">-78_125</font> |
| 11  | executeClearChunkStore    | 3_020_498    | 1_798_199  | $0.0000023910 | $2.39             | <font color="green">-80_840</font> |
| 12  | getStoredChunks           | 3_027_725    | 1_801_090  | $0.0000023949 | $2.39             | <font color="green">-71_206</font> |
| 13  | getCanisterStatus         | 3_717_825    | 2_077_130  | $0.0000027619 | $2.76             | <font color="green">-73_064</font> |
| 14  | executeDepositCycles      | 3_031_830    | 1_802_732  | $0.0000023970 | $2.39             | <font color="green">-74_286</font> |
| 15  | getCanisterStatus         | 3_713_362    | 2_075_344  | $0.0000027595 | $2.75             | <font color="green">-71_859</font> |
| 16  | executeUninstallCode      | 4_383_699    | 2_343_479  | $0.0000031161 | $3.11             | <font color="green">-64_974</font> |
| 17  | getCanisterStatus         | 3_716_061    | 2_076_424  | $0.0000027610 | $2.76             | <font color="green">-76_081</font> |
| 18  | executeStopCanister       | 3_017_722    | 1_797_088  | $0.0000023895 | $2.38             | <font color="green">-83_198</font> |
| 19  | getCanisterStatus         | 3_718_868    | 2_077_547  | $0.0000027625 | $2.76             | <font color="green">-75_019</font> |
| 20  | getCanisterStatus         | 3_724_453    | 2_079_781  | $0.0000027654 | $2.76             | <font color="green">-70_174</font> |
| 21  | executeStartCanister      | 3_016_433    | 1_796_573  | $0.0000023888 | $2.38             | <font color="green">-80_380</font> |
| 22  | getCanisterStatus         | 3_718_473    | 2_077_389  | $0.0000027622 | $2.76             | <font color="green">-75_134</font> |
| 23  | getCanisterStatus         | 3_716_750    | 2_076_700  | $0.0000027613 | $2.76             | <font color="green">-69_574</font> |
| 24  | getCanisterInfo           | 6_608_407    | 3_233_362  | $0.0000042993 | $4.29             | <font color="green">-67_262</font> |
| 25  | executeStopCanister       | 3_016_320    | 1_796_528  | $0.0000023888 | $2.38             | <font color="green">-72_917</font> |
| 26  | executeDeleteCanister     | 3_014_519    | 1_795_807  | $0.0000023878 | $2.38             | <font color="green">-78_232</font> |
| 27  | getRawRand                | 885_872      | 944_348    | $0.0000012557 | $1.25             | <font color="green">-71_855</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 16_002_570   | 6_991_028  | $0.0000092958 | $9.29             |
| 1   | executeUpdateSettings     | 17_283_595   | 7_503_438  | $0.0000099771 | $9.97             |
| 2   | getCanisterStatus         | 3_793_183    | 2_107_273  | $0.0000028020 | $2.80             |
| 3   | executeInstallCode        | 29_175_493   | 12_260_197 | $0.0000163020 | $16.30            |
| 4   | executeUninstallCode      | 4_455_139    | 2_372_055  | $0.0000031541 | $3.15             |
| 5   | getCanisterStatus         | 3_788_037    | 2_105_214  | $0.0000027992 | $2.79             |
| 6   | executeUploadChunk        | 17_965_159   | 7_776_063  | $0.0000103396 | $10.33            |
| 7   | getStoredChunks           | 3_100_269    | 1_830_107  | $0.0000024334 | $2.43             |
| 8   | getStoredChunks           | 3_103_501    | 1_831_400  | $0.0000024352 | $2.43             |
| 9   | executeInstallChunkedCode | 20_755_144   | 8_892_057  | $0.0000118235 | $11.82            |
| 10  | executeUninstallCode      | 4_453_067    | 2_371_226  | $0.0000031529 | $3.15             |
| 11  | executeClearChunkStore    | 3_101_338    | 1_830_535  | $0.0000024340 | $2.43             |
| 12  | getStoredChunks           | 3_098_931    | 1_829_572  | $0.0000024327 | $2.43             |
| 13  | getCanisterStatus         | 3_790_889    | 2_106_355  | $0.0000028008 | $2.80             |
| 14  | executeDepositCycles      | 3_106_116    | 1_832_446  | $0.0000024365 | $2.43             |
| 15  | getCanisterStatus         | 3_785_221    | 2_104_088  | $0.0000027977 | $2.79             |
| 16  | executeUninstallCode      | 4_448_673    | 2_369_469  | $0.0000031506 | $3.15             |
| 17  | getCanisterStatus         | 3_792_142    | 2_106_856  | $0.0000028014 | $2.80             |
| 18  | executeStopCanister       | 3_100_920    | 1_830_368  | $0.0000024338 | $2.43             |
| 19  | getCanisterStatus         | 3_793_887    | 2_107_554  | $0.0000028024 | $2.80             |
| 20  | getCanisterStatus         | 3_794_627    | 2_107_850  | $0.0000028027 | $2.80             |
| 21  | executeStartCanister      | 3_096_813    | 1_828_725  | $0.0000024316 | $2.43             |
| 22  | getCanisterStatus         | 3_793_607    | 2_107_442  | $0.0000028022 | $2.80             |
| 23  | getCanisterStatus         | 3_786_324    | 2_104_529  | $0.0000027983 | $2.79             |
| 24  | getCanisterInfo           | 6_675_669    | 3_260_267  | $0.0000043351 | $4.33             |
| 25  | executeStopCanister       | 3_089_237    | 1_825_694  | $0.0000024276 | $2.42             |
| 26  | executeDeleteCanister     | 3_092_751    | 1_827_100  | $0.0000024294 | $2.42             |
| 27  | getRawRand                | 957_727      | 973_090    | $0.0000012939 | $1.29             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
