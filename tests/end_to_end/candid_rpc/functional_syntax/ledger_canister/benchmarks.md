# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init              | 6_102_087_749 | 4_841_425_099 | $0.0064374977 | $6_437.49         |
| 1   | getAccountBalance | 108_320_466   | 43_918_186    | $0.0000583967 | $58.39            |
| 2   | getTransferFee    | 105_250_987   | 42_690_394    | $0.0000567641 | $56.76            |
| 3   | executeTransfer   | 116_566_754   | 47_216_701    | $0.0000627826 | $62.78            |
| 4   | executeTransfer   | 116_505_704   | 47_192_281    | $0.0000627502 | $62.75            |
| 5   | getBlocks         | 109_448_705   | 44_369_482    | $0.0000589968 | $58.99            |
| 6   | getSymbol         | 104_116_833   | 42_236_733    | $0.0000561609 | $56.16            |
| 7   | getName           | 103_987_753   | 42_185_101    | $0.0000560923 | $56.09            |
| 8   | getDecimals       | 104_271_197   | 42_298_478    | $0.0000562430 | $56.24            |
| 9   | getArchives       | 104_236_121   | 42_284_448    | $0.0000562244 | $56.22            |
| 10  | executeTransfer   | 116_436_048   | 47_164_419    | $0.0000627131 | $62.71            |
| 11  | getAccountBalance | 108_245_400   | 43_888_160    | $0.0000583568 | $58.35            |
| 12  | executeTransfer   | 116_480_625   | 47_182_250    | $0.0000627368 | $62.73            |
| 13  | executeTransfer   | 116_538_876   | 47_205_550    | $0.0000627678 | $62.76            |
| 14  | executeTransfer   | 117_345_417   | 47_528_166    | $0.0000631968 | $63.19            |
| 15  | executeTransfer   | 117_435_384   | 47_564_153    | $0.0000632446 | $63.24            |

## Baseline benchmarks Azle version: No previous benchmarks

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
