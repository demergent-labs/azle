# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 680_544      | 862_217   | $0.0000011465 | $1.14             |
| 1   | manualUpdate   | 1_585_673    | 1_224_269 | $0.0000016279 | $1.62             |
| 2   | updateBlob     | 1_493_526    | 1_187_410 | $0.0000015789 | $1.57             |
| 3   | updateFloat32  | 1_025_885    | 1_000_354 | $0.0000013301 | $1.33             |
| 4   | updateInt8     | 1_128_852    | 1_041_540 | $0.0000013849 | $1.38             |
| 5   | updateNat      | 1_534_366    | 1_203_746 | $0.0000016006 | $1.60             |
| 6   | updateNull     | 1_015_802    | 996_320   | $0.0000013248 | $1.32             |
| 7   | updateVoid     | 869_870      | 937_948   | $0.0000012472 | $1.24             |
| 8   | updateRecord   | 13_288_728   | 5_905_491 | $0.0000078524 | $7.85             |
| 9   | updateReserved | 1_015_414    | 996_165   | $0.0000013246 | $1.32             |
| 10  | updateString   | 1_278_498    | 1_101_399 | $0.0000014645 | $1.46             |
| 11  | updateVariant  | 3_492_684    | 1_987_073 | $0.0000026422 | $2.64             |
| 12  | updateFloat32  | 1_028_718    | 1_001_487 | $0.0000013316 | $1.33             |
| 13  | replyRaw       | 487_740      | 785_096   | $0.0000010439 | $1.04             |

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
