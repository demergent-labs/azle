⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | getAccountBalance | 5_301_465    | 2_710_586 | $0.0000036042 | $3.60             | <font color="red">+64_326</font> |
| 1   | getTransferFee    | 2_368_375    | 1_537_350 | $0.0000020442 | $2.04             | <font color="red">+50_620</font> |
| 2   | executeTransfer   | 14_192_971   | 6_267_188 | $0.0000083333 | $8.33             | <font color="red">+92_593</font> |
| 3   | executeTransfer   | 14_207_523   | 6_273_009 | $0.0000083410 | $8.34             | <font color="red">+96_308</font> |
| 4   | getBlocks         | 6_146_891    | 3_048_756 | $0.0000040538 | $4.05             | <font color="red">+53_562</font> |
| 5   | getSymbol         | 1_338_518    | 1_125_407 | $0.0000014964 | $1.49             | <font color="red">+50_843</font> |
| 6   | getName           | 1_335_984    | 1_124_393 | $0.0000014951 | $1.49             | <font color="red">+49_322</font> |
| 7   | getDecimals       | 1_329_616    | 1_121_846 | $0.0000014917 | $1.49             | <font color="red">+46_684</font> |
| 8   | getArchives       | 1_333_328    | 1_123_331 | $0.0000014937 | $1.49             | <font color="red">+50_406</font> |
| 9   | executeTransfer   | 14_198_537   | 6_269_414 | $0.0000083363 | $8.33             | <font color="red">+91_719</font> |
| 10  | getAccountBalance | 5_221_558    | 2_678_623 | $0.0000035617 | $3.56             | <font color="red">+62_470</font> |
| 11  | executeTransfer   | 14_133_647   | 6_243_458 | $0.0000083017 | $8.30             | <font color="red">+42_344</font> |
| 12  | executeTransfer   | 14_173_701   | 6_259_480 | $0.0000083230 | $8.32             | <font color="red">+65_562</font> |
| 13  | executeTransfer   | 15_009_774   | 6_593_909 | $0.0000087677 | $8.76             | <font color="red">+69_403</font> |
| 14  | executeTransfer   | 15_030_253   | 6_602_101 | $0.0000087786 | $8.77             | <font color="red">+74_458</font> |

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
