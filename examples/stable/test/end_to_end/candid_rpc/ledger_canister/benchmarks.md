# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getAccountBalance | 5_247_992    | 2_689_196 | $0.0000035757 | $3.57             | <font color="green">-2_925</font>  |
| 1   | getTransferFee    | 2_319_848    | 1_517_939 | $0.0000020184 | $2.01             | <font color="red">+20_846</font>   |
| 2   | executeTransfer   | 14_107_502   | 6_233_000 | $0.0000082878 | $8.28             | <font color="green">-3_909</font>  |
| 3   | executeTransfer   | 14_130_882   | 6_242_352 | $0.0000083003 | $8.30             | <font color="red">+23_708</font>   |
| 4   | getBlocks         | 6_088_995    | 3_025_598 | $0.0000040230 | $4.02             | <font color="green">-3_564</font>  |
| 5   | getSymbol         | 1_286_836    | 1_104_734 | $0.0000014689 | $1.46             | <font color="red">+413</font>      |
| 6   | getName           | 1_285_532    | 1_104_212 | $0.0000014682 | $1.46             | <font color="green">-412</font>    |
| 7   | getDecimals       | 1_281_322    | 1_102_528 | $0.0000014660 | $1.46             | <font color="green">-286</font>    |
| 8   | getArchives       | 1_284_842    | 1_103_936 | $0.0000014679 | $1.46             | <font color="green">-479</font>    |
| 9   | executeTransfer   | 14_124_810   | 6_239_924 | $0.0000082970 | $8.29             | <font color="red">+26_871</font>   |
| 10  | getAccountBalance | 5_166_968    | 2_656_787 | $0.0000035326 | $3.53             | <font color="green">-4_636</font>  |
| 11  | executeTransfer   | 14_087_250   | 6_224_900 | $0.0000082771 | $8.27             | <font color="green">-3_093</font>  |
| 12  | executeTransfer   | 14_128_400   | 6_241_360 | $0.0000082989 | $8.29             | <font color="red">+5_124</font>    |
| 13  | executeTransfer   | 14_940_283   | 6_566_113 | $0.0000087308 | $8.73             | <font color="red">+18_676</font>   |
| 14  | executeTransfer   | 14_923_894   | 6_559_557 | $0.0000087220 | $8.72             | <font color="green">-28_826</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 5_250_917    | 2_690_366 | $0.0000035773 | $3.57             |
| 1   | getTransferFee    | 2_299_002    | 1_509_600 | $0.0000020073 | $2.00             |
| 2   | executeTransfer   | 14_111_411   | 6_234_564 | $0.0000082899 | $8.28             |
| 3   | executeTransfer   | 14_107_174   | 6_232_869 | $0.0000082877 | $8.28             |
| 4   | getBlocks         | 6_092_559    | 3_027_023 | $0.0000040249 | $4.02             |
| 5   | getSymbol         | 1_286_423    | 1_104_569 | $0.0000014687 | $1.46             |
| 6   | getName           | 1_285_944    | 1_104_377 | $0.0000014685 | $1.46             |
| 7   | getDecimals       | 1_281_608    | 1_102_643 | $0.0000014662 | $1.46             |
| 8   | getArchives       | 1_285_321    | 1_104_128 | $0.0000014681 | $1.46             |
| 9   | executeTransfer   | 14_097_939   | 6_229_175 | $0.0000082827 | $8.28             |
| 10  | getAccountBalance | 5_171_604    | 2_658_641 | $0.0000035351 | $3.53             |
| 11  | executeTransfer   | 14_090_343   | 6_226_137 | $0.0000082787 | $8.27             |
| 12  | executeTransfer   | 14_123_276   | 6_239_310 | $0.0000082962 | $8.29             |
| 13  | executeTransfer   | 14_921_607   | 6_558_642 | $0.0000087208 | $8.72             |
| 14  | executeTransfer   | 14_952_720   | 6_571_088 | $0.0000087374 | $8.73             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
