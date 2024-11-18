# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init              | 6_092_184_508 | 4_837_463_803 | $0.0064322305 | $6_432.23         |
| 1   | getAccountBalance | 108_356_198   | 43_932_479    | $0.0000584157 | $58.41            |
| 2   | getTransferFee    | 105_097_229   | 42_628_891    | $0.0000566824 | $56.68            |
| 3   | executeTransfer   | 116_434_351   | 47_163_740    | $0.0000627122 | $62.71            |
| 4   | executeTransfer   | 116_445_439   | 47_168_175    | $0.0000627181 | $62.71            |
| 5   | getBlocks         | 109_420_754   | 44_358_301    | $0.0000589819 | $58.98            |
| 6   | getSymbol         | 104_090_235   | 42_226_094    | $0.0000561468 | $56.14            |
| 7   | getName           | 104_010_687   | 42_194_274    | $0.0000561045 | $56.10            |
| 8   | getDecimals       | 104_350_422   | 42_330_168    | $0.0000562852 | $56.28            |
| 9   | getArchives       | 104_343_664   | 42_327_465    | $0.0000562816 | $56.28            |
| 10  | executeTransfer   | 116_500_244   | 47_190_097    | $0.0000627473 | $62.74            |
| 11  | getAccountBalance | 108_454_349   | 43_971_739    | $0.0000584679 | $58.46            |
| 12  | executeTransfer   | 116_357_676   | 47_133_070    | $0.0000626714 | $62.67            |
| 13  | executeTransfer   | 116_538_546   | 47_205_418    | $0.0000627676 | $62.76            |
| 14  | executeTransfer   | 117_377_594   | 47_541_037    | $0.0000632139 | $63.21            |
| 15  | executeTransfer   | 117_319_959   | 47_517_983    | $0.0000631832 | $63.18            |

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
