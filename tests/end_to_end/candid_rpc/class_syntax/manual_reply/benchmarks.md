# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | manualUpdate   | 728_324      | 881_329   | $0.0000011719 | $1.17             | <font color="red">+46_178</font>    |
| 1   | manualUpdate   | 1_631_002    | 1_242_400 | $0.0000016520 | $1.65             | <font color="red">+44_019</font>    |
| 2   | updateBlob     | 1_507_829    | 1_193_131 | $0.0000015865 | $1.58             | <font color="red">+20_760</font>    |
| 3   | updateFloat32  | 1_061_281    | 1_014_512 | $0.0000013490 | $1.34             | <font color="red">+33_772</font>    |
| 4   | updateInt8     | 1_160_575    | 1_054_230 | $0.0000014018 | $1.40             | <font color="red">+31_868</font>    |
| 5   | updateNat      | 1_551_973    | 1_210_789 | $0.0000016099 | $1.60             | <font color="red">+29_493</font>    |
| 6   | updateNull     | 1_046_269    | 1_008_507 | $0.0000013410 | $1.34             | <font color="red">+29_589</font>    |
| 7   | updateVoid     | 900_944      | 950_377   | $0.0000012637 | $1.26             | <font color="red">+28_052</font>    |
| 8   | updateRecord   | 13_007_043   | 5_792_817 | $0.0000077025 | $7.70             | <font color="green">-156_979</font> |
| 9   | updateReserved | 1_046_217    | 1_008_486 | $0.0000013410 | $1.34             | <font color="red">+31_046</font>    |
| 10  | updateString   | 1_300_475    | 1_110_190 | $0.0000014762 | $1.47             | <font color="red">+26_112</font>    |
| 11  | updateVariant  | 3_460_614    | 1_974_245 | $0.0000026251 | $2.62             | <font color="green">-6_454</font>   |
| 12  | updateFloat32  | 1_057_352    | 1_012_940 | $0.0000013469 | $1.34             | <font color="red">+29_435</font>    |
| 13  | replyRaw       | 528_330      | 801_332   | $0.0000010655 | $1.06             | <font color="red">+39_618</font>    |

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
