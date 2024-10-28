# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.24.2-rc.87

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 4_881_667    | 2_542_666 | $0.0000033809 | $3.38             |
| 1   | getTransferFee    | 2_120_830    | 1_438_332 | $0.0000019125 | $1.91             |
| 2   | executeTransfer   | 13_456_246   | 5_972_498 | $0.0000079415 | $7.94             |
| 3   | executeTransfer   | 13_449_695   | 5_969_878 | $0.0000079380 | $7.93             |
| 4   | getBlocks         | 5_738_080    | 2_885_232 | $0.0000038364 | $3.83             |
| 5   | getSymbol         | 1_617_754    | 1_237_101 | $0.0000016449 | $1.64             |
| 6   | getName           | 1_620_033    | 1_238_013 | $0.0000016461 | $1.64             |
| 7   | getDecimals       | 1_617_476    | 1_236_990 | $0.0000016448 | $1.64             |
| 8   | getArchives       | 1_617_180    | 1_236_872 | $0.0000016446 | $1.64             |
| 9   | executeTransfer   | 13_461_008   | 5_974_403 | $0.0000079440 | $7.94             |
| 10  | getAccountBalance | 4_796_586    | 2_508_634 | $0.0000033357 | $3.33             |
| 11  | executeTransfer   | 13_447_170   | 5_968_868 | $0.0000079366 | $7.93             |
| 12  | executeTransfer   | 13_471_734   | 5_978_693 | $0.0000079497 | $7.94             |
| 13  | executeTransfer   | 14_279_233   | 6_301_693 | $0.0000083792 | $8.37             |
| 14  | executeTransfer   | 14_276_592   | 6_300_636 | $0.0000083778 | $8.37             |

## Baseline benchmarks Azle version: 0.24.2-rc.87

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
