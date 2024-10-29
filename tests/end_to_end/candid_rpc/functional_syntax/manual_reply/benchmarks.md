# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.24.2-rc.92

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 670_372      | 858_148   | $0.0000011411 | $1.14             |
| 1   | manualUpdate   | 1_622_685    | 1_239_074 | $0.0000016476 | $1.64             |
| 2   | updateBlob     | 1_491_896    | 1_186_758 | $0.0000015780 | $1.57             |
| 3   | updateFloat32  | 1_037_182    | 1_004_872 | $0.0000013361 | $1.33             |
| 4   | updateInt8     | 1_130_009    | 1_042_003 | $0.0000013855 | $1.38             |
| 5   | updateNat      | 1_529_548    | 1_201_819 | $0.0000015980 | $1.59             |
| 6   | updateNull     | 1_022_750    | 999_100   | $0.0000013285 | $1.32             |
| 7   | updateVoid     | 857_631      | 933_052   | $0.0000012407 | $1.24             |
| 8   | updateRecord   | 16_869_340   | 7_337_736 | $0.0000097568 | $9.75             |
| 9   | updateReserved | 1_022_488    | 998_995   | $0.0000013283 | $1.32             |
| 10  | updateString   | 1_278_953    | 1_101_581 | $0.0000014647 | $1.46             |
| 11  | updateVariant  | 4_395_283    | 2_348_113 | $0.0000031222 | $3.12             |
| 12  | updateFloat32  | 1_034_232    | 1_003_692 | $0.0000013346 | $1.33             |
| 13  | replyRaw       | 458_639      | 773_455   | $0.0000010284 | $1.02             |

## Baseline benchmarks Azle version: 0.24.2-rc.92

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
