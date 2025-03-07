# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getAccountBalance | 5_237_139    | 2_684_855 | $0.0000035700 | $3.56             | <font color="green">-10_853</font> |
| 1   | getTransferFee    | 2_317_755    | 1_517_102 | $0.0000020172 | $2.01             | <font color="green">-2_093</font>  |
| 2   | executeTransfer   | 14_100_378   | 6_230_151 | $0.0000082840 | $8.28             | <font color="green">-7_124</font>  |
| 3   | executeTransfer   | 14_111_215   | 6_234_486 | $0.0000082898 | $8.28             | <font color="green">-19_667</font> |
| 4   | getBlocks         | 6_093_329    | 3_027_331 | $0.0000040254 | $4.02             | <font color="red">+4_334</font>    |
| 5   | getSymbol         | 1_287_675    | 1_105_070 | $0.0000014694 | $1.46             | <font color="red">+839</font>      |
| 6   | getName           | 1_286_662    | 1_104_664 | $0.0000014688 | $1.46             | <font color="red">+1_130</font>    |
| 7   | getDecimals       | 1_282_932    | 1_103_172 | $0.0000014669 | $1.46             | <font color="red">+1_610</font>    |
| 8   | getArchives       | 1_282_922    | 1_103_168 | $0.0000014668 | $1.46             | <font color="green">-1_920</font>  |
| 9   | executeTransfer   | 14_106_818   | 6_232_727 | $0.0000082875 | $8.28             | <font color="green">-17_992</font> |
| 10  | getAccountBalance | 5_159_088    | 2_653_635 | $0.0000035285 | $3.52             | <font color="green">-7_880</font>  |
| 11  | executeTransfer   | 14_091_303   | 6_226_521 | $0.0000082792 | $8.27             | <font color="red">+4_053</font>    |
| 12  | executeTransfer   | 14_108_139   | 6_233_255 | $0.0000082882 | $8.28             | <font color="green">-20_261</font> |
| 13  | executeTransfer   | 14_940_371   | 6_566_148 | $0.0000087308 | $8.73             | <font color="red">+88</font>       |
| 14  | executeTransfer   | 14_955_795   | 6_572_318 | $0.0000087390 | $8.73             | <font color="red">+31_901</font>   |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 5_247_992    | 2_689_196 | $0.0000035757 | $3.57             |
| 1   | getTransferFee    | 2_319_848    | 1_517_939 | $0.0000020184 | $2.01             |
| 2   | executeTransfer   | 14_107_502   | 6_233_000 | $0.0000082878 | $8.28             |
| 3   | executeTransfer   | 14_130_882   | 6_242_352 | $0.0000083003 | $8.30             |
| 4   | getBlocks         | 6_088_995    | 3_025_598 | $0.0000040230 | $4.02             |
| 5   | getSymbol         | 1_286_836    | 1_104_734 | $0.0000014689 | $1.46             |
| 6   | getName           | 1_285_532    | 1_104_212 | $0.0000014682 | $1.46             |
| 7   | getDecimals       | 1_281_322    | 1_102_528 | $0.0000014660 | $1.46             |
| 8   | getArchives       | 1_284_842    | 1_103_936 | $0.0000014679 | $1.46             |
| 9   | executeTransfer   | 14_124_810   | 6_239_924 | $0.0000082970 | $8.29             |
| 10  | getAccountBalance | 5_166_968    | 2_656_787 | $0.0000035326 | $3.53             |
| 11  | executeTransfer   | 14_087_250   | 6_224_900 | $0.0000082771 | $8.27             |
| 12  | executeTransfer   | 14_128_400   | 6_241_360 | $0.0000082989 | $8.29             |
| 13  | executeTransfer   | 14_940_283   | 6_566_113 | $0.0000087308 | $8.73             |
| 14  | executeTransfer   | 14_923_894   | 6_559_557 | $0.0000087220 | $8.72             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
