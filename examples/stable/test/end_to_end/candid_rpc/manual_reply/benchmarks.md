# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | manualUpdate   | 753_398      | 891_359   | $0.0000011852 | $1.18             | <font color="red">+2_055</font>   |
| 1   | manualUpdate   | 1_701_435    | 1_270_574 | $0.0000016894 | $1.68             | <font color="green">-1_126</font> |
| 2   | updateBlob     | 1_245_619    | 1_088_247 | $0.0000014470 | $1.44             | <font color="green">-1_893</font> |
| 3   | updateFloat32  | 786_390      | 904_556   | $0.0000012028 | $1.20             | <font color="green">-1_593</font> |
| 4   | updateInt8     | 891_419      | 946_567   | $0.0000012586 | $1.25             | <font color="green">-2_618</font> |
| 5   | updateNat      | 1_297_445    | 1_108_978 | $0.0000014746 | $1.47             | <font color="green">-2_996</font> |
| 6   | updateNull     | 775_336      | 900_134   | $0.0000011969 | $1.19             | <font color="red">+1_767</font>   |
| 7   | updateVoid     | 621_289      | 838_515   | $0.0000011149 | $1.11             | <font color="green">-557</font>   |
| 8   | updateRecord   | 13_491_145   | 5_986_458 | $0.0000079600 | $7.96             | <font color="green">-2_852</font> |
| 9   | updateReserved | 773_781      | 899_512   | $0.0000011961 | $1.19             | <font color="red">+1_005</font>   |
| 10  | updateString   | 1_042_386    | 1_006_954 | $0.0000013389 | $1.33             | <font color="green">-7_205</font> |
| 11  | updateVariant  | 3_341_534    | 1_926_613 | $0.0000025618 | $2.56             | <font color="green">-5_437</font> |
| 12  | updateFloat32  | 785_353      | 904_141   | $0.0000012022 | $1.20             | <font color="red">+557</font>     |
| 13  | replyRaw       | 207_844      | 673_137   | $0.0000008951 | $0.89             | <font color="green">-1_246</font> |

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
