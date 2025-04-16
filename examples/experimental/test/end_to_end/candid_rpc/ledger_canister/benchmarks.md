# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls | Change                                |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------- |
| 0   | getAccountBalance | 105_746_130  | 42_888_452 | $0.0000570275 | $57.02            | <font color="red">+100_515_739</font> |
| 1   | getTransferFee    | 102_767_086  | 41_696_834 | $0.0000554430 | $55.44            | <font color="red">+100_412_006</font> |
| 2   | executeTransfer   | 113_967_289  | 46_176_915 | $0.0000614001 | $61.40            | <font color="red">+100_031_727</font> |
| 3   | executeTransfer   | 113_970_622  | 46_178_248 | $0.0000614018 | $61.40            | <font color="red">+100_036_066</font> |
| 4   | getBlocks         | 106_798_784  | 43_309_513 | $0.0000575874 | $57.58            | <font color="red">+100_298_246</font> |
| 5   | getSymbol         | 101_747_277  | 41_288_910 | $0.0000549006 | $54.90            | <font color="red">+100_406_068</font> |
| 6   | getName           | 101_422_702  | 41_159_080 | $0.0000547280 | $54.72            | <font color="red">+100_075_757</font> |
| 7   | getDecimals       | 101_710_062  | 41_274_024 | $0.0000548808 | $54.88            | <font color="red">+100_365_754</font> |
| 8   | getArchives       | 101_775_982  | 41_300_392 | $0.0000549159 | $54.91            | <font color="red">+100_432_100</font> |
| 9   | executeTransfer   | 113_965_088  | 46_176_035 | $0.0000613989 | $61.39            | <font color="red">+100_039_909</font> |
| 10  | getAccountBalance | 105_858_840  | 42_933_536 | $0.0000570874 | $57.08            | <font color="red">+100_678_223</font> |
| 11  | executeTransfer   | 113_981_434  | 46_182_573 | $0.0000614076 | $61.40            | <font color="red">+100_057_010</font> |
| 12  | executeTransfer   | 114_040_339  | 46_206_135 | $0.0000614389 | $61.43            | <font color="red">+100_112_740</font> |
| 13  | executeTransfer   | 114_801_425  | 46_510_570 | $0.0000618437 | $61.84            | <font color="red">+100_082_717</font> |
| 14  | executeTransfer   | 114_745_820  | 46_488_328 | $0.0000618141 | $61.81            | <font color="red">+100_006_353</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 5_230_391    | 2_682_156 | $0.0000035664 | $3.56             |
| 1   | getTransferFee    | 2_355_080    | 1_532_032 | $0.0000020371 | $2.03             |
| 2   | executeTransfer   | 13_935_562   | 6_164_224 | $0.0000081964 | $8.19             |
| 3   | executeTransfer   | 13_934_556   | 6_163_822 | $0.0000081958 | $8.19             |
| 4   | getBlocks         | 6_500_538    | 3_190_215 | $0.0000042419 | $4.24             |
| 5   | getSymbol         | 1_341_209    | 1_126_483 | $0.0000014979 | $1.49             |
| 6   | getName           | 1_346_945    | 1_128_778 | $0.0000015009 | $1.50             |
| 7   | getDecimals       | 1_344_308    | 1_127_723 | $0.0000014995 | $1.49             |
| 8   | getArchives       | 1_343_882    | 1_127_552 | $0.0000014993 | $1.49             |
| 9   | executeTransfer   | 13_925_179   | 6_160_071 | $0.0000081909 | $8.19             |
| 10  | getAccountBalance | 5_180_617    | 2_662_246 | $0.0000035399 | $3.53             |
| 11  | executeTransfer   | 13_924_424   | 6_159_769 | $0.0000081905 | $8.19             |
| 12  | executeTransfer   | 13_927_599   | 6_161_039 | $0.0000081921 | $8.19             |
| 13  | executeTransfer   | 14_718_708   | 6_477_483 | $0.0000086129 | $8.61             |
| 14  | executeTransfer   | 14_739_467   | 6_485_786 | $0.0000086240 | $8.62             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
