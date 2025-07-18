# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | manualUpdate   | 759_054      | 893_621   | $0.0000011882 | $1.18             | <font color="red">+7_711</font>   |
| 1   | manualUpdate   | 1_705_155    | 1_272_062 | $0.0000016914 | $1.69             | <font color="red">+2_594</font>   |
| 2   | updateBlob     | 1_245_596    | 1_088_238 | $0.0000014470 | $1.44             | <font color="green">-1_916</font> |
| 3   | updateFloat32  | 791_501      | 906_600   | $0.0000012055 | $1.20             | <font color="red">+3_518</font>   |
| 4   | updateInt8     | 895_102      | 948_040   | $0.0000012606 | $1.26             | <font color="red">+1_065</font>   |
| 5   | updateNat      | 1_306_608    | 1_112_643 | $0.0000014794 | $1.47             | <font color="red">+6_167</font>   |
| 6   | updateNull     | 774_362      | 899_744   | $0.0000011964 | $1.19             | <font color="red">+793</font>     |
| 7   | updateVoid     | 624_801      | 839_920   | $0.0000011168 | $1.11             | <font color="red">+2_955</font>   |
| 8   | updateRecord   | 13_497_065   | 5_988_826 | $0.0000079632 | $7.96             | <font color="red">+3_068</font>   |
| 9   | updateReserved | 776_956      | 900_782   | $0.0000011977 | $1.19             | <font color="red">+4_180</font>   |
| 10  | updateString   | 1_047_327    | 1_008_930 | $0.0000013415 | $1.34             | <font color="green">-2_264</font> |
| 11  | updateVariant  | 3_342_094    | 1_926_837 | $0.0000025621 | $2.56             | <font color="green">-4_877</font> |
| 12  | updateFloat32  | 785_881      | 904_352   | $0.0000012025 | $1.20             | <font color="red">+1_085</font>   |
| 13  | replyRaw       | 214_117      | 675_646   | $0.0000008984 | $0.89             | <font color="red">+5_027</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 751_343      | 890_537   | $0.0000011841 | $1.18             |
| 1   | manualUpdate   | 1_702_561    | 1_271_024 | $0.0000016900 | $1.69             |
| 2   | updateBlob     | 1_247_512    | 1_089_004 | $0.0000014480 | $1.44             |
| 3   | updateFloat32  | 787_983      | 905_193   | $0.0000012036 | $1.20             |
| 4   | updateInt8     | 894_037      | 947_614   | $0.0000012600 | $1.26             |
| 5   | updateNat      | 1_300_441    | 1_110_176 | $0.0000014762 | $1.47             |
| 6   | updateNull     | 773_569      | 899_427   | $0.0000011959 | $1.19             |
| 7   | updateVoid     | 621_846      | 838_738   | $0.0000011152 | $1.11             |
| 8   | updateRecord   | 13_493_997   | 5_987_598 | $0.0000079615 | $7.96             |
| 9   | updateReserved | 772_776      | 899_110   | $0.0000011955 | $1.19             |
| 10  | updateString   | 1_049_591    | 1_009_836 | $0.0000013427 | $1.34             |
| 11  | updateVariant  | 3_346_971    | 1_928_788 | $0.0000025647 | $2.56             |
| 12  | updateFloat32  | 784_796      | 903_918   | $0.0000012019 | $1.20             |
| 13  | replyRaw       | 209_090      | 673_636   | $0.0000008957 | $0.89             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
