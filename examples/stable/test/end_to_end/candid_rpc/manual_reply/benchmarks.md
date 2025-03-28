⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | manualUpdate   | 751_343      | 890_537   | $0.0000011841 | $1.18             | <font color="green">-1_305</font> |
| 1   | manualUpdate   | 1_702_561    | 1_271_024 | $0.0000016900 | $1.69             | <font color="red">+2_795</font>   |
| 2   | updateBlob     | 1_247_512    | 1_089_004 | $0.0000014480 | $1.44             | <font color="red">+4_547</font>   |
| 3   | updateFloat32  | 787_983      | 905_193   | $0.0000012036 | $1.20             | <font color="red">+3_544</font>   |
| 4   | updateInt8     | 894_037      | 947_614   | $0.0000012600 | $1.26             | <font color="red">+1_996</font>   |
| 5   | updateNat      | 1_300_441    | 1_110_176 | $0.0000014762 | $1.47             | <font color="red">+1_292</font>   |
| 6   | updateNull     | 773_569      | 899_427   | $0.0000011959 | $1.19             | <font color="red">+1_290</font>   |
| 7   | updateVoid     | 621_846      | 838_738   | $0.0000011152 | $1.11             | <font color="green">-2_260</font> |
| 8   | updateRecord   | 13_493_997   | 5_987_598 | $0.0000079615 | $7.96             | <font color="red">+6_961</font>   |
| 9   | updateReserved | 772_776      | 899_110   | $0.0000011955 | $1.19             | <font color="green">-144</font>   |
| 10  | updateString   | 1_049_591    | 1_009_836 | $0.0000013427 | $1.34             | <font color="red">+6_183</font>   |
| 11  | updateVariant  | 3_346_971    | 1_928_788 | $0.0000025647 | $2.56             | <font color="red">+6_252</font>   |
| 12  | updateFloat32  | 784_796      | 903_918   | $0.0000012019 | $1.20             | <font color="red">+3_154</font>   |
| 13  | replyRaw       | 209_090      | 673_636   | $0.0000008957 | $0.89             | <font color="red">+2_881</font>   |

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
