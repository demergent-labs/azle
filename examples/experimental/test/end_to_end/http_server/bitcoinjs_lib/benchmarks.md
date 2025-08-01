# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 1 | 47_704_578 | 52_704_578 | $0.0000722053 | $72.20 | <font color="green">-48_782_239_209</font> |
| 1 | 1 | 924_840_096 | 929_840_096 | $0.0012738809 | $1_273.88 | <font color="red">+870_020_566</font> |
| 2 | 1 | 5_219_566_601 | 5_224_566_601 | $0.0071576562 | $7_157.65 | <font color="red">+4_282_953_070</font> |
| 3 | 1 | 5_067_380_619 | 5_072_380_619 | $0.0069491614 | $6_949.16 | <font color="green">-1_744_606_507</font> |
| 4 | 1 | 8_209_388_029 | 8_214_388_029 | $0.0112537116 | $11_253.71 | <font color="red">+1_550_333_165</font> |
| 5 | 1 | 924_615_767 | 929_615_767 | $0.0012735736 | $1_273.57 | <font color="green">-11_466_328_949</font> |
| 6 | 1 | 1_770_622_339 | 1_775_622_339 | $0.0024326026 | $2_432.60 | <font color="red">+833_981_163</font> |
| 7 | 1 | 7_336_017_860 | 7_341_017_860 | $0.0100571945 | $10_057.19 | <font color="red">+3_994_880_845</font> |
| 8 | 1 | 7_342_169_846 | 7_347_169_846 | $0.0100656227 | $10_065.62 | <font color="green">-3_985_792_730</font> |

## Baseline benchmarks Azle version: 0.30.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | init | 48_829_943_787 | 48_834_943_787 | $0.0669038730 | $66_903.87 |
| 1 | http_request_update | 54_819_530 | 59_819_530 | $0.0000819528 | $81.95 |
| 2 | http_request_update | 936_613_531 | 941_613_531 | $0.0012900105 | $1_290.01 |
| 3 | http_request_update | 6_811_987_126 | 6_816_987_126 | $0.0093392724 | $9_339.27 |
| 4 | http_request_update | 6_659_054_864 | 6_664_054_864 | $0.0091297552 | $9_129.75 |
| 5 | http_request_update | 12_390_944_716 | 12_395_944_716 | $0.0169824443 | $16_982.44 |
| 6 | http_request_update | 936_641_176 | 941_641_176 | $0.0012900484 | $1_290.04 |
| 7 | http_request_update | 3_341_137_015 | 3_346_137_015 | $0.0045842077 | $4_584.20 |
| 8 | http_request_update | 11_327_962_576 | 11_332_962_576 | $0.0155261587 | $15_526.15 |
| 9 | http_request_update | 11_334_381_276 | 11_339_381_276 | $0.0155349523 | $15_534.95 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).