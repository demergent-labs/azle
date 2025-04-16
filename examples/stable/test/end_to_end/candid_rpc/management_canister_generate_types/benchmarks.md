# Benchmarks for management_canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | executeCreateCanister     | 15_988_702   | 6_985_480  | $0.0000092884 | $9.28             | <font color="green">-13_868</font> |
| 1   | executeUpdateSettings     | 17_281_679   | 7_502_671  | $0.0000099761 | $9.97             | <font color="green">-1_916</font>  |
| 2   | getCanisterStatus         | 3_798_384    | 2_109_353  | $0.0000028047 | $2.80             | <font color="red">+5_201</font>    |
| 3   | executeInstallCode        | 29_183_154   | 12_263_261 | $0.0000163061 | $16.30            | <font color="red">+7_661</font>    |
| 4   | executeUninstallCode      | 4_454_876    | 2_371_950  | $0.0000031539 | $3.15             | <font color="green">-263</font>    |
| 5   | getCanisterStatus         | 3_796_221    | 2_108_488  | $0.0000028036 | $2.80             | <font color="red">+8_184</font>    |
| 6   | executeUploadChunk        | 17_974_902   | 7_779_960  | $0.0000103448 | $10.34            | <font color="red">+9_743</font>    |
| 7   | getStoredChunks           | 3_097_888    | 1_829_155  | $0.0000024322 | $2.43             | <font color="green">-2_381</font>  |
| 8   | getStoredChunks           | 3_099_087    | 1_829_634  | $0.0000024328 | $2.43             | <font color="green">-4_414</font>  |
| 9   | executeInstallChunkedCode | 20_762_736   | 8_895_094  | $0.0000118275 | $11.82            | <font color="red">+7_592</font>    |
| 10  | executeUninstallCode      | 4_445_049    | 2_368_019  | $0.0000031487 | $3.14             | <font color="green">-8_018</font>  |
| 11  | executeClearChunkStore    | 3_098_289    | 1_829_315  | $0.0000024324 | $2.43             | <font color="green">-3_049</font>  |
| 12  | getStoredChunks           | 3_098_554    | 1_829_421  | $0.0000024325 | $2.43             | <font color="green">-377</font>    |
| 13  | getCanisterStatus         | 3_792_254    | 2_106_901  | $0.0000028015 | $2.80             | <font color="red">+1_365</font>    |
| 14  | executeDepositCycles      | 3_105_399    | 1_832_159  | $0.0000024362 | $2.43             | <font color="green">-717</font>    |
| 15  | getCanisterStatus         | 3_794_656    | 2_107_862  | $0.0000028028 | $2.80             | <font color="red">+9_435</font>    |
| 16  | executeUninstallCode      | 4_447_205    | 2_368_882  | $0.0000031498 | $3.14             | <font color="green">-1_468</font>  |
| 17  | getCanisterStatus         | 3_789_846    | 2_105_938  | $0.0000028002 | $2.80             | <font color="green">-2_296</font>  |
| 18  | executeStopCanister       | 3_098_007    | 1_829_202  | $0.0000024322 | $2.43             | <font color="green">-2_913</font>  |
| 19  | getCanisterStatus         | 3_795_349    | 2_108_139  | $0.0000028031 | $2.80             | <font color="red">+1_462</font>    |
| 20  | getCanisterStatus         | 3_796_235    | 2_108_494  | $0.0000028036 | $2.80             | <font color="red">+1_608</font>    |
| 21  | executeStartCanister      | 3_095_057    | 1_828_022  | $0.0000024307 | $2.43             | <font color="green">-1_756</font>  |
| 22  | getCanisterStatus         | 3_795_025    | 2_108_010  | $0.0000028030 | $2.80             | <font color="red">+1_418</font>    |
| 23  | getCanisterStatus         | 3_799_466    | 2_109_786  | $0.0000028053 | $2.80             | <font color="red">+13_142</font>   |
| 24  | getCanisterInfo           | 6_686_230    | 3_264_492  | $0.0000043407 | $4.34             | <font color="red">+10_561</font>   |
| 25  | executeStopCanister       | 3_096_127    | 1_828_450  | $0.0000024312 | $2.43             | <font color="red">+6_890</font>    |
| 26  | executeDeleteCanister     | 3_097_982    | 1_829_192  | $0.0000024322 | $2.43             | <font color="red">+5_231</font>    |
| 27  | getRawRand                | 958_816      | 973_526    | $0.0000012945 | $1.29             | <font color="red">+1_089</font>    |

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
