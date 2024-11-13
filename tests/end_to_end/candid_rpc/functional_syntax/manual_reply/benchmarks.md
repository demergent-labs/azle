# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | manualUpdate   | 668_805      | 857_522   | $0.0000011402 | $1.14             | <font color="green">-168</font>   |
| 1   | manualUpdate   | 1_614_537    | 1_235_814 | $0.0000016432 | $1.64             | <font color="green">-2_539</font> |
| 2   | updateBlob     | 1_485_596    | 1_184_238 | $0.0000015746 | $1.57             | <font color="red">+938</font>     |
| 3   | updateFloat32  | 1_030_960    | 1_002_384 | $0.0000013328 | $1.33             | <font color="red">+139</font>     |
| 4   | updateInt8     | 1_125_779    | 1_040_311 | $0.0000013833 | $1.38             | <font color="green">-1_733</font> |
| 5   | updateNat      | 1_525_664    | 1_200_265 | $0.0000015960 | $1.59             | <font color="green">-1_978</font> |
| 6   | updateNull     | 1_016_510    | 996_604   | $0.0000013252 | $1.32             | <font color="green">-1_373</font> |
| 7   | updateVoid     | 854_602      | 931_840   | $0.0000012390 | $1.23             | <font color="red">+94</font>      |
| 8   | updateRecord   | 16_901_044   | 7_350_417 | $0.0000097736 | $9.77             | <font color="red">+9_368</font>   |
| 9   | updateReserved | 1_015_576    | 996_230   | $0.0000013247 | $1.32             | <font color="green">-1_420</font> |
| 10  | updateString   | 1_275_716    | 1_100_286 | $0.0000014630 | $1.46             | <font color="red">+2_162</font>   |
| 11  | updateVariant  | 4_383_484    | 2_343_393 | $0.0000031159 | $3.11             | <font color="red">+5_701</font>   |
| 12  | updateFloat32  | 1_029_394    | 1_001_757 | $0.0000013320 | $1.33             | <font color="green">-2_303</font> |
| 13  | replyRaw       | 456_194      | 772_477   | $0.0000010271 | $1.02             | <font color="red">+1_171</font>   |

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
