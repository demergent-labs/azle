# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | manualUpdate   | 678_455      | 861_382   | $0.0000011454 | $1.14             | <font color="green">-645</font>   |
| 1   | manualUpdate   | 1_590_163    | 1_226_065 | $0.0000016303 | $1.63             | <font color="red">+499</font>     |
| 2   | updateBlob     | 1_453_607    | 1_171_442 | $0.0000015576 | $1.55             | <font color="green">-3_549</font> |
| 3   | updateFloat32  | 1_005_960    | 992_384   | $0.0000013195 | $1.31             | <font color="red">+1_805</font>   |
| 4   | updateInt8     | 1_099_304    | 1_029_721 | $0.0000013692 | $1.36             | <font color="red">+182</font>     |
| 5   | updateNat      | 1_498_144    | 1_189_257 | $0.0000015813 | $1.58             | <font color="green">-7_333</font> |
| 6   | updateNull     | 992_124      | 986_849   | $0.0000013122 | $1.31             | <font color="green">-1_511</font> |
| 7   | updateVoid     | 848_865      | 929_546   | $0.0000012360 | $1.23             | <font color="green">-94</font>    |
| 8   | updateRecord   | 16_523_334   | 7_199_333 | $0.0000095727 | $9.57             | <font color="red">+8_163</font>   |
| 9   | updateReserved | 992_442      | 986_976   | $0.0000013124 | $1.31             | <font color="red">+356</font>     |
| 10  | updateString   | 1_249_156    | 1_089_662 | $0.0000014489 | $1.44             | <font color="green">-393</font>   |
| 11  | updateVariant  | 4_305_803    | 2_312_321 | $0.0000030746 | $3.07             | <font color="green">-2_761</font> |
| 12  | updateFloat32  | 1_003_960    | 991_584   | $0.0000013185 | $1.31             | <font color="red">+166</font>     |
| 13  | replyRaw       | 458_804      | 773_521   | $0.0000010285 | $1.02             | <font color="green">-1_811</font> |

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
