# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls | Change                                |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------- |
| 0   | getAccountBalance | 105_882_841  | 42_943_136 | $0.0000571002 | $57.10            | <font color="green">-1_295_077</font> |
| 1   | getTransferFee    | 102_701_209  | 41_670_483 | $0.0000554080 | $55.40            | <font color="green">-1_397_839</font> |
| 2   | executeTransfer   | 113_960_823  | 46_174_329 | $0.0000613966 | $61.39            | <font color="green">-1_272_641</font> |
| 3   | executeTransfer   | 113_947_460  | 46_168_984 | $0.0000613895 | $61.38            | <font color="green">-1_375_153</font> |
| 4   | getBlocks         | 106_960_910  | 43_374_364 | $0.0000576736 | $57.67            | <font color="green">-1_136_337</font> |
| 5   | getSymbol         | 101_555_069  | 41_212_027 | $0.0000547984 | $54.79            | <font color="green">-1_340_432</font> |
| 6   | getName           | 101_415_214  | 41_156_085 | $0.0000547240 | $54.72            | <font color="green">-1_224_420</font> |
| 7   | getDecimals       | 101_785_622  | 41_304_248 | $0.0000549210 | $54.92            | <font color="green">-1_161_072</font> |
| 8   | getArchives       | 101_729_319  | 41_281_727 | $0.0000548911 | $54.89            | <font color="green">-1_268_447</font> |
| 9   | executeTransfer   | 113_964_968  | 46_175_987 | $0.0000613988 | $61.39            | <font color="green">-1_409_628</font> |
| 10  | getAccountBalance | 105_809_659  | 42_913_863 | $0.0000570613 | $57.06            | <font color="green">-1_477_375</font> |
| 11  | executeTransfer   | 113_952_263  | 46_170_905 | $0.0000613921 | $61.39            | <font color="green">-1_363_391</font> |
| 12  | executeTransfer   | 114_034_560  | 46_203_824 | $0.0000614358 | $61.43            | <font color="green">-1_303_012</font> |
| 13  | executeTransfer   | 114_898_233  | 46_549_293 | $0.0000618952 | $61.89            | <font color="green">-1_200_018</font> |
| 14  | executeTransfer   | 114_881_410  | 46_542_564 | $0.0000618863 | $61.88            | <font color="green">-1_234_547</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getAccountBalance | 107_177_918  | 43_461_167 | $0.0000577890 | $57.78            |
| 1   | getTransferFee    | 104_099_048  | 42_229_619 | $0.0000561515 | $56.15            |
| 2   | executeTransfer   | 115_233_464  | 46_683_385 | $0.0000620735 | $62.07            |
| 3   | executeTransfer   | 115_322_613  | 46_719_045 | $0.0000621209 | $62.12            |
| 4   | getBlocks         | 108_097_247  | 43_828_898 | $0.0000582780 | $58.27            |
| 5   | getSymbol         | 102_895_501  | 41_748_200 | $0.0000555113 | $55.51            |
| 6   | getName           | 102_639_634  | 41_645_853 | $0.0000553752 | $55.37            |
| 7   | getDecimals       | 102_946_694  | 41_768_677 | $0.0000555386 | $55.53            |
| 8   | getArchives       | 102_997_766  | 41_789_106 | $0.0000555657 | $55.56            |
| 9   | executeTransfer   | 115_374_596  | 46_739_838 | $0.0000621486 | $62.14            |
| 10  | getAccountBalance | 107_287_034  | 43_504_813 | $0.0000578470 | $57.84            |
| 11  | executeTransfer   | 115_315_654  | 46_716_261 | $0.0000621172 | $62.11            |
| 12  | executeTransfer   | 115_337_572  | 46_725_028 | $0.0000621289 | $62.12            |
| 13  | executeTransfer   | 116_098_251  | 47_029_300 | $0.0000625334 | $62.53            |
| 14  | executeTransfer   | 116_115_957  | 47_036_382 | $0.0000625429 | $62.54            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
