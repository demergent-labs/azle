⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for management_canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | executeCreateCanister     | 15_909_188   | 6_953_675  | $0.0000092461 | $9.24             | <font color="green">-91_774</font> |
| 1   | executeUpdateSettings     | 17_191_137   | 7_466_454  | $0.0000099279 | $9.92             | <font color="green">-92_048</font> |
| 2   | getCanisterStatus         | 3_719_915    | 2_077_966  | $0.0000027630 | $2.76             | <font color="green">-73_992</font> |
| 3   | executeInstallCode        | 29_262_567   | 12_295_026 | $0.0000163483 | $16.34            | <font color="red">+87_077</font>   |
| 4   | executeUninstallCode      | 4_379_530    | 2_341_812  | $0.0000031138 | $3.11             | <font color="green">-75_984</font> |
| 5   | getCanisterStatus         | 3_723_111    | 2_079_244  | $0.0000027647 | $2.76             | <font color="green">-65_613</font> |
| 6   | executeUploadChunk        | 18_055_137   | 7_812_054  | $0.0000103875 | $10.38            | <font color="red">+89_724</font>   |
| 7   | getStoredChunks           | 3_027_705    | 1_801_082  | $0.0000023948 | $2.39             | <font color="green">-73_058</font> |
| 8   | getStoredChunks           | 3_024_218    | 1_799_687  | $0.0000023930 | $2.39             | <font color="green">-79_693</font> |
| 9   | executeInstallChunkedCode | 20_667_689   | 8_857_075  | $0.0000117770 | $11.77            | <font color="green">-87_530</font> |
| 10  | executeUninstallCode      | 4_376_264    | 2_340_505  | $0.0000031121 | $3.11             | <font color="green">-77_157</font> |
| 11  | executeClearChunkStore    | 3_024_781    | 1_799_912  | $0.0000023933 | $2.39             | <font color="green">-77_044</font> |
| 12  | getStoredChunks           | 3_022_715    | 1_799_086  | $0.0000023922 | $2.39             | <font color="green">-76_682</font> |
| 13  | getCanisterStatus         | 3_724_314    | 2_079_725  | $0.0000027653 | $2.76             | <font color="green">-67_290</font> |
| 14  | executeDepositCycles      | 3_037_436    | 1_804_974  | $0.0000024000 | $2.40             | <font color="green">-69_033</font> |
| 15  | getCanisterStatus         | 3_720_387    | 2_078_154  | $0.0000027633 | $2.76             | <font color="green">-65_535</font> |
| 16  | executeUninstallCode      | 4_378_726    | 2_341_490  | $0.0000031134 | $3.11             | <font color="green">-70_315</font> |
| 17  | getCanisterStatus         | 3_716_248    | 2_076_499  | $0.0000027611 | $2.76             | <font color="green">-76_588</font> |
| 18  | executeStopCanister       | 3_022_286    | 1_798_914  | $0.0000023920 | $2.39             | <font color="green">-79_085</font> |
| 19  | getCanisterStatus         | 3_720_199    | 2_078_079  | $0.0000027632 | $2.76             | <font color="green">-74_354</font> |
| 20  | getCanisterStatus         | 3_713_711    | 2_075_484  | $0.0000027597 | $2.75             | <font color="green">-81_625</font> |
| 21  | executeStartCanister      | 3_019_776    | 1_797_910  | $0.0000023906 | $2.39             | <font color="green">-77_488</font> |
| 22  | getCanisterStatus         | 3_716_724    | 2_076_689  | $0.0000027613 | $2.76             | <font color="green">-77_606</font> |
| 23  | getCanisterStatus         | 3_710_129    | 2_074_051  | $0.0000027578 | $2.75             | <font color="green">-76_931</font> |
| 24  | getCanisterInfo           | 6_600_613    | 3_230_245  | $0.0000042952 | $4.29             | <font color="green">-75_894</font> |
| 25  | executeStopCanister       | 3_020_147    | 1_798_058  | $0.0000023908 | $2.39             | <font color="green">-69_583</font> |
| 26  | executeDeleteCanister     | 3_014_423    | 1_795_769  | $0.0000023878 | $2.38             | <font color="green">-78_745</font> |
| 27  | getRawRand                | 884_084      | 943_633    | $0.0000012547 | $1.25             | <font color="green">-74_216</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 16_000_962   | 6_990_384  | $0.0000092949 | $9.29             |
| 1   | executeUpdateSettings     | 17_283_185   | 7_503_274  | $0.0000099769 | $9.97             |
| 2   | getCanisterStatus         | 3_793_907    | 2_107_562  | $0.0000028024 | $2.80             |
| 3   | executeInstallCode        | 29_175_490   | 12_260_196 | $0.0000163020 | $16.30            |
| 4   | executeUninstallCode      | 4_455_514    | 2_372_205  | $0.0000031542 | $3.15             |
| 5   | getCanisterStatus         | 3_788_724    | 2_105_489  | $0.0000027996 | $2.79             |
| 6   | executeUploadChunk        | 17_965_413   | 7_776_165  | $0.0000103397 | $10.33            |
| 7   | getStoredChunks           | 3_100_763    | 1_830_305  | $0.0000024337 | $2.43             |
| 8   | getStoredChunks           | 3_103_911    | 1_831_564  | $0.0000024354 | $2.43             |
| 9   | executeInstallChunkedCode | 20_755_219   | 8_892_087  | $0.0000118235 | $11.82            |
| 10  | executeUninstallCode      | 4_453_421    | 2_371_368  | $0.0000031531 | $3.15             |
| 11  | executeClearChunkStore    | 3_101_825    | 1_830_730  | $0.0000024343 | $2.43             |
| 12  | getStoredChunks           | 3_099_397    | 1_829_758  | $0.0000024330 | $2.43             |
| 13  | getCanisterStatus         | 3_791_604    | 2_106_641  | $0.0000028011 | $2.80             |
| 14  | executeDepositCycles      | 3_106_469    | 1_832_587  | $0.0000024367 | $2.43             |
| 15  | getCanisterStatus         | 3_785_922    | 2_104_368  | $0.0000027981 | $2.79             |
| 16  | executeUninstallCode      | 4_449_041    | 2_369_616  | $0.0000031508 | $3.15             |
| 17  | getCanisterStatus         | 3_792_836    | 2_107_134  | $0.0000028018 | $2.80             |
| 18  | executeStopCanister       | 3_101_371    | 1_830_548  | $0.0000024340 | $2.43             |
| 19  | getCanisterStatus         | 3_794_553    | 2_107_821  | $0.0000028027 | $2.80             |
| 20  | getCanisterStatus         | 3_795_336    | 2_108_134  | $0.0000028031 | $2.80             |
| 21  | executeStartCanister      | 3_097_264    | 1_828_905  | $0.0000024318 | $2.43             |
| 22  | getCanisterStatus         | 3_794_330    | 2_107_732  | $0.0000028026 | $2.80             |
| 23  | getCanisterStatus         | 3_787_060    | 2_104_824  | $0.0000027987 | $2.79             |
| 24  | getCanisterInfo           | 6_676_507    | 3_260_602  | $0.0000043355 | $4.33             |
| 25  | executeStopCanister       | 3_089_730    | 1_825_892  | $0.0000024278 | $2.42             |
| 26  | executeDeleteCanister     | 3_093_168    | 1_827_267  | $0.0000024297 | $2.42             |
| 27  | getRawRand                | 958_300      | 973_320    | $0.0000012942 | $1.29             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
