# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getAccountBalance | 5_246_098    | 2_688_439 | $0.0000035747 | $3.57             | <font color="green">-4_819</font>  |
| 1   | getTransferFee    | 2_318_837    | 1_517_534 | $0.0000020178 | $2.01             | <font color="red">+19_835</font>   |
| 2   | executeTransfer   | 14_100_806   | 6_230_322 | $0.0000082843 | $8.28             | <font color="green">-10_605</font> |
| 3   | executeTransfer   | 14_124_214   | 6_239_685 | $0.0000082967 | $8.29             | <font color="red">+17_040</font>   |
| 4   | getBlocks         | 6_086_287    | 3_024_514 | $0.0000040216 | $4.02             | <font color="green">-6_272</font>  |
| 5   | getSymbol         | 1_286_671    | 1_104_668 | $0.0000014688 | $1.46             | <font color="red">+248</font>      |
| 6   | getName           | 1_285_364    | 1_104_145 | $0.0000014681 | $1.46             | <font color="green">-580</font>    |
| 7   | getDecimals       | 1_281_175    | 1_102_470 | $0.0000014659 | $1.46             | <font color="green">-433</font>    |
| 8   | getArchives       | 1_284_625    | 1_103_850 | $0.0000014678 | $1.46             | <font color="green">-696</font>    |
| 9   | executeTransfer   | 14_118_185   | 6_237_274 | $0.0000082935 | $8.29             | <font color="red">+20_246</font>   |
| 10  | getAccountBalance | 5_165_192    | 2_656_076 | $0.0000035317 | $3.53             | <font color="green">-6_412</font>  |
| 11  | executeTransfer   | 14_080_604   | 6_222_241 | $0.0000082735 | $8.27             | <font color="green">-9_739</font>  |
| 12  | executeTransfer   | 14_121_663   | 6_238_665 | $0.0000082954 | $8.29             | <font color="green">-1_613</font>  |
| 13  | executeTransfer   | 14_933_286   | 6_563_314 | $0.0000087270 | $8.72             | <font color="red">+11_679</font>   |
| 14  | executeTransfer   | 14_917_045   | 6_556_818 | $0.0000087184 | $8.71             | <font color="green">-35_675</font> |

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
