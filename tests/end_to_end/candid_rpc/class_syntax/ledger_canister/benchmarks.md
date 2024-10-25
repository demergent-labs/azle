# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.24.2-rc.70

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 4_877_278    | 2_540_911 | $0.0000033786 | $3.37             |
| 1   | getTransferFee    | 2_120_338    | 1_438_135 | $0.0000019122 | $1.91             |
| 2   | executeTransfer   | 13_442_901   | 5_967_160 | $0.0000079344 | $7.93             |
| 3   | executeTransfer   | 13_438_880   | 5_965_552 | $0.0000079322 | $7.93             |
| 4   | getBlocks         | 5_739_057    | 2_885_622 | $0.0000038369 | $3.83             |
| 5   | getSymbol         | 1_618_172    | 1_237_268 | $0.0000016452 | $1.64             |
| 6   | getName           | 1_620_081    | 1_238_032 | $0.0000016462 | $1.64             |
| 7   | getDecimals       | 1_617_410    | 1_236_964 | $0.0000016448 | $1.64             |
| 8   | getArchives       | 1_616_846    | 1_236_738 | $0.0000016445 | $1.64             |
| 9   | executeTransfer   | 13_437_778   | 5_965_111 | $0.0000079316 | $7.93             |
| 10  | getAccountBalance | 4_782_907    | 2_503_162 | $0.0000033284 | $3.32             |
| 11  | executeTransfer   | 13_408_344   | 5_953_337 | $0.0000079160 | $7.91             |
| 12  | executeTransfer   | 13_447_146   | 5_968_858 | $0.0000079366 | $7.93             |
| 13  | executeTransfer   | 14_233_283   | 6_283_313 | $0.0000083547 | $8.35             |
| 14  | executeTransfer   | 14_243_774   | 6_287_509 | $0.0000083603 | $8.36             |

## Baseline benchmarks Azle version: 0.24.2-rc.70

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
