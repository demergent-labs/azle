# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | manualUpdate | 933_675 | 5_933_675 | $0.0000081291 | $8.12 | <font color="red">+174_621</font> |
| 1 | manualUpdate | 1_662_608 | 6_662_608 | $0.0000091278 | $9.12 | <font color="green">-42_547</font> |
| 2 | updateBlob | 1_173_579 | 6_173_579 | $0.0000084578 | $8.45 | <font color="green">-72_017</font> |
| 3 | updateFloat32 | 740_796 | 5_740_796 | $0.0000078649 | $7.86 | <font color="green">-50_705</font> |
| 4 | updateInt8 | 834_821 | 5_834_821 | $0.0000079937 | $7.99 | <font color="green">-60_281</font> |
| 5 | updateNat | 1_220_916 | 6_220_916 | $0.0000085227 | $8.52 | <font color="green">-85_692</font> |
| 6 | updateNull | 728_297 | 5_728_297 | $0.0000078478 | $7.84 | <font color="green">-46_065</font> |
| 7 | updateVoid | 582_107 | 5_582_107 | $0.0000076475 | $7.64 | <font color="green">-42_694</font> |
| 8 | updateRecord | 12_818_707 | 17_818_707 | $0.0000244116 | $24.41 | <font color="green">-678_358</font> |
| 9 | updateReserved | 729_782 | 5_729_782 | $0.0000078498 | $7.84 | <font color="green">-47_174</font> |
| 10 | updateString | 982_710 | 5_982_710 | $0.0000081963 | $8.19 | <font color="green">-64_617</font> |
| 11 | updateVariant | 3_165_670 | 8_165_670 | $0.0000111870 | $11.18 | <font color="green">-176_424</font> |
| 12 | updateFloat32 | 739_932 | 5_739_932 | $0.0000078637 | $7.86 | <font color="green">-45_949</font> |
| 13 | replyRaw | 213_579 | 5_213_579 | $0.0000071426 | $7.14 | <font color="green">-538</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | manualUpdate | 759_054 | 5_759_054 | $0.0000078899 | $7.88 |
| 1 | manualUpdate | 1_705_155 | 6_705_155 | $0.0000091861 | $9.18 |
| 2 | updateBlob | 1_245_596 | 6_245_596 | $0.0000085565 | $8.55 |
| 3 | updateFloat32 | 791_501 | 5_791_501 | $0.0000079344 | $7.93 |
| 4 | updateInt8 | 895_102 | 5_895_102 | $0.0000080763 | $8.07 |
| 5 | updateNat | 1_306_608 | 6_306_608 | $0.0000086401 | $8.64 |
| 6 | updateNull | 774_362 | 5_774_362 | $0.0000079109 | $7.91 |
| 7 | updateVoid | 624_801 | 5_624_801 | $0.0000077060 | $7.70 |
| 8 | updateRecord | 13_497_065 | 18_497_065 | $0.0000253410 | $25.34 |
| 9 | updateReserved | 776_956 | 5_776_956 | $0.0000079144 | $7.91 |
| 10 | updateString | 1_047_327 | 6_047_327 | $0.0000082848 | $8.28 |
| 11 | updateVariant | 3_342_094 | 8_342_094 | $0.0000114287 | $11.42 |
| 12 | updateFloat32 | 785_881 | 5_785_881 | $0.0000079267 | $7.92 |
| 13 | replyRaw | 214_117 | 5_214_117 | $0.0000071433 | $7.14 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).