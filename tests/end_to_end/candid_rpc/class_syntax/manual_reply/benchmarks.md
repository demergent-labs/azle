# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | manualUpdate   | 728_308      | 881_323   | $0.0000011719 | $1.17             | <font color="red">+46_162</font>    |
| 1   | manualUpdate   | 1_630_852    | 1_242_340 | $0.0000016519 | $1.65             | <font color="red">+43_869</font>    |
| 2   | updateBlob     | 1_507_705    | 1_193_082 | $0.0000015864 | $1.58             | <font color="red">+20_636</font>    |
| 3   | updateFloat32  | 1_061_176    | 1_014_470 | $0.0000013489 | $1.34             | <font color="red">+33_667</font>    |
| 4   | updateInt8     | 1_160_455    | 1_054_182 | $0.0000014017 | $1.40             | <font color="red">+31_748</font>    |
| 5   | updateNat      | 1_551_853    | 1_210_741 | $0.0000016099 | $1.60             | <font color="red">+29_373</font>    |
| 6   | updateNull     | 1_046_164    | 1_008_465 | $0.0000013409 | $1.34             | <font color="red">+29_484</font>    |
| 7   | updateVoid     | 900_854      | 950_341   | $0.0000012636 | $1.26             | <font color="red">+27_962</font>    |
| 8   | updateRecord   | 13_005_007   | 5_792_002 | $0.0000077015 | $7.70             | <font color="green">-159_015</font> |
| 9   | updateReserved | 1_046_112    | 1_008_444 | $0.0000013409 | $1.34             | <font color="red">+30_941</font>    |
| 10  | updateString   | 1_300_314    | 1_110_125 | $0.0000014761 | $1.47             | <font color="red">+25_951</font>    |
| 11  | updateVariant  | 3_460_236    | 1_974_094 | $0.0000026249 | $2.62             | <font color="green">-6_832</font>   |
| 12  | updateFloat32  | 1_057_247    | 1_012_898 | $0.0000013468 | $1.34             | <font color="red">+29_330</font>    |
| 13  | replyRaw       | 528_326      | 801_330   | $0.0000010655 | $1.06             | <font color="red">+39_614</font>    |

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
