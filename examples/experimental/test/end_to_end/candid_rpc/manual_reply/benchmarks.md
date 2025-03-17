⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | manualUpdate   | 676_914      | 860_765   | $0.0000011445 | $1.14             | <font color="green">-2_186</font>  |
| 1   | manualUpdate   | 1_584_936    | 1_223_974 | $0.0000016275 | $1.62             | <font color="green">-4_728</font>  |
| 2   | updateBlob     | 1_452_056    | 1_170_822 | $0.0000015568 | $1.55             | <font color="green">-5_100</font>  |
| 3   | updateFloat32  | 999_840      | 989_936   | $0.0000013163 | $1.31             | <font color="green">-4_315</font>  |
| 4   | updateInt8     | 1_093_921    | 1_027_568 | $0.0000013663 | $1.36             | <font color="green">-5_201</font>  |
| 5   | updateNat      | 1_491_947    | 1_186_778 | $0.0000015780 | $1.57             | <font color="green">-13_530</font> |
| 6   | updateNull     | 986_744      | 984_697   | $0.0000013093 | $1.30             | <font color="green">-6_891</font>  |
| 7   | updateVoid     | 843_537      | 927_414   | $0.0000012332 | $1.23             | <font color="green">-5_422</font>  |
| 8   | updateRecord   | 16_518_625   | 7_197_450 | $0.0000095702 | $9.57             | <font color="red">+3_454</font>    |
| 9   | updateReserved | 987_021      | 984_808   | $0.0000013095 | $1.30             | <font color="green">-5_065</font>  |
| 10  | updateString   | 1_243_947    | 1_087_578 | $0.0000014461 | $1.44             | <font color="green">-5_602</font>  |
| 11  | updateVariant  | 4_304_490    | 2_311_796 | $0.0000030739 | $3.07             | <font color="green">-4_074</font>  |
| 12  | updateFloat32  | 1_000_243    | 990_097   | $0.0000013165 | $1.31             | <font color="green">-3_551</font>  |
| 13  | replyRaw       | 457_665      | 773_066   | $0.0000010279 | $1.02             | <font color="green">-2_950</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 679_100      | 861_640   | $0.0000011457 | $1.14             |
| 1   | manualUpdate   | 1_589_664    | 1_225_865 | $0.0000016300 | $1.62             |
| 2   | updateBlob     | 1_457_156    | 1_172_862 | $0.0000015595 | $1.55             |
| 3   | updateFloat32  | 1_004_155    | 991_662   | $0.0000013186 | $1.31             |
| 4   | updateInt8     | 1_099_122    | 1_029_648 | $0.0000013691 | $1.36             |
| 5   | updateNat      | 1_505_477    | 1_192_190 | $0.0000015852 | $1.58             |
| 6   | updateNull     | 993_635      | 987_454   | $0.0000013130 | $1.31             |
| 7   | updateVoid     | 848_959      | 929_583   | $0.0000012360 | $1.23             |
| 8   | updateRecord   | 16_515_171   | 7_196_068 | $0.0000095684 | $9.56             |
| 9   | updateReserved | 992_086      | 986_834   | $0.0000013122 | $1.31             |
| 10  | updateString   | 1_249_549    | 1_089_819 | $0.0000014491 | $1.44             |
| 11  | updateVariant  | 4_308_564    | 2_313_425 | $0.0000030761 | $3.07             |
| 12  | updateFloat32  | 1_003_794    | 991_517   | $0.0000013184 | $1.31             |
| 13  | replyRaw       | 460_615      | 774_246   | $0.0000010295 | $1.02             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
