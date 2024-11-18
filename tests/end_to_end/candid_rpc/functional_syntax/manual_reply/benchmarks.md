# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | manualUpdate   | 669_889      | 857_955   | $0.0000011408 | $1.14             | <font color="red">+916</font>     |
| 1   | manualUpdate   | 1_618_209    | 1_237_283 | $0.0000016452 | $1.64             | <font color="red">+1_133</font>   |
| 2   | updateBlob     | 1_489_911    | 1_185_964 | $0.0000015769 | $1.57             | <font color="red">+5_253</font>   |
| 3   | updateFloat32  | 1_033_637    | 1_003_454 | $0.0000013343 | $1.33             | <font color="red">+2_816</font>   |
| 4   | updateInt8     | 1_126_420    | 1_040_568 | $0.0000013836 | $1.38             | <font color="green">-1_092</font> |
| 5   | updateNat      | 1_529_758    | 1_201_903 | $0.0000015981 | $1.59             | <font color="red">+2_116</font>   |
| 6   | updateNull     | 1_020_630    | 998_252   | $0.0000013273 | $1.32             | <font color="red">+2_747</font>   |
| 7   | updateVoid     | 854_691      | 931_876   | $0.0000012391 | $1.23             | <font color="red">+183</font>     |
| 8   | updateRecord   | 16_895_953   | 7_348_381 | $0.0000097709 | $9.77             | <font color="red">+4_277</font>   |
| 9   | updateReserved | 1_019_358    | 997_743   | $0.0000013267 | $1.32             | <font color="red">+2_362</font>   |
| 10  | updateString   | 1_277_185    | 1_100_874 | $0.0000014638 | $1.46             | <font color="red">+3_631</font>   |
| 11  | updateVariant  | 4_387_885    | 2_345_154 | $0.0000031183 | $3.11             | <font color="red">+10_102</font>  |
| 12  | updateFloat32  | 1_031_382    | 1_002_552 | $0.0000013331 | $1.33             | <font color="green">-315</font>   |
| 13  | replyRaw       | 457_177      | 772_870   | $0.0000010277 | $1.02             | <font color="red">+2_154</font>   |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 668_973      | 857_589   | $0.0000011403 | $1.14             |
| 1   | manualUpdate   | 1_617_076    | 1_236_830 | $0.0000016446 | $1.64             |
| 2   | updateBlob     | 1_484_658    | 1_183_863 | $0.0000015741 | $1.57             |
| 3   | updateFloat32  | 1_030_821    | 1_002_328 | $0.0000013328 | $1.33             |
| 4   | updateInt8     | 1_127_512    | 1_041_004 | $0.0000013842 | $1.38             |
| 5   | updateNat      | 1_527_642    | 1_201_056 | $0.0000015970 | $1.59             |
| 6   | updateNull     | 1_017_883    | 997_153   | $0.0000013259 | $1.32             |
| 7   | updateVoid     | 854_508      | 931_803   | $0.0000012390 | $1.23             |
| 8   | updateRecord   | 16_891_676   | 7_346_670 | $0.0000097686 | $9.76             |
| 9   | updateReserved | 1_016_996    | 996_798   | $0.0000013254 | $1.32             |
| 10  | updateString   | 1_273_554    | 1_099_421 | $0.0000014619 | $1.46             |
| 11  | updateVariant  | 4_377_783    | 2_341_113 | $0.0000031129 | $3.11             |
| 12  | updateFloat32  | 1_031_697    | 1_002_678 | $0.0000013332 | $1.33             |
| 13  | replyRaw       | 455_023      | 772_009   | $0.0000010265 | $1.02             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
