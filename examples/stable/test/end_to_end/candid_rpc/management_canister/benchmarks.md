# Benchmarks for management_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | executeCreateCanister     | 15_963_224   | 6_975_289  | $0.0000092748 | $9.27             | <font color="red">+42_654</font> |
| 1   | executeUpdateSettings     | 17_267_390   | 7_496_956  | $0.0000099685 | $9.96             | <font color="red">+33_063</font> |
| 2   | getCanisterStatus         | 3_795_840    | 2_108_336  | $0.0000028034 | $2.80             | <font color="red">+52_448</font> |
| 3   | executeInstallCode        | 29_177_133   | 12_260_853 | $0.0000163029 | $16.30            | <font color="red">+47_803</font> |
| 4   | executeUninstallCode      | 4_453_391    | 2_371_356  | $0.0000031531 | $3.15             | <font color="red">+56_543</font> |
| 5   | getCanisterStatus         | 3_790_974    | 2_106_389  | $0.0000028008 | $2.80             | <font color="red">+51_094</font> |
| 6   | executeUploadChunk        | 17_965_362   | 7_776_144  | $0.0000103397 | $10.33            | <font color="red">+44_596</font> |
| 7   | getStoredChunks           | 3_098_477    | 1_829_390  | $0.0000024325 | $2.43             | <font color="red">+46_664</font> |
| 8   | getStoredChunks           | 3_096_720    | 1_828_688  | $0.0000024316 | $2.43             | <font color="red">+44_610</font> |
| 9   | executeInstallChunkedCode | 20_744_841   | 8_887_936  | $0.0000118180 | $11.81            | <font color="red">+34_051</font> |
| 10  | executeUninstallCode      | 4_448_450    | 2_369_380  | $0.0000031505 | $3.15             | <font color="red">+47_760</font> |
| 11  | executeClearChunkStore    | 3_101_940    | 1_830_776  | $0.0000024343 | $2.43             | <font color="red">+55_651</font> |
| 12  | getStoredChunks           | 3_100_403    | 1_830_161  | $0.0000024335 | $2.43             | <font color="red">+51_536</font> |
| 13  | getCanisterStatus         | 3_790_657    | 2_106_262  | $0.0000028006 | $2.80             | <font color="red">+52_658</font> |
| 14  | executeDepositCycles      | 3_101_686    | 1_830_674  | $0.0000024342 | $2.43             | <font color="red">+47_827</font> |
| 15  | getCanisterStatus         | 3_792_283    | 2_106_913  | $0.0000028015 | $2.80             | <font color="red">+50_526</font> |
| 16  | executeUninstallCode      | 4_455_495    | 2_372_198  | $0.0000031542 | $3.15             | <font color="red">+62_440</font> |
| 17  | getCanisterStatus         | 3_790_940    | 2_106_376  | $0.0000028008 | $2.80             | <font color="red">+50_050</font> |
| 18  | executeStopCanister       | 3_097_428    | 1_828_971  | $0.0000024319 | $2.43             | <font color="red">+38_048</font> |
| 19  | getCanisterStatus         | 3_791_535    | 2_106_614  | $0.0000028011 | $2.80             | <font color="red">+33_676</font> |
| 20  | getCanisterStatus         | 3_795_460    | 2_108_184  | $0.0000028032 | $2.80             | <font color="red">+41_666</font> |
| 21  | executeStartCanister      | 3_091_951    | 1_826_780  | $0.0000024290 | $2.42             | <font color="red">+30_237</font> |
| 22  | getCanisterStatus         | 3_790_992    | 2_106_396  | $0.0000028008 | $2.80             | <font color="red">+41_577</font> |
| 23  | getCanisterStatus         | 3_784_579    | 2_103_831  | $0.0000027974 | $2.79             | <font color="red">+42_593</font> |
| 24  | getCanisterInfo           | 6_675_944    | 3_260_377  | $0.0000043352 | $4.33             | <font color="red">+48_024</font> |
| 25  | executeStopCanister       | 3_090_625    | 1_826_250  | $0.0000024283 | $2.42             | <font color="red">+46_351</font> |
| 26  | executeDeleteCanister     | 3_091_700    | 1_826_680  | $0.0000024289 | $2.42             | <font color="red">+46_230</font> |
| 27  | getRawRand                | 958_146      | 973_258    | $0.0000012941 | $1.29             | <font color="red">+52_677</font> |

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
