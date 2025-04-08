# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | manualUpdate   | 753_590      | 891_436   | $0.0000011853 | $1.18             | <font color="red">+942</font>     |
| 1   | manualUpdate   | 1_700_674    | 1_270_269 | $0.0000016890 | $1.68             | <font color="red">+908</font>     |
| 2   | updateBlob     | 1_251_470    | 1_090_588 | $0.0000014501 | $1.45             | <font color="red">+8_505</font>   |
| 3   | updateFloat32  | 789_133      | 905_653   | $0.0000012042 | $1.20             | <font color="red">+4_694</font>   |
| 4   | updateInt8     | 889_898      | 945_959   | $0.0000012578 | $1.25             | <font color="green">-2_143</font> |
| 5   | updateNat      | 1_305_889    | 1_112_355 | $0.0000014791 | $1.47             | <font color="red">+6_740</font>   |
| 6   | updateNull     | 773_400      | 899_360   | $0.0000011959 | $1.19             | <font color="red">+1_121</font>   |
| 7   | updateVoid     | 623_976      | 839_590   | $0.0000011164 | $1.11             | <font color="green">-130</font>   |
| 8   | updateRecord   | 13_498_490   | 5_989_396 | $0.0000079639 | $7.96             | <font color="red">+11_454</font>  |
| 9   | updateReserved | 774_932      | 899_972   | $0.0000011967 | $1.19             | <font color="red">+2_012</font>   |
| 10  | updateString   | 1_050_302    | 1_010_120 | $0.0000013431 | $1.34             | <font color="red">+6_894</font>   |
| 11  | updateVariant  | 3_351_707    | 1_930_682 | $0.0000025672 | $2.56             | <font color="red">+10_988</font>  |
| 12  | updateFloat32  | 785_074      | 904_029   | $0.0000012021 | $1.20             | <font color="red">+3_432</font>   |
| 13  | replyRaw       | 211_109      | 674_443   | $0.0000008968 | $0.89             | <font color="red">+4_900</font>   |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 752_648      | 891_059   | $0.0000011848 | $1.18             |
| 1   | manualUpdate   | 1_699_766    | 1_269_906 | $0.0000016886 | $1.68             |
| 2   | updateBlob     | 1_242_965    | 1_087_186 | $0.0000014456 | $1.44             |
| 3   | updateFloat32  | 784_439      | 903_775   | $0.0000012017 | $1.20             |
| 4   | updateInt8     | 892_041      | 946_816   | $0.0000012590 | $1.25             |
| 5   | updateNat      | 1_299_149    | 1_109_659 | $0.0000014755 | $1.47             |
| 6   | updateNull     | 772_279      | 898_911   | $0.0000011953 | $1.19             |
| 7   | updateVoid     | 624_106      | 839_642   | $0.0000011164 | $1.11             |
| 8   | updateRecord   | 13_487_036   | 5_984_814 | $0.0000079578 | $7.95             |
| 9   | updateReserved | 772_920      | 899_168   | $0.0000011956 | $1.19             |
| 10  | updateString   | 1_043_408    | 1_007_363 | $0.0000013395 | $1.33             |
| 11  | updateVariant  | 3_340_719    | 1_926_287 | $0.0000025613 | $2.56             |
| 12  | updateFloat32  | 781_642      | 902_656   | $0.0000012002 | $1.20             |
| 13  | replyRaw       | 206_209      | 672_483   | $0.0000008942 | $0.89             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
