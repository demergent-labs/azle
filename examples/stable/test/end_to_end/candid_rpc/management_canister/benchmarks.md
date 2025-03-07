# Benchmarks for management_canister

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | executeCreateCanister     | 15_920_570   | 6_958_228  | $0.0000092521 | $9.25             | <font color="red">+1_153</font>    |
| 1   | executeUpdateSettings     | 17_234_327   | 7_483_730  | $0.0000099509 | $9.95             | <font color="red">+1_287</font>    |
| 2   | getCanisterStatus         | 3_743_392    | 2_087_356  | $0.0000027755 | $2.77             | <font color="red">+424</font>      |
| 3   | executeInstallCode        | 29_129_330   | 12_241_732 | $0.0000162775 | $16.27            | <font color="red">+1_210</font>    |
| 4   | executeUninstallCode      | 4_396_848    | 2_348_739  | $0.0000031230 | $3.12             | <font color="red">+378</font>      |
| 5   | getCanisterStatus         | 3_739_880    | 2_085_952  | $0.0000027736 | $2.77             | <font color="red">+464</font>      |
| 6   | executeUploadChunk        | 17_920_766   | 7_758_306  | $0.0000103160 | $10.31            | <font color="red">+378</font>      |
| 7   | getStoredChunks           | 3_051_813    | 1_810_725  | $0.0000024077 | $2.40             | <font color="red">+287</font>      |
| 8   | getStoredChunks           | 3_052_110    | 1_810_844  | $0.0000024078 | $2.40             | <font color="red">+259</font>      |
| 9   | executeInstallChunkedCode | 20_710_790   | 8_874_316  | $0.0000117999 | $11.79            | <font color="red">+1_682</font>    |
| 10  | executeUninstallCode      | 4_400_690    | 2_350_276  | $0.0000031251 | $3.12             | <font color="red">+378</font>      |
| 11  | executeClearChunkStore    | 3_046_289    | 1_808_515  | $0.0000024047 | $2.40             | <font color="red">+266</font>      |
| 12  | getStoredChunks           | 3_048_867    | 1_809_546  | $0.0000024061 | $2.40             | <font color="red">+287</font>      |
| 13  | getCanisterStatus         | 3_737_999    | 2_085_199  | $0.0000027726 | $2.77             | <font color="red">+380</font>      |
| 14  | executeDepositCycles      | 3_053_859    | 1_811_543  | $0.0000024088 | $2.40             | <font color="red">+329</font>      |
| 15  | getCanisterStatus         | 3_741_757    | 2_086_702  | $0.0000027746 | $2.77             | <font color="red">+359</font>      |
| 16  | executeUninstallCode      | 4_393_055    | 2_347_222  | $0.0000031210 | $3.12             | <font color="red">+287</font>      |
| 17  | getCanisterStatus         | 3_740_890    | 2_086_356  | $0.0000027742 | $2.77             | <font color="red">+408</font>      |
| 18  | executeStopCanister       | 3_059_380    | 1_813_752  | $0.0000024117 | $2.41             | <font color="red">+315</font>      |
| 19  | getCanisterStatus         | 3_757_859    | 2_093_143  | $0.0000027832 | $2.78             | <font color="red">+415</font>      |
| 20  | getCanisterStatus         | 3_753_794    | 2_091_517  | $0.0000027810 | $2.78             | <font color="red">+387</font>      |
| 21  | executeStartCanister      | 3_061_714    | 1_814_685  | $0.0000024129 | $2.41             | <font color="red">+238</font>      |
| 22  | getCanisterStatus         | 3_749_415    | 2_089_766  | $0.0000027787 | $2.77             | <font color="red">+352</font>      |
| 23  | getCanisterStatus         | 3_741_986    | 2_086_794  | $0.0000027747 | $2.77             | <font color="red">+331</font>      |
| 24  | getCanisterInfo           | 6_627_920    | 3_241_168  | $0.0000043097 | $4.30             | <font color="red">+617</font>      |
| 25  | executeStopCanister       | 3_044_274    | 1_807_709  | $0.0000024037 | $2.40             | <font color="green">-15_364</font> |
| 26  | executeDeleteCanister     | 3_045_470    | 1_808_188  | $0.0000024043 | $2.40             | <font color="green">-7_695</font>  |
| 27  | getRawRand                | 905_469      | 952_187    | $0.0000012661 | $1.26             | <font color="green">-1_772</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 15_919_417   | 6_957_766  | $0.0000092515 | $9.25             |
| 1   | executeUpdateSettings     | 17_233_040   | 7_483_216  | $0.0000099502 | $9.95             |
| 2   | getCanisterStatus         | 3_742_968    | 2_087_187  | $0.0000027753 | $2.77             |
| 3   | executeInstallCode        | 29_128_120   | 12_241_248 | $0.0000162768 | $16.27            |
| 4   | executeUninstallCode      | 4_396_470    | 2_348_588  | $0.0000031228 | $3.12             |
| 5   | getCanisterStatus         | 3_739_416    | 2_085_766  | $0.0000027734 | $2.77             |
| 6   | executeUploadChunk        | 17_920_388   | 7_758_155  | $0.0000103158 | $10.31            |
| 7   | getStoredChunks           | 3_051_526    | 1_810_610  | $0.0000024075 | $2.40             |
| 8   | getStoredChunks           | 3_051_851    | 1_810_740  | $0.0000024077 | $2.40             |
| 9   | executeInstallChunkedCode | 20_709_108   | 8_873_643  | $0.0000117990 | $11.79            |
| 10  | executeUninstallCode      | 4_400_312    | 2_350_124  | $0.0000031249 | $3.12             |
| 11  | executeClearChunkStore    | 3_046_023    | 1_808_409  | $0.0000024046 | $2.40             |
| 12  | getStoredChunks           | 3_048_580    | 1_809_432  | $0.0000024059 | $2.40             |
| 13  | getCanisterStatus         | 3_737_619    | 2_085_047  | $0.0000027724 | $2.77             |
| 14  | executeDepositCycles      | 3_053_530    | 1_811_412  | $0.0000024086 | $2.40             |
| 15  | getCanisterStatus         | 3_741_398    | 2_086_559  | $0.0000027744 | $2.77             |
| 16  | executeUninstallCode      | 4_392_768    | 2_347_107  | $0.0000031209 | $3.12             |
| 17  | getCanisterStatus         | 3_740_482    | 2_086_192  | $0.0000027739 | $2.77             |
| 18  | executeStopCanister       | 3_059_065    | 1_813_626  | $0.0000024115 | $2.41             |
| 19  | getCanisterStatus         | 3_757_444    | 2_092_977  | $0.0000027830 | $2.78             |
| 20  | getCanisterStatus         | 3_753_407    | 2_091_362  | $0.0000027808 | $2.78             |
| 21  | executeStartCanister      | 3_061_476    | 1_814_590  | $0.0000024128 | $2.41             |
| 22  | getCanisterStatus         | 3_749_063    | 2_089_625  | $0.0000027785 | $2.77             |
| 23  | getCanisterStatus         | 3_741_655    | 2_086_662  | $0.0000027746 | $2.77             |
| 24  | getCanisterInfo           | 6_627_303    | 3_240_921  | $0.0000043094 | $4.30             |
| 25  | executeStopCanister       | 3_059_638    | 1_813_855  | $0.0000024118 | $2.41             |
| 26  | executeDeleteCanister     | 3_053_165    | 1_811_266  | $0.0000024084 | $2.40             |
| 27  | getRawRand                | 907_241      | 952_896    | $0.0000012670 | $1.26             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
