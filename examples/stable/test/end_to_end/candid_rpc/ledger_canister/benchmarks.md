⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 5_228_272    | 2_681_308 | $0.0000035653 | $3.56             | <font color="green">-73_193</font>  |
| 1   | getTransferFee    | 2_292_667    | 1_507_066 | $0.0000020039 | $2.00             | <font color="green">-75_708</font>  |
| 2   | executeTransfer   | 14_100_983   | 6_230_393 | $0.0000082844 | $8.28             | <font color="green">-91_988</font>  |
| 3   | executeTransfer   | 14_128_031   | 6_241_212 | $0.0000082988 | $8.29             | <font color="green">-79_492</font>  |
| 4   | getBlocks         | 6_070_006    | 3_018_002 | $0.0000040129 | $4.01             | <font color="green">-76_885</font>  |
| 5   | getSymbol         | 1_262_064    | 1_094_825 | $0.0000014558 | $1.45             | <font color="green">-76_454</font>  |
| 6   | getName           | 1_262_494    | 1_094_997 | $0.0000014560 | $1.45             | <font color="green">-73_490</font>  |
| 7   | getDecimals       | 1_258_420    | 1_093_368 | $0.0000014538 | $1.45             | <font color="green">-71_196</font>  |
| 8   | getArchives       | 1_258_033    | 1_093_213 | $0.0000014536 | $1.45             | <font color="green">-75_295</font>  |
| 9   | executeTransfer   | 14_087_772   | 6_225_108 | $0.0000082773 | $8.27             | <font color="green">-110_765</font> |
| 10  | getAccountBalance | 5_141_226    | 2_646_490 | $0.0000035190 | $3.51             | <font color="green">-80_332</font>  |
| 11  | executeTransfer   | 14_076_694   | 6_220_677 | $0.0000082714 | $8.27             | <font color="green">-56_953</font>  |
| 12  | executeTransfer   | 14_105_582   | 6_232_232 | $0.0000082868 | $8.28             | <font color="green">-68_119</font>  |
| 13  | executeTransfer   | 14_919_347   | 6_557_738 | $0.0000087196 | $8.71             | <font color="green">-90_427</font>  |
| 14  | executeTransfer   | 14_913_993   | 6_555_597 | $0.0000087168 | $8.71             | <font color="green">-116_260</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 5_301_465    | 2_710_586 | $0.0000036042 | $3.60             |
| 1   | getTransferFee    | 2_368_375    | 1_537_350 | $0.0000020442 | $2.04             |
| 2   | executeTransfer   | 14_192_971   | 6_267_188 | $0.0000083333 | $8.33             |
| 3   | executeTransfer   | 14_207_523   | 6_273_009 | $0.0000083410 | $8.34             |
| 4   | getBlocks         | 6_146_891    | 3_048_756 | $0.0000040538 | $4.05             |
| 5   | getSymbol         | 1_338_518    | 1_125_407 | $0.0000014964 | $1.49             |
| 6   | getName           | 1_335_984    | 1_124_393 | $0.0000014951 | $1.49             |
| 7   | getDecimals       | 1_329_616    | 1_121_846 | $0.0000014917 | $1.49             |
| 8   | getArchives       | 1_333_328    | 1_123_331 | $0.0000014937 | $1.49             |
| 9   | executeTransfer   | 14_198_537   | 6_269_414 | $0.0000083363 | $8.33             |
| 10  | getAccountBalance | 5_221_558    | 2_678_623 | $0.0000035617 | $3.56             |
| 11  | executeTransfer   | 14_133_647   | 6_243_458 | $0.0000083017 | $8.30             |
| 12  | executeTransfer   | 14_173_701   | 6_259_480 | $0.0000083230 | $8.32             |
| 13  | executeTransfer   | 15_009_774   | 6_593_909 | $0.0000087677 | $8.76             |
| 14  | executeTransfer   | 15_030_253   | 6_602_101 | $0.0000087786 | $8.77             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
