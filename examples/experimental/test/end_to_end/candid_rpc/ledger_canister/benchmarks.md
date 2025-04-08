# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 105_779_431  | 42_901_772 | $0.0000570452 | $57.04            | <font color="green">-31_025</font>  |
| 1   | getTransferFee    | 102_656_777  | 41_652_710 | $0.0000553844 | $55.38            | <font color="red">+7_218</font>     |
| 2   | executeTransfer   | 114_018_281  | 46_197_312 | $0.0000614272 | $61.42            | <font color="red">+55_042</font>    |
| 3   | executeTransfer   | 113_866_675  | 46_136_670 | $0.0000613465 | $61.34            | <font color="green">-41_383</font>  |
| 4   | getBlocks         | 106_776_045  | 43_300_418 | $0.0000575753 | $57.57            | <font color="green">-117_950</font> |
| 5   | getSymbol         | 101_676_352  | 41_260_540 | $0.0000548629 | $54.86            | <font color="red">+40_564</font>    |
| 6   | getName           | 101_397_047  | 41_148_818 | $0.0000547143 | $54.71            | <font color="green">-57_471</font>  |
| 7   | getDecimals       | 101_792_210  | 41_306_884 | $0.0000549245 | $54.92            | <font color="red">+126_471</font>   |
| 8   | getArchives       | 101_793_257  | 41_307_302 | $0.0000549251 | $54.92            | <font color="red">+88_866</font>    |
| 9   | executeTransfer   | 113_915_566  | 46_156_226 | $0.0000613725 | $61.37            | <font color="green">-118_332</font> |
| 10  | getAccountBalance | 105_854_704  | 42_931_881 | $0.0000570852 | $57.08            | <font color="green">-102_957</font> |
| 11  | executeTransfer   | 114_166_406  | 46_256_562 | $0.0000615060 | $61.50            | <font color="red">+184_876</font>   |
| 12  | executeTransfer   | 113_979_212  | 46_181_684 | $0.0000614064 | $61.40            | <font color="green">-44_492</font>  |
| 13  | executeTransfer   | 114_822_102  | 46_518_840 | $0.0000618547 | $61.85            | <font color="red">+48_847</font>    |
| 14  | executeTransfer   | 114_622_158  | 46_438_863 | $0.0000617484 | $61.74            | <font color="green">-201_961</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getAccountBalance | 105_810_456  | 42_914_182 | $0.0000570617 | $57.06            |
| 1   | getTransferFee    | 102_649_559  | 41_649_823 | $0.0000553805 | $55.38            |
| 2   | executeTransfer   | 113_963_239  | 46_175_295 | $0.0000613979 | $61.39            |
| 3   | executeTransfer   | 113_908_058  | 46_153_223 | $0.0000613686 | $61.36            |
| 4   | getBlocks         | 106_893_995  | 43_347_598 | $0.0000576380 | $57.63            |
| 5   | getSymbol         | 101_635_788  | 41_244_315 | $0.0000548413 | $54.84            |
| 6   | getName           | 101_454_518  | 41_171_807 | $0.0000547449 | $54.74            |
| 7   | getDecimals       | 101_665_739  | 41_256_295 | $0.0000548573 | $54.85            |
| 8   | getArchives       | 101_704_391  | 41_271_756 | $0.0000548778 | $54.87            |
| 9   | executeTransfer   | 114_033_898  | 46_203_559 | $0.0000614355 | $61.43            |
| 10  | getAccountBalance | 105_957_661  | 42_973_064 | $0.0000571400 | $57.13            |
| 11  | executeTransfer   | 113_981_530  | 46_182_612 | $0.0000614076 | $61.40            |
| 12  | executeTransfer   | 114_023_704  | 46_199_481 | $0.0000614301 | $61.43            |
| 13  | executeTransfer   | 114_773_255  | 46_499_302 | $0.0000618287 | $61.82            |
| 14  | executeTransfer   | 114_824_119  | 46_519_647 | $0.0000618558 | $61.85            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
