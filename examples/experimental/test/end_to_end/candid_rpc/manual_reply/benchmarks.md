# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | manualUpdate   | 678_589      | 861_435   | $0.0000011454 | $1.14             | <font color="red">+1_675</font>   |
| 1   | manualUpdate   | 1_588_669    | 1_225_467 | $0.0000016295 | $1.62             | <font color="red">+3_733</font>   |
| 2   | updateBlob     | 1_456_663    | 1_172_665 | $0.0000015593 | $1.55             | <font color="red">+4_607</font>   |
| 3   | updateFloat32  | 1_006_185    | 992_474   | $0.0000013197 | $1.31             | <font color="red">+6_345</font>   |
| 4   | updateInt8     | 1_099_397    | 1_029_758 | $0.0000013692 | $1.36             | <font color="red">+5_476</font>   |
| 5   | updateNat      | 1_500_474    | 1_190_189 | $0.0000015826 | $1.58             | <font color="red">+8_527</font>   |
| 6   | updateNull     | 992_460      | 986_984   | $0.0000013124 | $1.31             | <font color="red">+5_716</font>   |
| 7   | updateVoid     | 848_269      | 929_307   | $0.0000012357 | $1.23             | <font color="red">+4_732</font>   |
| 8   | updateRecord   | 16_515_471   | 7_196_188 | $0.0000095686 | $9.56             | <font color="green">-3_154</font> |
| 9   | updateReserved | 992_334      | 986_933   | $0.0000013123 | $1.31             | <font color="red">+5_313</font>   |
| 10  | updateString   | 1_248_200    | 1_089_280 | $0.0000014484 | $1.44             | <font color="red">+4_253</font>   |
| 11  | updateVariant  | 4_316_509    | 2_316_603 | $0.0000030803 | $3.08             | <font color="red">+12_019</font>  |
| 12  | updateFloat32  | 1_006_073    | 992_429   | $0.0000013196 | $1.31             | <font color="red">+5_830</font>   |
| 13  | replyRaw       | 459_781      | 773_912   | $0.0000010290 | $1.02             | <font color="red">+2_116</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 676_914      | 860_765   | $0.0000011445 | $1.14             |
| 1   | manualUpdate   | 1_584_936    | 1_223_974 | $0.0000016275 | $1.62             |
| 2   | updateBlob     | 1_452_056    | 1_170_822 | $0.0000015568 | $1.55             |
| 3   | updateFloat32  | 999_840      | 989_936   | $0.0000013163 | $1.31             |
| 4   | updateInt8     | 1_093_921    | 1_027_568 | $0.0000013663 | $1.36             |
| 5   | updateNat      | 1_491_947    | 1_186_778 | $0.0000015780 | $1.57             |
| 6   | updateNull     | 986_744      | 984_697   | $0.0000013093 | $1.30             |
| 7   | updateVoid     | 843_537      | 927_414   | $0.0000012332 | $1.23             |
| 8   | updateRecord   | 16_518_625   | 7_197_450 | $0.0000095702 | $9.57             |
| 9   | updateReserved | 987_021      | 984_808   | $0.0000013095 | $1.30             |
| 10  | updateString   | 1_243_947    | 1_087_578 | $0.0000014461 | $1.44             |
| 11  | updateVariant  | 4_304_490    | 2_311_796 | $0.0000030739 | $3.07             |
| 12  | updateFloat32  | 1_000_243    | 990_097   | $0.0000013165 | $1.31             |
| 13  | replyRaw       | 457_665      | 773_066   | $0.0000010279 | $1.02             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
