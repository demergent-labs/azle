⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for randomness

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name           | Instructions | Cycles    | USD           | USD/Million Calls | Change                                  |
| --- | --------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------------- |
| 0   | mathRandom            | 1_155_826    | 1_052_330 | $0.0000013993 | $1.39             | <font color="green">-987_400_589</font> |
| 1   | mathRandom            | 1_107_513    | 1_033_005 | $0.0000013736 | $1.37             | <font color="green">-18_065</font>      |
| 2   | mathRandom            | 1_105_084    | 1_032_033 | $0.0000013723 | $1.37             | <font color="red">+2_947</font>         |
| 3   | mathRandom            | 1_109_022    | 1_033_608 | $0.0000013744 | $1.37             | <font color="red">+7_201</font>         |
| 4   | mathRandom            | 1_106_149    | 1_032_459 | $0.0000013728 | $1.37             | <font color="red">+5_284</font>         |
| 5   | cryptoGetRandomValues | 1_567_887    | 1_217_154 | $0.0000016184 | $1.61             | <font color="red">+463_100</font>       |
| 6   | cryptoGetRandomValues | 1_542_663    | 1_207_065 | $0.0000016050 | $1.60             |                                         |
| 7   | cryptoGetRandomValues | 1_547_108    | 1_208_843 | $0.0000016074 | $1.60             |                                         |
| 8   | cryptoGetRandomValues | 1_545_573    | 1_208_229 | $0.0000016065 | $1.60             |                                         |
| 9   | cryptoGetRandomValues | 1_542_720    | 1_207_088 | $0.0000016050 | $1.60             |                                         |
| 10  | seedWith0             | 953_140      | 971_256   | $0.0000012914 | $1.29             |                                         |
| 11  | mathRandom            | 1_105_660    | 1_032_264 | $0.0000013726 | $1.37             |                                         |
| 12  | mathRandom            | 1_105_279    | 1_032_111 | $0.0000013724 | $1.37             |                                         |
| 13  | mathRandom            | 1_102_272    | 1_030_908 | $0.0000013708 | $1.37             |                                         |
| 14  | mathRandom            | 1_105_911    | 1_032_364 | $0.0000013727 | $1.37             |                                         |
| 15  | mathRandom            | 1_104_823    | 1_031_929 | $0.0000013721 | $1.37             |                                         |
| 16  | cryptoGetRandomValues | 1_556_455    | 1_212_582 | $0.0000016123 | $1.61             |                                         |
| 17  | cryptoGetRandomValues | 1_545_593    | 1_208_237 | $0.0000016066 | $1.60             |                                         |
| 18  | cryptoGetRandomValues | 1_543_142    | 1_207_256 | $0.0000016053 | $1.60             |                                         |
| 19  | cryptoGetRandomValues | 1_547_617    | 1_209_046 | $0.0000016076 | $1.60             |                                         |
| 20  | cryptoGetRandomValues | 1_547_046    | 1_208_818 | $0.0000016073 | $1.60             |                                         |
| 21  | seedWith0             | 953_880      | 971_552   | $0.0000012918 | $1.29             |                                         |
| 22  | mathRandom            | 1_108_262    | 1_033_304 | $0.0000013740 | $1.37             |                                         |
| 23  | mathRandom            | 1_104_437    | 1_031_774 | $0.0000013719 | $1.37             |                                         |
| 24  | mathRandom            | 1_105_668    | 1_032_267 | $0.0000013726 | $1.37             |                                         |
| 25  | mathRandom            | 1_105_340    | 1_032_136 | $0.0000013724 | $1.37             |                                         |
| 26  | mathRandom            | 1_107_382    | 1_032_952 | $0.0000013735 | $1.37             |                                         |
| 27  | cryptoGetRandomValues | 1_558_458    | 1_213_383 | $0.0000016134 | $1.61             |                                         |
| 28  | cryptoGetRandomValues | 1_543_458    | 1_207_383 | $0.0000016054 | $1.60             |                                         |
| 29  | cryptoGetRandomValues | 1_541_661    | 1_206_664 | $0.0000016045 | $1.60             |                                         |
| 30  | cryptoGetRandomValues | 1_545_135    | 1_208_054 | $0.0000016063 | $1.60             |                                         |
| 31  | cryptoGetRandomValues | 1_546_855    | 1_208_742 | $0.0000016072 | $1.60             |                                         |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name  | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ------------ | ------------ | ----------- | ------------- | ----------------- |
| 0   | postUpgrade  | 988_556_415  | 396_012_566 | $0.0005265660 | $526.56           |
| 1   | randomNumber | 1_125_578    | 1_040_231   | $0.0000013832 | $1.38             |
| 2   | randomNumber | 1_102_137    | 1_030_854   | $0.0000013707 | $1.37             |
| 3   | randomNumber | 1_101_821    | 1_030_728   | $0.0000013705 | $1.37             |
| 4   | randomNumber | 1_100_865    | 1_030_346   | $0.0000013700 | $1.37             |
| 5   | randomNumber | 1_104_787    | 1_031_914   | $0.0000013721 | $1.37             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
