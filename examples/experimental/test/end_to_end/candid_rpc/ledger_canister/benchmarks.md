# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init              | 7_276_975_404 | 5_711_380_161 | $0.0075942509 | $7_594.25         |
| 1   | getAccountBalance | 108_655_301   | 44_052_120    | $0.0000585748 | $58.57            |
| 2   | getTransferFee    | 105_478_857   | 42_781_542    | $0.0000568853 | $56.88            |
| 3   | executeTransfer   | 116_817_195   | 47_316_878    | $0.0000629158 | $62.91            |
| 4   | executeTransfer   | 116_859_742   | 47_333_896    | $0.0000629385 | $62.93            |
| 5   | getBlocks         | 109_772_488   | 44_498_995    | $0.0000591690 | $59.16            |
| 6   | getSymbol         | 104_512_217   | 42_394_886    | $0.0000563712 | $56.37            |
| 7   | getName           | 104_278_150   | 42_301_260    | $0.0000562467 | $56.24            |
| 8   | getDecimals       | 104_709_581   | 42_473_832    | $0.0000564762 | $56.47            |
| 9   | getArchives       | 104_641_367   | 42_446_546    | $0.0000564399 | $56.43            |
| 10  | executeTransfer   | 116_927_119   | 47_360_847    | $0.0000629743 | $62.97            |
| 11  | getAccountBalance | 108_606_202   | 44_032_480    | $0.0000585487 | $58.54            |
| 12  | executeTransfer   | 116_991_476   | 47_386_590    | $0.0000630085 | $63.00            |
| 13  | executeTransfer   | 116_990_697   | 47_386_278    | $0.0000630081 | $63.00            |
| 14  | executeTransfer   | 117_780_087   | 47_702_034    | $0.0000634280 | $63.42            |
| 15  | executeTransfer   | 117_752_455   | 47_690_982    | $0.0000634133 | $63.41            |

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
