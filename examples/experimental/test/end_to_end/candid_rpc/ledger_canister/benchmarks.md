# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 105_810_456  | 42_914_182 | $0.0000570617 | $57.06            | <font color="green">-164_302</font> |
| 1   | getTransferFee    | 102_649_559  | 41_649_823 | $0.0000553805 | $55.38            | <font color="green">-251_090</font> |
| 2   | executeTransfer   | 113_963_239  | 46_175_295 | $0.0000613979 | $61.39            | <font color="green">-796</font>     |
| 3   | executeTransfer   | 113_908_058  | 46_153_223 | $0.0000613686 | $61.36            | <font color="green">-56_884</font>  |
| 4   | getBlocks         | 106_893_995  | 43_347_598 | $0.0000576380 | $57.63            | <font color="red">+33_341</font>    |
| 5   | getSymbol         | 101_635_788  | 41_244_315 | $0.0000548413 | $54.84            | <font color="green">-89_821</font>  |
| 6   | getName           | 101_454_518  | 41_171_807 | $0.0000547449 | $54.74            | <font color="red">+84_904</font>    |
| 7   | getDecimals       | 101_665_739  | 41_256_295 | $0.0000548573 | $54.85            | <font color="green">-118_068</font> |
| 8   | getArchives       | 101_704_391  | 41_271_756 | $0.0000548778 | $54.87            | <font color="green">-77_003</font>  |
| 9   | executeTransfer   | 114_033_898  | 46_203_559 | $0.0000614355 | $61.43            | <font color="red">+17_490</font>    |
| 10  | getAccountBalance | 105_957_661  | 42_973_064 | $0.0000571400 | $57.13            | <font color="red">+22_308</font>    |
| 11  | executeTransfer   | 113_981_530  | 46_182_612 | $0.0000614076 | $61.40            | <font color="green">-21_908</font>  |
| 12  | executeTransfer   | 114_023_704  | 46_199_481 | $0.0000614301 | $61.43            | <font color="red">+26_206</font>    |
| 13  | executeTransfer   | 114_773_255  | 46_499_302 | $0.0000618287 | $61.82            | <font color="green">-141_152</font> |
| 14  | executeTransfer   | 114_824_119  | 46_519_647 | $0.0000618558 | $61.85            | <font color="red">+56_820</font>    |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getAccountBalance | 105_974_758  | 42_979_903 | $0.0000571491 | $57.14            |
| 1   | getTransferFee    | 102_900_649  | 41_750_259 | $0.0000555141 | $55.51            |
| 2   | executeTransfer   | 113_964_035  | 46_175_614 | $0.0000613983 | $61.39            |
| 3   | executeTransfer   | 113_964_942  | 46_175_976 | $0.0000613988 | $61.39            |
| 4   | getBlocks         | 106_860_654  | 43_334_261 | $0.0000576203 | $57.62            |
| 5   | getSymbol         | 101_725_609  | 41_280_243 | $0.0000548891 | $54.88            |
| 6   | getName           | 101_369_614  | 41_137_845 | $0.0000546998 | $54.69            |
| 7   | getDecimals       | 101_783_807  | 41_303_522 | $0.0000549201 | $54.92            |
| 8   | getArchives       | 101_781_394  | 41_302_557 | $0.0000549188 | $54.91            |
| 9   | executeTransfer   | 114_016_408  | 46_196_563 | $0.0000614262 | $61.42            |
| 10  | getAccountBalance | 105_935_353  | 42_964_141 | $0.0000571281 | $57.12            |
| 11  | executeTransfer   | 114_003_438  | 46_191_375 | $0.0000614193 | $61.41            |
| 12  | executeTransfer   | 113_997_498  | 46_188_999 | $0.0000614161 | $61.41            |
| 13  | executeTransfer   | 114_914_407  | 46_555_762 | $0.0000619038 | $61.90            |
| 14  | executeTransfer   | 114_767_299  | 46_496_919 | $0.0000618256 | $61.82            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
