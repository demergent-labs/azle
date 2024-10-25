# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 669_917      | 857_966   | $0.0000011408 | $1.14             |
| 1   | manualUpdate   | 1_619_162    | 1_237_664 | $0.0000016457 | $1.64             |
| 2   | updateBlob     | 1_486_849    | 1_184_739 | $0.0000015753 | $1.57             |
| 3   | updateFloat32  | 1_032_867    | 1_003_146 | $0.0000013339 | $1.33             |
| 4   | updateInt8     | 1_128_074    | 1_041_229 | $0.0000013845 | $1.38             |
| 5   | updateNat      | 1_523_960    | 1_199_584 | $0.0000015951 | $1.59             |
| 6   | updateNull     | 1_020_227    | 998_090   | $0.0000013271 | $1.32             |
| 7   | updateVoid     | 856_180      | 932_472   | $0.0000012399 | $1.23             |
| 8   | updateRecord   | 16_856_255   | 7_332_502 | $0.0000097498 | $9.74             |
| 9   | updateReserved | 1_020_582    | 998_232   | $0.0000013273 | $1.32             |
| 10  | updateString   | 1_274_144    | 1_099_657 | $0.0000014622 | $1.46             |
| 11  | updateVariant  | 4_372_660    | 2_339_064 | $0.0000031102 | $3.11             |
| 12  | updateFloat32  | 1_029_586    | 1_001_834 | $0.0000013321 | $1.33             |
| 13  | replyRaw       | 458_539      | 773_415   | $0.0000010284 | $1.02             |

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
