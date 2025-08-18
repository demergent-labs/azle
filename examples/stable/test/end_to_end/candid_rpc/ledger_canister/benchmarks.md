# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | getAccountBalance | 5_087_460 | 10_087_460 | $0.0000138198 | $13.81 | <font color="green">-140_812</font> |
| 1 | getTransferFee | 2_211_390 | 7_211_390 | $0.0000098796 | $9.87 | <font color="green">-81_277</font> |
| 2 | executeTransfer | 13_596_062 | 18_596_062 | $0.0000254766 | $25.47 | <font color="green">-504_921</font> |
| 3 | executeTransfer | 13_591_514 | 18_591_514 | $0.0000254704 | $25.47 | <font color="green">-536_517</font> |
| 4 | getBlocks | 5_903_809 | 10_903_809 | $0.0000149382 | $14.93 | <font color="green">-166_197</font> |
| 5 | getSymbol | 1_249_285 | 6_249_285 | $0.0000085615 | $8.56 | <font color="green">-12_779</font> |
| 6 | getName | 1_255_266 | 6_255_266 | $0.0000085697 | $8.56 | <font color="green">-7_228</font> |
| 7 | getDecimals | 1_251_381 | 6_251_381 | $0.0000085644 | $8.56 | <font color="green">-7_039</font> |
| 8 | getArchives | 1_252_532 | 6_252_532 | $0.0000085660 | $8.56 | <font color="green">-5_501</font> |
| 9 | executeTransfer | 13_588_772 | 18_588_772 | $0.0000254666 | $25.46 | <font color="green">-499_000</font> |
| 10 | getAccountBalance | 4_997_729 | 9_997_729 | $0.0000136969 | $13.69 | <font color="green">-143_497</font> |
| 11 | executeTransfer | 13_565_515 | 18_565_515 | $0.0000254348 | $25.43 | <font color="green">-511_179</font> |
| 12 | executeTransfer | 13_570_317 | 18_570_317 | $0.0000254413 | $25.44 | <font color="green">-535_265</font> |
| 13 | executeTransfer | 14_372_142 | 19_372_142 | $0.0000265398 | $26.53 | <font color="green">-547_205</font> |
| 14 | executeTransfer | 14_380_794 | 19_380_794 | $0.0000265517 | $26.55 | <font color="green">-533_199</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | getAccountBalance | 5_228_272 | 10_228_272 | $0.0000140127 | $14.01 |
| 1 | getTransferFee | 2_292_667 | 7_292_667 | $0.0000099910 | $9.99 |
| 2 | executeTransfer | 14_100_983 | 19_100_983 | $0.0000261683 | $26.16 |
| 3 | executeTransfer | 14_128_031 | 19_128_031 | $0.0000262054 | $26.20 |
| 4 | getBlocks | 6_070_006 | 11_070_006 | $0.0000151659 | $15.16 |
| 5 | getSymbol | 1_262_064 | 6_262_064 | $0.0000085790 | $8.57 |
| 6 | getName | 1_262_494 | 6_262_494 | $0.0000085796 | $8.57 |
| 7 | getDecimals | 1_258_420 | 6_258_420 | $0.0000085740 | $8.57 |
| 8 | getArchives | 1_258_033 | 6_258_033 | $0.0000085735 | $8.57 |
| 9 | executeTransfer | 14_087_772 | 19_087_772 | $0.0000261502 | $26.15 |
| 10 | getAccountBalance | 5_141_226 | 10_141_226 | $0.0000138935 | $13.89 |
| 11 | executeTransfer | 14_076_694 | 19_076_694 | $0.0000261351 | $26.13 |
| 12 | executeTransfer | 14_105_582 | 19_105_582 | $0.0000261746 | $26.17 |
| 13 | executeTransfer | 14_919_347 | 19_919_347 | $0.0000272895 | $27.28 |
| 14 | executeTransfer | 14_913_993 | 19_913_993 | $0.0000272822 | $27.28 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).