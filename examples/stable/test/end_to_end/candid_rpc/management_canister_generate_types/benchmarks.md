⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for management_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | executeCreateCanister     | 16_002_570   | 6_991_028  | $0.0000092958 | $9.29             | <font color="red">+82_524</font> |
| 1   | executeUpdateSettings     | 17_283_595   | 7_503_438  | $0.0000099771 | $9.97             | <font color="red">+49_869</font> |
| 2   | getCanisterStatus         | 3_793_183    | 2_107_273  | $0.0000028020 | $2.80             | <font color="red">+50_102</font> |
| 3   | executeInstallCode        | 29_175_493   | 12_260_197 | $0.0000163020 | $16.30            | <font color="red">+46_752</font> |
| 4   | executeUninstallCode      | 4_455_139    | 2_372_055  | $0.0000031541 | $3.15             | <font color="red">+58_545</font> |
| 5   | getCanisterStatus         | 3_788_037    | 2_105_214  | $0.0000027992 | $2.79             | <font color="red">+48_446</font> |
| 6   | executeUploadChunk        | 17_965_159   | 7_776_063  | $0.0000103396 | $10.33            | <font color="red">+44_663</font> |
| 7   | getStoredChunks           | 3_100_269    | 1_830_107  | $0.0000024334 | $2.43             | <font color="red">+48_631</font> |
| 8   | getStoredChunks           | 3_103_501    | 1_831_400  | $0.0000024352 | $2.43             | <font color="red">+51_496</font> |
| 9   | executeInstallChunkedCode | 20_755_144   | 8_892_057  | $0.0000118235 | $11.82            | <font color="red">+45_187</font> |
| 10  | executeUninstallCode      | 4_453_067    | 2_371_226  | $0.0000031529 | $3.15             | <font color="red">+52_624</font> |
| 11  | executeClearChunkStore    | 3_101_338    | 1_830_535  | $0.0000024340 | $2.43             | <font color="red">+55_252</font> |
| 12  | getStoredChunks           | 3_098_931    | 1_829_572  | $0.0000024327 | $2.43             | <font color="red">+50_232</font> |
| 13  | getCanisterStatus         | 3_790_889    | 2_106_355  | $0.0000028008 | $2.80             | <font color="red">+53_172</font> |
| 14  | executeDepositCycles      | 3_106_116    | 1_832_446  | $0.0000024365 | $2.43             | <font color="red">+52_523</font> |
| 15  | getCanisterStatus         | 3_785_221    | 2_104_088  | $0.0000027977 | $2.79             | <font color="red">+43_676</font> |
| 16  | executeUninstallCode      | 4_448_673    | 2_369_469  | $0.0000031506 | $3.15             | <font color="red">+55_816</font> |
| 17  | getCanisterStatus         | 3_792_142    | 2_106_856  | $0.0000028014 | $2.80             | <font color="red">+51_499</font> |
| 18  | executeStopCanister       | 3_100_920    | 1_830_368  | $0.0000024338 | $2.43             | <font color="red">+41_708</font> |
| 19  | getCanisterStatus         | 3_793_887    | 2_107_554  | $0.0000028024 | $2.80             | <font color="red">+36_345</font> |
| 20  | getCanisterStatus         | 3_794_627    | 2_107_850  | $0.0000028027 | $2.80             | <font color="red">+41_122</font> |
| 21  | executeStartCanister      | 3_096_813    | 1_828_725  | $0.0000024316 | $2.43             | <font color="red">+35_267</font> |
| 22  | getCanisterStatus         | 3_793_607    | 2_107_442  | $0.0000028022 | $2.80             | <font color="red">+44_509</font> |
| 23  | getCanisterStatus         | 3_786_324    | 2_104_529  | $0.0000027983 | $2.79             | <font color="red">+44_529</font> |
| 24  | getCanisterInfo           | 6_675_669    | 3_260_267  | $0.0000043351 | $4.33             | <font color="red">+48_142</font> |
| 25  | executeStopCanister       | 3_089_237    | 1_825_694  | $0.0000024276 | $2.42             | <font color="red">+45_180</font> |
| 26  | executeDeleteCanister     | 3_092_751    | 1_827_100  | $0.0000024294 | $2.42             | <font color="red">+47_498</font> |
| 27  | getRawRand                | 957_727      | 973_090    | $0.0000012939 | $1.29             | <font color="red">+52_365</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 15_920_046   | 6_958_018  | $0.0000092519 | $9.25             |
| 1   | executeUpdateSettings     | 17_233_726   | 7_483_490  | $0.0000099506 | $9.95             |
| 2   | getCanisterStatus         | 3_743_081    | 2_087_232  | $0.0000027753 | $2.77             |
| 3   | executeInstallCode        | 29_128_741   | 12_241_496 | $0.0000162771 | $16.27            |
| 4   | executeUninstallCode      | 4_396_594    | 2_348_637  | $0.0000031229 | $3.12             |
| 5   | getCanisterStatus         | 3_739_591    | 2_085_836  | $0.0000027735 | $2.77             |
| 6   | executeUploadChunk        | 17_920_496   | 7_758_198  | $0.0000103158 | $10.31            |
| 7   | getStoredChunks           | 3_051_638    | 1_810_655  | $0.0000024076 | $2.40             |
| 8   | getStoredChunks           | 3_052_005    | 1_810_802  | $0.0000024078 | $2.40             |
| 9   | executeInstallChunkedCode | 20_709_957   | 8_873_982  | $0.0000117995 | $11.79            |
| 10  | executeUninstallCode      | 4_400_443    | 2_350_177  | $0.0000031250 | $3.12             |
| 11  | executeClearChunkStore    | 3_046_086    | 1_808_434  | $0.0000024046 | $2.40             |
| 12  | getStoredChunks           | 3_048_699    | 1_809_479  | $0.0000024060 | $2.40             |
| 13  | getCanisterStatus         | 3_737_717    | 2_085_086  | $0.0000027725 | $2.77             |
| 14  | executeDepositCycles      | 3_053_593    | 1_811_437  | $0.0000024086 | $2.40             |
| 15  | getCanisterStatus         | 3_741_545    | 2_086_618  | $0.0000027745 | $2.77             |
| 16  | executeUninstallCode      | 4_392_857    | 2_347_142  | $0.0000031209 | $3.12             |
| 17  | getCanisterStatus         | 3_740_643    | 2_086_257  | $0.0000027740 | $2.77             |
| 18  | executeStopCanister       | 3_059_212    | 1_813_684  | $0.0000024116 | $2.41             |
| 19  | getCanisterStatus         | 3_757_542    | 2_093_016  | $0.0000027830 | $2.78             |
| 20  | getCanisterStatus         | 3_753_505    | 2_091_402  | $0.0000027809 | $2.78             |
| 21  | executeStartCanister      | 3_061_546    | 1_814_618  | $0.0000024128 | $2.41             |
| 22  | getCanisterStatus         | 3_749_098    | 2_089_639  | $0.0000027785 | $2.77             |
| 23  | getCanisterStatus         | 3_741_795    | 2_086_718  | $0.0000027746 | $2.77             |
| 24  | getCanisterInfo           | 6_627_527    | 3_241_010  | $0.0000043095 | $4.30             |
| 25  | executeStopCanister       | 3_044_057    | 1_807_622  | $0.0000024035 | $2.40             |
| 26  | executeDeleteCanister     | 3_045_253    | 1_808_101  | $0.0000024042 | $2.40             |
| 27  | getRawRand                | 905_362      | 952_144    | $0.0000012660 | $1.26             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
