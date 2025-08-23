# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | manualUpdate   | 936_717      | 5_936_717  | $0.0000081333 | $8.13             | <font color="red">+177_663</font>   |
| 1   | manualUpdate   | 1_662_965    | 6_662_965  | $0.0000091283 | $9.12             | <font color="green">-42_190</font>  |
| 2   | updateBlob     | 1_171_576    | 6_171_576  | $0.0000084551 | $8.45             | <font color="green">-74_020</font>  |
| 3   | updateFloat32  | 741_294      | 5_741_294  | $0.0000078656 | $7.86             | <font color="green">-50_207</font>  |
| 4   | updateInt8     | 836_356      | 5_836_356  | $0.0000079958 | $7.99             | <font color="green">-58_746</font>  |
| 5   | updateNat      | 1_221_629    | 6_221_629  | $0.0000085236 | $8.52             | <font color="green">-84_979</font>  |
| 6   | updateNull     | 725_589      | 5_725_589  | $0.0000078441 | $7.84             | <font color="green">-48_773</font>  |
| 7   | updateVoid     | 580_530      | 5_580_530  | $0.0000076453 | $7.64             | <font color="green">-44_271</font>  |
| 8   | updateRecord   | 12_827_674   | 17_827_674 | $0.0000244239 | $24.42            | <font color="green">-669_391</font> |
| 9   | updateReserved | 729_183      | 5_729_183  | $0.0000078490 | $7.84             | <font color="green">-47_773</font>  |
| 10  | updateString   | 983_290      | 5_983_290  | $0.0000081971 | $8.19             | <font color="green">-64_037</font>  |
| 11  | updateVariant  | 3_162_004    | 8_162_004  | $0.0000111819 | $11.18            | <font color="green">-180_090</font> |
| 12  | updateFloat32  | 737_401      | 5_737_401  | $0.0000078602 | $7.86             | <font color="green">-48_480</font>  |
| 13  | replyRaw       | 212_344      | 5_212_344  | $0.0000071409 | $7.14             | <font color="green">-1_773</font>   |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | manualUpdate   | 759_054      | 5_759_054  | $0.0000078899 | $7.88             |
| 1   | manualUpdate   | 1_705_155    | 6_705_155  | $0.0000091861 | $9.18             |
| 2   | updateBlob     | 1_245_596    | 6_245_596  | $0.0000085565 | $8.55             |
| 3   | updateFloat32  | 791_501      | 5_791_501  | $0.0000079344 | $7.93             |
| 4   | updateInt8     | 895_102      | 5_895_102  | $0.0000080763 | $8.07             |
| 5   | updateNat      | 1_306_608    | 6_306_608  | $0.0000086401 | $8.64             |
| 6   | updateNull     | 774_362      | 5_774_362  | $0.0000079109 | $7.91             |
| 7   | updateVoid     | 624_801      | 5_624_801  | $0.0000077060 | $7.70             |
| 8   | updateRecord   | 13_497_065   | 18_497_065 | $0.0000253410 | $25.34            |
| 9   | updateReserved | 776_956      | 5_776_956  | $0.0000079144 | $7.91             |
| 10  | updateString   | 1_047_327    | 6_047_327  | $0.0000082848 | $8.28             |
| 11  | updateVariant  | 3_342_094    | 8_342_094  | $0.0000114287 | $11.42            |
| 12  | updateFloat32  | 785_881      | 5_785_881  | $0.0000079267 | $7.92             |
| 13  | replyRaw       | 214_117      | 5_214_117  | $0.0000071433 | $7.14             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
