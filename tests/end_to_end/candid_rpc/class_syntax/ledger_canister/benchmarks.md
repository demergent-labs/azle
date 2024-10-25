# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 4_877_197    | 2_540_878 | $0.0000033785 | $3.37             |
| 1   | getTransferFee    | 2_120_280    | 1_438_112 | $0.0000019122 | $1.91             |
| 2   | executeTransfer   | 13_442_843   | 5_967_137 | $0.0000079343 | $7.93             |
| 3   | executeTransfer   | 13_438_662   | 5_965_464 | $0.0000079321 | $7.93             |
| 4   | getBlocks         | 5_739_103    | 2_885_641 | $0.0000038370 | $3.83             |
| 5   | getSymbol         | 1_618_160    | 1_237_264 | $0.0000016452 | $1.64             |
| 6   | getName           | 1_620_058    | 1_238_023 | $0.0000016462 | $1.64             |
| 7   | getDecimals       | 1_617_375    | 1_236_950 | $0.0000016447 | $1.64             |
| 8   | getArchives       | 1_616_846    | 1_236_738 | $0.0000016445 | $1.64             |
| 9   | executeTransfer   | 13_437_778   | 5_965_111 | $0.0000079316 | $7.93             |
| 10  | getAccountBalance | 4_782_907    | 2_503_162 | $0.0000033284 | $3.32             |
| 11  | executeTransfer   | 13_408_402   | 5_953_360 | $0.0000079160 | $7.91             |
| 12  | executeTransfer   | 13_447_111   | 5_968_844 | $0.0000079366 | $7.93             |
| 13  | executeTransfer   | 14_236_804   | 6_284_721 | $0.0000083566 | $8.35             |
| 14  | executeTransfer   | 14_244_064   | 6_287_625 | $0.0000083605 | $8.36             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

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
