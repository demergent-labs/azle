# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init              | 7_275_160_342 | 5_710_654_136 | $0.0075932855 | $7_593.28         |
| 1   | getAccountBalance | 107_094_635   | 43_427_854    | $0.0000577447 | $57.74            |
| 2   | getTransferFee    | 104_010_878   | 42_194_351    | $0.0000561046 | $56.10            |
| 3   | executeTransfer   | 115_419_147   | 46_757_658    | $0.0000621723 | $62.17            |
| 4   | executeTransfer   | 115_293_497   | 46_707_398    | $0.0000621054 | $62.10            |
| 5   | getBlocks         | 108_215_881   | 43_876_352    | $0.0000583411 | $58.34            |
| 6   | getSymbol         | 102_977_246   | 41_780_898    | $0.0000555548 | $55.55            |
| 7   | getName           | 102_648_211   | 41_649_284    | $0.0000553798 | $55.37            |
| 8   | getDecimals       | 103_015_229   | 41_796_091    | $0.0000555750 | $55.57            |
| 9   | getArchives       | 102_918_077   | 41_757_230    | $0.0000555233 | $55.52            |
| 10  | executeTransfer   | 115_289_288   | 46_705_715    | $0.0000621032 | $62.10            |
| 11  | getAccountBalance | 107_139_691   | 43_445_876    | $0.0000577687 | $57.76            |
| 12  | executeTransfer   | 115_313_399   | 46_715_359    | $0.0000621160 | $62.11            |
| 13  | executeTransfer   | 115_352_741   | 46_731_096    | $0.0000621369 | $62.13            |
| 14  | executeTransfer   | 116_064_022   | 47_015_608    | $0.0000625152 | $62.51            |
| 15  | executeTransfer   | 116_076_927   | 47_020_770    | $0.0000625221 | $62.52            |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
