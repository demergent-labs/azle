⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for management_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | executeCreateCanister     | 16_000_962   | 6_990_384  | $0.0000092949 | $9.29             | <font color="red">+80_392</font> |
| 1   | executeUpdateSettings     | 17_283_185   | 7_503_274  | $0.0000099769 | $9.97             | <font color="red">+48_858</font> |
| 2   | getCanisterStatus         | 3_793_907    | 2_107_562  | $0.0000028024 | $2.80             | <font color="red">+50_515</font> |
| 3   | executeInstallCode        | 29_175_490   | 12_260_196 | $0.0000163020 | $16.30            | <font color="red">+46_160</font> |
| 4   | executeUninstallCode      | 4_455_514    | 2_372_205  | $0.0000031542 | $3.15             | <font color="red">+58_666</font> |
| 5   | getCanisterStatus         | 3_788_724    | 2_105_489  | $0.0000027996 | $2.79             | <font color="red">+48_844</font> |
| 6   | executeUploadChunk        | 17_965_413   | 7_776_165  | $0.0000103397 | $10.33            | <font color="red">+44_647</font> |
| 7   | getStoredChunks           | 3_100_763    | 1_830_305  | $0.0000024337 | $2.43             | <font color="red">+48_950</font> |
| 8   | getStoredChunks           | 3_103_911    | 1_831_564  | $0.0000024354 | $2.43             | <font color="red">+51_801</font> |
| 9   | executeInstallChunkedCode | 20_755_219   | 8_892_087  | $0.0000118235 | $11.82            | <font color="red">+44_429</font> |
| 10  | executeUninstallCode      | 4_453_421    | 2_371_368  | $0.0000031531 | $3.15             | <font color="red">+52_731</font> |
| 11  | executeClearChunkStore    | 3_101_825    | 1_830_730  | $0.0000024343 | $2.43             | <font color="red">+55_536</font> |
| 12  | getStoredChunks           | 3_099_397    | 1_829_758  | $0.0000024330 | $2.43             | <font color="red">+50_530</font> |
| 13  | getCanisterStatus         | 3_791_604    | 2_106_641  | $0.0000028011 | $2.80             | <font color="red">+53_605</font> |
| 14  | executeDepositCycles      | 3_106_469    | 1_832_587  | $0.0000024367 | $2.43             | <font color="red">+52_610</font> |
| 15  | getCanisterStatus         | 3_785_922    | 2_104_368  | $0.0000027981 | $2.79             | <font color="red">+44_165</font> |
| 16  | executeUninstallCode      | 4_449_041    | 2_369_616  | $0.0000031508 | $3.15             | <font color="red">+55_986</font> |
| 17  | getCanisterStatus         | 3_792_836    | 2_107_134  | $0.0000028018 | $2.80             | <font color="red">+51_946</font> |
| 18  | executeStopCanister       | 3_101_371    | 1_830_548  | $0.0000024340 | $2.43             | <font color="red">+41_991</font> |
| 19  | getCanisterStatus         | 3_794_553    | 2_107_821  | $0.0000028027 | $2.80             | <font color="red">+36_694</font> |
| 20  | getCanisterStatus         | 3_795_336    | 2_108_134  | $0.0000028031 | $2.80             | <font color="red">+41_542</font> |
| 21  | executeStartCanister      | 3_097_264    | 1_828_905  | $0.0000024318 | $2.43             | <font color="red">+35_550</font> |
| 22  | getCanisterStatus         | 3_794_330    | 2_107_732  | $0.0000028026 | $2.80             | <font color="red">+44_915</font> |
| 23  | getCanisterStatus         | 3_787_060    | 2_104_824  | $0.0000027987 | $2.79             | <font color="red">+45_074</font> |
| 24  | getCanisterInfo           | 6_676_507    | 3_260_602  | $0.0000043355 | $4.33             | <font color="red">+48_587</font> |
| 25  | executeStopCanister       | 3_089_730    | 1_825_892  | $0.0000024278 | $2.42             | <font color="red">+45_456</font> |
| 26  | executeDeleteCanister     | 3_093_168    | 1_827_267  | $0.0000024297 | $2.42             | <font color="red">+47_698</font> |
| 27  | getRawRand                | 958_300      | 973_320    | $0.0000012942 | $1.29             | <font color="red">+52_831</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 15_920_570   | 6_958_228  | $0.0000092521 | $9.25             |
| 1   | executeUpdateSettings     | 17_234_327   | 7_483_730  | $0.0000099509 | $9.95             |
| 2   | getCanisterStatus         | 3_743_392    | 2_087_356  | $0.0000027755 | $2.77             |
| 3   | executeInstallCode        | 29_129_330   | 12_241_732 | $0.0000162775 | $16.27            |
| 4   | executeUninstallCode      | 4_396_848    | 2_348_739  | $0.0000031230 | $3.12             |
| 5   | getCanisterStatus         | 3_739_880    | 2_085_952  | $0.0000027736 | $2.77             |
| 6   | executeUploadChunk        | 17_920_766   | 7_758_306  | $0.0000103160 | $10.31            |
| 7   | getStoredChunks           | 3_051_813    | 1_810_725  | $0.0000024077 | $2.40             |
| 8   | getStoredChunks           | 3_052_110    | 1_810_844  | $0.0000024078 | $2.40             |
| 9   | executeInstallChunkedCode | 20_710_790   | 8_874_316  | $0.0000117999 | $11.79            |
| 10  | executeUninstallCode      | 4_400_690    | 2_350_276  | $0.0000031251 | $3.12             |
| 11  | executeClearChunkStore    | 3_046_289    | 1_808_515  | $0.0000024047 | $2.40             |
| 12  | getStoredChunks           | 3_048_867    | 1_809_546  | $0.0000024061 | $2.40             |
| 13  | getCanisterStatus         | 3_737_999    | 2_085_199  | $0.0000027726 | $2.77             |
| 14  | executeDepositCycles      | 3_053_859    | 1_811_543  | $0.0000024088 | $2.40             |
| 15  | getCanisterStatus         | 3_741_757    | 2_086_702  | $0.0000027746 | $2.77             |
| 16  | executeUninstallCode      | 4_393_055    | 2_347_222  | $0.0000031210 | $3.12             |
| 17  | getCanisterStatus         | 3_740_890    | 2_086_356  | $0.0000027742 | $2.77             |
| 18  | executeStopCanister       | 3_059_380    | 1_813_752  | $0.0000024117 | $2.41             |
| 19  | getCanisterStatus         | 3_757_859    | 2_093_143  | $0.0000027832 | $2.78             |
| 20  | getCanisterStatus         | 3_753_794    | 2_091_517  | $0.0000027810 | $2.78             |
| 21  | executeStartCanister      | 3_061_714    | 1_814_685  | $0.0000024129 | $2.41             |
| 22  | getCanisterStatus         | 3_749_415    | 2_089_766  | $0.0000027787 | $2.77             |
| 23  | getCanisterStatus         | 3_741_986    | 2_086_794  | $0.0000027747 | $2.77             |
| 24  | getCanisterInfo           | 6_627_920    | 3_241_168  | $0.0000043097 | $4.30             |
| 25  | executeStopCanister       | 3_044_274    | 1_807_709  | $0.0000024037 | $2.40             |
| 26  | executeDeleteCanister     | 3_045_470    | 1_808_188  | $0.0000024043 | $2.40             |
| 27  | getRawRand                | 905_469      | 952_187    | $0.0000012661 | $1.26             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
