# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 680_738      | 862_295   | $0.0000011466 | $1.14             |
| 1   | manualUpdate   | 1_586_035    | 1_224_414 | $0.0000016281 | $1.62             |
| 2   | updateBlob     | 1_493_859    | 1_187_543 | $0.0000015790 | $1.57             |
| 3   | updateFloat32  | 1_026_141    | 1_000_456 | $0.0000013303 | $1.33             |
| 4   | updateInt8     | 1_129_130    | 1_041_652 | $0.0000013851 | $1.38             |
| 5   | updateNat      | 1_534_644    | 1_203_857 | $0.0000016007 | $1.60             |
| 6   | updateNull     | 1_016_058    | 996_423   | $0.0000013249 | $1.32             |
| 7   | updateVoid     | 870_119      | 938_047   | $0.0000012473 | $1.24             |
| 8   | updateRecord   | 13_291_661   | 5_906_664 | $0.0000078539 | $7.85             |
| 9   | updateReserved | 1_015_670    | 996_268   | $0.0000013247 | $1.32             |
| 10  | updateString   | 1_278_820    | 1_101_528 | $0.0000014647 | $1.46             |
| 11  | updateVariant  | 3_493_354    | 1_987_341 | $0.0000026425 | $2.64             |
| 12  | updateFloat32  | 1_028_974    | 1_001_589 | $0.0000013318 | $1.33             |
| 13  | replyRaw       | 487_879      | 785_151   | $0.0000010440 | $1.04             |

## Baseline benchmarks Azle version: 0.24.2-rc.88

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
