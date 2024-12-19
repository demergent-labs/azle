# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | manualUpdate   | 699_013      | 869_605   | $0.0000011563 | $1.15             | <font color="red">+16_867</font>    |
| 1   | manualUpdate   | 1_600_986    | 1_230_394 | $0.0000016360 | $1.63             | <font color="red">+14_003</font>    |
| 2   | updateBlob     | 1_492_565    | 1_187_026 | $0.0000015784 | $1.57             | <font color="red">+5_496</font>     |
| 3   | updateFloat32  | 1_045_675    | 1_008_270 | $0.0000013407 | $1.34             | <font color="red">+18_166</font>    |
| 4   | updateInt8     | 1_145_441    | 1_048_176 | $0.0000013937 | $1.39             | <font color="red">+16_734</font>    |
| 5   | updateNat      | 1_535_619    | 1_204_247 | $0.0000016013 | $1.60             | <font color="red">+13_139</font>    |
| 6   | updateNull     | 1_030_437    | 1_002_174 | $0.0000013326 | $1.33             | <font color="red">+13_757</font>    |
| 7   | updateVoid     | 884_403      | 943_761   | $0.0000012549 | $1.25             | <font color="red">+11_511</font>    |
| 8   | updateRecord   | 13_021_098   | 5_798_439 | $0.0000077100 | $7.71             | <font color="green">-142_924</font> |
| 9   | updateReserved | 1_030_765    | 1_002_306 | $0.0000013327 | $1.33             | <font color="red">+15_594</font>    |
| 10  | updateString   | 1_284_928    | 1_103_971 | $0.0000014679 | $1.46             | <font color="red">+10_565</font>    |
| 11  | updateVariant  | 3_442_338    | 1_966_935 | $0.0000026154 | $2.61             | <font color="green">-24_730</font>  |
| 12  | updateFloat32  | 1_042_021    | 1_006_808 | $0.0000013387 | $1.33             | <font color="red">+14_104</font>    |
| 13  | replyRaw       | 512_932      | 795_172   | $0.0000010573 | $1.05             | <font color="red">+24_220</font>    |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 682_146      | 862_858   | $0.0000011473 | $1.14             |
| 1   | manualUpdate   | 1_586_983    | 1_224_793 | $0.0000016286 | $1.62             |
| 2   | updateBlob     | 1_487_069    | 1_184_827 | $0.0000015754 | $1.57             |
| 3   | updateFloat32  | 1_027_509    | 1_001_003 | $0.0000013310 | $1.33             |
| 4   | updateInt8     | 1_128_707    | 1_041_482 | $0.0000013848 | $1.38             |
| 5   | updateNat      | 1_522_480    | 1_198_992 | $0.0000015943 | $1.59             |
| 6   | updateNull     | 1_016_680    | 996_672   | $0.0000013252 | $1.32             |
| 7   | updateVoid     | 872_892      | 939_156   | $0.0000012488 | $1.24             |
| 8   | updateRecord   | 13_164_022   | 5_855_608 | $0.0000077860 | $7.78             |
| 9   | updateReserved | 1_015_171    | 996_068   | $0.0000013244 | $1.32             |
| 10  | updateString   | 1_274_363    | 1_099_745 | $0.0000014623 | $1.46             |
| 11  | updateVariant  | 3_467_068    | 1_976_827 | $0.0000026285 | $2.62             |
| 12  | updateFloat32  | 1_027_917    | 1_001_166 | $0.0000013312 | $1.33             |
| 13  | replyRaw       | 488_712      | 785_484   | $0.0000010444 | $1.04             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
