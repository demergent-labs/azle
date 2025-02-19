# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | manualUpdate   | 757_296      | 892_918   | $0.0000011873 | $1.18             | <font color="green">-6_889</font>   |
| 1   | manualUpdate   | 1_710_355    | 1_274_142 | $0.0000016942 | $1.69             | <font color="green">-19_729</font>  |
| 2   | updateBlob     | 1_250_493    | 1_090_197 | $0.0000014496 | $1.44             | <font color="green">-349_488</font> |
| 3   | updateFloat32  | 792_105      | 906_842   | $0.0000012058 | $1.20             | <font color="green">-329_560</font> |
| 4   | updateInt8     | 893_772      | 947_508   | $0.0000012599 | $1.25             | <font color="green">-331_041</font> |
| 5   | updateNat      | 1_307_229    | 1_112_891 | $0.0000014798 | $1.47             | <font color="green">-335_985</font> |
| 6   | updateNull     | 780_270      | 902_108   | $0.0000011995 | $1.19             | <font color="green">-329_250</font> |
| 7   | updateVoid     | 626_829      | 840_731   | $0.0000011179 | $1.11             | <font color="green">-326_478</font> |
| 8   | updateRecord   | 13_548_924   | 6_009_569 | $0.0000079907 | $7.99             | <font color="green">-382_723</font> |
| 9   | updateReserved | 776_449      | 900_579   | $0.0000011975 | $1.19             | <font color="green">-330_940</font> |
| 10  | updateString   | 1_052_797    | 1_011_118 | $0.0000013445 | $1.34             | <font color="green">-328_500</font> |
| 11  | updateVariant  | 3_367_214    | 1_936_885 | $0.0000025754 | $2.57             | <font color="green">-333_023</font> |
| 12  | updateFloat32  | 788_551      | 905_420   | $0.0000012039 | $1.20             | <font color="green">-330_731</font> |
| 13  | replyRaw       | 211_979      | 674_791   | $0.0000008972 | $0.89             | <font color="green">-325_320</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 764_185      | 895_674   | $0.0000011910 | $1.19             |
| 1   | manualUpdate   | 1_730_084    | 1_282_033 | $0.0000017047 | $1.70             |
| 2   | updateBlob     | 1_599_981    | 1_229_992 | $0.0000016355 | $1.63             |
| 3   | updateFloat32  | 1_121_665    | 1_038_666 | $0.0000013811 | $1.38             |
| 4   | updateInt8     | 1_224_813    | 1_079_925 | $0.0000014359 | $1.43             |
| 5   | updateNat      | 1_643_214    | 1_247_285 | $0.0000016585 | $1.65             |
| 6   | updateNull     | 1_109_520    | 1_033_808 | $0.0000013746 | $1.37             |
| 7   | updateVoid     | 953_307      | 971_322   | $0.0000012915 | $1.29             |
| 8   | updateRecord   | 13_931_647   | 6_162_658 | $0.0000081943 | $8.19             |
| 9   | updateReserved | 1_107_389    | 1_032_955 | $0.0000013735 | $1.37             |
| 10  | updateString   | 1_381_297    | 1_142_518 | $0.0000015192 | $1.51             |
| 11  | updateVariant  | 3_700_237    | 2_070_094 | $0.0000027525 | $2.75             |
| 12  | updateFloat32  | 1_119_282    | 1_037_712 | $0.0000013798 | $1.37             |
| 13  | replyRaw       | 537_299      | 804_919   | $0.0000010703 | $1.07             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
