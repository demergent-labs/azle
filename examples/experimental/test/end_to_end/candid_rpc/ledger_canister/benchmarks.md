# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init              | 7_276_975_404 | 5_711_380_161 | $0.0075942509 | $7_594.25         |
| 1   | getAccountBalance | 108_655_324   | 44_052_129    | $0.0000585748 | $58.57            |
| 2   | getTransferFee    | 105_478_822   | 42_781_528    | $0.0000568853 | $56.88            |
| 3   | executeTransfer   | 116_817_276   | 47_316_910    | $0.0000629159 | $62.91            |
| 4   | executeTransfer   | 116_859_707   | 47_333_882    | $0.0000629384 | $62.93            |
| 5   | getBlocks         | 109_772_442   | 44_498_976    | $0.0000591690 | $59.16            |
| 6   | getSymbol         | 104_512_159   | 42_394_863    | $0.0000563712 | $56.37            |
| 7   | getName           | 104_278_138   | 42_301_255    | $0.0000562467 | $56.24            |
| 8   | getDecimals       | 104_709_650   | 42_473_860    | $0.0000564762 | $56.47            |
| 9   | getArchives       | 104_641_402   | 42_446_560    | $0.0000564399 | $56.43            |
| 10  | executeTransfer   | 116_927_130   | 47_360_852    | $0.0000629743 | $62.97            |
| 11  | getAccountBalance | 108_606_179   | 44_032_471    | $0.0000585487 | $58.54            |
| 12  | executeTransfer   | 116_991_430   | 47_386_572    | $0.0000630085 | $63.00            |
| 13  | executeTransfer   | 116_990_582   | 47_386_232    | $0.0000630081 | $63.00            |
| 14  | executeTransfer   | 117_784_713   | 47_703_885    | $0.0000634304 | $63.43            |
| 15  | executeTransfer   | 117_752_162   | 47_690_864    | $0.0000634131 | $63.41            |

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
