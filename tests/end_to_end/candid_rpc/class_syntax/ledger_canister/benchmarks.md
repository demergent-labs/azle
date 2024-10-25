# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.24.2-rc.61

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 4_877_174    | 2_540_869 | $0.0000033785 | $3.37             |
| 1   | getTransferFee    | 2_120_315    | 1_438_126 | $0.0000019122 | $1.91             |
| 2   | executeTransfer   | 13_442_878   | 5_967_151 | $0.0000079343 | $7.93             |
| 3   | executeTransfer   | 13_438_627   | 5_965_450 | $0.0000079321 | $7.93             |
| 4   | getBlocks         | 5_739_057    | 2_885_622 | $0.0000038369 | $3.83             |
| 5   | getSymbol         | 1_618_195    | 1_237_278 | $0.0000016452 | $1.64             |
| 6   | getName           | 1_619_988    | 1_237_995 | $0.0000016461 | $1.64             |
| 7   | getDecimals       | 1_617_445    | 1_236_978 | $0.0000016448 | $1.64             |
| 8   | getArchives       | 1_616_765    | 1_236_706 | $0.0000016444 | $1.64             |
| 9   | executeTransfer   | 13_437_801   | 5_965_120 | $0.0000079316 | $7.93             |
| 10  | getAccountBalance | 4_782_849    | 2_503_139 | $0.0000033283 | $3.32             |
| 11  | executeTransfer   | 13_408_460   | 5_953_384 | $0.0000079160 | $7.91             |
| 12  | executeTransfer   | 13_447_169   | 5_968_867 | $0.0000079366 | $7.93             |
| 13  | executeTransfer   | 14_237_010   | 6_284_804 | $0.0000083567 | $8.35             |
| 14  | executeTransfer   | 14_239_329   | 6_285_731 | $0.0000083579 | $8.35             |

## Baseline benchmarks Azle version: 0.24.2-rc.61

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
