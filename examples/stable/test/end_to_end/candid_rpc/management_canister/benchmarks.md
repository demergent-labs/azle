# Benchmarks for management_canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | executeCreateCanister     | 15_993_626   | 6_987_450  | $0.0000092910 | $9.29             | <font color="green">-7_336</font>  |
| 1   | executeUpdateSettings     | 17_275_572   | 7_500_228  | $0.0000099728 | $9.97             | <font color="green">-7_613</font>  |
| 2   | getCanisterStatus         | 3_793_601    | 2_107_440  | $0.0000028022 | $2.80             | <font color="green">-306</font>    |
| 3   | executeInstallCode        | 29_172_482   | 12_258_992 | $0.0000163004 | $16.30            | <font color="green">-3_008</font>  |
| 4   | executeUninstallCode      | 4_446_196    | 2_368_478  | $0.0000031493 | $3.14             | <font color="green">-9_318</font>  |
| 5   | getCanisterStatus         | 3_795_266    | 2_108_106  | $0.0000028031 | $2.80             | <font color="red">+6_542</font>    |
| 6   | executeUploadChunk        | 17_969_252   | 7_777_700  | $0.0000103418 | $10.34            | <font color="red">+3_839</font>    |
| 7   | getStoredChunks           | 3_101_239    | 1_830_495  | $0.0000024340 | $2.43             | <font color="red">+476</font>      |
| 8   | getStoredChunks           | 3_093_968    | 1_827_587  | $0.0000024301 | $2.43             | <font color="green">-9_943</font>  |
| 9   | executeInstallChunkedCode | 20_730_280   | 8_882_112  | $0.0000118103 | $11.81            | <font color="green">-24_939</font> |
| 10  | executeUninstallCode      | 4_441_246    | 2_366_498  | $0.0000031467 | $3.14             | <font color="green">-12_175</font> |
| 11  | executeClearChunkStore    | 3_095_971    | 1_828_388  | $0.0000024312 | $2.43             | <font color="green">-5_854</font>  |
| 12  | getStoredChunks           | 3_097_023    | 1_828_809  | $0.0000024317 | $2.43             | <font color="green">-2_374</font>  |
| 13  | getCanisterStatus         | 3_790_037    | 2_106_014  | $0.0000028003 | $2.80             | <font color="green">-1_567</font>  |
| 14  | executeDepositCycles      | 3_099_268    | 1_829_707  | $0.0000024329 | $2.43             | <font color="green">-7_201</font>  |
| 15  | getCanisterStatus         | 3_790_958    | 2_106_383  | $0.0000028008 | $2.80             | <font color="red">+5_036</font>    |
| 16  | executeUninstallCode      | 4_449_164    | 2_369_665  | $0.0000031509 | $3.15             | <font color="red">+123</font>      |
| 17  | getCanisterStatus         | 3_789_150    | 2_105_660  | $0.0000027998 | $2.79             | <font color="green">-3_686</font>  |
| 18  | executeStopCanister       | 3_094_288    | 1_827_715  | $0.0000024303 | $2.43             | <font color="green">-7_083</font>  |
| 19  | getCanisterStatus         | 3_787_671    | 2_105_068  | $0.0000027990 | $2.79             | <font color="green">-6_882</font>  |
| 20  | getCanisterStatus         | 3_793_799    | 2_107_519  | $0.0000028023 | $2.80             | <font color="green">-1_537</font>  |
| 21  | executeStartCanister      | 3_094_382    | 1_827_752  | $0.0000024303 | $2.43             | <font color="green">-2_882</font>  |
| 22  | getCanisterStatus         | 3_793_036    | 2_107_214  | $0.0000028019 | $2.80             | <font color="green">-1_294</font>  |
| 23  | getCanisterStatus         | 3_788_031    | 2_105_212  | $0.0000027992 | $2.79             | <font color="red">+971</font>      |
| 24  | getCanisterInfo           | 6_693_730    | 3_267_492  | $0.0000043447 | $4.34             | <font color="red">+17_223</font>   |
| 25  | executeStopCanister       | 3_090_932    | 1_826_372  | $0.0000024285 | $2.42             | <font color="red">+1_202</font>    |
| 26  | executeDeleteCanister     | 3_093_951    | 1_827_580  | $0.0000024301 | $2.43             | <font color="red">+783</font>      |
| 27  | getRawRand                | 958_390      | 973_356    | $0.0000012942 | $1.29             | <font color="red">+90</font>       |

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
