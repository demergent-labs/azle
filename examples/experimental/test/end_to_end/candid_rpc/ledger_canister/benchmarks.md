# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls | Change                                    |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | getAccountBalance | 107_177_918  | 43_461_167 | $0.0000577890 | $57.78            | <font color="green">-7_157_108_447</font> |
| 1   | getTransferFee    | 104_099_048  | 42_229_619 | $0.0000561515 | $56.15            | <font color="green">-3_208_031</font>     |
| 2   | executeTransfer   | 115_233_464  | 46_683_385 | $0.0000620735 | $62.07            | <font color="red">+10_937_380</font>      |
| 3   | executeTransfer   | 115_322_613  | 46_719_045 | $0.0000621209 | $62.12            | <font color="green">-135_466</font>       |
| 4   | getBlocks         | 108_097_247  | 43_828_898 | $0.0000582780 | $58.27            | <font color="green">-7_352_187</font>     |
| 5   | getSymbol         | 102_895_501  | 41_748_200 | $0.0000555113 | $55.51            | <font color="green">-5_407_287</font>     |
| 6   | getName           | 102_639_634  | 41_645_853 | $0.0000553752 | $55.37            | <font color="green">-424_600</font>       |
| 7   | getDecimals       | 102_946_694  | 41_768_677 | $0.0000555386 | $55.53            | <font color="red">+93_619</font>          |
| 8   | getArchives       | 102_997_766  | 41_789_106 | $0.0000555657 | $55.56            | <font color="green">-234_469</font>       |
| 9   | executeTransfer   | 115_374_596  | 46_739_838 | $0.0000621486 | $62.14            | <font color="red">+12_273_520</font>      |
| 10  | getAccountBalance | 107_287_034  | 43_504_813 | $0.0000578470 | $57.84            | <font color="green">-8_292_887</font>     |
| 11  | executeTransfer   | 115_315_654  | 46_716_261 | $0.0000621172 | $62.11            | <font color="red">+7_963_466</font>       |
| 12  | executeTransfer   | 115_337_572  | 46_725_028 | $0.0000621289 | $62.12            | <font color="green">-206_861</font>       |
| 13  | executeTransfer   | 116_098_251  | 47_029_300 | $0.0000625334 | $62.53            | <font color="red">+759_892</font>         |
| 14  | executeTransfer   | 116_115_957  | 47_036_382 | $0.0000625429 | $62.54            | <font color="green">-170_134</font>       |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init              | 7_264_286_365 | 5_706_304_546 | $0.0075875020 | $7_587.50         |
| 1   | getAccountBalance | 107_307_079   | 43_512_831    | $0.0000578577 | $57.85            |
| 2   | getTransferFee    | 104_296_084   | 42_308_433    | $0.0000562563 | $56.25            |
| 3   | executeTransfer   | 115_458_079   | 46_773_231    | $0.0000621930 | $62.19            |
| 4   | executeTransfer   | 115_449_434   | 46_769_773    | $0.0000621884 | $62.18            |
| 5   | getBlocks         | 108_302_788   | 43_911_115    | $0.0000583873 | $58.38            |
| 6   | getSymbol         | 103_064_234   | 41_815_693    | $0.0000556011 | $55.60            |
| 7   | getName           | 102_853_075   | 41_731_230    | $0.0000554888 | $55.48            |
| 8   | getDecimals       | 103_232_235   | 41_882_894    | $0.0000556904 | $55.69            |
| 9   | getArchives       | 103_101_076   | 41_830_430    | $0.0000556207 | $55.62            |
| 10  | executeTransfer   | 115_579_921   | 46_821_968    | $0.0000622578 | $62.25            |
| 11  | getAccountBalance | 107_352_188   | 43_530_875    | $0.0000578817 | $57.88            |
| 12  | executeTransfer   | 115_544_433   | 46_807_773    | $0.0000622389 | $62.23            |
| 13  | executeTransfer   | 115_338_359   | 46_725_343    | $0.0000621293 | $62.12            |
| 14  | executeTransfer   | 116_286_091   | 47_104_436    | $0.0000626334 | $62.63            |
| 15  | executeTransfer   | 116_270_295   | 47_098_118    | $0.0000626250 | $62.62            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
