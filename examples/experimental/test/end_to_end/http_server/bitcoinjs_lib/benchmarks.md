# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 1 | 47_727_653 | 52_727_653 | $0.0000722369 | $72.23 | <font color="green">-48_069_222_691</font> |
| 1 | 1 | 924_546_462 | 929_546_462 | $0.0012734787 | $1_273.47 | <font color="red">+869_552_462</font> |
| 2 | 1 | 5_219_259_919 | 5_224_259_919 | $0.0071572361 | $7_157.23 | <font color="red">+4_280_151_378</font> |
| 3 | 1 | 5_066_320_761 | 5_071_320_761 | $0.0069477094 | $6_947.70 | <font color="green">-1_754_493_768</font> |
| 4 | 1 | 8_209_415_648 | 8_214_415_648 | $0.0112537494 | $11_253.74 | <font color="red">+1_541_835_874</font> |
| 5 | 1 | 924_617_901 | 929_617_901 | $0.0012735765 | $1_273.57 | <font color="green">-11_466_450_055</font> |
| 6 | 1 | 1_770_645_387 | 1_775_645_387 | $0.0024326342 | $2_432.63 | <font color="red">+831_432_505</font> |
| 7 | 1 | 7_336_028_191 | 7_341_028_191 | $0.0100572086 | $10_057.20 | <font color="red">+3_994_612_592</font> |
| 8 | 1 | 7_342_165_470 | 7_347_165_470 | $0.0100656167 | $10_065.61 | <font color="green">-3_985_556_450</font> |

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