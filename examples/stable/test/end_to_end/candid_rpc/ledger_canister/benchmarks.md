# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | getAccountBalance | 5_298_308    | 2_709_323 | $0.0000036025 | $3.60             | <font color="red">+61_169</font> |
| 1   | getTransferFee    | 2_366_875    | 1_536_750 | $0.0000020434 | $2.04             | <font color="red">+49_120</font> |
| 2   | executeTransfer   | 14_170_705   | 6_258_282 | $0.0000083214 | $8.32             | <font color="red">+70_327</font> |
| 3   | executeTransfer   | 14_165_256   | 6_256_102 | $0.0000083186 | $8.31             | <font color="red">+54_041</font> |
| 4   | getBlocks         | 6_136_856    | 3_044_742 | $0.0000040485 | $4.04             | <font color="red">+43_527</font> |
| 5   | getSymbol         | 1_332_026    | 1_122_810 | $0.0000014930 | $1.49             | <font color="red">+44_351</font> |
| 6   | getName           | 1_334_293    | 1_123_717 | $0.0000014942 | $1.49             | <font color="red">+47_631</font> |
| 7   | getDecimals       | 1_331_880    | 1_122_752 | $0.0000014929 | $1.49             | <font color="red">+48_948</font> |
| 8   | getArchives       | 1_328_360    | 1_121_344 | $0.0000014910 | $1.49             | <font color="red">+45_438</font> |
| 9   | executeTransfer   | 14_163_794   | 6_255_517 | $0.0000083178 | $8.31             | <font color="red">+56_976</font> |
| 10  | getAccountBalance | 5_203_598    | 2_671_439 | $0.0000035521 | $3.55             | <font color="red">+44_510</font> |
| 11  | executeTransfer   | 14_138_242   | 6_245_296 | $0.0000083042 | $8.30             | <font color="red">+46_939</font> |
| 12  | executeTransfer   | 14_194_692   | 6_267_876 | $0.0000083342 | $8.33             | <font color="red">+86_553</font> |
| 13  | executeTransfer   | 14_994_530   | 6_587_812 | $0.0000087596 | $8.75             | <font color="red">+54_159</font> |
| 14  | executeTransfer   | 14_992_974   | 6_587_189 | $0.0000087588 | $8.75             | <font color="red">+37_179</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 5_237_139    | 2_684_855 | $0.0000035700 | $3.56             |
| 1   | getTransferFee    | 2_317_755    | 1_517_102 | $0.0000020172 | $2.01             |
| 2   | executeTransfer   | 14_100_378   | 6_230_151 | $0.0000082840 | $8.28             |
| 3   | executeTransfer   | 14_111_215   | 6_234_486 | $0.0000082898 | $8.28             |
| 4   | getBlocks         | 6_093_329    | 3_027_331 | $0.0000040254 | $4.02             |
| 5   | getSymbol         | 1_287_675    | 1_105_070 | $0.0000014694 | $1.46             |
| 6   | getName           | 1_286_662    | 1_104_664 | $0.0000014688 | $1.46             |
| 7   | getDecimals       | 1_282_932    | 1_103_172 | $0.0000014669 | $1.46             |
| 8   | getArchives       | 1_282_922    | 1_103_168 | $0.0000014668 | $1.46             |
| 9   | executeTransfer   | 14_106_818   | 6_232_727 | $0.0000082875 | $8.28             |
| 10  | getAccountBalance | 5_159_088    | 2_653_635 | $0.0000035285 | $3.52             |
| 11  | executeTransfer   | 14_091_303   | 6_226_521 | $0.0000082792 | $8.27             |
| 12  | executeTransfer   | 14_108_139   | 6_233_255 | $0.0000082882 | $8.28             |
| 13  | executeTransfer   | 14_940_371   | 6_566_148 | $0.0000087308 | $8.73             |
| 14  | executeTransfer   | 14_955_795   | 6_572_318 | $0.0000087390 | $8.73             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
