# Benchmarks for management_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | executeCreateCanister     | 15_978_835   | 6_981_534  | $0.0000092831 | $9.28             | <font color="red">+58_789</font> |
| 1   | executeUpdateSettings     | 17_253_214   | 7_491_285  | $0.0000099609 | $9.96             | <font color="red">+19_488</font> |
| 2   | getCanisterStatus         | 3_796_055    | 2_108_422  | $0.0000028035 | $2.80             | <font color="red">+52_974</font> |
| 3   | executeInstallCode        | 29_164_440   | 12_255_776 | $0.0000162961 | $16.29            | <font color="red">+35_699</font> |
| 4   | executeUninstallCode      | 4_451_127    | 2_370_450  | $0.0000031519 | $3.15             | <font color="red">+54_533</font> |
| 5   | getCanisterStatus         | 3_789_525    | 2_105_810  | $0.0000028000 | $2.80             | <font color="red">+49_934</font> |
| 6   | executeUploadChunk        | 17_973_419   | 7_779_367  | $0.0000103440 | $10.34            | <font color="red">+52_923</font> |
| 7   | getStoredChunks           | 3_093_405    | 1_827_362  | $0.0000024298 | $2.42             | <font color="red">+41_767</font> |
| 8   | getStoredChunks           | 3_099_751    | 1_829_900  | $0.0000024332 | $2.43             | <font color="red">+47_746</font> |
| 9   | executeInstallChunkedCode | 20_748_522   | 8_889_408  | $0.0000118200 | $11.81            | <font color="red">+38_565</font> |
| 10  | executeUninstallCode      | 4_453_254    | 2_371_301  | $0.0000031530 | $3.15             | <font color="red">+52_811</font> |
| 11  | executeClearChunkStore    | 3_098_426    | 1_829_370  | $0.0000024325 | $2.43             | <font color="red">+52_340</font> |
| 12  | getStoredChunks           | 3_104_989    | 1_831_995  | $0.0000024359 | $2.43             | <font color="red">+56_290</font> |
| 13  | getCanisterStatus         | 3_794_548    | 2_107_819  | $0.0000028027 | $2.80             | <font color="red">+56_831</font> |
| 14  | executeDepositCycles      | 3_105_234    | 1_832_093  | $0.0000024361 | $2.43             | <font color="red">+51_641</font> |
| 15  | getCanisterStatus         | 3_795_526    | 2_108_210  | $0.0000028032 | $2.80             | <font color="red">+53_981</font> |
| 16  | executeUninstallCode      | 4_451_358    | 2_370_543  | $0.0000031520 | $3.15             | <font color="red">+58_501</font> |
| 17  | getCanisterStatus         | 3_793_036    | 2_107_214  | $0.0000028019 | $2.80             | <font color="red">+52_393</font> |
| 18  | executeStopCanister       | 3_095_629    | 1_828_251  | $0.0000024310 | $2.43             | <font color="red">+36_417</font> |
| 19  | getCanisterStatus         | 3_789_889    | 2_105_955  | $0.0000028002 | $2.80             | <font color="red">+32_347</font> |
| 20  | getCanisterStatus         | 3_792_249    | 2_106_899  | $0.0000028015 | $2.80             | <font color="red">+38_744</font> |
| 21  | executeStartCanister      | 3_102_432    | 1_830_972  | $0.0000024346 | $2.43             | <font color="red">+40_886</font> |
| 22  | getCanisterStatus         | 3_801_103    | 2_110_441  | $0.0000028062 | $2.80             | <font color="red">+52_005</font> |
| 23  | getCanisterStatus         | 3_796_701    | 2_108_680  | $0.0000028038 | $2.80             | <font color="red">+54_906</font> |
| 24  | getCanisterInfo           | 6_678_210    | 3_261_284  | $0.0000043364 | $4.33             | <font color="red">+50_683</font> |
| 25  | executeStopCanister       | 3_090_140    | 1_826_056  | $0.0000024281 | $2.42             | <font color="red">+46_083</font> |
| 26  | executeDeleteCanister     | 3_094_077    | 1_827_630  | $0.0000024301 | $2.43             | <font color="red">+48_824</font> |
| 27  | getRawRand                | 957_282      | 972_912    | $0.0000012937 | $1.29             | <font color="red">+51_920</font> |

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
