# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | manualUpdate   | 700_163      | 870_065   | $0.0000011569 | $1.15             | <font color="red">+18_017</font>    |
| 1   | manualUpdate   | 1_602_932    | 1_231_172 | $0.0000016371 | $1.63             | <font color="red">+15_949</font>    |
| 2   | updateBlob     | 1_493_337    | 1_187_334 | $0.0000015788 | $1.57             | <font color="red">+6_268</font>     |
| 3   | updateFloat32  | 1_046_018    | 1_008_407 | $0.0000013408 | $1.34             | <font color="red">+18_509</font>    |
| 4   | updateInt8     | 1_145_669    | 1_048_267 | $0.0000013938 | $1.39             | <font color="red">+16_962</font>    |
| 5   | updateNat      | 1_536_718    | 1_204_687 | $0.0000016018 | $1.60             | <font color="red">+14_238</font>    |
| 6   | updateNull     | 1_030_891    | 1_002_356 | $0.0000013328 | $1.33             | <font color="red">+14_211</font>    |
| 7   | updateVoid     | 885_209      | 944_083   | $0.0000012553 | $1.25             | <font color="red">+12_317</font>    |
| 8   | updateRecord   | 13_039_307   | 5_805_722 | $0.0000077197 | $7.71             | <font color="green">-124_715</font> |
| 9   | updateReserved | 1_031_010    | 1_002_404 | $0.0000013329 | $1.33             | <font color="red">+15_839</font>    |
| 10  | updateString   | 1_285_347    | 1_104_138 | $0.0000014681 | $1.46             | <font color="red">+10_984</font>    |
| 11  | updateVariant  | 3_443_415    | 1_967_366 | $0.0000026159 | $2.61             | <font color="green">-23_653</font>  |
| 12  | updateFloat32  | 1_042_320    | 1_006_928 | $0.0000013389 | $1.33             | <font color="red">+14_403</font>    |
| 13  | replyRaw       | 513_224      | 795_289   | $0.0000010575 | $1.05             | <font color="red">+24_512</font>    |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

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

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
