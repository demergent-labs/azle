# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getAccountBalance | 5_250_917    | 2_690_366 | $0.0000035773 | $3.57             | <font color="green">-3_756</font>  |
| 1   | getTransferFee    | 2_299_002    | 1_509_600 | $0.0000020073 | $2.00             | <font color="green">-15_333</font> |
| 2   | executeTransfer   | 14_111_411   | 6_234_564 | $0.0000082899 | $8.28             | <font color="green">-79_975</font> |
| 3   | executeTransfer   | 14_107_174   | 6_232_869 | $0.0000082877 | $8.28             | <font color="green">-91_424</font> |
| 4   | getBlocks         | 6_092_559    | 3_027_023 | $0.0000040249 | $4.02             | <font color="green">-31_274</font> |
| 5   | getSymbol         | 1_286_423    | 1_104_569 | $0.0000014687 | $1.46             | <font color="green">-6_607</font>  |
| 6   | getName           | 1_285_944    | 1_104_377 | $0.0000014685 | $1.46             | <font color="green">-7_559</font>  |
| 7   | getDecimals       | 1_281_608    | 1_102_643 | $0.0000014662 | $1.46             | <font color="green">-9_618</font>  |
| 8   | getArchives       | 1_285_321    | 1_104_128 | $0.0000014681 | $1.46             | <font color="green">-3_798</font>  |
| 9   | executeTransfer   | 14_097_939   | 6_229_175 | $0.0000082827 | $8.28             | <font color="green">-73_193</font> |
| 10  | getAccountBalance | 5_171_604    | 2_658_641 | $0.0000035351 | $3.53             | <font color="green">-10_573</font> |
| 11  | executeTransfer   | 14_090_343   | 6_226_137 | $0.0000082787 | $8.27             | <font color="green">-64_603</font> |
| 12  | executeTransfer   | 14_123_276   | 6_239_310 | $0.0000082962 | $8.29             | <font color="green">-59_510</font> |
| 13  | executeTransfer   | 14_921_607   | 6_558_642 | $0.0000087208 | $8.72             | <font color="green">-88_897</font> |
| 14  | executeTransfer   | 14_952_720   | 6_571_088 | $0.0000087374 | $8.73             | <font color="green">-73_479</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 5_254_673    | 2_691_869 | $0.0000035793 | $3.57             |
| 1   | getTransferFee    | 2_314_335    | 1_515_734 | $0.0000020154 | $2.01             |
| 2   | executeTransfer   | 14_191_386   | 6_266_554 | $0.0000083324 | $8.33             |
| 3   | executeTransfer   | 14_198_598   | 6_269_439 | $0.0000083363 | $8.33             |
| 4   | getBlocks         | 6_123_833    | 3_039_533 | $0.0000040416 | $4.04             |
| 5   | getSymbol         | 1_293_030    | 1_107_212 | $0.0000014722 | $1.47             |
| 6   | getName           | 1_293_503    | 1_107_401 | $0.0000014725 | $1.47             |
| 7   | getDecimals       | 1_291_226    | 1_106_490 | $0.0000014713 | $1.47             |
| 8   | getArchives       | 1_289_119    | 1_105_647 | $0.0000014701 | $1.47             |
| 9   | executeTransfer   | 14_171_132   | 6_258_452 | $0.0000083217 | $8.32             |
| 10  | getAccountBalance | 5_182_177    | 2_662_870 | $0.0000035407 | $3.54             |
| 11  | executeTransfer   | 14_154_946   | 6_251_978 | $0.0000083131 | $8.31             |
| 12  | executeTransfer   | 14_182_786   | 6_263_114 | $0.0000083279 | $8.32             |
| 13  | executeTransfer   | 15_010_504   | 6_594_201 | $0.0000087681 | $8.76             |
| 14  | executeTransfer   | 15_026_199   | 6_600_479 | $0.0000087765 | $8.77             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
