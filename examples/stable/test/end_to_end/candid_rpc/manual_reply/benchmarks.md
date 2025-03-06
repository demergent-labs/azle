# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | manualUpdate   | 751_081      | 890_432   | $0.0000011840 | $1.18             | <font color="green">-1_567</font> |
| 1   | manualUpdate   | 1_697_642    | 1_269_056 | $0.0000016874 | $1.68             | <font color="green">-2_124</font> |
| 2   | updateBlob     | 1_242_906    | 1_087_162 | $0.0000014456 | $1.44             | <font color="green">-59</font>    |
| 3   | updateFloat32  | 782_494      | 902_997   | $0.0000012007 | $1.20             | <font color="green">-1_945</font> |
| 4   | updateInt8     | 890_343      | 946_137   | $0.0000012580 | $1.25             | <font color="green">-1_698</font> |
| 5   | updateNat      | 1_300_846    | 1_110_338 | $0.0000014764 | $1.47             | <font color="red">+1_697</font>   |
| 6   | updateNull     | 771_309      | 898_523   | $0.0000011947 | $1.19             | <font color="green">-970</font>   |
| 7   | updateVoid     | 622_218      | 838_887   | $0.0000011154 | $1.11             | <font color="green">-1_888</font> |
| 8   | updateRecord   | 13_477_647   | 5_981_058 | $0.0000079528 | $7.95             | <font color="green">-9_389</font> |
| 9   | updateReserved | 771_858      | 898_743   | $0.0000011950 | $1.19             | <font color="green">-1_062</font> |
| 10  | updateString   | 1_046_236    | 1_008_494 | $0.0000013410 | $1.34             | <font color="red">+2_828</font>   |
| 11  | updateVariant  | 3_347_047    | 1_928_818 | $0.0000025647 | $2.56             | <font color="red">+6_328</font>   |
| 12  | updateFloat32  | 782_375      | 902_950   | $0.0000012006 | $1.20             | <font color="red">+733</font>     |
| 13  | replyRaw       | 207_535      | 673_014   | $0.0000008949 | $0.89             | <font color="red">+1_326</font>   |

## Baseline benchmarks Azle version: 0.27.0

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
