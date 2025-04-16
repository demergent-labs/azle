# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getAccountBalance | 5_291_782    | 2_706_712 | $0.0000035990 | $3.59             | <font color="green">-9_683</font>  |
| 1   | getTransferFee    | 2_367_138    | 1_536_855 | $0.0000020435 | $2.04             | <font color="green">-1_237</font>  |
| 2   | executeTransfer   | 14_171_806   | 6_258_722 | $0.0000083220 | $8.32             | <font color="green">-21_165</font> |
| 3   | executeTransfer   | 14_181_697   | 6_262_678 | $0.0000083273 | $8.32             | <font color="green">-25_826</font> |
| 4   | getBlocks         | 6_140_017    | 3_046_006 | $0.0000040502 | $4.05             | <font color="green">-6_874</font>  |
| 5   | getSymbol         | 1_335_139    | 1_124_055 | $0.0000014946 | $1.49             | <font color="green">-3_379</font>  |
| 6   | getName           | 1_334_805    | 1_123_922 | $0.0000014944 | $1.49             | <font color="green">-1_179</font>  |
| 7   | getDecimals       | 1_331_578    | 1_122_631 | $0.0000014927 | $1.49             | <font color="red">+1_962</font>    |
| 8   | getArchives       | 1_332_114    | 1_122_845 | $0.0000014930 | $1.49             | <font color="green">-1_214</font>  |
| 9   | executeTransfer   | 14_151_666   | 6_250_666 | $0.0000083113 | $8.31             | <font color="green">-46_871</font> |
| 10  | getAccountBalance | 5_214_302    | 2_675_720 | $0.0000035578 | $3.55             | <font color="green">-7_256</font>  |
| 11  | executeTransfer   | 14_149_725   | 6_249_890 | $0.0000083103 | $8.31             | <font color="red">+16_078</font>   |
| 12  | executeTransfer   | 14_156_758   | 6_252_703 | $0.0000083140 | $8.31             | <font color="green">-16_943</font> |
| 13  | executeTransfer   | 14_972_084   | 6_578_833 | $0.0000087477 | $8.74             | <font color="green">-37_690</font> |
| 14  | executeTransfer   | 14_991_625   | 6_586_650 | $0.0000087581 | $8.75             | <font color="green">-38_628</font> |

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
