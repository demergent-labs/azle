# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 1 | 47_770_955 | 52_770_955 | $0.0000722962 | $72.29 | <font color="green">-48_069_179_389</font> |
| 1 | 1 | 948_943_228 | 953_943_228 | $0.0013069022 | $1_306.90 | <font color="red">+893_949_228</font> |
| 2 | 1 | 5_324_432_499 | 5_329_432_499 | $0.0073013225 | $7_301.32 | <font color="red">+4_385_323_958</font> |
| 3 | 1 | 5_166_898_699 | 5_171_898_699 | $0.0070855012 | $7_085.50 | <font color="green">-1_653_915_830</font> |
| 4 | 1 | 8_209_421_193 | 8_214_421_193 | $0.0112537570 | $11_253.75 | <font color="red">+1_541_841_419</font> |
| 5 | 1 | 948_683_422 | 953_683_422 | $0.0013065463 | $1_306.54 | <font color="green">-11_442_384_534</font> |
| 6 | 1 | 1_770_699_709 | 1_775_699_709 | $0.0024327086 | $2_432.70 | <font color="red">+831_486_827</font> |
| 7 | 1 | 7_336_016_332 | 7_341_016_332 | $0.0100571924 | $10_057.19 | <font color="red">+3_994_600_733</font> |
| 8 | 1 | 7_342_204_461 | 7_347_204_461 | $0.0100656701 | $10_065.67 | <font color="green">-3_985_517_459</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | init | 48_116_950_344 | 48_121_950_344 | $0.0659270720 | $65_927.07 |
| 1 | http_request_update | 54_994_000 | 59_994_000 | $0.0000821918 | $82.19 |
| 2 | http_request_update | 939_108_541 | 944_108_541 | $0.0012934287 | $1_293.42 |
| 3 | http_request_update | 6_820_814_529 | 6_825_814_529 | $0.0093513659 | $9_351.36 |
| 4 | http_request_update | 6_667_579_774 | 6_672_579_774 | $0.0091414343 | $9_141.43 |
| 5 | http_request_update | 12_391_067_956 | 12_396_067_956 | $0.0169826131 | $16_982.61 |
| 6 | http_request_update | 939_212_882 | 944_212_882 | $0.0012935716 | $1_293.57 |
| 7 | http_request_update | 3_341_415_599 | 3_346_415_599 | $0.0045845894 | $4_584.58 |
| 8 | http_request_update | 11_327_721_920 | 11_332_721_920 | $0.0155258290 | $15_525.82 |
| 9 | http_request_update | 11_334_413_166 | 11_339_413_166 | $0.0155349960 | $15_534.99 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).